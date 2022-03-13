"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryEditorTab = void 0;
const react_1 = __importDefault(require("react"));
const query_text_editor_1 = require("../query_text_editor/query_text_editor");
const typestyle_1 = require("typestyle");
const styles_1 = require("../../../../styles");
const localStyles = typestyle_1.stylesheet({
    queryTextEditorRoot: Object.assign({ display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%' }, styles_1.BASE_FONT),
});
class QueryEditorTab extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: props.isVisible,
        };
    }
    render() {
        return (react_1.default.createElement("div", { className: localStyles.queryTextEditorRoot },
            react_1.default.createElement(query_text_editor_1.QueryTextEditor, { iniQuery: this.props.iniQuery, queryFlags: { use_legacy_sql: this.props.useLegacySql } })));
    }
}
exports.QueryEditorTab = QueryEditorTab;
