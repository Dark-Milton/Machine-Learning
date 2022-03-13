"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetManager = void 0;
const apputils_1 = require("@jupyterlab/apputils");
/**
 * A class that manages dataset widget instances in the Main area
 */
class WidgetManager {
    constructor(app) {
        this.app = app;
        this.widgets = {};
    }
    launchWidgetForId(widgetType, id, ...args) {
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
        }
        if (!widget.isAttached) {
            this.app.shell.add(widget, 'main');
        }
        this.app.shell.activateById(widget.id);
    }
}
exports.WidgetManager = WidgetManager;
