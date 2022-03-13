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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectInput = exports.STYLES = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const ArrowDropDown_1 = __importDefault(require("@material-ui/icons/ArrowDropDown"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
const styles_1 = require("../data/styles");
exports.STYLES = typestyle_1.stylesheet({
    select: {
        display: 'block',
        marginTop: '2px',
    },
    icon: {
        right: '14px',
        position: 'absolute',
        cursor: 'pointer',
        pointerEvents: 'none',
    },
    textColor: {
        color: 'var(--jp-ui-font-color1)',
    },
});
function IconComponent() {
    return React.createElement(ArrowDropDown_1.default, { className: exports.STYLES.icon });
}
function SelectInput(props) {
    const { label, name, value, options, onChange } = props;
    return (React.createElement("div", null,
        label && React.createElement("label", { className: exports.STYLES.textColor }, label),
        React.createElement(TextField_1.default, { className: exports.STYLES.select, select: true, value: value, margin: "dense", fullWidth: true, variant: "outlined", onChange: onChange, inputProps: {
                name: name,
            }, SelectProps: {
                IconComponent,
                MenuProps: {
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                    transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                    MenuListProps: {
                        style: {
                            backgroundColor: 'var(--jp-layout-color1)',
                        },
                    },
                },
            }, InputProps: {
                style: styles_1.TEXT_STYLE,
            } }, options &&
            options.map(option => (React.createElement(MenuItem_1.default, { key: option.value, value: option.value, style: styles_1.TEXT_STYLE }, option.text))))));
}
exports.SelectInput = SelectInput;
