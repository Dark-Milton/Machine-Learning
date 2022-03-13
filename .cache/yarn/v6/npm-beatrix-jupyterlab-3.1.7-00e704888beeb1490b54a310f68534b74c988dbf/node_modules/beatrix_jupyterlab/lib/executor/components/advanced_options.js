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
exports.AdvancedOptions = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const accordion_1 = require("../../components/shared/accordion");
const cloud_bucket_1 = require("./cloud_bucket");
const input_parameters_1 = require("./input_parameters");
const network_selector_1 = require("./network_selector");
const service_account_selector_1 = require("./service_account_selector");
const localStyles = typestyle_1.stylesheet({
    detailsContainer: {
        width: '100%',
    },
    mainContainer: {
        marginTop: '-13px',
    },
    subHeading: {
        fontSize: '13px',
        fontWeight: 500,
        lineHeight: '20px',
        marginBottom: '12px',
        fontFamily: 'Roboto',
    },
});
class AdvancedOptions extends React.Component {
    constructor(props) {
        var _a;
        super(props);
        const gcsBucket = (_a = props.gcpSettings.gcsBucket) !== null && _a !== void 0 ? _a : '';
        this.state = {
            gcsBucket: gcsBucket.startsWith('gs://') ? gcsBucket.slice(5) : gcsBucket,
            serviceAccount: '',
            network: '',
            parameters: '',
        };
        this.onServiceAccountChange = this.onServiceAccountChange.bind(this);
        this.onNetworkChange = this.onNetworkChange.bind(this);
        this.onParametersChange = this.onParametersChange.bind(this);
        this.onGcsBucketChange = this.onGcsBucketChange.bind(this);
    }
    onGcsBucketChange(gcsBucket) {
        this.setState({ gcsBucket });
        this.props.onAdvancedOptionsChanged(Object.assign(Object.assign({}, this.state), { gcsBucket }));
    }
    onParametersChange(parameters) {
        this.setState({ parameters });
        this.props.onAdvancedOptionsChanged(Object.assign(Object.assign({}, this.state), { parameters }));
    }
    onServiceAccountChange(serviceAccount) {
        this.setState({ serviceAccount });
        this.props.onAdvancedOptionsChanged(Object.assign(Object.assign({}, this.state), { serviceAccount }));
    }
    onNetworkChange(network) {
        this.setState({ network });
        this.props.onAdvancedOptionsChanged(Object.assign(Object.assign({}, this.state), { network }));
    }
    render() {
        return (React.createElement("div", { className: localStyles.mainContainer },
            React.createElement(accordion_1.LeftAccordion, { title: "ADVANCED OPTIONS", defaultExpanded: this.props.expandByDefault },
                React.createElement(cloud_bucket_1.CloudBucketSelector, { gcsBucket: this.state.gcsBucket, onGcsBucketChange: this.onGcsBucketChange }),
                React.createElement("p", { className: localStyles.subHeading }, "Notebook parameterization"),
                React.createElement(input_parameters_1.InputParametersTextArea, { onChange: this.onParametersChange }),
                React.createElement("p", { className: localStyles.subHeading }, "Identity and API access"),
                React.createElement(service_account_selector_1.ServiceAccountSelector, { gcpSettings: this.props.gcpSettings, onChange: this.onServiceAccountChange }),
                React.createElement("p", { className: localStyles.subHeading }, "Networking"),
                React.createElement(network_selector_1.NetworkSelector, { initialNetwork: this.props.gcpSettings.network || '', onChange: this.onNetworkChange }))));
    }
}
exports.AdvancedOptions = AdvancedOptions;
