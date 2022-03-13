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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboxInput = void 0;
const csstips = __importStar(require("csstips"));
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const core_1 = require("@material-ui/core");
const CheckBoxOutlineBlank_1 = __importDefault(require("@material-ui/icons/CheckBoxOutlineBlank"));
const CheckBox_1 = __importDefault(require("@material-ui/icons/CheckBox"));
const styles_1 = require("../../styles");
const containerStyle = typestyle_1.style(Object.assign(Object.assign(Object.assign({}, csstips.horizontal), csstips.center), { marginRight: 0 }));
const StyledLabel = core_1.withStyles({
    label: Object.assign(Object.assign({}, styles_1.INPUT_TEXT_STYLE), { marginRight: '-12px !important', marginLeft: '-5px !important' }),
})(core_1.FormControlLabel);
const CustomColorCheckBox = core_1.withStyles({
    root: {
        padding: '5px',
        '&$checked': {
            color: styles_1.COLORS.focus,
        },
    },
    checked: {},
})((props) => React.createElement(core_1.Checkbox, Object.assign({ color: "default" }, props)));
/** Funtional Component for Checkbox input fields */
function CheckboxInput(props) {
    const { label, checked, disabled } = props, inputProps = __rest(props, ["label", "checked", "disabled"]);
    return (React.createElement("div", { className: containerStyle },
        React.createElement(StyledLabel, { disabled: disabled, control: React.createElement(CustomColorCheckBox, { inputProps: Object.assign(Object.assign({}, inputProps), { checked }), icon: React.createElement(CheckBoxOutlineBlank_1.default, { fontSize: "small" }), checkedIcon: React.createElement(CheckBox_1.default, { fontSize: "small" }), size: "small", checked: checked, color: "primary" }), label: label })));
}
exports.CheckboxInput = CheckboxInput;
