/// <reference types="react" />
import { Widget } from '@lumino/widgets';
import { RenderedCell } from '../cell_tracker';
import { ActionSet, BeatrixCellManager } from '../manager';
interface CellMenuProps {
    actions: ActionSet;
}
interface ActionSetViewProps {
    actions: ActionSet;
}
export declare function ActionSetView({ actions }: ActionSetViewProps): JSX.Element;
export declare function CellMenuComponent({ actions }: CellMenuProps): JSX.Element;
export declare function cellMenuWidget(renderedCellInfo: RenderedCell, manager: BeatrixCellManager): Widget;
export {};
