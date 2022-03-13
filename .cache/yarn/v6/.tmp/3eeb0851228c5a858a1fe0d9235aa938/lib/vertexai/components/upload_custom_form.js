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
exports.UploadCustomForm = exports.checkValidSchemata = exports.checkValidModelPath = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const text_input_1 = require("../../components/shared/text_input");
const styles_1 = require("../../styles");
const learn_more_link_1 = require("../../components/shared/learn_more_link");
const core_1 = require("@material-ui/core");
const ExpandMore_1 = __importDefault(require("@material-ui/icons/ExpandMore"));
const service_provider_1 = require("../../service/service_provider");
const environment_selector_1 = require("../../components/shared/environment_selector");
const environment_data_1 = require("../../environment_data");
/**
 * TODO: move LeftAccordionSummary, CustomAccordion, and CustomAccordionDetails
 * to shared component with Executor
 */
const LeftAccordionSummary = core_1.withStyles({
    expandIcon: {
        order: -1,
        color: '#3367D6',
        margin: '0px',
        padding: '0px',
    },
    root: {
        marginLeft: '0px',
        paddingLeft: '0px',
        color: '#3367D6',
        fontFamily: 'Roboto',
        fontSize: '13px',
        fontWeight: 500,
        boxShadow: 'none',
        border: 'none',
    },
    expanded: {
        marginTop: '0px',
        marginLeft: '0px',
        paddingLeft: '0px',
    },
})(core_1.AccordionSummary);
const CustomAccordion = core_1.withStyles({
    root: {
        margin: '0px',
        padding: '0px',
        border: 'none',
        boxShadow: 'none',
    },
})(core_1.Accordion);
const CustomAccordionDetails = core_1.withStyles({
    root: {
        margin: '0px',
        padding: '0px',
    },
})(core_1.AccordionDetails);
const localStyles = typestyle_1.stylesheet({
    content: {
        overflowY: 'scroll',
        overflowX: 'hidden',
        borderTop: '1px solid ' + styles_1.COLORS.line,
        borderBottom: '1px solid ' + styles_1.COLORS.line,
        padding: '16px',
        flexGrow: 2,
    },
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    accordionTitle: {
        margin: '0px',
    },
});
/** Minimal object definition required to work with EnvironmentSelector */
const dummyNotebookModel = {
    metadata: new Map(),
};
function checkValidModelPath(modelPath) {
    const validModelPaths = [
        'saved_model.pb',
        'model.pkl',
        'model.joblib',
        'model.bst',
    ];
    return validModelPaths.includes((modelPath === null || modelPath === void 0 ? void 0 : modelPath.split('/').pop()) || '');
}
exports.checkValidModelPath = checkValidModelPath;
function checkValidSchemata(schema) {
    var _a;
    const validExtensions = ['yaml', 'yml'];
    return (schema === '' ||
        validExtensions.includes(((_a = schema === null || schema === void 0 ? void 0 : schema.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || ''));
}
exports.checkValidSchemata = checkValidSchemata;
class UploadCustomForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exportedModelPath: this.props.filePath || '',
            modelName: '',
            environmentUri: environment_data_1.BASE_PYTHON_CONTAINER,
            expandSchemataContainer: false,
            predictSchemataInstances: '',
            predictSchemataParameters: '',
            predictSchemataPredictions: '',
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSchemataContainer = this.handleSchemataContainer.bind(this);
        this.handleContainerChange = this.handleContainerChange.bind(this);
    }
    componentDidMount() {
        if (this.props.filePath) {
            this.props.uploadUserInputs('exportedModelPath', this.props.filePath);
        }
    }
    handleTextChange(event) {
        this.setState(Object.assign(Object.assign({}, this.state), { [event.target.name]: event.target.value }));
        this.props.uploadUserInputs(event.target.name, event.target.value);
    }
    handleContainerChange(images) {
        const environmentUri = images.imageUri === String(environment_data_1.CUSTOM_CONTAINER.value)
            ? images.customContainerImageUri
            : images.imageUri;
        this.setState({ environmentUri });
        this.props.uploadUserInputs('environmentSelector', environmentUri);
    }
    handleSchemataContainer(_, expanded) {
        this.setState({ expandSchemataContainer: expanded });
    }
    render() {
        const { exportedModelPath, modelName, predictSchemataInstances, predictSchemataParameters, predictSchemataPredictions, } = this.state;
        return (React.createElement("form", { className: localStyles.container },
            React.createElement("div", { className: localStyles.content },
                React.createElement(text_input_1.TextInput, { disabled: this.props.filePath !== '', label: "Exported model path", name: "exportedModelPath", value: exportedModelPath, onChange: this.handleTextChange, hasError: this.props.formError && !checkValidModelPath(exportedModelPath), error: 'Model name must be one of: saved_model.pb, model.pkl, model.joblib, or model.bst.', formHelperText: "Can be local file or gcs path. If gcs path, the value must start with gs://. The model name must be one of: saved_model.pb, model.pkl, model.joblib, or model.bst, depending on which library you used." }),
                React.createElement(text_input_1.TextInput, { label: "Model name", name: "modelName", value: modelName, hasError: this.props.formError && modelName === '', error: "Model name is a required field.", onChange: this.handleTextChange }),
                React.createElement(text_input_1.TextInput, { disabled: true, label: "Region", name: "region", formHelperText: "Custom models can only be uploaded to the same location as the notebook instance", value: service_provider_1.ServiceProvider.vertexAIService.region }),
                React.createElement(environment_selector_1.EnvironmentSelector, { notebook: dummyNotebookModel, onChange: this.handleContainerChange }),
                React.createElement(CustomAccordion, { square: true, expanded: this.state.expandSchemataContainer, onChange: this.handleSchemataContainer },
                    React.createElement(LeftAccordionSummary, { expandIcon: React.createElement(ExpandMore_1.default, null) }, "PREDICT SCHEMATA (OPTIONAL)"),
                    React.createElement(CustomAccordionDetails, null,
                        React.createElement("div", null,
                            React.createElement(learn_more_link_1.LearnMoreLink, { href: 'https://cloud.google.com/vertex-ai/docs/reference/rest/v1beta1/projects.locations.models?&_ga=2.81662423.-1576530749.1622656363#predictschemata', text: "Learn more about the predict schemata." }),
                            React.createElement(text_input_1.TextInput, { label: "Instances", name: "predictSchemataInstances", value: predictSchemataInstances, onChange: this.handleTextChange, hasError: !checkValidSchemata(predictSchemataInstances), error: "Predict schemata must be a YAML file.", formHelperText: "Can be local file or gcs path to a YAML file. If gcs path, the value must start with gs://" }),
                            React.createElement(text_input_1.TextInput, { label: "Parameters", name: "predictSchemataParameters", value: predictSchemataParameters, onChange: this.handleTextChange, hasError: !checkValidSchemata(predictSchemataParameters), error: "Predict schemata must be a YAML file.", formHelperText: "Can be local file or gcs path to a YAML file. If gcs path, the value must start with gs://" }),
                            React.createElement(text_input_1.TextInput, { label: 'Predictions', name: "predictSchemataPredictions", value: predictSchemataPredictions, onChange: this.handleTextChange, hasError: !checkValidSchemata(predictSchemataPredictions), error: "Predict schemata must be a YAML file.", formHelperText: "Can be local file or gcs path to a YAML file. If gcs path, the value must start with gs://" })))))));
    }
}
exports.UploadCustomForm = UploadCustomForm;
