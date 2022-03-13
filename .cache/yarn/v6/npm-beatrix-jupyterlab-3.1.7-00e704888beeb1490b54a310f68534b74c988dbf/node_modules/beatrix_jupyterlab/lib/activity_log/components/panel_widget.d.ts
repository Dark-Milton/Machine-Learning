/// <reference types="react" />
import { ReactWidget } from '@jupyterlab/apputils';
/** Panel component for displaying activites and their status */
export declare function ActivityLogDrawer(): JSX.Element;
/** Widget to be registered in the left-side panel. */
export declare class ActivityLogWidget extends ReactWidget {
    constructor();
    render(): JSX.Element;
}
