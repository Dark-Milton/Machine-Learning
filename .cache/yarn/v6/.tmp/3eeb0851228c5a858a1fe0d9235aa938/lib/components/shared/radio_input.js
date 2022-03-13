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
exports.RadioInput = void 0;
const core_1 = require("@material-ui/core");
const styles_1 = require("@material-ui/core/styles");
const React = __importStar(require("react"));
const styles_2 = require("../../styles");
const theme = styles_1.createMuiTheme({
    overrides: {
        MuiRadio: {
            colorSecondary: {
                '&$checked': {
                    color: styles_2.COLORS.blue,
                },
            },
        },
        MuiFormControlLabel: {
            root: {
                marginBottom: '-5px',
                marginTop: '-10px',
            },
        },
        MuiTypography: {
            body1: {
                fontSize: '0.83rem',
            },
        },
    },
});
/** Funtional Component for Radio input fields */
function RadioInput(props) {
    const { options } = props, groupProps = __rest(props, ["options"]);
    return (React.createElement(styles_1.ThemeProvider, { theme: theme },
        React.createElement(core_1.RadioGroup, Object.assign({}, groupProps), options &&
            options.map((o, i) => (React.createElement(core_1.FormControlLabel, { key: i, value: o.value, control: React.createElement(core_1.Radio, null), label: o.text, className: styles_2.CSS.primaryTextColor }))))));
}
exports.RadioInput = RadioInput;
