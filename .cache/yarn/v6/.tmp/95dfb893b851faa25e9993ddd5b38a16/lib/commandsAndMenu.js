import { Dialog, InputDialog, MainAreaWidget, ReactWidget, showDialog, showErrorMessage, Toolbar, ToolbarButton } from '@jupyterlab/apputils';
import { PathExt, URLExt } from '@jupyterlab/coreutils';
import { closeIcon } from '@jupyterlab/ui-components';
import { ArrayExt, toArray } from '@lumino/algorithm';
import { PromiseDelegate } from '@lumino/coreutils';
import { Menu, Panel, Widget } from '@lumino/widgets';
import * as React from 'react';
import { DiffModel } from './components/diff/model';
import { createPlainTextDiff } from './components/diff/PlainTextDiff';
import { CONTEXT_COMMANDS } from './components/FileList';
import { MergeBranchDialog } from './components/MergeBranchDialog';
import { AUTH_ERROR_MESSAGES, requestAPI } from './git';
import { logger } from './logger';
import { getDiffProvider } from './model';
import { addIcon, diffIcon, discardIcon, gitIcon, historyIcon, openIcon, removeIcon } from './style/icons';
import { CommandIDs, ContextCommandIDs, Git, Level } from './tokens';
import { GitCredentialsForm } from './widgets/CredentialsBox';
import { discardAllChanges } from './widgets/discardAllChanges';
/**
 * Git operations requiring authentication
 */
export var Operation;
(function (Operation) {
    Operation["Clone"] = "Clone";
    Operation["Pull"] = "Pull";
    Operation["Push"] = "Push";
    Operation["ForcePush"] = "ForcePush";
})(Operation || (Operation = {}));
function pluralizedContextLabel(singular, plural) {
    return (args) => {
        const { files } = args;
        if (files.length > 1) {
            return plural;
        }
        else {
            return singular;
        }
    };
}
/**
 * Add the commands for the git extension.
 */
export function addCommands(app, gitModel, fileBrowserModel, settings, translator) {
    const { commands, shell, serviceManager } = app;
    const trans = translator.load('jupyterlab_git');
    /**
     * Commit using a keystroke combination when in CommitBox.
     *
     * This command is not accessible from the user interface (not visible),
     * as it is handled by a signal listener in the CommitBox component instead.
     * The label and caption are given to ensure that the command will
     * show up in the shortcut editor UI with a nice description.
     */
    commands.addCommand(CommandIDs.gitSubmitCommand, {
        label: trans.__('Commit from the Commit Box'),
        caption: trans.__('Submit the commit using the summary and description from commit box'),
        execute: () => void 0,
        isVisible: () => false
    });
    /**
     * Add open terminal in the Git repository
     */
    commands.addCommand(CommandIDs.gitTerminalCommand, {
        label: trans.__('Open Git Repository in Terminal'),
        caption: trans.__('Open a New Terminal to the Git Repository'),
        execute: async (args) => {
            const main = (await commands.execute('terminal:create-new', args));
            try {
                if (gitModel.pathRepository !== null) {
                    const terminal = main.content;
                    terminal.session.send({
                        type: 'stdin',
                        content: [
                            `cd "${gitModel.pathRepository.split('"').join('\\"')}"\n`
                        ]
                    });
                }
                return main;
            }
            catch (e) {
                console.error(e);
                main.dispose();
            }
        },
        isEnabled: () => gitModel.pathRepository !== null &&
            app.serviceManager.terminals.isAvailable()
    });
    /** Add open/go to git interface command */
    commands.addCommand(CommandIDs.gitUI, {
        label: trans.__('Git Interface'),
        caption: trans.__('Go to Git user interface'),
        execute: () => {
            try {
                shell.activateById('jp-git-sessions');
            }
            catch (err) {
                console.error('Fail to open Git tab.');
            }
        }
    });
    /** Add git init command */
    commands.addCommand(CommandIDs.gitInit, {
        label: trans.__('Initialize a Repository'),
        caption: trans.__('Create an empty Git repository or reinitialize an existing one'),
        execute: async () => {
            const currentPath = fileBrowserModel.path;
            const result = await showDialog({
                title: trans.__('Initialize a Repository'),
                body: trans.__('Do you really want to make this directory a Git Repo?'),
                buttons: [
                    Dialog.cancelButton({ label: trans.__('Cancel') }),
                    Dialog.warnButton({ label: trans.__('Yes') })
                ]
            });
            if (result.button.accept) {
                logger.log({
                    message: trans.__('Initializing…'),
                    level: Level.RUNNING
                });
                try {
                    await gitModel.init(currentPath);
                    gitModel.pathRepository = currentPath;
                    logger.log({
                        message: trans.__('Git repository initialized.'),
                        level: Level.SUCCESS
                    });
                }
                catch (error) {
                    console.error(trans.__('Encountered an error when initializing the repository. Error: '), error);
                    logger.log({
                        message: trans.__('Failed to initialize the Git repository'),
                        level: Level.ERROR,
                        error: error
                    });
                }
            }
        },
        isEnabled: () => gitModel.pathRepository === null
    });
    /** Open URL externally */
    commands.addCommand(CommandIDs.gitOpenUrl, {
        label: args => args['text'],
        execute: args => {
            const url = args['url'];
            window.open(url);
        }
    });
    /** add toggle for simple staging */
    commands.addCommand(CommandIDs.gitToggleSimpleStaging, {
        label: trans.__('Simple staging'),
        isToggled: () => !!settings.composite['simpleStaging'],
        execute: args => {
            settings.set('simpleStaging', !settings.composite['simpleStaging']);
        }
    });
    /** add toggle for double click opens diffs */
    commands.addCommand(CommandIDs.gitToggleDoubleClickDiff, {
        label: trans.__('Double click opens diff'),
        isToggled: () => !!settings.composite['doubleClickDiff'],
        execute: args => {
            settings.set('doubleClickDiff', !settings.composite['doubleClickDiff']);
        }
    });
    /** Command to add a remote Git repository */
    commands.addCommand(CommandIDs.gitAddRemote, {
        label: trans.__('Add Remote Repository'),
        caption: trans.__('Add a Git remote repository'),
        isEnabled: () => gitModel.pathRepository !== null,
        execute: async (args) => {
            if (gitModel.pathRepository === null) {
                console.warn(trans.__('Not in a Git repository. Unable to add a remote.'));
                return;
            }
            let url = args['url'];
            const name = args['name'];
            if (!url) {
                const result = await InputDialog.getText({
                    title: trans.__('Add a remote repository'),
                    placeholder: trans.__('Remote Git repository URL')
                });
                if (result.button.accept) {
                    url = result.value;
                }
            }
            if (url) {
                try {
                    await gitModel.addRemote(url, name);
                }
                catch (error) {
                    console.error(error);
                    showErrorMessage(trans.__('Error when adding remote repository'), error);
                }
            }
        }
    });
    /** Add git open gitignore command */
    commands.addCommand(CommandIDs.gitOpenGitignore, {
        label: trans.__('Open .gitignore'),
        caption: trans.__('Open .gitignore'),
        isEnabled: () => gitModel.pathRepository !== null,
        execute: async () => {
            await gitModel.ensureGitignore();
        }
    });
    /** Add git push command */
    commands.addCommand(CommandIDs.gitPush, {
        label: args => args.force
            ? trans.__('Push to Remote (Force)')
            : trans.__('Push to Remote'),
        caption: trans.__('Push code to remote repository'),
        isEnabled: () => gitModel.pathRepository !== null,
        execute: async (args) => {
            logger.log({
                level: Level.RUNNING,
                message: trans.__('Pushing…')
            });
            try {
                const details = await showGitOperationDialog(gitModel, args.force ? Operation.ForcePush : Operation.Push, trans);
                logger.log({
                    message: trans.__('Successfully pushed'),
                    level: Level.SUCCESS,
                    details
                });
            }
            catch (error) {
                console.error(trans.__('Encountered an error when pushing changes. Error: '), error);
                logger.log({
                    message: trans.__('Failed to push'),
                    level: Level.ERROR,
                    error: error
                });
            }
        }
    });
    /** Add git pull command */
    commands.addCommand(CommandIDs.gitPull, {
        label: args => args.force
            ? trans.__('Pull from Remote (Force)')
            : trans.__('Pull from Remote'),
        caption: args => args.force
            ? trans.__('Discard all current changes and pull from remote repository')
            : trans.__('Pull latest code from remote repository'),
        isEnabled: () => gitModel.pathRepository !== null,
        execute: async (args) => {
            try {
                if (args.force) {
                    await discardAllChanges(gitModel, trans, args.fallback);
                }
                logger.log({
                    level: Level.RUNNING,
                    message: trans.__('Pulling…')
                });
                const details = await showGitOperationDialog(gitModel, Operation.Pull, trans);
                logger.log({
                    message: trans.__('Successfully pulled'),
                    level: Level.SUCCESS,
                    details
                });
            }
            catch (error) {
                console.error('Encountered an error when pulling changes. Error: ', error);
                const errorMsg = typeof error === 'string' ? error : error.message;
                // Discard changes then retry pull
                if (errorMsg
                    .toLowerCase()
                    .includes('your local changes to the following files would be overwritten by merge')) {
                    await commands.execute(CommandIDs.gitPull, {
                        force: true,
                        fallback: true
                    });
                }
                else {
                    if (error.cancelled) {
                        // Empty message to hide alert
                        logger.log({
                            message: '',
                            level: Level.INFO
                        });
                    }
                    else {
                        logger.log({
                            message: trans.__('Failed to pull'),
                            level: Level.ERROR,
                            error
                        });
                    }
                }
            }
        }
    });
    /**
     * Git display diff command - internal command
     *
     * @params model {Git.Diff.IModel: The diff model to display
     * @params isText {boolean}: Optional, whether the content is a plain text
     * @params isMerge {boolean}: Optional, whether the diff is a merge conflict
     * @returns the main area widget or null
     */
    commands.addCommand(CommandIDs.gitShowDiff, {
        label: trans.__('Show Diff'),
        caption: trans.__('Display a file diff.'),
        execute: async (args) => {
            var _a, _b;
            const { model, isText } = args;
            const fullPath = PathExt.join((_a = model.repositoryPath) !== null && _a !== void 0 ? _a : '/', model.filename);
            const buildDiffWidget = (_b = getDiffProvider(fullPath)) !== null && _b !== void 0 ? _b : (isText && createPlainTextDiff);
            if (buildDiffWidget) {
                const id = `diff-${fullPath}-${model.reference.label}-${model.challenger.label}`;
                const mainAreaItems = shell.widgets('main');
                let mainAreaItem = mainAreaItems.next();
                while (mainAreaItem) {
                    if (mainAreaItem.id === id) {
                        shell.activateById(id);
                        break;
                    }
                    mainAreaItem = mainAreaItems.next();
                }
                if (!mainAreaItem) {
                    const content = new Panel();
                    const modelIsLoading = new PromiseDelegate();
                    const diffWidget = (mainAreaItem = new MainAreaWidget({
                        content,
                        reveal: modelIsLoading.promise
                    }));
                    diffWidget.id = id;
                    diffWidget.title.label = PathExt.basename(model.filename);
                    diffWidget.title.caption = fullPath;
                    diffWidget.title.icon = diffIcon;
                    diffWidget.title.closable = true;
                    diffWidget.addClass('jp-git-diff-parent-widget');
                    shell.add(diffWidget, 'main');
                    shell.activateById(diffWidget.id);
                    // Create the diff widget
                    try {
                        const widget = await buildDiffWidget(model, diffWidget.toolbar, translator);
                        diffWidget.toolbar.addItem('spacer', Toolbar.createSpacerItem());
                        // Do not allow the user to refresh during merge conflicts
                        if (model.hasConflict) {
                            const resolveButton = new ToolbarButton({
                                label: trans.__('Mark as resolved'),
                                onClick: async () => {
                                    var _a;
                                    if (!widget.isFileResolved) {
                                        const result = await showDialog({
                                            title: trans.__('Resolve with conflicts'),
                                            body: trans.__('Are you sure you want to mark this file as resolved with merge conflicts?')
                                        });
                                        // Bail early if the user wants to finish resolving conflicts
                                        if (!result.button.accept) {
                                            return;
                                        }
                                    }
                                    try {
                                        await serviceManager.contents.save(fullPath, await widget.getResolvedFile());
                                        await gitModel.add(model.filename);
                                        await gitModel.refresh();
                                    }
                                    catch (reason) {
                                        logger.log({
                                            message: (_a = reason.message) !== null && _a !== void 0 ? _a : reason,
                                            level: Level.ERROR
                                        });
                                    }
                                    finally {
                                        diffWidget.dispose();
                                    }
                                },
                                tooltip: trans.__('Mark file as resolved'),
                                className: 'jp-git-diff-resolve'
                            });
                            diffWidget.toolbar.addItem('resolve', resolveButton);
                        }
                        else {
                            const refreshButton = new ToolbarButton({
                                label: trans.__('Refresh'),
                                onClick: async () => {
                                    await widget.refresh();
                                    refreshButton.hide();
                                },
                                tooltip: trans.__('Refresh diff widget'),
                                className: 'jp-git-diff-refresh'
                            });
                            refreshButton.hide();
                            diffWidget.toolbar.addItem('refresh', refreshButton);
                            const refresh = () => {
                                refreshButton.show();
                            };
                            model.changed.connect(refresh);
                            widget.disposed.connect(() => model.changed.disconnect(refresh));
                        }
                        // Load the diff widget
                        modelIsLoading.resolve();
                        content.addWidget(widget);
                    }
                    catch (reason) {
                        console.error(reason);
                        const msg = `Load Diff Model Error (${reason.message || reason})`;
                        modelIsLoading.reject(msg);
                    }
                }
                return mainAreaItem;
            }
            else {
                await showErrorMessage(trans.__('Diff Not Supported'), trans.__('Diff is not supported for %1 files.', PathExt.extname(model.filename).toLocaleLowerCase()));
                return null;
            }
        },
        icon: diffIcon.bindprops({ stylesheet: 'menuItem' })
    });
    commands.addCommand(CommandIDs.gitMerge, {
        label: trans.__('Merge Branch…'),
        caption: trans.__('Merge selected branch in the current branch'),
        execute: async (args) => {
            let { branch } = args !== null && args !== void 0 ? args : {};
            if (!branch) {
                // Prompts user to pick a branch
                const localBranches = gitModel.branches.filter(branch => !branch.is_current_branch && !branch.is_remote_branch);
                const widgetId = 'git-dialog-MergeBranch';
                let anchor = document.querySelector(`#${widgetId}`);
                if (!anchor) {
                    anchor = document.createElement('div');
                    anchor.id = widgetId;
                    document.body.appendChild(anchor);
                }
                const waitForDialog = new PromiseDelegate();
                const dialog = ReactWidget.create(React.createElement(MergeBranchDialog, { currentBranch: gitModel.currentBranch.name, branches: localBranches, onClose: (branch) => {
                        dialog.dispose();
                        waitForDialog.resolve(branch !== null && branch !== void 0 ? branch : null);
                    }, trans: trans }));
                Widget.attach(dialog, anchor);
                branch = await waitForDialog.promise;
            }
            if (branch) {
                logger.log({
                    level: Level.RUNNING,
                    message: trans.__("Merging branch '%1'…", branch)
                });
                try {
                    await gitModel.merge(branch);
                }
                catch (err) {
                    logger.log({
                        level: Level.ERROR,
                        message: trans.__("Failed to merge branch '%1' into '%2'.", branch, gitModel.currentBranch.name),
                        error: err
                    });
                    return;
                }
                logger.log({
                    level: Level.SUCCESS,
                    message: trans.__("Branch '%1' merged into '%2'.", branch, gitModel.currentBranch.name)
                });
            }
        },
        isEnabled: () => gitModel.branches.some(branch => !branch.is_current_branch && !branch.is_remote_branch)
    });
    /* Context menu commands */
    commands.addCommand(ContextCommandIDs.gitFileOpen, {
        label: trans.__('Open'),
        caption: pluralizedContextLabel(trans.__('Open selected file'), trans.__('Open selected files')),
        execute: async (args) => {
            const { files } = args;
            for (const file of files) {
                const { x, y, to } = file;
                if (x === 'D' || y === 'D') {
                    await showErrorMessage(trans.__('Open File Failed'), trans.__('This file has been deleted!'));
                    return;
                }
                try {
                    if (to[to.length - 1] !== '/') {
                        commands.execute('docmanager:open', {
                            path: gitModel.getRelativeFilePath(to)
                        });
                    }
                    else {
                        console.log('Cannot open a folder here');
                    }
                }
                catch (err) {
                    console.error(`Fail to open ${to}.`);
                }
            }
        },
        icon: openIcon.bindprops({ stylesheet: 'menuItem' })
    });
    commands.addCommand(ContextCommandIDs.gitFileDiff, {
        label: trans.__('Diff'),
        caption: pluralizedContextLabel(trans.__('Diff selected file'), trans.__('Diff selected files')),
        execute: async (args) => {
            const { files } = args;
            for (const file of files) {
                const { context, filePath, previousFilePath, isText, status } = file;
                // nothing to compare to for untracked files
                if (status === 'untracked') {
                    continue;
                }
                const repositoryPath = gitModel.pathRepository;
                const filename = filePath;
                const fullPath = PathExt.join(repositoryPath, filename);
                const specialRef = status === 'staged'
                    ? Git.Diff.SpecialRef.INDEX
                    : Git.Diff.SpecialRef.WORKING;
                const diffContext = status === 'unmerged'
                    ? {
                        currentRef: 'MERGE_HEAD',
                        previousRef: 'HEAD',
                        baseRef: Git.Diff.SpecialRef.BASE
                    }
                    : context !== null && context !== void 0 ? context : {
                        currentRef: specialRef,
                        previousRef: 'HEAD'
                    };
                const challengerRef = Git.Diff.SpecialRef[diffContext.currentRef]
                    ? { special: Git.Diff.SpecialRef[diffContext.currentRef] }
                    : { git: diffContext.currentRef };
                // Base props used for Diff Model
                const props = {
                    challenger: {
                        content: async () => {
                            return requestAPI(URLExt.join(repositoryPath, 'content'), 'POST', {
                                filename,
                                reference: challengerRef
                            }).then(data => data.content);
                        },
                        label: Git.Diff.SpecialRef[diffContext.currentRef] ||
                            diffContext.currentRef,
                        source: diffContext.currentRef,
                        updateAt: Date.now()
                    },
                    filename,
                    reference: {
                        content: async () => {
                            return requestAPI(URLExt.join(repositoryPath, 'content'), 'POST', {
                                filename: previousFilePath !== null && previousFilePath !== void 0 ? previousFilePath : filename,
                                reference: { git: diffContext.previousRef }
                            }).then(data => data.content);
                        },
                        label: Git.Diff.SpecialRef[diffContext.previousRef] ||
                            diffContext.previousRef,
                        source: diffContext.previousRef,
                        updateAt: Date.now()
                    },
                    repositoryPath
                };
                // Case when file is relocated
                if (previousFilePath) {
                    props.reference.label = `${previousFilePath} (${props.reference.label.slice(0, 7)})`;
                    props.challenger.label = `${filePath} (${props.challenger.label.slice(0, 7)})`;
                }
                if (diffContext.baseRef) {
                    props.reference.label = trans.__('Current');
                    props.challenger.label = trans.__('Incoming');
                    // Only add base when diff-ing merge conflicts
                    props.base = {
                        content: async () => {
                            return requestAPI(URLExt.join(repositoryPath, 'content'), 'POST', {
                                filename,
                                reference: {
                                    special: Git.Diff.SpecialRef[diffContext.baseRef]
                                }
                            }).then(data => data.content);
                        },
                        label: trans.__('Result'),
                        source: diffContext.baseRef,
                        updateAt: Date.now()
                    };
                }
                // Create the diff widget
                const model = new DiffModel(props);
                const widget = await commands.execute(CommandIDs.gitShowDiff, {
                    model,
                    isText
                });
                if (widget) {
                    // Trigger diff model update
                    if (diffContext.previousRef === 'HEAD') {
                        const updateHead = () => {
                            model.reference = Object.assign(Object.assign({}, model.reference), { updateAt: Date.now() });
                        };
                        gitModel.headChanged.connect(updateHead);
                        widget.disposed.connect(() => {
                            gitModel.headChanged.disconnect(updateHead);
                        });
                    }
                    // If the diff is on the current file and it is updated => diff model changed
                    if (diffContext.currentRef === Git.Diff.SpecialRef.WORKING) {
                        const updateCurrent = (m, change) => {
                            const updateAt = new Date(change.newValue.last_modified).valueOf();
                            if (change.newValue.path === fullPath &&
                                model.challenger.updateAt !== updateAt) {
                                model.challenger = Object.assign(Object.assign({}, model.challenger), { updateAt });
                            }
                        };
                        // More robust than fileBrowser.model.fileChanged
                        app.serviceManager.contents.fileChanged.connect(updateCurrent);
                        widget.disposed.connect(() => {
                            app.serviceManager.contents.fileChanged.disconnect(updateCurrent);
                        });
                    }
                }
            }
        },
        icon: diffIcon.bindprops({ stylesheet: 'menuItem' })
    });
    commands.addCommand(ContextCommandIDs.gitFileAdd, {
        label: trans.__('Add'),
        caption: pluralizedContextLabel(trans.__('Stage or track the changes to selected file'), trans.__('Stage or track the changes of selected files')),
        execute: async (args) => {
            const { files } = args;
            for (const file of files) {
                await gitModel.add(file.to);
            }
        },
        icon: addIcon.bindprops({ stylesheet: 'menuItem' })
    });
    commands.addCommand(ContextCommandIDs.gitFileStage, {
        label: trans.__('Stage'),
        caption: pluralizedContextLabel(trans.__('Stage the changes of selected file'), trans.__('Stage the changes of selected files')),
        execute: async (args) => {
            const { files } = args;
            for (const file of files) {
                await gitModel.add(file.to);
            }
        },
        icon: addIcon.bindprops({ stylesheet: 'menuItem' })
    });
    commands.addCommand(ContextCommandIDs.gitFileTrack, {
        label: trans.__('Track'),
        caption: pluralizedContextLabel(trans.__('Start tracking selected file'), trans.__('Start tracking selected files')),
        execute: async (args) => {
            const { files } = args;
            for (const file of files) {
                await gitModel.add(file.to);
            }
        },
        icon: addIcon.bindprops({ stylesheet: 'menuItem' })
    });
    commands.addCommand(ContextCommandIDs.gitFileUnstage, {
        label: trans.__('Unstage'),
        caption: pluralizedContextLabel(trans.__('Unstage the changes of selected file'), trans.__('Unstage the changes of selected files')),
        execute: async (args) => {
            const { files } = args;
            for (const file of files) {
                if (file.x !== 'D') {
                    await gitModel.reset(file.to);
                }
            }
        },
        icon: removeIcon.bindprops({ stylesheet: 'menuItem' })
    });
    function representFiles(files) {
        const elements = files.map(file => (React.createElement("li", { key: file.to },
            React.createElement("b", null, file.to))));
        return React.createElement("ul", null, elements);
    }
    commands.addCommand(ContextCommandIDs.gitFileDelete, {
        label: trans.__('Delete'),
        caption: pluralizedContextLabel(trans.__('Delete this file'), trans.__('Delete these files')),
        execute: async (args) => {
            const { files } = args;
            const fileList = representFiles(files);
            const result = await showDialog({
                title: trans.__('Delete Files'),
                body: (React.createElement("span", null,
                    trans.__('Are you sure you want to permanently delete the following files? \
              This action cannot be undone.'),
                    fileList)),
                buttons: [
                    Dialog.cancelButton({ label: trans.__('Cancel') }),
                    Dialog.warnButton({ label: trans.__('Delete') })
                ]
            });
            if (result.button.accept) {
                for (const file of files) {
                    try {
                        await app.commands.execute('docmanager:delete-file', {
                            path: gitModel.getRelativeFilePath(file.to)
                        });
                    }
                    catch (reason) {
                        showErrorMessage(trans.__('Deleting %1 failed.', file.to), reason, [
                            Dialog.warnButton({ label: trans.__('Dismiss') })
                        ]);
                    }
                }
            }
        },
        icon: closeIcon.bindprops({ stylesheet: 'menuItem' })
    });
    commands.addCommand(ContextCommandIDs.gitFileDiscard, {
        label: trans.__('Discard'),
        caption: pluralizedContextLabel(trans.__('Discard recent changes of selected file'), trans.__('Discard recent changes of selected files')),
        execute: async (args) => {
            const { files } = args;
            const fileList = representFiles(files);
            const result = await showDialog({
                title: trans.__('Discard changes'),
                body: (React.createElement("span", null,
                    trans.__('Are you sure you want to permanently discard changes to the following files? \
              This action cannot be undone.'),
                    fileList)),
                buttons: [
                    Dialog.cancelButton({ label: trans.__('Cancel') }),
                    Dialog.warnButton({ label: trans.__('Discard') })
                ]
            });
            if (result.button.accept) {
                for (const file of files) {
                    try {
                        if (file.status === 'staged' ||
                            file.status === 'partially-staged') {
                            await gitModel.reset(file.to);
                        }
                        if (file.status === 'unstaged' ||
                            (file.status === 'partially-staged' && file.x !== 'A')) {
                            // resetting an added file moves it to untracked category => checkout will fail
                            await gitModel.checkout({ filename: file.to });
                        }
                    }
                    catch (reason) {
                        showErrorMessage(trans.__('Discard changes for %1 failed.', file.to), reason, [Dialog.warnButton({ label: trans.__('Dismiss') })]);
                    }
                }
            }
        },
        icon: discardIcon.bindprops({ stylesheet: 'menuItem' })
    });
    commands.addCommand(ContextCommandIDs.gitIgnore, {
        label: pluralizedContextLabel(trans.__('Ignore this file (add to .gitignore)'), trans.__('Ignore these files (add to .gitignore)')),
        caption: pluralizedContextLabel(trans.__('Ignore this file (add to .gitignore)'), trans.__('Ignore these files (add to .gitignore)')),
        execute: async (args) => {
            const { files } = args;
            for (const file of files) {
                if (file) {
                    await gitModel.ignore(file.to, false);
                }
            }
        }
    });
    commands.addCommand(ContextCommandIDs.gitIgnoreExtension, {
        label: args => {
            const { files } = args;
            const extensions = files
                .map(file => PathExt.extname(file.to))
                .filter(extension => extension.length > 0);
            return trans._n('Ignore %2 extension (add to .gitignore)', 'Ignore %2 extensions (add to .gitignore)', extensions.length, extensions.join(', '));
        },
        caption: pluralizedContextLabel(trans.__('Ignore this file extension (add to .gitignore)'), trans.__('Ignore these files extension (add to .gitignore)')),
        execute: async (args) => {
            const { files } = args;
            for (const selectedFile of files) {
                if (selectedFile) {
                    const extension = PathExt.extname(selectedFile.to);
                    if (extension.length > 0) {
                        const result = await showDialog({
                            title: trans.__('Ignore file extension'),
                            body: trans.__('Are you sure you want to ignore all %1 files within this git repository?', extension),
                            buttons: [
                                Dialog.cancelButton(),
                                Dialog.okButton({ label: trans.__('Ignore') })
                            ]
                        });
                        if (result.button.label === trans.__('Ignore')) {
                            await gitModel.ignore(selectedFile.to, true);
                        }
                    }
                }
            }
        },
        isVisible: args => {
            const { files } = args;
            return files.some(selectedFile => {
                const extension = PathExt.extname(selectedFile.to);
                return extension.length > 0;
            });
        }
    });
    commands.addCommand(ContextCommandIDs.gitFileHistory, {
        label: trans.__('History'),
        caption: trans.__('View the history of this file'),
        execute: args => {
            const { files } = args;
            const file = files[0];
            if (!file) {
                return;
            }
            gitModel.selectedHistoryFile = file;
            shell.activateById('jp-git-sessions');
        },
        isEnabled: args => {
            const { files } = args;
            return files.length === 1;
        },
        icon: historyIcon.bindprops({ stylesheet: 'menuItem' })
    });
    commands.addCommand(ContextCommandIDs.gitNoAction, {
        label: trans.__('No actions available'),
        isEnabled: () => false,
        execute: () => void 0
    });
}
/**
 * Adds commands and menu items.
 *
 * @param commands - Jupyter App commands registry
 *  @param trans - language translator
 * @returns menu
 */
export function createGitMenu(commands, trans) {
    const RESOURCES = [
        {
            text: trans.__('Set Up Remotes'),
            url: 'https://www.atlassian.com/git/tutorials/setting-up-a-repository'
        },
        {
            text: trans.__('Git Documentation'),
            url: 'https://git-scm.com/doc'
        }
    ];
    const menu = new Menu({ commands });
    menu.title.label = 'Git';
    [
        CommandIDs.gitInit,
        CommandIDs.gitClone,
        CommandIDs.gitMerge,
        CommandIDs.gitPush,
        CommandIDs.gitPull,
        CommandIDs.gitAddRemote,
        CommandIDs.gitTerminalCommand
    ].forEach(command => {
        menu.addItem({ command });
        if (command === CommandIDs.gitPush) {
            menu.addItem({ command, args: { force: true } });
        }
        if (command === CommandIDs.gitPull) {
            menu.addItem({ command, args: { force: true } });
        }
    });
    menu.addItem({ type: 'separator' });
    menu.addItem({ command: CommandIDs.gitToggleSimpleStaging });
    menu.addItem({ command: CommandIDs.gitToggleDoubleClickDiff });
    menu.addItem({ type: 'separator' });
    menu.addItem({ command: CommandIDs.gitOpenGitignore });
    menu.addItem({ type: 'separator' });
    const tutorial = new Menu({ commands });
    tutorial.title.label = trans.__(' Help ');
    RESOURCES.map(args => {
        tutorial.addItem({
            args,
            command: CommandIDs.gitOpenUrl
        });
    });
    menu.addItem({ type: 'submenu', submenu: tutorial });
    return menu;
}
export function addMenuItems(commands, contextMenu, selectedFiles) {
    commands.forEach(command => {
        if (command === ContextCommandIDs.gitFileDiff) {
            contextMenu.addItem({
                command,
                args: {
                    files: selectedFiles.map(file => {
                        return {
                            filePath: file.to,
                            isText: !file.is_binary,
                            status: file.status
                        };
                    })
                }
            });
        }
        else {
            contextMenu.addItem({
                command,
                args: {
                    files: selectedFiles
                }
            });
        }
    });
}
/**
 * Populate Git context submenu depending on the selected files.
 */
export function addFileBrowserContextMenu(model, filebrowser, contextMenu) {
    let gitMenu;
    let _commands;
    let _paths;
    function updateItems(menu) {
        const wasShown = menu.isVisible;
        const parent = menu.parentMenu;
        const items = toArray(filebrowser.selectedItems());
        const statuses = new Set(items
            .map(item => {
            var _a;
            return model.pathRepository === null
                ? undefined
                : (_a = model.getFile(item.path)) === null || _a === void 0 ? void 0 : _a.status;
        })
            .filter(status => typeof status !== 'undefined'));
        // get commands and de-duplicate them
        const allCommands = new Set(
        // flatten the list of lists of commands
        []
            .concat(...[...statuses].map(status => CONTEXT_COMMANDS[status]))
            // filter out the Open and Delete commands as
            // those are not needed in file browser
            .filter(command => command !== ContextCommandIDs.gitFileOpen &&
            command !== ContextCommandIDs.gitFileDelete &&
            typeof command !== 'undefined')
            // replace stage and track with a single "add" operation
            .map(command => command === ContextCommandIDs.gitFileStage ||
            command === ContextCommandIDs.gitFileTrack
            ? ContextCommandIDs.gitFileAdd
            : command));
        const commandsChanged = !_commands ||
            _commands.length !== allCommands.size ||
            !_commands.every(command => allCommands.has(command));
        const paths = items.map(item => item.path);
        const filesChanged = !_paths || !ArrayExt.shallowEqual(_paths, paths);
        if (commandsChanged || filesChanged) {
            const commandsList = [...allCommands];
            menu.clearItems();
            addMenuItems(commandsList, menu, paths
                .map(path => model.getFile(path))
                // if file cannot be resolved (has no action available),
                // omit the undefined result
                .filter(file => typeof file !== 'undefined'));
            if (wasShown) {
                // show the menu again after downtime for refresh
                parent.triggerActiveItem();
            }
            _commands = commandsList;
            _paths = paths;
        }
    }
    function updateGitMenu(contextMenu) {
        var _a, _b;
        if (!gitMenu) {
            gitMenu = (_b = (_a = contextMenu.menu.items.find(item => { var _a; return item.type === 'submenu' && ((_a = item.submenu) === null || _a === void 0 ? void 0 : _a.id) === 'jp-contextmenu-git'; })) === null || _a === void 0 ? void 0 : _a.submenu) !== null && _b !== void 0 ? _b : null;
        }
        if (!gitMenu) {
            return; // Bail early if the open with menu is not displayed
        }
        // Render using the most recent model (even if possibly outdated)
        updateItems(gitMenu);
        const renderedStatus = model.status;
        // Trigger refresh before the menu is displayed
        model
            .refreshStatus()
            .then(() => {
            if (model.status !== renderedStatus) {
                // update items if needed
                updateItems(gitMenu);
            }
        })
            .catch(error => {
            console.error('Fail to refresh model when displaying git context menu.', error);
        });
    }
    // as any is to support JLab 3.1 feature
    if (contextMenu.opened) {
        contextMenu.opened.connect(updateGitMenu);
    }
    else {
        // matches only non-directory items
        class GitMenu extends Menu {
            onBeforeAttach(msg) {
                updateGitMenu(contextMenu);
                super.onBeforeAttach(msg);
            }
        }
        const selectorNotDir = '.jp-DirListing-item[data-isdir="false"]';
        gitMenu = new GitMenu({ commands: contextMenu.menu.commands });
        gitMenu.title.label = 'Git';
        gitMenu.title.icon = gitIcon.bindprops({ stylesheet: 'menuItem' });
        contextMenu.addItem({
            type: 'submenu',
            submenu: gitMenu,
            selector: selectorNotDir,
            rank: 5
        });
    }
}
/**
 * Handle Git operation that may require authentication.
 *
 * @private
 * @param model - Git extension model
 * @param operation - Git operation name
 * @param trans - language translator
 * @param args - Git operation arguments
 * @param authentication - Git authentication information
 * @param retry - Is this operation retried?
 * @returns Promise for displaying a dialog
 */
export async function showGitOperationDialog(model, operation, trans, args, authentication, retry = false) {
    try {
        let result;
        // the Git action
        switch (operation) {
            case Operation.Clone:
                // eslint-disable-next-line no-case-declarations
                const { path, url } = args;
                result = await model.clone(path, url, authentication);
                break;
            case Operation.Pull:
                result = await model.pull(authentication);
                break;
            case Operation.Push:
                result = await model.push(authentication);
                break;
            case Operation.ForcePush:
                result = await model.push(authentication, true);
                break;
            default:
                result = { code: -1, message: 'Unknown git command' };
                break;
        }
        return result.message;
    }
    catch (error) {
        if (AUTH_ERROR_MESSAGES.some(errorMessage => error.message.indexOf(errorMessage) > -1)) {
            // If the error is an authentication error, ask the user credentials
            const credentials = await showDialog({
                title: trans.__('Git credentials required'),
                body: new GitCredentialsForm(trans, trans.__('Enter credentials for remote repository'), retry ? trans.__('Incorrect username or password.') : '')
            });
            if (credentials.button.accept) {
                // Retry the operation if the user provides its credentials
                return await showGitOperationDialog(model, operation, trans, args, credentials.value, true);
            }
        }
        // Throw the error if it cannot be handled or
        // if the user did not accept to provide its credentials
        throw error;
    }
}
//# sourceMappingURL=commandsAndMenu.js.map