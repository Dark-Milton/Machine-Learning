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
exports.StripedRows = exports.getStripedStyle = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const localStyles = typestyle_1.stylesheet({
    row: {
        display: 'flex',
        padding: '6px',
    },
    rowTitle: {
        width: '200px',
    },
    bold: {
        fontWeight: 500,
    },
});
const getStripedStyle = (index) => {
    return {
        background: index % 2
            ? 'var(--jp-layout-color0)'
            : 'var(--jp-rendermime-table-row-background)',
    };
};
exports.getStripedStyle = getStripedStyle;
const StripedRows = (props) => {
    return (React.createElement("div", { style: { width: '100%' } }, props.rows.map((row, index) => (React.createElement("div", { key: index, className: localStyles.row, style: Object.assign({}, exports.getStripedStyle(index)) },
        React.createElement("div", { className: localStyles.rowTitle },
            React.createElement("div", { className: localStyles.bold }, row.name)),
        React.createElement("div", null, row.value))))));
};
exports.StripedRows = StripedRows;
