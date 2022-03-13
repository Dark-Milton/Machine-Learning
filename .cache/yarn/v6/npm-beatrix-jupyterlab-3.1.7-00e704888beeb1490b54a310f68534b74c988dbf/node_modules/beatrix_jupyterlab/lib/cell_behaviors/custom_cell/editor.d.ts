import { CodeEditor } from '@jupyterlab/codeeditor';
import { Widget } from '@lumino/widgets';
import { CodeMirrorEditor } from '@jupyterlab/codemirror';
export declare class CustomEditor extends CodeMirrorEditor {
    private cellEditorWrapper;
    private editorHost;
    private headerWidgetContainer;
    private headerWidget;
    private footerWidgetContainer;
    private footerWidget;
    constructor(options: CodeEditor.IOptions);
    hideHeaderWidget(): void;
    hideFooterWidget(): void;
    hideIntegrationWidgets(): void;
    renderHeaderWidget(headerWidget: Widget): void;
    renderFooterWidget(footerWidget: Widget): void;
    renderIntegrationWidgets(headerWidget: Widget, footerWidget: Widget): void;
}
/** Factory function to wrap the custom editor. */
export declare function CustomEditorFactory(options: CodeEditor.IOptions): CustomEditor;
