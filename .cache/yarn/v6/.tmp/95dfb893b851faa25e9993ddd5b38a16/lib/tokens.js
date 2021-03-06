import { ServerConnection } from '@jupyterlab/services';
import { Token } from '@lumino/coreutils';
export const EXTENSION_ID = 'jupyter.extensions.git_plugin';
export const IGitExtension = new Token(EXTENSION_ID);
export var Git;
(function (Git) {
    let Diff;
    (function (Diff) {
        let SpecialRef;
        (function (SpecialRef) {
            // Working version
            SpecialRef[SpecialRef["WORKING"] = 0] = "WORKING";
            // Index version
            SpecialRef[SpecialRef["INDEX"] = 1] = "INDEX";
            // Common ancestor version (useful for unmerged files)
            SpecialRef[SpecialRef["BASE"] = 2] = "BASE";
        })(SpecialRef = Diff.SpecialRef || (Diff.SpecialRef = {}));
    })(Diff = Git.Diff || (Git.Diff = {}));
    /**
     * A wrapped error for a fetch response.
     */
    class GitResponseError extends ServerConnection.ResponseError {
        /**
         * Create a new response error.
         */
        constructor(response, message = `Invalid response: ${response.status} ${response.statusText}`, traceback = '', json = {}) {
            super(response, message);
            this.traceback = traceback; // traceback added in mother class in 2.2.x
            this._json = json;
        }
        /**
         * The error response JSON body
         */
        get json() {
            return this._json;
        }
    }
    Git.GitResponseError = GitResponseError;
    class NotInRepository extends Error {
        constructor() {
            super('Not in a Git Repository');
        }
    }
    Git.NotInRepository = NotInRepository;
})(Git || (Git = {}));
/**
 * Log message severity.
 */
export var Level;
(function (Level) {
    Level[Level["SUCCESS"] = 10] = "SUCCESS";
    Level[Level["INFO"] = 20] = "INFO";
    Level[Level["RUNNING"] = 30] = "RUNNING";
    Level[Level["WARNING"] = 40] = "WARNING";
    Level[Level["ERROR"] = 50] = "ERROR";
})(Level || (Level = {}));
/**
 * The command IDs used in the git context menus.
 */
export var ContextCommandIDs;
(function (ContextCommandIDs) {
    ContextCommandIDs["gitCommitAmendStaged"] = "git:context-commitAmendStaged";
    ContextCommandIDs["gitFileAdd"] = "git:context-add";
    ContextCommandIDs["gitFileDiff"] = "git:context-diff";
    ContextCommandIDs["gitFileDiscard"] = "git:context-discard";
    ContextCommandIDs["gitFileDelete"] = "git:context-delete";
    ContextCommandIDs["gitFileOpen"] = "git:context-open";
    ContextCommandIDs["gitFileUnstage"] = "git:context-unstage";
    ContextCommandIDs["gitFileStage"] = "git:context-stage";
    ContextCommandIDs["gitFileTrack"] = "git:context-track";
    ContextCommandIDs["gitFileHistory"] = "git:context-history";
    ContextCommandIDs["gitIgnore"] = "git:context-ignore";
    ContextCommandIDs["gitIgnoreExtension"] = "git:context-ignoreExtension";
    ContextCommandIDs["gitNoAction"] = "git:no-action";
})(ContextCommandIDs || (ContextCommandIDs = {}));
/**
 * The command IDs used by the git plugin.
 */
export var CommandIDs;
(function (CommandIDs) {
    CommandIDs["gitUI"] = "git:ui";
    CommandIDs["gitTerminalCommand"] = "git:terminal-command";
    CommandIDs["gitInit"] = "git:init";
    CommandIDs["gitOpenUrl"] = "git:open-url";
    CommandIDs["gitToggleSimpleStaging"] = "git:toggle-simple-staging";
    CommandIDs["gitToggleDoubleClickDiff"] = "git:toggle-double-click-diff";
    CommandIDs["gitAddRemote"] = "git:add-remote";
    CommandIDs["gitClone"] = "git:clone";
    CommandIDs["gitMerge"] = "git:merge";
    CommandIDs["gitOpenGitignore"] = "git:open-gitignore";
    CommandIDs["gitPush"] = "git:push";
    CommandIDs["gitPull"] = "git:pull";
    CommandIDs["gitSubmitCommand"] = "git:submit-commit";
    CommandIDs["gitShowDiff"] = "git:show-diff";
})(CommandIDs || (CommandIDs = {}));
//# sourceMappingURL=tokens.js.map