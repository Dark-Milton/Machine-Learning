import { JupyterFrontEnd } from '@jupyterlab/application';
import { ReactWidget } from '@jupyterlab/apputils';
import { INotebookTracker } from '@jupyterlab/notebook';
import { Widget } from '@lumino/widgets';
import { ReduxReactWidget } from './redux_react_widget';
import { EnhancedStore } from '@reduxjs/toolkit';
import { DocumentRegistry } from '@jupyterlab/docregistry';
export interface LaunchWidgetOptions {
    widgetType: new (...args: any[]) => ReduxReactWidget;
    windowType: string;
    id?: string;
    postProcess?: (widget: ReduxReactWidget) => void;
    widgetArgs: unknown[];
    windowArgs?: DocumentRegistry.IOpenOptions;
}
/**
 * A class that manages dataset widget instances in the Main area
 */
export declare class WidgetManager {
    private app;
    private incellEnabled;
    private notebookTrack;
    private static instance;
    private widgets;
    private reduxWidgets;
    private store;
    private editorNumber;
    private constructor();
    static initInstance(app: JupyterFrontEnd, incellEnabled: boolean, notebookTrack: INotebookTracker): void;
    static getInstance(): WidgetManager;
    getIncellEnabled(): boolean;
    getStore(): EnhancedStore;
    getNotebookTracker(): INotebookTracker;
    launchWidget(options: LaunchWidgetOptions): Widget;
    /**
     * Launch a widget on main window
     *
     * @deprecated Use launchWidget
     *
     * @param id unique identifier for the widget.
     * @param widgetType widget types
     * @param args Props for the widget
     */
    launchWidgetForId(id: string, widgetType: new (...args: any[]) => ReactWidget, ...args: any[]): void;
}
