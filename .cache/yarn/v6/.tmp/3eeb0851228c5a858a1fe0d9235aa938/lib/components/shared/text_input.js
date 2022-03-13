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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInput = exports.CustomColorTextField = exports.TEXT_STYLES = void 0;
const React = __importStar(require("react"));
const core_1 = require("@material-ui/core");
const typestyle_1 = require("typestyle");
const styles_1 = require("../../styles");
const field_error_1 = require("./field_error");
const learn_more_link_1 = require("./learn_more_link");
exports.TEXT_STYLES = typestyle_1.stylesheet({
    text: {
        display: 'block',
        marginTop: '8px',
    },
});
exports.CustomColorTextField = core_1.withStyles({
    root: {
        '& .MuiOutlinedInput-underline:after': {
            borderBottomColor: styles_1.COLORS.focus,
        },
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: styles_1.COLORS.focus,
            },
            '&.Mui-focused fieldset': {
                borderColor: styles_1.COLORS.focus,
            },
        },
        '& .MuiInputBase-root.Mui-disabled': {
            backgroundColor: 'rgba(59, 59, 59, 0.1) !important',
            borderColor: 'rgba(118, 118, 118, 0.1) !important',
        },
    },
})(core_1.TextField);
/** Funtional Component for text input fields */
function TextInput(props) {
    const { label, hasError, formHelperText, formHelperLink, formHelperLinkText, error, multiline, rows, disabled } = props, inputProps = __rest(props, ["label", "hasError", "formHelperText", "formHelperLink", "formHelperLinkText", "error", "multiline", "rows", "disabled"]);
    return (React.createElement("div", { className: exports.TEXT_STYLES.text },
        React.createElement(exports.CustomColorTextField, { className: typestyle_1.classes(hasError && 'error'), variant: "outlined", margin: "dense", fullWidth: true, label: label, disabled: disabled, inputProps: Object.assign({ style: styles_1.INPUT_TEXT_STYLE }, inputProps), InputProps: {
                style: styles_1.INPUT_TEXT_STYLE,
            }, InputLabelProps: { shrink: true, style: Object.assign({}, styles_1.FORM_LABEL_STYLE) }, multiline: multiline, rows: rows }),
        formHelperText && !hasError && (React.createElement(core_1.FormHelperText, { style: styles_1.ALIGN_HINT },
            formHelperText,
            formHelperLink && (React.createElement(learn_more_link_1.LearnMoreLink, { text: formHelperLinkText, href: formHelperLink })))),
        hasError && React.createElement(field_error_1.FieldError, { message: error })));
}
exports.TextInput = TextInput;
