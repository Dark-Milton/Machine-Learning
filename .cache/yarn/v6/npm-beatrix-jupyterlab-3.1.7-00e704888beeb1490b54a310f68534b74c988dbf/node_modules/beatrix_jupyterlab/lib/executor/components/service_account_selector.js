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
exports.ServiceAccountSelector = void 0;
const React = __importStar(require("react"));
const checkbox_input_1 = require("../../components/shared/checkbox_input");
const text_input_1 = require("../../components/shared/text_input");
const typestyle_1 = require("typestyle");
const localStyles = typestyle_1.stylesheet({
    checkBoxContainer: {
        marginLeft: '5px',
    },
});
const EMAIL_REGEX = new RegExp(/^(.+)@((.+\.iam\.gserviceaccount\.com)|(appspot\.gserviceaccount\.com)|(developer\.gserviceaccount\.com))$/);
class ServiceAccountSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '', useDefault: true, emailError: false };
        this.onUseDefaultValueChange = this.onUseDefaultValueChange.bind(this);
        this.onServiceAccountValueChange =
            this.onServiceAccountValueChange.bind(this);
    }
    componentDidMount() {
        this.setDefaults();
    }
    setDefaults() {
        const value = this.props.gcpSettings.serviceAccount || '';
        const useDefault = !value || value === '';
        this.setState({ value, useDefault });
        this.props.onChange(useDefault ? '' : value);
    }
    onUseDefaultValueChange(useDefault) {
        this.setState({ useDefault });
        this.props.onChange(useDefault ? '' : this.state.value);
    }
    onServiceAccountValueChange(value) {
        const emailError = !EMAIL_REGEX.test(value);
        this.setState({ emailError, value });
        if (emailError) {
            return;
        }
        this.props.onChange(this.state.useDefault ? '' : value);
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("div", { className: localStyles.checkBoxContainer },
                React.createElement(checkbox_input_1.CheckboxInput, { key: "useDefaultServiceAccount", name: "useDefaultServiceAccount", checked: this.state.useDefault, label: "Use Vertex AI Training\u2019s default service account", onChange: e => this.onUseDefaultValueChange(e.target.checked) })),
            !this.state.useDefault && (React.createElement(text_input_1.TextInput, { label: "Service account", name: "serviceAccount", value: this.state.value, placeholder: "Enter your service account", onChange: e => this.onServiceAccountValueChange(e.target.value), hasError: this.state.emailError, error: "Service account must be in email format ending with @<project_id>.iam.gserviceaccount.com, @appspot.gserviceaccount.com or @developer.gserviceaccount.com" }))));
    }
}
exports.ServiceAccountSelector = ServiceAccountSelector;
