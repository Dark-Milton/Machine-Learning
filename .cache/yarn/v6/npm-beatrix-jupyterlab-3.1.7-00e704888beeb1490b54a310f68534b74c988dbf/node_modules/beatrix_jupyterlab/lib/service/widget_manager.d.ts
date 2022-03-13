import { ReactWidget } from '@jupyterlab/apputils';
import { JupyterFrontEnd } from '@jupyterlab/application';
/**
 * A class that manages dataset widget instances in the Main area
 */
export declare class WidgetManager {
    private app;
    private widgets;
    constructor(app: JupyterFrontEnd);
    launchWidgetForId(widgetType: new (...args: unknown[]) => ReactWidget, id: string, ...args: unknown[]): void;
}
