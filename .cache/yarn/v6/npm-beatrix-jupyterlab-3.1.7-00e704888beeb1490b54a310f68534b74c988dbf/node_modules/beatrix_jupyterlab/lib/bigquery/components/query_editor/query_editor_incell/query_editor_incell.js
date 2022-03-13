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
exports.QueryEditorInCell = void 0;
const react_1 = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const styles_1 = require("../../../../styles");
const query_text_editor_1 = require("../query_text_editor/query_text_editor");
const localStyles = typestyle_1.stylesheet({
    inCellEditorRoot: Object.assign({}, styles_1.BASE_FONT),
});
class QueryEditorInCell extends react_1.Component {
    constructor(props) {
        super(props);
        this.queryFlags = JSON.parse(this.props.queryFlags || '{}');
    }
    render() {
        return (react_1.default.createElement("div", { className: localStyles.inCellEditorRoot },
            react_1.default.createElement(query_text_editor_1.QueryTextEditor, { iniQuery: this.props.query, editorType: "IN_CELL", queryFlags: this.queryFlags })));
    }
}
exports.QueryEditorInCell = QueryEditorInCell;
