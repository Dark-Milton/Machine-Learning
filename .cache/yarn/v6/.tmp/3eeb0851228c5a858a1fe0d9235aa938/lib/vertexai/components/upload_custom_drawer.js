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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadCustomModelsDrawer = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const core_1 = require("@material-ui/core");
const csstips = __importStar(require("csstips"));
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const badge_1 = require("../../components/shared/badge");
const icons_1 = require("../../components/shared/icons");
const message_1 = require("../../components/shared/message");
const submit_button_1 = require("../../components/shared/submit_button");
const environment_data_1 = require("../../environment_data");
const action_bar_1 = require("../../executor/components/action_bar");
const service_provider_1 = require("../../service/service_provider");
const styles_1 = require("../../styles");
const utils_1 = require("../../utils");
const upload_custom_form_1 = require("./upload_custom_form");
const localStyles = typestyle_1.stylesheet({
    header: Object.assign(Object.assign(Object.assign(Object.assign({}, styles_1.BASE_FONT), { fontWeight: 400, fontSize: '20px', margin: '18px 24px 18px 24px' }), csstips.horizontal), csstips.center),
    title: Object.assign({}, csstips.flex),
    main: Object.assign(Object.assign(Object.assign({ backgroundColor: styles_1.COLORS.white, width: '452px', height: '100%' }, styles_1.BASE_FONT), csstips.vertical), { overflow: 'hidden', padding: '0px 30px' }),
    spacing: {
        padding: '24px',
    },
    tableBodyCell: {
        padding: '6px 36px',
    },
    fullWidth: {
        width: '100%',
    },
    footer: {
        paddingBottom: '16px',
        paddingLeft: '36px',
        paddingRight: '36px',
    },
    error: {
        maxWidth: 'fit-content',
    },
});
class UploadCustomModelsDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDrawer: false,
            customModel: {
                displayName: '',
                artifactUri: '',
                imageUri: environment_data_1.BASE_PYTHON_CONTAINER,
                predictSchemata: {
                    instanceSchemaUri: '',
                    parametersSchemaUri: '',
                    predictionSchemaUri: '',
                },
            },
            submissionError: '',
            pendingSubmission: false,
            formError: false,
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handlePopulateModel = this.handlePopulateModel.bind(this);
        this.handleFormError = this.handleFormError.bind(this);
        this.checkValidSubmit = this.checkValidSubmit.bind(this);
    }
    handleOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield service_provider_1.ServiceProvider.gcsService.getOrCreateDefaultBucket();
                this.setState({
                    openDrawer: true,
                    customModel: {
                        displayName: '',
                        artifactUri: this.props.openFromFile ? this.props.filePath || '' : '',
                        imageUri: environment_data_1.BASE_PYTHON_CONTAINER,
                        predictSchemata: {
                            instanceSchemaUri: '',
                            parametersSchemaUri: '',
                            predictionSchemaUri: '',
                        },
                    },
                    submissionError: '',
                    pendingSubmission: false,
                    formError: false,
                });
            }
            catch (err) {
                utils_1.appLog.error('Unable to provision GCS Bucket for upload', err);
                apputils_1.showErrorMessage('Unable to provision GCS Bucket for upload', err);
            }
        });
    }
    handleClose() {
        this.setState({
            openDrawer: false,
            customModel: {
                imageUri: environment_data_1.BASE_PYTHON_CONTAINER,
                displayName: '',
                artifactUri: '',
                predictSchemata: {
                    instanceSchemaUri: '',
                    parametersSchemaUri: '',
                    predictionSchemaUri: '',
                },
            },
            submissionError: '',
            pendingSubmission: false,
            formError: false,
        });
    }
    handleUpload() {
        return __awaiter(this, void 0, void 0, function* () {
            // Upload populated model
            this.setState({
                pendingSubmission: true,
                submissionError: '',
                formError: false,
            });
            try {
                yield service_provider_1.ServiceProvider.vertexAIService.uploadModel(this.state.customModel);
                this.setState({ pendingSubmission: false });
                this.handleClose();
            }
            catch (err) {
                this.setState({
                    submissionError: err,
                    pendingSubmission: false,
                });
            }
        });
    }
    handleFormError() {
        this.setState({ formError: true });
    }
    handlePopulateModel(modelAttribute, value) {
        switch (modelAttribute) {
            case 'modelName':
                this.setState(prevState => ({
                    customModel: Object.assign(Object.assign({}, prevState.customModel), { displayName: value }),
                }));
                break;
            case 'exportedModelPath':
                this.setState(prevState => ({
                    customModel: Object.assign(Object.assign({}, prevState.customModel), { artifactUri: value }),
                }));
                break;
            case 'predictSchemataInstances':
                this.setState(prevState => ({
                    customModel: Object.assign(Object.assign({}, prevState.customModel), { predictSchemata: Object.assign(Object.assign({}, prevState.customModel.predictSchemata), { instanceSchemaUri: value }) }),
                }));
                break;
            case 'predictSchemataParameters':
                this.setState(prevState => ({
                    customModel: Object.assign(Object.assign({}, prevState.customModel), { predictSchemata: Object.assign(Object.assign({}, prevState.customModel.predictSchemata), { parametersSchemaUri: value }) }),
                }));
                break;
            case 'predictSchemataPredictions':
                this.setState(prevState => ({
                    customModel: Object.assign(Object.assign({}, prevState.customModel), { predictSchemata: Object.assign(Object.assign({}, prevState.customModel.predictSchemata), { predictionSchemaUri: value }) }),
                }));
                break;
            case 'environmentSelector':
                this.setState(prevState => ({
                    customModel: Object.assign(Object.assign({}, prevState.customModel), { imageUri: value }),
                }));
                break;
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.openFromFile) {
            this.handleOpen();
        }
    }
    render() {
        return (React.createElement(React.Fragment, null,
            !this.props.openFromFile && (React.createElement("div", null,
                React.createElement(core_1.Tooltip, { title: "Upload custom model" },
                    React.createElement(core_1.IconButton, { onClick: this.handleOpen },
                        React.createElement(icons_1.AddIcon, null))))),
            React.createElement(core_1.Drawer, { open: this.state.openDrawer, anchor: "right" },
                React.createElement("header", { className: localStyles.header },
                    React.createElement("span", { className: localStyles.title },
                        "Upload custom model",
                        React.createElement(badge_1.Badge, { value: "experimental" }))),
                React.createElement("main", { className: localStyles.main },
                    React.createElement(upload_custom_form_1.UploadCustomForm, { container: this.state.customModel.imageUri || '', uploadUserInputs: this.handlePopulateModel, filePath: this.props.filePath || '', formError: this.state.formError })),
                React.createElement("div", { className: localStyles.footer },
                    React.createElement(action_bar_1.ActionBar, { onClose: this.handleClose, closeLabel: "Close", alignLeft: true, closeOnRight: true, error: (this.state.submissionError !== '' ||
                            this.state.pendingSubmission) && (React.createElement("div", { className: this.state.submissionError !== ''
                                ? localStyles.error
                                : undefined },
                            React.createElement(message_1.Message, { asActivity: this.state.pendingSubmission, asError: this.state.submissionError !== '', text: this.state.pendingSubmission
                                    ? 'Uploading model'
                                    : this.state.submissionError }))) },
                        React.createElement(submit_button_1.SubmitButton, { actionPending: this.state.pendingSubmission, onClick: () => {
                                this.checkValidSubmit()
                                    ? this.handleUpload()
                                    : this.handleFormError();
                            }, text: "Submit" }))))));
    }
    checkValidSubmit() {
        var _a, _b, _c;
        return (upload_custom_form_1.checkValidModelPath(this.state.customModel.artifactUri) &&
            this.state.customModel.displayName !== '' &&
            upload_custom_form_1.checkValidSchemata((_a = this.state.customModel.predictSchemata) === null || _a === void 0 ? void 0 : _a.instanceSchemaUri) &&
            upload_custom_form_1.checkValidSchemata((_b = this.state.customModel.predictSchemata) === null || _b === void 0 ? void 0 : _b.parametersSchemaUri) &&
            upload_custom_form_1.checkValidSchemata((_c = this.state.customModel.predictSchemata) === null || _c === void 0 ? void 0 : _c.predictionSchemaUri));
    }
}
exports.UploadCustomModelsDrawer = UploadCustomModelsDrawer;
