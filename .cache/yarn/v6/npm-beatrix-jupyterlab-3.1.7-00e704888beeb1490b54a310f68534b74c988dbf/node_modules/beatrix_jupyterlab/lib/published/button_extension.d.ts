import { DocumentRegistry } from '@jupyterlab/docregistry';
import { INotebookModel, NotebookPanel } from '@jupyterlab/notebook';
import { IDisposable } from '@lumino/disposable';
import { PublishDialogWidget } from './components/publish_dialog';
/** Notebook toolbar button extension */
export declare class PublishButtonExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
    private readonly publishDialogWidget;
    constructor(publishDialogWidget: PublishDialogWidget);
    createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable;
}
