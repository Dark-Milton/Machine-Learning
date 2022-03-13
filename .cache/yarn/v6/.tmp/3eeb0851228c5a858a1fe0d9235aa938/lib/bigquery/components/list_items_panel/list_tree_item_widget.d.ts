/// <reference types="react" />
import { ReduxReactWidget } from '../../utils/widgetManager/redux_react_widget';
import { Context } from './list_tree_panel';
/** Widget to be registered in the left-side panel. */
export declare class ListItemsWidget extends ReduxReactWidget {
    private context;
    private visibleSignal;
    constructor(context: Context);
    onAfterHide(): void;
    onAfterShow(): void;
    renderReact(): JSX.Element;
}
