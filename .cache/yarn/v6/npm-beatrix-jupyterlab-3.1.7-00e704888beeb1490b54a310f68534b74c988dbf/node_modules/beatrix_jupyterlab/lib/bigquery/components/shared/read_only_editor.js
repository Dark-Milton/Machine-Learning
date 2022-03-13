"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadOnlyEditor = void 0;
const React = __importStar(require("react"));
const core_1 = require("@material-ui/core");
const codeeditor_1 = require("@jupyterlab/codeeditor");
const codemirror_1 = require("@jupyterlab/codemirror");
const widgets_1 = require("@lumino/widgets");
const react_1 = require("react");
/** Read-only SQL editor */
function ReadOnlyEditor(props) {
    const editorRef = React.createRef();
    const wrapper = react_1.useMemo(() => {
        const { query } = props;
        // Editor
        const editorServices = new codemirror_1.CodeMirrorEditorFactory();
        const model = new codeeditor_1.CodeEditor.Model();
        model.mimeType = 'text/x-sql';
        model.value.text = query;
        const editorOptions = {
            model: model,
            factory: editorServices.newInlineEditor,
            config: {
                lineNumbers: true,
            },
        };
        return new codeeditor_1.CodeEditorWrapper(editorOptions);
    }, []);
    react_1.useEffect(() => {
        if (editorRef.current)
            widgets_1.Widget.attach(wrapper, editorRef.current);
    }, []);
    return (React.createElement(core_1.Paper, { variant: "outlined", style: { border: '1px solid var(--jp-border-color2)' }, ref: editorRef }));
}
exports.ReadOnlyEditor = ReadOnlyEditor;
