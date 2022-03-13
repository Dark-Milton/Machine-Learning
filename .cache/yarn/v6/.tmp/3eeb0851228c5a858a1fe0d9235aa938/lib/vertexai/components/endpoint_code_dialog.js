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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndpointCodeDialog = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const styles_1 = require("../../styles");
const core_1 = require("@material-ui/core");
const select_input_1 = require("../../components/shared/select_input");
const dialog_1 = require("../../components/shared/dialog");
const utils_1 = require("../utils");
const react_syntax_highlighter_1 = __importDefault(require("react-syntax-highlighter"));
const service_provider_1 = require("../../service/service_provider");
const successfulCopyMessage = 'Copied to clipboard';
const failedCopyMessage = 'Failed to make a copy';
const codeGenerationOptions = {
    image: [
        {
            text: 'Classification',
            value: 'classification',
        },
        {
            text: 'Object Detection',
            value: 'object-detection',
        },
    ],
    text: [
        {
            text: 'Classification',
            value: 'classification',
        },
        {
            text: 'Text Entity Extraction',
            value: 'text-entity-extraction',
        },
        {
            text: 'Sentiment Analysis',
            value: 'sentiment-analysis',
        },
    ],
    tabular: [
        {
            text: 'Classification',
            value: 'classification',
        },
        {
            text: 'Tabular Regression',
            value: 'tabular-regression',
        },
    ],
};
const dataTypeOptions = [
    {
        text: 'Image',
        value: 'image',
    },
    {
        text: 'Text',
        value: 'text',
    },
    {
        text: 'Tabular',
        value: 'tabular',
    },
];
const localStyles = typestyle_1.stylesheet({
    text: {
        fontSize: '14px !important',
        color: styles_1.COLORS.base + ' !important',
    },
    fullWidth: {
        width: '100%',
    },
    inlineStart: {
        paddingInlineStart: '16px',
    },
    actionButtons: {
        margin: '-16px 24px 8px 24px',
    },
    primaryButton: {
        color: styles_1.COLORS.focus + '!important',
    },
    spacingAbove: {
        marginTop: '16px',
    },
    spacingBelow: {
        marginBottom: '16px',
    },
    dialogContent: {
        marginTop: '8px',
    },
    formContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    noPadding: {
        padding: '0px !important',
    },
    codeSnippet: {
        maxHeight: '100px',
        overflowY: 'scroll',
        pre: {
            margin: '0',
        },
    },
});
class EndpointCodeDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            openSnackbar: false,
            dataType: '',
            selectedDataType: '',
            generateCode: '',
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleCopy = this.handleCopy.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDataTypeSelectChange =
            this.handleDataTypeSelectChange.bind(this);
        this.handleGenerateCodeSelectChange =
            this.handleGenerateCodeSelectChange.bind(this);
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
        this.handleResetDataTypeSelections =
            this.handleResetDataTypeSelections.bind(this);
    }
    handleClickOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setState({ openDialog: true });
            // Get data type of endpoint
            const dataType = yield service_provider_1.ServiceProvider.vertexAIService.getDataType(this.props.endpoint);
            this.setState({ dataType });
            if (dataType !== '') {
                this.setState({ selectedDataType: dataType });
            }
        });
    }
    handleSnackbarClose() {
        this.setState({ openSnackbar: false });
    }
    handleCopy() {
        if (this.state.generateCode !== '') {
            const codeToCopy = utils_1.getCodeTemplates(this.state.selectedDataType, this.state.generateCode, this.props.endpoint.displayName || '', service_provider_1.ServiceProvider.vertexAIService.projectId, this.props.endpoint.name || '', service_provider_1.ServiceProvider.vertexAIService.region);
            navigator.clipboard.writeText(codeToCopy);
        }
        this.setState({ openSnackbar: true });
    }
    handleClose() {
        this.setState({
            openDialog: false,
        });
        if (this.props.handleClose) {
            this.props.handleClose();
        }
        this.handleSnackbarClose();
        this.handleResetDataTypeSelections();
    }
    handleDataTypeSelectChange(event) {
        this.setState({ selectedDataType: event.target.value });
        this.setState({ generateCode: '' });
    }
    handleGenerateCodeSelectChange(event) {
        this.setState({
            generateCode: event.target.value,
        });
    }
    handleResetDataTypeSelections() {
        this.setState({ selectedDataType: '', generateCode: '' });
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("p", { onClick: this.handleClickOpen, className: localStyles.fullWidth }, "Use in code"),
            React.createElement(dialog_1.DialogComponent, { open: this.state.openDialog, onClose: this.handleClose, cancelLabel: 'Close', submitLabel: 'Copy code', onCancel: this.handleClose, onSubmit: this.handleCopy, children: React.createElement("div", null,
                    React.createElement("div", { className: localStyles.noPadding },
                        React.createElement(core_1.DialogTitle, { id: "share-dialog-title", className: typestyle_1.classes(localStyles.spacingBelow, localStyles.noPadding) }, "Use in code"),
                        React.createElement(core_1.DialogContent, { className: typestyle_1.classes(localStyles.noPadding, localStyles.dialogContent) },
                            React.createElement(core_1.DialogContentText, { className: localStyles.text }, "Select the data and prediction type that is right for your model and click copy.")),
                        React.createElement("form", { className: localStyles.formContainer },
                            this.state.dataType === '' && (React.createElement(select_input_1.SelectInput, { label: "Data Type", value: this.state.selectedDataType, options: dataTypeOptions, onChange: this.handleDataTypeSelectChange })),
                            this.state.selectedDataType !== '' && (React.createElement(select_input_1.SelectInput, { label: `${utils_1.toTitleCase(this.state.selectedDataType)}
                     Prediction Options`, value: this.state.generateCode, options: codeGenerationOptions[this.state.selectedDataType] || [], onChange: this.handleGenerateCodeSelectChange }))),
                        this.state.generateCode !== '' && (React.createElement("div", { className: localStyles.codeSnippet },
                            React.createElement(react_syntax_highlighter_1.default, { language: "python" }, utils_1.getCodeTemplates(this.state.selectedDataType, this.state.generateCode, this.props.endpoint.displayName || '', service_provider_1.ServiceProvider.vertexAIService.projectId, this.props.endpoint.name || '', service_provider_1.ServiceProvider.vertexAIService.region))))),
                    React.createElement(core_1.Snackbar, { open: this.state.openSnackbar, onClose: this.handleSnackbarClose, message: this.state.openSnackbar &&
                            (this.state.generateCode !== ''
                                ? successfulCopyMessage
                                : failedCopyMessage) })), submitDisabled: this.state.generateCode === '' })));
    }
}
exports.EndpointCodeDialog = EndpointCodeDialog;
