import { showDialog, Dialog } from '@jupyterlab/apputils';
import { PathExt } from '@jupyterlab/coreutils';
import { Signal } from '@lumino/signaling';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import * as React from 'react';
import { panelWrapperClass, repoButtonClass, selectedTabClass, tabClass, tabIndicatorClass, tabsClass, warningTextClass } from '../style/GitPanel';
import { CommandIDs, Git, Level } from '../tokens';
import { GitAuthorForm } from '../widgets/AuthorBox';
import { CommitBox } from './CommitBox';
import { FileList } from './FileList';
import { HistorySideBar } from './HistorySideBar';
import { Toolbar } from './Toolbar';
/**
 * React component for rendering a panel for performing Git operations.
 */
export class GitPanel extends React.Component {
    /**
     * Returns a React component for rendering a panel for performing Git operations.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        this.refreshBranch = async () => {
            const { currentBranch } = this.props.model;
            this.setState({
                branches: this.props.model.branches,
                currentBranch: currentBranch ? currentBranch.name : 'master'
            });
        };
        this.refreshHistory = async () => {
            if (this.props.model.pathRepository !== null) {
                // Get git log for current branch
                const logData = await this.props.model.log(this.props.settings.composite['historyCount']);
                let pastCommits = new Array();
                if (logData.code === 0) {
                    pastCommits = logData.commits;
                }
                this.setState({
                    pastCommits: pastCommits
                });
            }
        };
        /**
         * Refresh widget, update all content
         */
        this.refreshView = async () => {
            if (this.props.model.pathRepository !== null) {
                await this.refreshBranch();
                await this.refreshHistory();
            }
        };
        /**
         * Commits files.
         *
         * @returns a promise which commits changes
         */
        this.commitFiles = async () => {
            let msg = this.state.commitSummary;
            // Only include description if not empty
            if (this.state.commitDescription) {
                msg = msg + '\n\n' + this.state.commitDescription + '\n';
            }
            if (!msg && !this.state.commitAmend) {
                return;
            }
            const commit = this.props.settings.composite['simpleStaging']
                ? this._commitMarkedFiles
                : this._commitStagedFiles;
            try {
                if (this.state.commitAmend) {
                    await commit(null);
                }
                else {
                    await commit(msg);
                }
                // Only erase commit message upon success
                this.setState({
                    commitSummary: '',
                    commitDescription: ''
                });
            }
            catch (error) {
                console.error(error);
            }
        };
        /**
         * Callback invoked upon changing the active panel tab.
         *
         * @param event - event object
         * @param tab - tab number
         */
        this._onTabChange = (event, tab) => {
            if (tab === 1) {
                this.refreshHistory();
            }
            this.setState({
                tab: tab
            });
        };
        /**
         * Updates the commit message description.
         *
         * @param description - commit message description
         */
        this._setCommitDescription = (description) => {
            this.setState({
                commitDescription: description
            });
        };
        /**
         * Updates the commit message summary.
         *
         * @param summary - commit message summary
         */
        this._setCommitSummary = (summary) => {
            this.setState({
                commitSummary: summary
            });
        };
        /**
         * Updates the amend option
         *
         * @param amend - whether the amend is checked
         */
        this._setCommitAmend = (amend) => {
            this.setState({
                commitAmend: amend
            });
        };
        /**
         * Commits all marked files.
         *
         * @param message - commit message
         * @returns a promise which commits the files
         */
        this._commitMarkedFiles = async (message) => {
            this.props.logger.log({
                level: Level.RUNNING,
                message: this.props.trans.__('Staging files...')
            });
            await this.props.model.reset();
            await this.props.model.add(...this._markedFiles.map(file => file.to));
            await this._commitStagedFiles(message);
        };
        /**
         * Commits all staged files.
         *
         * @param message - commit message
         * @returns a promise which commits the files
         */
        this._commitStagedFiles = async (message) => {
            const errorLog = {
                level: Level.ERROR,
                message: this.props.trans.__('Failed to commit changes.')
            };
            try {
                await this._hasIdentity(this.props.model.pathRepository);
                this.props.logger.log({
                    level: Level.RUNNING,
                    message: this.props.trans.__('Committing changes...')
                });
                if (this.state.commitAmend) {
                    await this.props.model.commit(null, true);
                }
                else {
                    await this.props.model.commit(message);
                }
                this.props.logger.log({
                    level: Level.SUCCESS,
                    message: this.props.trans.__('Committed changes.')
                });
                const hasRemote = this.props.model.branches.some(branch => branch.is_remote_branch);
                // If enabled commit and push, push here
                if (this.props.settings.composite['commitAndPush'] && hasRemote) {
                    await this.props.commands.execute(CommandIDs.gitPush);
                }
            }
            catch (error) {
                this.props.logger.log(Object.assign(Object.assign({}, errorLog), { error }));
                throw error;
            }
        };
        this._previousRepoPath = null;
        const { branches, currentBranch, pathRepository } = props.model;
        this.state = {
            branches: branches,
            currentBranch: currentBranch ? currentBranch.name : 'master',
            files: [],
            remoteChangedFiles: [],
            nCommitsAhead: 0,
            nCommitsBehind: 0,
            pastCommits: [],
            repository: pathRepository,
            tab: 0,
            commitSummary: '',
            commitDescription: '',
            commitAmend: false
        };
    }
    /**
     * Callback invoked immediately after mounting a component (i.e., inserting into a tree).
     */
    componentDidMount() {
        const { model, settings } = this.props;
        model.repositoryChanged.connect((_, args) => {
            this.setState({
                repository: args.newValue
            });
            this.refreshView();
        }, this);
        model.statusChanged.connect(async () => {
            const remotechangedFiles = await model.remoteChangedFiles();
            this.setState({
                files: model.status.files,
                remoteChangedFiles: remotechangedFiles,
                nCommitsAhead: model.status.ahead,
                nCommitsBehind: model.status.behind
            });
        }, this);
        model.headChanged.connect(async () => {
            await this.refreshBranch();
            if (this.state.tab === 1) {
                this.refreshHistory();
            }
        }, this);
        model.selectedHistoryFileChanged.connect(() => {
            this.setState({ tab: 1 });
            this.refreshHistory();
        }, this);
        model.markChanged.connect(() => this.forceUpdate(), this);
        model.notifyRemoteChanges.connect((_, args) => {
            this.warningDialog(args);
        }, this);
        settings.changed.connect(this.refreshView, this);
    }
    componentWillUnmount() {
        // Clear all signal connections
        Signal.clearData(this);
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        return (React.createElement("div", { className: panelWrapperClass }, this.state.repository !== null ? (React.createElement(React.Fragment, null,
            this._renderToolbar(),
            this._renderMain())) : (this._renderWarning())));
    }
    /**
     * Renders a toolbar.
     *
     * @returns React element
     */
    _renderToolbar() {
        const disableBranching = Boolean(this.props.settings.composite['disableBranchWithChanges'] &&
            (this._hasUnStagedFile() || this._hasStagedFile()));
        return (React.createElement(Toolbar, { currentBranch: this.state.currentBranch, branches: this.state.branches, branching: !disableBranching, commands: this.props.commands, logger: this.props.logger, model: this.props.model, nCommitsAhead: this.state.nCommitsAhead, nCommitsBehind: this.state.nCommitsBehind, repository: this.state.repository || '', trans: this.props.trans }));
    }
    /**
     * Renders the main panel.
     *
     * @returns React element
     */
    _renderMain() {
        return (React.createElement(React.Fragment, null,
            this._renderTabs(),
            this.state.tab === 1 ? this._renderHistory() : this._renderChanges()));
    }
    /**
     * Renders panel tabs.
     *
     * @returns React element
     */
    _renderTabs() {
        return (React.createElement(Tabs, { classes: {
                root: tabsClass,
                indicator: tabIndicatorClass
            }, value: this.state.tab, onChange: this._onTabChange },
            React.createElement(Tab, { classes: {
                    root: tabClass,
                    selected: selectedTabClass
                }, title: this.props.trans.__('View changed files'), label: this.props.trans.__('Changes'), disableFocusRipple: true, disableRipple: true }),
            React.createElement(Tab, { classes: {
                    root: tabClass,
                    selected: selectedTabClass
                }, title: this.props.trans.__('View commit history'), label: this.props.trans.__('History'), disableFocusRipple: true, disableRipple: true })));
    }
    /**
     * Renders a panel for viewing and committing file changes.
     *
     * @returns React element
     */
    _renderChanges() {
        const hasRemote = this.props.model.branches.some(branch => branch.is_remote_branch);
        const commitAndPush = this.props.settings.composite['commitAndPush'] && hasRemote;
        const buttonLabel = commitAndPush
            ? this.props.trans.__('Commit and Push')
            : this.props.trans.__('Commit');
        return (React.createElement(React.Fragment, null,
            React.createElement(FileList, { files: this._sortedFiles, model: this.props.model, commands: this.props.commands, settings: this.props.settings, trans: this.props.trans }),
            React.createElement(CommitBox, { commands: this.props.commands, hasFiles: this.props.settings.composite['simpleStaging']
                    ? this._markedFiles.length > 0
                    : this._hasStagedFile(), trans: this.props.trans, label: buttonLabel, summary: this.state.commitSummary, description: this.state.commitDescription, amend: this.state.commitAmend, setSummary: this._setCommitSummary, setDescription: this._setCommitDescription, setAmend: this._setCommitAmend, onCommit: this.commitFiles })));
    }
    /**
     * Renders a panel for viewing commit history.
     *
     * @returns React element
     */
    _renderHistory() {
        return (React.createElement(HistorySideBar, { branches: this.state.branches, commits: this.state.pastCommits, model: this.props.model, commands: this.props.commands, trans: this.props.trans }));
    }
    /**
     * Renders a panel for prompting a user to find a Git repository.
     *
     * @returns React element
     */
    _renderWarning() {
        const path = this.props.filebrowser.path;
        const { commands } = this.props;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: warningTextClass },
                path ? (React.createElement(React.Fragment, null,
                    React.createElement("b", { title: path }, PathExt.basename(path)),
                    ' ',
                    this.props.trans.__('is not'))) : (this.props.trans.__('You are not currently in')),
                this.props.trans.__(' a Git repository. To use Git, navigate to a local repository, initialize a repository here, or clone an existing repository.')),
            React.createElement("button", { className: repoButtonClass, onClick: () => commands.execute('filebrowser:toggle-main') }, this.props.trans.__('Open the FileBrowser')),
            React.createElement("button", { className: repoButtonClass, onClick: () => commands.execute(CommandIDs.gitInit) }, this.props.trans.__('Initialize a Repository')),
            commands.hasCommand(CommandIDs.gitClone) && (React.createElement("button", { className: repoButtonClass, onClick: async () => {
                    await commands.execute(CommandIDs.gitClone);
                    await commands.execute('filebrowser:toggle-main');
                } }, this.props.trans.__('Clone a Repository')))));
    }
    /**
     * Determines whether a user has a known Git identity.
     *
     * @param path - repository path
     */
    async _hasIdentity(path) {
        // If the repository path changes, check the user identity
        if (path !== this._previousRepoPath) {
            try {
                const data = (await this.props.model.config());
                const options = data['options'];
                const keys = Object.keys(options);
                // If the user name or e-mail is unknown, ask the user to set it
                if (keys.indexOf('user.name') < 0 || keys.indexOf('user.email') < 0) {
                    const result = await showDialog({
                        title: this.props.trans.__('Who is committing?'),
                        body: new GitAuthorForm()
                    });
                    if (!result.button.accept) {
                        throw new Error(this.props.trans.__('User refused to set identity.'));
                    }
                    const { name, email } = result.value;
                    await this.props.model.config({
                        'user.name': name,
                        'user.email': email
                    });
                }
                this._previousRepoPath = path;
            }
            catch (error) {
                if (error instanceof Git.GitResponseError) {
                    throw error;
                }
                throw new Error(this.props.trans.__('Failed to set your identity. %1', error.message));
            }
        }
    }
    _hasStagedFile() {
        return this.state.files.some(file => file.status === 'staged' || file.status === 'partially-staged');
    }
    _hasUnStagedFile() {
        return this.state.files.some(file => file.status === 'unstaged' || file.status === 'partially-staged');
    }
    /**
     * List of marked files.
     */
    get _markedFiles() {
        return this._sortedFiles.filter(file => this.props.model.getMark(file.to));
    }
    /**
     * List of sorted modified files.
     */
    get _sortedFiles() {
        const { files, remoteChangedFiles } = this.state;
        let sfiles = files;
        if (remoteChangedFiles) {
            sfiles = sfiles.concat(remoteChangedFiles);
        }
        sfiles.sort((a, b) => a.to.localeCompare(b.to));
        return sfiles;
    }
    /**
     * Show a dialog when a notifyRemoteChanges signal is emitted from the model.
     */
    async warningDialog(options) {
        const title = this.props.trans.__('One or more open files are behind %1 head. Do you want to pull the latest remote version?', this.props.model.status.remote);
        const dialog = new Dialog({
            title,
            body: this._renderBody(options.notNotified, options.notified),
            buttons: [
                Dialog.cancelButton({
                    label: this.props.trans.__('Continue Without Pulling')
                }),
                Dialog.warnButton({
                    label: this.props.trans.__('Pull'),
                    caption: this.props.trans.__('Git Pull from Remote Branch')
                })
            ]
        });
        const result = await dialog.launch();
        if (result.button.accept) {
            await this.props.commands.execute(CommandIDs.gitPull, {});
        }
    }
    /**
     * renders the body to be used in the remote changes warning dialog
     */
    _renderBody(notNotifiedList, notifiedList = []) {
        const listedItems = notNotifiedList.map((item) => {
            console.log(item.to);
            const item_val = this.props.trans.__(item.to);
            return React.createElement("li", { key: item_val }, item_val);
        });
        let elem = React.createElement("ul", null, listedItems);
        if (notifiedList.length > 0) {
            const remaining = this.props.trans.__('The following open files remain behind:');
            const alreadyListedItems = notifiedList.map((item) => {
                console.log(item.to);
                const item_val = this.props.trans.__(item.to);
                return React.createElement("li", { key: item_val }, item_val);
            });
            const full = (React.createElement("div", null,
                elem,
                remaining,
                React.createElement("ul", null, alreadyListedItems)));
            elem = full;
        }
        return React.createElement("div", null, elem);
    }
}
//# sourceMappingURL=GitPanel.js.map