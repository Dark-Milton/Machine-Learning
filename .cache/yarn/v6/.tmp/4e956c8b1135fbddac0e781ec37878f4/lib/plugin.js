"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandIDs = exports.NBDiffExtension = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const coreutils_1 = require("@jupyterlab/coreutils");
const rendermime_1 = require("@jupyterlab/rendermime");
const notebook_1 = require("@jupyterlab/notebook");
const settingregistry_1 = require("@jupyterlab/settingregistry");
const algorithm_1 = require("@lumino/algorithm");
const disposable_1 = require("@lumino/disposable");
const actions_1 = require("./actions");
const pluginId = 'nbdime-jupyterlab:plugin';
/**
 * Error message if the nbdime API is unavailable.
 */
const serverMissingMsg = 'Unable to query nbdime API. Is the server extension enabled?';
const INITIAL_NETWORK_RETRY = 2; // ms
class NBDiffExtension {
    /**
     *
     */
    constructor(commands) {
        this.commands = commands;
    }
    /**
     * Create a new extension object.
     */
    createNew(nb, context) {
        // Create extension here
        // Add buttons to toolbar
        let buttons = [];
        let insertionPoint = -1;
        algorithm_1.find(nb.toolbar.children(), (tbb, index) => {
            if (tbb.hasClass('jp-Notebook-toolbarCellType')) {
                insertionPoint = index;
                return true;
            }
            return false;
        });
        let i = 1;
        for (let id of [CommandIDs.diffNotebookCheckpoint, CommandIDs.diffNotebookGit]) {
            let button = new apputils_1.CommandToolbarButton({
                commands: this.commands,
                id
            });
            button.addClass('nbdime-toolbarButton');
            if (insertionPoint >= 0) {
                nb.toolbar.insertItem(insertionPoint + i++, this.commands.label(id), button);
            }
            else {
                nb.toolbar.addItem(this.commands.label(id), button);
            }
            buttons.push(button);
        }
        return new disposable_1.DisposableDelegate(() => {
            // Cleanup extension here
            for (let btn of buttons) {
                btn.dispose();
            }
        });
    }
}
exports.NBDiffExtension = NBDiffExtension;
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.diffNotebook = 'nbdime:diff';
    CommandIDs.diffNotebookGit = 'nbdime:diff-git';
    CommandIDs.diffNotebookCheckpoint = 'nbdime:diff-checkpoint';
})(CommandIDs = exports.CommandIDs || (exports.CommandIDs = {}));
function addCommands(app, tracker, rendermime, settings) {
    const { commands, shell } = app;
    // Whether we have our server extension available
    let hasAPI = true;
    /**
     * Whether there is an active notebook.
     */
    function hasWidget() {
        return tracker.currentWidget !== null;
    }
    /**
     * Whether there is an active notebook.
     */
    function baseEnabled() {
        return hasAPI && tracker.currentWidget !== null;
    }
    // This allows quicker checking, but if someone creates/removes
    // a repo during the session, this will become incorrect
    let lut_known_git = {};
    let networkRetry = INITIAL_NETWORK_RETRY;
    /**
     * Whether the notebook is in a git repository.
     */
    function hasGitNotebook() {
        if (!baseEnabled()) {
            return false;
        }
        let path = tracker.currentWidget.context.path;
        let dir = coreutils_1.PathExt.dirname(path);
        let known_git = lut_known_git[dir];
        if (known_git === undefined) {
            const inGitPromise = actions_1.isNbInGit({ path: dir });
            inGitPromise.then(inGit => {
                networkRetry = INITIAL_NETWORK_RETRY;
                lut_known_git[dir] = inGit;
                // Only update if false, since it is left enabled while waiting
                if (!inGit) {
                    commands.notifyCommandChanged(CommandIDs.diffNotebookGit);
                }
            });
            inGitPromise.catch((reason) => {
                hasAPI = reason.status !== undefined && reason.status !== 404;
                setTimeout(() => {
                    networkRetry *= 2;
                    commands.notifyCommandChanged(CommandIDs.diffNotebook);
                    commands.notifyCommandChanged(CommandIDs.diffNotebookCheckpoint);
                    commands.notifyCommandChanged(CommandIDs.diffNotebookGit);
                }, networkRetry);
            });
            // Leave button enabled while unsure
            return true;
        }
        return known_git;
    }
    function erroredGen(text) {
        return () => {
            if (hasAPI) {
                return text;
            }
            return serverMissingMsg;
        };
    }
    let hideUnchanged = settings.get('hideUnchanged').composite !== false;
    settings.changed.connect(() => {
        hideUnchanged = settings.get('hideUnchanged').composite !== false;
    });
    commands.addCommand(CommandIDs.diffNotebook, {
        execute: args => {
            // TODO: Check args for base/remote
            // if missing, prompt with dialog.
            //let content = current.notebook;
            //diffNotebook({base, remote});
        },
        label: erroredGen('Notebook diff'),
        caption: erroredGen('Display nbdiff between two notebooks'),
        isEnabled: baseEnabled,
        icon: 'jp-Icon jp-Icon-16 action-notebook-diff action-notebook-diff-notebooks',
        iconLabel: 'nbdiff',
    });
    commands.addCommand(CommandIDs.diffNotebookCheckpoint, {
        execute: args => {
            let current = tracker.currentWidget;
            if (!current) {
                return;
            }
            let widget = actions_1.diffNotebookCheckpoint({
                path: current.context.path,
                rendermime,
                hideUnchanged,
            });
            shell.add(widget);
            if (args['activate'] !== false) {
                shell.activateById(widget.id);
            }
        },
        label: erroredGen('Notebook checkpoint diff'),
        caption: erroredGen('Display nbdiff from checkpoint to currently saved version'),
        isEnabled: baseEnabled,
        iconClass: 'jp-Icon jp-Icon-16 fa fa-clock-o action-notebook-diff action-notebook-diff-checkpoint',
    });
    commands.addCommand(CommandIDs.diffNotebookGit, {
        execute: args => {
            let current = tracker.currentWidget;
            if (!current) {
                return;
            }
            let widget = actions_1.diffNotebookGit({
                path: current.context.path,
                rendermime,
                hideUnchanged,
            });
            shell.add(widget);
            if (args['activate'] !== false) {
                shell.activateById(widget.id);
            }
        },
        label: erroredGen('Notebook Git diff'),
        caption: erroredGen('Display nbdiff from git HEAD to currently saved version'),
        isEnabled: hasGitNotebook,
        iconClass: 'jp-Icon jp-Icon-16 fa fa-git action-notebook-diff action-notebook-diff-git',
    });
}
/**
 * The notebook diff provider.
 */
const nbDiffProvider = {
    id: pluginId,
    requires: [notebook_1.INotebookTracker, rendermime_1.IRenderMimeRegistry, settingregistry_1.ISettingRegistry],
    activate: activateWidgetExtension,
    autoStart: true
};
exports.default = nbDiffProvider;
/**
 * Activate the widget extension.
 */
function activateWidgetExtension(app, tracker, rendermime, settingsRegistry) {
    return __awaiter(this, void 0, void 0, function* () {
        let { commands, docRegistry } = app;
        let extension = new NBDiffExtension(commands);
        docRegistry.addWidgetExtension('Notebook', extension);
        const settings = yield settingsRegistry.load(pluginId);
        addCommands(app, tracker, rendermime, settings);
        // Update the command registry when the notebook state changes.
        tracker.currentChanged.connect(() => {
            commands.notifyCommandChanged(CommandIDs.diffNotebookGit);
            if (tracker.size <= 1) {
                commands.notifyCommandChanged(CommandIDs.diffNotebook);
                commands.notifyCommandChanged(CommandIDs.diffNotebookCheckpoint);
            }
        });
    });
}
//# sourceMappingURL=plugin.js.map