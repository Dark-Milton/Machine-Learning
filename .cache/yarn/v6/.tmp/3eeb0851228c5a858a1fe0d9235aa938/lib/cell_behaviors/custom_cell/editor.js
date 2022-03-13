"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomEditorFactory = exports.CustomEditor = void 0;
const widgets_1 = require("@lumino/widgets");
const codemirror_1 = require("@jupyterlab/codemirror");
const MARKDOWN_EDITOR_WRAPPER_CLASS = 'jp-Custom-Markdown-Wrapper';
const MARKDOWN_EDITOR_HEADER_CLASS = 'jp-Custom-Markdown-Header';
const MARKDOWN_EDITOR_FOOTER_CLASS = 'jp-Custom-Markdown-Footer';
// custom annotation based cells
class CustomEditor extends codemirror_1.CodeMirrorEditor {
    constructor(options) {
        const host = options.host;
        const editorHost = new widgets_1.Widget();
        // Override host for CodeMirrorEditor
        options.host = editorHost.node;
        super(options);
        this.editorHost = editorHost;
        this.headerWidgetContainer = new widgets_1.Panel();
        this.headerWidgetContainer.addClass(MARKDOWN_EDITOR_HEADER_CLASS);
        this.headerWidget = undefined;
        this.footerWidgetContainer = new widgets_1.Panel();
        this.footerWidgetContainer.addClass(MARKDOWN_EDITOR_FOOTER_CLASS);
        this.footerWidget = undefined;
        this.cellEditorWrapper = new widgets_1.Panel();
        this.cellEditorWrapper.addClass(MARKDOWN_EDITOR_WRAPPER_CLASS);
        this.cellEditorWrapper.addWidget(this.headerWidgetContainer);
        this.cellEditorWrapper.addWidget(this.editorHost);
        this.cellEditorWrapper.addWidget(this.footerWidgetContainer);
        // Append to passed in host
        this.cellEditorWrapper.processMessage(widgets_1.Widget.Msg.BeforeAttach);
        this.cellEditorWrapper.show();
        host.append(this.cellEditorWrapper.node);
        this.cellEditorWrapper.processMessage(widgets_1.Widget.Msg.AfterAttach);
        this.hideIntegrationWidgets();
    }
    hideHeaderWidget() {
        if (this.headerWidget)
            this.headerWidget.parent = null;
        this.headerWidgetContainer.hide();
        this.headerWidget = undefined;
    }
    hideFooterWidget() {
        if (this.footerWidget)
            this.footerWidget.parent = null;
        this.footerWidgetContainer.hide();
        this.footerWidget = undefined;
    }
    hideIntegrationWidgets() {
        this.hideHeaderWidget();
        this.hideFooterWidget();
    }
    renderHeaderWidget(headerWidget) {
        this.headerWidgetContainer.addWidget(headerWidget);
        this.headerWidgetContainer.show();
        this.headerWidget = headerWidget;
    }
    renderFooterWidget(footerWidget) {
        this.footerWidgetContainer.addWidget(footerWidget);
        this.footerWidgetContainer.show();
        this.footerWidget = footerWidget;
    }
    renderIntegrationWidgets(headerWidget, footerWidget) {
        headerWidget && this.renderHeaderWidget(headerWidget);
        footerWidget && this.renderFooterWidget(footerWidget);
    }
}
exports.CustomEditor = CustomEditor;
/** Factory function to wrap the custom editor. */
function CustomEditorFactory(options) {
    // Default options copied from CodeMirrorEditorFactory
    const config = Object.assign(Object.assign({}, codemirror_1.CodeMirrorEditor.defaultConfig), { extraKeys: {
            'Cmd-Right': 'goLineRight',
            End: 'goLineRight',
            'Cmd-Left': 'goLineLeft',
            Tab: 'indentMoreOrinsertTab',
            'Shift-Tab': 'indentLess',
            'Cmd-/': (cm) => cm.toggleComment({ indent: true }),
            'Ctrl-/': (cm) => cm.toggleComment({ indent: true }),
            'Ctrl-G': 'find',
            'Cmd-G': 'find',
        } });
    return new CustomEditor(Object.assign(Object.assign({}, options), { config: Object.assign(Object.assign({}, config), (options.config || {})) }));
}
exports.CustomEditorFactory = CustomEditorFactory;
