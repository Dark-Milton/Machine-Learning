import { Token } from '@lumino/coreutils';
import { CellTracker } from './cell_tracker';
import { INotebookTracker, Notebook, NotebookPanel } from '@jupyterlab/notebook';
import { ISignal } from '@lumino/signaling';
export declare const BeatrixCellManagerToken: Token<BeatrixCellManager>;
export declare const STYLES: {
    beatrixCell: string;
};
export declare enum CellType {
    CODE = 0,
    MARKDOWN = 1,
    RAW = 2,
    ALL = 3
}
export interface IAction<F = () => void> {
    execute: F;
    iconClass: string;
    order: number;
    title: string;
    custom?: boolean;
}
export declare type INotebookAction = IAction<(notebook: Notebook) => void>;
export declare type ActionSet = Record<string, IAction>;
export declare class BeatrixCellManager {
    private readonly notebookTracker;
    private readonly cellTracker;
    private actionSignals;
    private actionsByType;
    constructor(notebookTracker: INotebookTracker, cellTracker: CellTracker);
    private setupActiveCellTracking;
    /**
     * Adds a customizations to a Cell including: cell menu, new cell buttons
     * @param renderedCellInfo the cell which to customize
     */
    private addCustomWidgets;
    private setupCellCreationSignal;
    actionSignalFor(cellType: Exclude<CellType, CellType.ALL>): ISignal<this, ActionSet>;
    actions(cellType: CellType): ActionSet;
    addAction(cellType: CellType, actionID: string, notebookAction: INotebookAction): void;
    getCurrentNotebookPanel(): NotebookPanel | null;
    moveCellUp(): void;
    moveCellDown(): void;
    deleteCell(): void;
    runCell(): void;
    createCell(index: number, cellType: CellType): void;
}
