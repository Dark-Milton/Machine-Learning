"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutorButtonExtension = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const disposable_1 = require("@lumino/disposable");
const BUTTON_NAME = 'jp-ExecuteNotebookButton';
/** Adds an Executor button to the Notebook toolbar. */
class ExecutorButtonExtension {
    constructor(executorWidget) {
        this.executorWidget = executorWidget;
    }
    createNew(panel, context) {
        const button = new apputils_1.ToolbarButton({
            className: BUTTON_NAME,
            iconClass: 'jp-Icon jp-Icon-16 jp-ToolbarButtonComponent-icon jp-ExecutorIcon',
            label: ' Execute',
            tooltip: 'Execute on Vertex AI',
            onClick: () => {
                this.executorWidget.open({
                    notebookName: context.path,
                    notebook: context.model,
                    timestamp: Date.now(),
                });
            },
        });
        panel.toolbar.insertBefore('spacer', BUTTON_NAME, button);
        return new disposable_1.DisposableDelegate(() => button.dispose());
    }
}
exports.ExecutorButtonExtension = ExecutorButtonExtension;
