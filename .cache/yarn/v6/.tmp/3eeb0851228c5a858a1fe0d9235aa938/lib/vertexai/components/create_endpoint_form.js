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
exports.CreateEndpointForm = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const text_input_1 = require("../../components/shared/text_input");
const accordion_1 = require("../../components/shared/accordion");
const styles_1 = require("../../styles");
const localStyles = typestyle_1.stylesheet({
    content: {
        overflowY: 'scroll',
        overflowX: 'hidden',
        borderTop: '1px solid ' + styles_1.COLORS.line,
        borderBottom: '1px solid ' + styles_1.COLORS.line,
        paddingLeft: '24px',
        paddingRight: '24px',
        paddingTop: '16px',
        flexGrow: 2,
    },
    container: { height: '100%', display: 'flex', flexDirection: 'column' },
});
class CreateEndpointForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            endpointName: '',
            minNodes: 1,
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.onFormValuesChange = this.onFormValuesChange.bind(this);
        this.handleMaxNodeValueChange = this.handleMaxNodeValueChange.bind(this);
        this.handleMinNodeValueChange = this.handleMinNodeValueChange.bind(this);
    }
    componentDidMount() {
        this.onFormValuesChange();
    }
    onFormValuesChange() {
        const deployData = {
            minNodes: this.state.minNodes,
            maxNodes: this.state.maxNodes,
            trafficSplits: { '0': 100 },
            endpointName: this.state.endpointName,
            endpointDisplayName: this.state.endpointName,
            machineType: this.props.machineType,
        };
        this.props.uploadUserInputs(deployData);
    }
    handleMaxNodeValueChange(event) {
        let value = parseInt(event.target.value);
        if (isNaN(value) || value < 1 || value < this.state.minNodes) {
            value = undefined;
        }
        this.setState({ maxNodes: value }, () => {
            this.onFormValuesChange();
        });
    }
    handleMinNodeValueChange(event) {
        const value = parseInt(event.target.value);
        this.setState({ minNodes: value }, () => {
            this.onFormValuesChange();
        });
    }
    handleTextChange(event) {
        this.setState({ endpointName: event.target.value }, () => {
            this.onFormValuesChange();
        });
    }
    render() {
        return (React.createElement("form", { className: localStyles.container },
            React.createElement("div", { className: localStyles.content },
                React.createElement(accordion_1.LeftAccordion, { title: "DEFINE YOUR ENDPOINT", defaultExpanded: true },
                    React.createElement(text_input_1.TextInput, { label: "Enter endpoint name", value: this.state.endpointName, name: "endpointName", formHelperText: "Up to 128 characters long", onChange: this.handleTextChange }),
                    React.createElement(text_input_1.TextInput, { label: "Location", name: "location", disabled: true, value: this.props.region })),
                React.createElement(accordion_1.LeftAccordion, { title: "MODEL SETTINGS", defaultExpanded: false },
                    React.createElement(text_input_1.TextInput, { label: "Minimum number of nodes", name: "minNodes", type: "number", min: "1", onChange: this.handleMinNodeValueChange, value: String(this.state.minNodes), formHelperText: "Default is 1. If set to 1 or more, then compute resources will continuously run even without traffic demand. This can increase cost but avoid dropped requests due to node initialization." }),
                    React.createElement(text_input_1.TextInput, { label: "Maximum number of nodes", name: "maxNodes", placeholder: "optional", onChange: this.handleMaxNodeValueChange, value: this.state.maxNodes ? String(this.state.maxNodes) : undefined, formHelperText: "Enter a number equal to or greater than the minimum nodes. Can reduce costs but may cause reliability issues for high traffic." }),
                    React.createElement(text_input_1.TextInput, { label: `Traffic split for ${this.props.model.displayName}`, name: "trafficSplit", disabled: true, value: "100%" }),
                    React.createElement(text_input_1.TextInput, { label: "Machine type", name: "machineType", disabled: true, value: this.props.machineType })))));
    }
}
exports.CreateEndpointForm = CreateEndpointForm;
