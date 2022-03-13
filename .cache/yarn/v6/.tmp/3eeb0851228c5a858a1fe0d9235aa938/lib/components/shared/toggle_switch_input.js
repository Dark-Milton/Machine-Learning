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
exports.ToggleSwitch = void 0;
const core_1 = require("@material-ui/core");
const React = __importStar(require("react"));
const StyledLabel = core_1.withStyles({
    label: {
        fontSize: '13px',
    },
})(core_1.FormControlLabel);
/** Material style toggle switch */
function ToggleSwitch(props) {
    const { id, name, checked, labelLeft, labelRight, disabled, onChange } = props;
    return (React.createElement(core_1.RadioGroup, { row: true, id: id, "aria-label": name, name: name, value: checked, onChange: onChange },
        React.createElement(StyledLabel, { value: true, disabled: disabled, name: `${name}Left`, control: React.createElement(core_1.Radio, { color: "primary" }), label: labelLeft }),
        React.createElement(StyledLabel, { value: false, disabled: disabled, name: `${name}Right`, control: React.createElement(core_1.Radio, { color: "primary" }), label: labelRight })));
}
exports.ToggleSwitch = ToggleSwitch;
