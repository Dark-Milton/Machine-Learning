import { JupyterFrontEnd } from '@jupyterlab/application';
import { FileBrowser, FileBrowserModel } from '@jupyterlab/filebrowser';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { ITranslator, TranslationBundle } from '@jupyterlab/translation';
import { ContextMenuSvg } from '@jupyterlab/ui-components';
import { CommandRegistry } from '@lumino/commands';
import { Menu } from '@lumino/widgets';
import { GitExtension } from './model';
import { ContextCommandIDs, Git, IGitExtension } from './tokens';
export interface IGitCloneArgs {
    /**
     * Path in which to clone the Git repository
     */
    path: string;
    /**
     * Git repository url
     */
    url: string;
}
/**
 * Git operations requiring authentication
 */
export declare enum Operation {
    Clone = "Clone",
    Pull = "Pull",
    Push = "Push",
    ForcePush = "ForcePush"
}
interface IFileDiffArgument {
    context?: Git.Diff.IContext;
    filePath: string;
    isText: boolean;
    status?: Git.Status;
    previousFilePath?: string;
}
export declare namespace CommandArguments {
    interface IGitFileDiff {
        files: IFileDiffArgument[];
    }
    interface IGitContextAction {
        files: Git.IStatusFile[];
    }
}
/**
 * Add the commands for the git extension.
 */
export declare function addCommands(app: JupyterFrontEnd, gitModel: GitExtension, fileBrowserModel: FileBrowserModel, settings: ISettingRegistry.ISettings, translator: ITranslator): void;
/**
 * Adds commands and menu items.
 *
 * @param commands - Jupyter App commands registry
 *  @param trans - language translator
 * @returns menu
 */
export declare function createGitMenu(commands: CommandRegistry, trans: TranslationBundle): Menu;
export declare function addMenuItems(commands: ContextCommandIDs[], contextMenu: Menu, selectedFiles: Git.IStatusFile[]): void;
/**
 * Populate Git context submenu depending on the selected files.
 */
export declare function addFileBrowserContextMenu(model: IGitExtension, filebrowser: FileBrowser, contextMenu: ContextMenuSvg): void;
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
export declare function showGitOperationDialog<T>(model: GitExtension, operation: Operation, trans: TranslationBundle, args?: T, authentication?: Git.IAuth, retry?: boolean): Promise<string>;
export {};
