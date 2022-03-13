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
exports.Header = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const localStyles = typestyle_1.stylesheet({
    header: {
        borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)',
        fontSize: '18px',
        margin: 0,
        padding: '8px 36px 8px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
const Header = props => {
    return React.createElement("header", { className: localStyles.header }, props.children);
};
exports.Header = Header;
