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
exports.SelectInput = exports.SELECT_STYLES = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const styles_1 = require("../../styles");
const learn_more_link_1 = require("./learn_more_link");
const text_input_1 = require("./text_input");
exports.SELECT_STYLES = typestyle_1.stylesheet({
    select: {
        display: 'block',
        marginTop: '8px',
    },
    selectBottomSpacing: {
        marginBottom: '16px',
    },
    icon: {
        right: '14px',
        position: 'absolute',
        cursor: 'pointer',
        pointerEvents: 'none',
    },
});
const iconComponent = () => {
    return React.createElement(icons_1.ArrowDropDown, { className: exports.SELECT_STYLES.icon });
};
/** Drop-down selection component */
function SelectInput(props) {
    const { label, name, value, options, formHelperText, formHelperLink, formHelperLinkText, noBottomSpacing, onChange, } = props;
    return (React.createElement("div", { className: typestyle_1.classes(exports.SELECT_STYLES.select, noBottomSpacing ? null : exports.SELECT_STYLES.selectBottomSpacing) },
        React.createElement(text_input_1.CustomColorTextField, { variant: "outlined", margin: "dense", fullWidth: true, id: name, label: label, value: value, onChange: onChange, inputProps: {
                name: name,
            }, InputProps: {
                style: styles_1.INPUT_TEXT_STYLE,
            }, InputLabelProps: { shrink: true, style: Object.assign({}, styles_1.FORM_LABEL_STYLE) }, SelectProps: {
                IconComponent: iconComponent,
                displayEmpty: true,
            }, select: true }, options &&
            options.map(option => (React.createElement(core_1.MenuItem, { key: option.value, value: option.value, style: styles_1.INPUT_TEXT_STYLE }, option.text)))),
        formHelperText && (React.createElement(core_1.FormHelperText, { style: styles_1.ALIGN_HINT },
            formHelperText,
            formHelperLink && (React.createElement(learn_more_link_1.LearnMoreLink, { text: formHelperLinkText, href: formHelperLink }))))));
}
exports.SelectInput = SelectInput;
