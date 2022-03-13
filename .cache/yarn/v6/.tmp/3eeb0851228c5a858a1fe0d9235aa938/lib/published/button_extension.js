"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishButtonExtension = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const disposable_1 = require("@lumino/disposable");
const BUTTON_NAME = 'jp-PublishNotebookButton';
/** Notebook toolbar button extension */
class PublishButtonExtension {
    constructor(publishDialogWidget) {
        this.publishDialogWidget = publishDialogWidget;
    }
    createNew(panel, context) {
        const button = new apputils_1.ToolbarButton({
            className: BUTTON_NAME,
            iconClass: 'jp-Icon jp-Icon-16 jp-ToolbarButtonComponent-icon jp-PublishIcon',
            label: ' Share',
            tooltip: 'Share Notebook to Cloud Storage',
            onClick: () => {
                if (context.contentsModel) {
                    this.publishDialogWidget.open(context.contentsModel);
                }
            },
        });
        panel.toolbar.insertBefore('spacer', BUTTON_NAME, button);
        return new disposable_1.DisposableDelegate(() => button.dispose());
    }
}
exports.PublishButtonExtension = PublishButtonExtension;
