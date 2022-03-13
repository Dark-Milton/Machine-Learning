/// <reference types="react" />
import { ReactWidget } from '@jupyterlab/apputils';
import { IDocumentManager } from '@jupyterlab/docmanager';
import { Contents } from '@jupyterlab/services/lib/contents';
interface PublishedDialogProps {
    docManager: IDocumentManager;
    onClose: () => void;
    notebookFile: Contents.IModel;
    environmentImage: string;
}
/** Component for a dialog to publish a notebook to GCS */
export declare function PublishedDialogComponent({ docManager, onClose, notebookFile, environmentImage, }: PublishedDialogProps): JSX.Element;
/**
 * Creates the dialog popup component for publishing notebook files(.ipynb).
 */
export declare class PublishDialogWidget extends ReactWidget {
    private readonly _docManager;
    private readonly _isOpenSignal;
    private _notebookFile;
    constructor(_docManager: IDocumentManager);
    /**
     * Opens the sharing dialog. If the default GCS bucket does not exist
     * and cannot be created, an error message is shown.
     */
    open(notebookFile: Contents.IModel): Promise<void>;
    render(): JSX.Element;
}
export {};
