import { ReactWidget } from '@jupyterlab/apputils';
import React from 'react';
import { RenderedCell } from '../cell_tracker';
import { BeatrixCellManager } from '../manager';
interface Props {
    renderedCellInfo: RenderedCell;
    manager: BeatrixCellManager;
}
/** Component class encapsulating new Cell buttons. */
export declare class NewCellActions extends React.Component<Props, unknown> {
    render(): JSX.Element;
    private addNewCell;
}
/** Builds a Widget from the NewCellActions component. */
export declare function newCellActionsWidget(renderedCellInfo: RenderedCell, manager: BeatrixCellManager): ReactWidget;
export {};
