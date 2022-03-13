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
exports.Message = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const core_1 = require("@material-ui/core");
const styles_1 = require("../../styles");
const progress_1 = require("./progress");
const icons_1 = require("./icons");
const localStyles = typestyle_1.stylesheet({
    error: {
        backgroundColor: styles_1.COLORS.error,
        color: styles_1.COLORS.base,
    },
    info: {
        backgroundColor: styles_1.COLORS.secondary,
        color: styles_1.COLORS.base,
    },
    message: {
        borderRadius: '3px',
        padding: '7px',
    },
});
/** Shared message component. */
function Message(props) {
    return (React.createElement(core_1.Grid, { container: true, spacing: 2, className: typestyle_1.classes(localStyles.message, props.asError ? localStyles.error : localStyles.info) },
        React.createElement(core_1.Grid, { item: true, sm: 1, style: { display: 'flex', alignItems: 'center' } }, props.asActivity ? (React.createElement(progress_1.Progress, null)) : props.asError ? (React.createElement(icons_1.RedError, null)) : (React.createElement(icons_1.BlueInfo, null))),
        React.createElement(core_1.Grid, { item: true, sm: 10, style: { display: 'flex', alignItems: 'center' } }, props.children ? props.children : props.text)));
}
exports.Message = Message;
