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
exports.ExistingEndpointForm = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const field_error_1 = require("../../components/shared/field_error");
const select_input_1 = require("../../components/shared/select_input");
const text_input_1 = require("../../components/shared/text_input");
const accordion_1 = require("../../components/shared/accordion");
const styles_1 = require("../../styles");
const utils_1 = require("../utils");
const localStyles = typestyle_1.stylesheet({
    detailsContainer: {
        width: '100%',
    },
    title: {
        fontWeight: 700,
    },
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
    radioGroup: {
        padding: '16px 0',
        label: {
            height: '20px',
            paddingBottom: '10px',
        },
        span: {
            fontSize: 'var(--jp-ui-font-size1, 13px)',
        },
    },
});
class ExistingEndpointForm extends React.Component {
    constructor(props) {
        super(props);
        const names = [];
        for (let i = 0; i < this.props.endpoints.length; i++) {
            names.push({
                text: this.props.endpoints[i].displayName ||
                    utils_1.parseIdFromName(this.props.endpoints[i].name || ''),
                value: this.props.endpoints[i].name || '',
            });
        }
        const selectedEndpoint = this._removeModelsNotInTrafficSplit(this.props.endpoints[0]);
        this.state = {
            minNodes: 1,
            endpointNames: names,
            selectedEndpoint,
            newModelTrafficSplit: !this.props.endpoints[0].deployedModels ||
                (this.props.endpoints[0].deployedModels &&
                    this.props.endpoints[0].deployedModels.length === 0)
                ? 100
                : 0,
        };
        this.handleSelectedEndpoint = this.handleSelectedEndpoint.bind(this);
        this.onFormValuesChange = this.onFormValuesChange.bind(this);
        this.handleMaxNodeValueChange = this.handleMaxNodeValueChange.bind(this);
        this.handleMinNodeValueChange = this.handleMinNodeValueChange.bind(this);
        this.handleTrafficSplitChange = this.handleTrafficSplitChange.bind(this);
        this.checkTrafficSplit = this.checkTrafficSplit.bind(this);
    }
    componentDidMount() {
        this.onFormValuesChange();
    }
    onFormValuesChange() {
        const deployData = {
            minNodes: this.state.minNodes,
            maxNodes: this.state.maxNodes,
            submissionError: this.checkTrafficSplit(),
            trafficSplits: this.state.selectedEndpoint.trafficSplit || {},
            endpointName: this.state.selectedEndpoint.name || '',
            endpointDisplayName: this.state.selectedEndpoint.displayName || '',
            machineType: this.props.machineType,
        };
        deployData.trafficSplits['0'] = this.state.newModelTrafficSplit;
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
    handleSelectedEndpoint(e) {
        for (let i = 0; i < this.props.endpoints.length; i++) {
            if (e.target.value === this.props.endpoints[i].name) {
                const selectedEndpoint = this._removeModelsNotInTrafficSplit(this.props.endpoints[i]);
                this.setState({
                    selectedEndpoint,
                    newModelTrafficSplit: !selectedEndpoint.deployedModels ||
                        (selectedEndpoint.deployedModels &&
                            selectedEndpoint.deployedModels.length === 0)
                        ? 100
                        : 0,
                }, () => {
                    this.onFormValuesChange();
                });
                break;
            }
        }
    }
    handleTrafficSplitChange(modelIndex, event) {
        if (modelIndex === -1) {
            this.setState({ newModelTrafficSplit: Number(event.target.value) }, () => {
                this.onFormValuesChange();
            });
        }
        else {
            if (!this.state.selectedEndpoint.deployedModels)
                return;
            const selectedDeployedModel = this.state.selectedEndpoint.deployedModels[modelIndex];
            const selectedEndpoint = this.state.selectedEndpoint;
            if (!selectedEndpoint.trafficSplit || !selectedDeployedModel.id)
                return;
            selectedEndpoint.trafficSplit[selectedDeployedModel.id] = Number(event.target.value);
            this.setState({ selectedEndpoint }, () => {
                this.onFormValuesChange();
            });
        }
    }
    checkTrafficSplit() {
        let totalTrafficSplit = this.state.newModelTrafficSplit;
        if (this.state.selectedEndpoint.deployedModels) {
            for (let i = 0; i < this.state.selectedEndpoint.deployedModels.length; i++) {
                const key = this.state.selectedEndpoint.deployedModels[i].id;
                if (this.state.selectedEndpoint.trafficSplit && key) {
                    totalTrafficSplit += this.state.selectedEndpoint.trafficSplit[key];
                }
            }
        }
        return totalTrafficSplit !== 100;
    }
    render() {
        return (React.createElement("form", { className: localStyles.container },
            React.createElement("div", { className: localStyles.content },
                React.createElement(accordion_1.LeftAccordion, { title: "DEFINE YOUR ENDPOINT", defaultExpanded: true },
                    React.createElement(select_input_1.SelectInput, { label: "Endpoint", name: "endpointName", value: this.state.selectedEndpoint.name, options: this.state.endpointNames, onChange: this.handleSelectedEndpoint }),
                    React.createElement("div", null,
                        React.createElement(text_input_1.TextInput, { label: "Location", name: "location", disabled: true, value: this.props.region }))),
                React.createElement(accordion_1.LeftAccordion, { title: "TRAFFIC SPLITS", defaultExpanded: true },
                    React.createElement("div", null,
                        React.createElement("div", null, this.checkTrafficSplit() && (React.createElement(field_error_1.FieldError, { message: "All the traffic splits should add up to 100%" }))),
                        React.createElement("div", null,
                            React.createElement(text_input_1.TextInput, { onChange: event => {
                                    this.handleTrafficSplitChange(-1, event);
                                }, type: "number", min: "0", max: "100", name: "trafficSplit", label: this.props.model.displayName, value: String(this.state.newModelTrafficSplit) })),
                        ' ',
                        (this.state.selectedEndpoint.deployedModels || []).map((model, i) => (React.createElement("div", { key: i },
                            React.createElement("div", null,
                                React.createElement(text_input_1.TextInput, { onChange: event => {
                                        this.handleTrafficSplitChange(i, event);
                                    }, type: "number", min: "0", max: "100", label: model.displayName, name: 'trafficSplit' + i, value: String(this.state.selectedEndpoint.trafficSplit && model.id
                                        ? this.state.selectedEndpoint.trafficSplit[model.id]
                                        : '') }))))))),
                React.createElement(accordion_1.LeftAccordion, { title: "MODEL SETTINGS", defaultExpanded: false },
                    React.createElement("div", null,
                        React.createElement(text_input_1.TextInput, { label: "Minimum number of nodes", name: "minNodes", type: "number", min: "1", onChange: this.handleMinNodeValueChange, value: String(this.state.minNodes), formHelperText: "Default is 1. If set to 1 or more, then compute resources will continuously run even without traffic demand. This can increase cost but avoid dropped requests due to node initialization." })),
                    React.createElement("div", null,
                        React.createElement(text_input_1.TextInput, { label: "Maximum number of nodes", name: "maxNodes", placeholder: "optional", onChange: this.handleMaxNodeValueChange, value: this.state.maxNodes ? String(this.state.maxNodes) : undefined, formHelperText: "Enter a number equal to or greater than the minimum nodes. Can reduce costs but may cause reliability issues for high traffic." })),
                    React.createElement(text_input_1.TextInput, { label: "Machine type", name: "machineType", disabled: true, value: this.props.machineType })))));
    }
    _removeModelsNotInTrafficSplit(endpoint) {
        if (!endpoint.trafficSplit || !endpoint.deployedModels) {
            endpoint.deployedModels = [];
            endpoint.trafficSplit = {};
            return endpoint;
        }
        const newDeployedModels = [];
        for (const model of endpoint.deployedModels) {
            if (model.id && endpoint.trafficSplit[model.id]) {
                newDeployedModels.push(model);
            }
        }
        endpoint.deployedModels = newDeployedModels;
        return endpoint;
    }
}
exports.ExistingEndpointForm = ExistingEndpointForm;
