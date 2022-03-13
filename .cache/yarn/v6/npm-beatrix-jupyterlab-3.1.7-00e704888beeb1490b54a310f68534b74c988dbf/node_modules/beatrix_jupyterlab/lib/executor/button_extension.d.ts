import { DocumentRegistry } from '@jupyterlab/docregistry';
import { INotebookModel, NotebookPanel } from '@jupyterlab/notebook';
import { IDisposable } from '@lumino/disposable';
import { ExecutorWidget } from './components/executor_widget';
/** Adds an Executor button to the Notebook toolbar. */
export declare class ExecutorButtonExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
    private readonly executorWidget;
    constructor(executorWidget: ExecutorWidget);
    createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable;
}
