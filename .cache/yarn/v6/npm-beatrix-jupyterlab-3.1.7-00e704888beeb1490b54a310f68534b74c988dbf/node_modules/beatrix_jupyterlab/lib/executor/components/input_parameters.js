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
exports.InputParametersTextArea = void 0;
const React = __importStar(require("react"));
const text_input_1 = require("../../components/shared/text_input");
class InputParametersTextArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }
    onChange(value) {
        this.setState({ value });
        this.props.onChange(value);
    }
    render() {
        return (React.createElement(text_input_1.TextInput, { label: "Input parameters (optional)", name: "parameters", value: this.state.value, onChange: e => this.onChange(e.target.value), formHelperText: "Each parameter needs to be separated by commas (Example:a=x,b=y)", multiline: true, placeholder: "Enter your comma separated parameters (Example:a=x,b=y)", rows: 4 }));
    }
}
exports.InputParametersTextArea = InputParametersTextArea;
