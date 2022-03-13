import { Cell } from '@jupyterlab/cells';
import { Token } from '@lumino/coreutils';
import { ISignal } from '@lumino/signaling';
import { Notebook, INotebookTracker, INotebookModel } from '@jupyterlab/notebook';
/** DI token for the CellTracker class. */
export declare const CellTrackerToken: Token<CellTracker>;
/** Contains all information about a Cell including its Notebook context. */
export interface RenderedCell {
    notebook: Notebook;
    notebookModel: INotebookModel;
    cell: Cell;
    cellIndex: () => number;
}
export declare class CellTracker {
    private readonly renderedSignal;
    constructor(notebookTracker: INotebookTracker);
    /** Signal fired when a Cell is rendered in a panel for the first time. */
    get rendered(): ISignal<this, RenderedCell>;
    private trackCells;
}
