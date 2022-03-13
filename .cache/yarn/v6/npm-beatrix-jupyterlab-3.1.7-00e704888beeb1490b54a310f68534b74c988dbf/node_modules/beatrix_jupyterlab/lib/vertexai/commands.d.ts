import { JupyterFrontEnd } from '@jupyterlab/application';
import { IFileBrowserFactory } from '@jupyterlab/filebrowser';
import { UploadCustomModelsWidget } from './components/upload_custom_widget';
/**
 * Registers new commands to Jupyterlab and adds them to the
 * context menu.
 */
export declare function addCommands(app: JupyterFrontEnd, factory: IFileBrowserFactory, uploadCustomModelsWidget: UploadCustomModelsWidget): void;
