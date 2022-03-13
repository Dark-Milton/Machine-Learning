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
exports.DeployedModelsForModelDrawer = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const csstips = __importStar(require("csstips"));
const core_1 = require("@material-ui/core");
const styles_1 = require("../../styles");
const learn_more_link_1 = require("../../components/shared/learn_more_link");
const submit_button_1 = require("../../components/shared/submit_button");
const styles_2 = require("../../styles");
const cron_1 = require("../../executor/cron");
const message_1 = require("../../components/shared/message");
const core_2 = require("@material-ui/core");
const icons_1 = require("../../components/shared/icons");
const utils_1 = require("../utils");
const service_provider_1 = require("../../service/service_provider");
const localStyles = typestyle_1.stylesheet({
    header: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, styles_1.BASE_FONT), { fontWeight: 400, fontSize: '20px', margin: '18px 24px 18px 24px' }), csstips.horizontal), csstips.center), { a: {
            maxWidth: 'fit-content',
        } }),
    title: Object.assign({}, csstips.flex),
    main: Object.assign(Object.assign(Object.assign({ backgroundColor: styles_1.COLORS.white, width: '452px', height: '100%' }, styles_1.BASE_FONT), csstips.vertical), { overflowX: 'hidden', overflowY: 'scroll', padding: '0px 30px' }),
    spacing: {
        padding: '24px',
    },
    tableBodyCell: {
        padding: '6px 36px',
    },
    fullWidth: {
        width: '100%',
    },
    buttonContainer: {
        textAlign: 'left !important',
        padding: '16px',
    },
    table: {
        border: '1px solid rgba(224, 224, 224, 1)',
    },
    tableTitle: {
        padding: '8px 0',
        margin: '0',
    },
    message: {
        margin: '16px 0',
    },
    learnMoreLink: {
        textTransform: 'uppercase',
        a: {
            color: 'var(--jp-brand-color-1, #2196f3) !important',
        },
        padding: '16px 0',
    },
});
class DeployedModelsForModelDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDrawer: false,
            isLoading: false,
            deployedModels: [],
            loadingError: '',
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.viewEndpointLink = this.viewEndpointLink.bind(this);
    }
    handleOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setState({
                openDrawer: true,
                deployedModels: [],
                isLoading: true,
                loadingError: '',
            });
            try {
                const deployedModels = yield service_provider_1.ServiceProvider.vertexAIService.getAllDeployedModelsForModel(this.props.model);
                this.setState({ deployedModels: deployedModels, isLoading: false });
            }
            catch (err) {
                this.setState({
                    loadingError: err,
                    isLoading: false,
                });
            }
        });
    }
    handleClose() {
        this.setState({ openDrawer: false });
    }
    viewEndpointLink(endpointID) {
        const parts = endpointID.split('/');
        return `${utils_1.CONSOLE_LINK_PREFIX}/locations/${service_provider_1.ServiceProvider.vertexAIService.region}/endpoints/${parts[parts.length - 1]}?project=${service_provider_1.ServiceProvider.vertexAIService.projectId}`;
    }
    render() {
        const modelId = utils_1.parseIdFromName(this.props.model.name || '');
        return (React.createElement(React.Fragment, null,
            React.createElement("p", { id: "viewDeployedModels", onClick: this.handleOpen, className: localStyles.fullWidth }, "View deployed models"),
            React.createElement(core_1.Drawer, { open: this.state.openDrawer, anchor: "right" },
                React.createElement("header", { className: localStyles.header },
                    React.createElement("a", { target: "_blank", href: utils_1.getConsoleLinkForModel(service_provider_1.ServiceProvider.vertexAIService.region, modelId, service_provider_1.ServiceProvider.vertexAIService.projectId) },
                        React.createElement("span", { className: localStyles.title },
                            "Deployed Models for ",
                            this.props.model.displayName || modelId),
                        React.createElement(icons_1.SmallLaunchIcon, null))),
                React.createElement("main", { className: localStyles.main },
                    this.state.isLoading && React.createElement(core_1.LinearProgress, null),
                    this.state.loadingError !== '' && (React.createElement("div", { className: localStyles.message },
                        React.createElement(message_1.Message, { asError: true, text: this.state.loadingError }))),
                    this.state.deployedModels.length === 0 && (React.createElement("div", { className: localStyles.message },
                        React.createElement(message_1.Message, { asError: false, text: "No deployed models." }))),
                    this.state.deployedModels.length > 0 &&
                        !this.state.isLoading &&
                        this.state.loadingError === '' &&
                        this.state.deployedModels.map(deployedModel => (React.createElement("div", { key: deployedModel.modelID },
                            React.createElement("h3", { className: localStyles.tableTitle },
                                "Deployed to ",
                                deployedModel.endpointName),
                            React.createElement(core_2.Table, { size: "small", className: localStyles.table },
                                React.createElement(core_2.TableBody, null,
                                    React.createElement(core_2.TableRow, { id: "create-time" },
                                        React.createElement(core_2.TableCell, { component: "th", scope: "row" }, "Create time"),
                                        React.createElement(core_2.TableCell, { align: "right" }, cron_1.customShortDateFormat(new Date(deployedModel.createTime)))),
                                    React.createElement(core_2.TableRow, { id: "traffic-split" },
                                        React.createElement(core_2.TableCell, { component: "th", scope: "row" }, "Traffic split"),
                                        React.createElement(core_2.TableCell, { align: "right" }, deployedModel.trafficSplit)))),
                            React.createElement("div", { className: typestyle_1.classes(styles_2.CSS.bold, localStyles.spacing, localStyles.learnMoreLink) },
                                React.createElement(learn_more_link_1.LearnMoreLink, { noUnderline: true, href: this.viewEndpointLink(deployedModel.endpointID), text: "View in cloud console" })))))),
                React.createElement("div", { className: localStyles.buttonContainer },
                    React.createElement(submit_button_1.SubmitButton, { actionPending: false, onClick: this.handleClose, text: "Close" })))));
    }
}
exports.DeployedModelsForModelDrawer = DeployedModelsForModelDrawer;
