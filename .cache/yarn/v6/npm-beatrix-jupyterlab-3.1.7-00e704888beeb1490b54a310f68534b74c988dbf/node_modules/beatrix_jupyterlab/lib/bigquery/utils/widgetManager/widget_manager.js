"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetManager = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const coreutils_1 = require("@lumino/coreutils");
const query_editor_tab_widget_1 = require("../../components/query_editor/query_editor_tab/query_editor_tab_widget");
const reducers_1 = __importDefault(require("../../reducers"));
const toolkit_1 = require("@reduxjs/toolkit");
/**
 * A class that manages dataset widget instances in the Main area
 */
class WidgetManager {
    constructor(app, incellEnabled, notebookTrack) {
        // customize middle wares
        this.app = app;
        this.incellEnabled = incellEnabled;
        this.notebookTrack = notebookTrack;
        this.widgets = {};
        this.reduxWidgets = {};
        this.editorNumber = 1;
        const middleware = toolkit_1.getDefaultMiddleware({
            thunk: true,
            immutableCheck: false,
            serializableCheck: false,
        });
        this.store = toolkit_1.configureStore({
            reducer: reducers_1.default,
            middleware: middleware,
        });
        return this;
    }
    static initInstance(app, incellEnabled, notebookTrack) {
        if (WidgetManager.instance === undefined) {
            WidgetManager.instance = new WidgetManager(app, incellEnabled, notebookTrack);
        }
    }
    static getInstance() {
        if (!WidgetManager.instance)
            throw new Error('WidgetManager not defined');
        return WidgetManager.instance;
    }
    getIncellEnabled() {
        return this.incellEnabled;
    }
    getStore() {
        return this.store;
    }
    getNotebookTracker() {
        return this.notebookTrack;
    }
    launchWidget(options) {
        const id = options.id !== undefined ? options.id : coreutils_1.UUID.uuid4();
        let widget = this.reduxWidgets[id];
        if (!widget || widget.isDisposed) {
            if (options.widgetType === query_editor_tab_widget_1.QueryEditorTabWidget) {
                widget = new options.widgetType(this.editorNumber, ...options.widgetArgs);
                this.editorNumber += 1;
            }
            else {
                widget = new options.widgetType(...options.widgetArgs);
            }
            widget.id = id;
            widget.setProviderProps({ store: this.store });
            if (options.postProcess !== undefined) {
                options.postProcess(widget);
            }
            widget.disposed.connect(() => {
                if (this.reduxWidgets[id] === widget) {
                    delete this.reduxWidgets[id];
                }
            });
            this.reduxWidgets[id] = widget;
        }
        if (!widget.isAttached) {
            this.app.shell.add(widget, options.windowType, options.windowArgs);
        }
        return widget;
    }
    /**
     * Launch a widget on main window
     *
     * @deprecated Use launchWidget
     *
     * @param id unique identifier for the widget.
     * @param widgetType widget types
     * @param args Props for the widget
     */
    launchWidgetForId(id, widgetType, ...args) {
        // Get the widget associated with a dataset/resource id, or create one
        // if it doesn't exist yet and activate it
        let widget = this.widgets[id];
        if (!widget || widget.isDisposed) {
            const content = new widgetType(...args);
            widget = new apputils_1.MainAreaWidget({ content });
            widget.disposed.connect(() => {
                if (this.widgets[id] === widget) {
                    delete this.widgets[id];
                }
            });
            this.widgets[id] = widget;
            widget.id = id;
        }
        if (!widget.isAttached) {
            this.app.shell.add(widget, 'main');
        }
        this.app.shell.activateById(widget.id);
    }
}
exports.WidgetManager = WidgetManager;
WidgetManager.instance = undefined;
