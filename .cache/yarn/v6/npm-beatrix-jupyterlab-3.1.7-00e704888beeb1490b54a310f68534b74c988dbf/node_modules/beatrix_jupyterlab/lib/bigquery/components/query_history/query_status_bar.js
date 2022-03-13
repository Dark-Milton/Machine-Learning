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
exports.QueryStatusBar = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const styles_1 = require("../shared/styles");
const localStyles = typestyle_1.stylesheet({
    queryStatusBar: {
        padding: '10px 12px 10px 12px',
        color: 'var(--jp-ui-inverse-font-color1)',
        marginTop: '10px',
        '&:hover': {
            cursor: 'pointer',
        },
    },
});
// Bar displaying status of past query. Meant to be clicked to close opened query details.
const QueryStatusBar = (props) => {
    if (props.failed) {
        return (React.createElement("div", { className: localStyles.queryStatusBar, style: { backgroundColor: styles_1.gColor('RED') } }, "Query failed"));
    }
    else {
        return (React.createElement("div", { className: localStyles.queryStatusBar, style: { backgroundColor: styles_1.gColor('GREEN') } }, "Query succeeded"));
    }
};
exports.QueryStatusBar = QueryStatusBar;
