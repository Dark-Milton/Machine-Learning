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
exports.PrimaryButton = exports.SubmitButton = void 0;
const core_1 = require("@material-ui/core");
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const styles_1 = require("../../styles");
const progress_1 = require("./progress");
const localStyles = typestyle_1.stylesheet({
    submit: {
        backgroundColor: `${styles_1.COLORS.white} !important`,
        color: `${styles_1.COLORS.focus} !important`,
        border: 'none',
        $nest: {
            '&:disabled': {
                backgroundColor: 'var(--jp-layout-color3)',
            },
            '&:hover': {
                cursor: 'pointer',
            },
            '&:disabled:hover': { cursor: 'default' },
        },
    },
    disabled: {
        backgroundColor: styles_1.COLORS.white,
        border: 'none',
        color: 'var(--jp-layout-color4)',
        cursor: 'not-allowed',
    },
    spacing: {
        marginRight: '7px',
        marginTop: '5px',
    },
});
/**
 * Function component for Submit Button that displays as a progress indicator.
 */
function SubmitButton(props) {
    return (React.createElement(core_1.Button, { className: typestyle_1.classes(styles_1.CSS.button, props.actionPending ? localStyles.disabled : localStyles.submit), disabled: props.actionPending, onClick: props.onClick, color: "primary" },
        props.showWorkingIcon && props.actionPending && (React.createElement("span", { className: localStyles.spacing },
            React.createElement(progress_1.Progress, null))),
        props.text));
}
exports.SubmitButton = SubmitButton;
/** Button with primary Google Material coloring. */
exports.PrimaryButton = core_1.withStyles({
    root: {
        backgroundColor: styles_1.COLORS.blue,
        color: styles_1.COLORS.white,
        fontFamily: 'var(--jp-ui-font-family)',
        textTransform: 'none',
        '&:hover': {
            color: styles_1.COLORS.white,
            backgroundColor: '#1a62e8',
        },
    },
})(core_1.Button);
