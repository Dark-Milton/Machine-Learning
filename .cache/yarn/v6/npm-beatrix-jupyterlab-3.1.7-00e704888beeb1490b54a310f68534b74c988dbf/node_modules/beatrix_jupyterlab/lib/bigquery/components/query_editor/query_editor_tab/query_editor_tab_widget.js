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
exports.QueryEditorTabWidget = void 0;
const React = __importStar(require("react"));
const constants_1 = require("../../../constants");
const redux_react_widget_1 = require("../../../utils/widgetManager/redux_react_widget");
const query_editor_tab_1 = require("./query_editor_tab");
class QueryEditorTabWidget extends redux_react_widget_1.ReduxReactWidget {
    constructor(editorNumber, iniQuery, useLegacySql) {
        super();
        this.editorNumber = editorNumber;
        this.iniQuery = iniQuery;
        this.useLegacySql = useLegacySql;
        this.title.label = `Query Editor ${this.editorNumber}`;
        this.title.iconClass = `jp-Icon jp-Icon-20 ${constants_1.ICONS.bigQuery}`;
        this.title.closable = true;
    }
    renderReact() {
        var _a;
        return (React.createElement(query_editor_tab_1.QueryEditorTab, { isVisible: this.isVisible, iniQuery: this.iniQuery, useLegacySql: (_a = this.useLegacySql) !== null && _a !== void 0 ? _a : false }));
    }
}
exports.QueryEditorTabWidget = QueryEditorTabWidget;
