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
exports.DeployToEndpointDrawer = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const csstips = __importStar(require("csstips"));
const core_1 = require("@material-ui/core");
const create_endpoint_form_1 = require("./create_endpoint_form");
const existing_endpoint_form_1 = require("./existing_endpoint_form");
const styles_1 = require("../../styles");
const badge_1 = require("../../components/shared/badge");
const submit_button_1 = require("../../components/shared/submit_button");
const action_bar_1 = require("../../executor/components/action_bar");
const message_1 = require("../../components/shared/message");
const toggle_switch_input_1 = require("../../components/shared/toggle_switch_input");
const service_provider_1 = require("../../service/service_provider");
const localStyles = typestyle_1.stylesheet({
    header: Object.assign(Object.assign({}, styles_1.BASE_FONT), { margin: '18px 24px 6px 24px' }),
    titleContainer: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, styles_1.BASE_FONT), { fontWeight: 400, fontSize: '20px' }), csstips.horizontal), csstips.center), { marginBottom: '12px' }),
    title: Object.assign({}, csstips.flex),
    main: Object.assign(Object.assign(Object.assign({ backgroundColor: styles_1.COLORS.white, width: '512px', height: '100%' }, styles_1.BASE_FONT), csstips.vertical), { overflow: 'hidden' }),
    fullWidth: {
        width: '100%',
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
    footer: {
        paddingBottom: '16px',
        paddingLeft: '36px',
        paddingRight: '36px',
        width: '440px',
    },
});
class DeployToEndpointDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.handleChecked = (prev) => {
            this.setState({ createEndpoint: !prev, deployModelData: {} });
        };
        this.state = {
            isLoading: false,
            openDrawer: false,
            createEndpoint: false,
            region: '',
            endpoints: [],
            deployModelData: undefined,
            submissionError: '',
            pendingSubmission: false,
            isFormValid: true,
            progressMessage: '',
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleUpdateDeployData = this.handleUpdateDeployData.bind(this);
        this.handleDeploy = this.handleDeploy.bind(this);
        this.handleCreateAndDeploy = this.handleCreateAndDeploy.bind(this);
    }
    //TODO: Remove logic from setState callback if posible, also reduce if complexity (http://b/198438945)
    handleCreateAndDeploy() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setState({
                submissionError: '',
                pendingSubmission: true,
                progressMessage: 'Creating endpoint...',
            });
            try {
                const deployData = this.state.deployModelData;
                if (!deployData)
                    throw new Error('deployModelData object undefined');
                const createEndpointResult = yield service_provider_1.ServiceProvider.vertexAIService.createEndpointAndPollTillDone(deployData.endpointDisplayName);
                if (createEndpointResult.isError) {
                    this.setState({
                        submissionError: createEndpointResult.result,
                        pendingSubmission: false,
                    });
                    return;
                }
                deployData.endpointName = createEndpointResult.result;
                this.setState({ progressMessage: 'Deploying model...' });
                yield service_provider_1.ServiceProvider.vertexAIService.deployModelAndShowInPanel(this.props.model, deployData);
                this.handleClose();
            }
            catch (err) {
                this.setState({
                    submissionError: String(err),
                    pendingSubmission: false,
                    progressMessage: '',
                });
            }
        });
    }
    handleOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setState({
                openDrawer: true,
                createEndpoint: false,
                region: '',
                endpoints: [],
                deployModelData: undefined,
                submissionError: '',
                pendingSubmission: false,
                isFormValid: true,
                progressMessage: '',
                isLoading: true,
            });
            //perform stuff that would be done on mount
            const region = yield service_provider_1.ServiceProvider.vertexAIService.region;
            const endpointsList = yield service_provider_1.ServiceProvider.vertexAIService.listEndpoints();
            this.setState({
                endpoints: endpointsList.endpoints || [],
                region,
                createEndpoint: endpointsList.endpoints === undefined,
                isLoading: false,
            });
        });
    }
    handleClose() {
        this.setState({ openDrawer: false });
    }
    handleUpdateDeployData(deployData) {
        this.setState({
            deployModelData: deployData,
            isFormValid: !deployData.submissionError,
        });
    }
    handleDeploy() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.state.isFormValid) {
                this.setState({
                    submissionError: 'There are form errors',
                    progressMessage: '',
                    pendingSubmission: false,
                });
                return;
            }
            this.setState({
                submissionError: '',
                progressMessage: 'Deploying model....',
                pendingSubmission: true,
            });
            try {
                if (!this.state.deployModelData) {
                    throw new Error('deployModelData object undefined');
                }
                yield service_provider_1.ServiceProvider.vertexAIService.deployModelAndShowInPanel(this.props.model, this.state.deployModelData);
                this.handleClose();
            }
            catch (err) {
                this.setState({
                    submissionError: String(err),
                    pendingSubmission: false,
                    progressMessage: '',
                });
            }
        });
    }
    render() {
        const { model } = this.props;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: localStyles.fullWidth, onClick: this.handleOpen }, "Deploy to endpoint"),
            React.createElement(core_1.Drawer, { open: this.state.openDrawer, anchor: "right" },
                React.createElement("header", { className: localStyles.header },
                    React.createElement("div", { className: localStyles.titleContainer },
                        React.createElement("span", { className: localStyles.title },
                            "Deploy to endpoint",
                            React.createElement(badge_1.Badge, { value: "experimental" }))),
                    !this.state.isLoading && (React.createElement(toggle_switch_input_1.ToggleSwitch, { labelRight: 'Use existing endpoint', labelLeft: 'Create new endpoint', name: "createEndpoint", id: "createEndpoint", checked: this.state.createEndpoint, disabled: this.state.endpoints === undefined ||
                            this.state.endpoints.length === 0, onChange: () => this.handleChecked(this.state.createEndpoint) }))),
                React.createElement("main", { className: localStyles.main }, this.state.isLoading ? (React.createElement(core_1.LinearProgress, null)) : this.state.createEndpoint === false &&
                    this.state.endpoints &&
                    this.state.endpoints.length > 0 ? (React.createElement(existing_endpoint_form_1.ExistingEndpointForm, { region: this.state.region, machineType: service_provider_1.ServiceProvider.vertexAIService.machineValConfig, model: model, endpoints: this.state.endpoints, uploadUserInputs: this.handleUpdateDeployData })) : (React.createElement(create_endpoint_form_1.CreateEndpointForm, { region: this.state.region, machineType: service_provider_1.ServiceProvider.vertexAIService.machineValConfig, model: model, uploadUserInputs: this.handleUpdateDeployData }))),
                React.createElement("div", { className: localStyles.footer },
                    React.createElement(action_bar_1.ActionBar, { onClose: this.handleClose, closeLabel: "Close", alignLeft: true, closeOnRight: true, error: (this.state.submissionError !== '' ||
                            this.state.pendingSubmission) && (React.createElement("div", null,
                            React.createElement(message_1.Message, { asActivity: this.state.pendingSubmission, asError: this.state.submissionError !== '', text: this.state.progressMessage || this.state.submissionError }))) },
                        React.createElement(submit_button_1.SubmitButton, { actionPending: this.state.pendingSubmission, onClick: this.state.createEndpoint
                                ? this.handleCreateAndDeploy
                                : this.handleDeploy, text: this.state.createEndpoint ? 'Create' : 'Deploy' }))))));
    }
}
exports.DeployToEndpointDrawer = DeployToEndpointDrawer;
