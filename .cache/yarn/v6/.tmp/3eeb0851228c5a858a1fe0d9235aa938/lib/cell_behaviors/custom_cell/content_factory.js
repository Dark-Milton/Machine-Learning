"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomContentFactory = void 0;
const notebook_1 = require("@jupyterlab/notebook");
const editor_1 = require("./editor");
const custom_markdown_cell_1 = require("./custom_markdown_cell");
/**
 * A custom implementation of the Content Factory
 * This factory will be used to override the creation of various widgets in the JupyterLab environment.
 */
class CustomContentFactory extends notebook_1.NotebookPanel.ContentFactory {
    constructor(options) {
        options = Object.assign(Object.assign({}, options), { editorFactory: editor_1.CustomEditorFactory });
        super(options);
    }
    createMarkdownCell(options, parent) {
        if (!options.contentFactory) {
            options.contentFactory = this;
        }
        const customOpts = Object.assign({}, options);
        return new custom_markdown_cell_1.CustomMarkdownCell(customOpts).initializeState();
    }
}
exports.CustomContentFactory = CustomContentFactory;
