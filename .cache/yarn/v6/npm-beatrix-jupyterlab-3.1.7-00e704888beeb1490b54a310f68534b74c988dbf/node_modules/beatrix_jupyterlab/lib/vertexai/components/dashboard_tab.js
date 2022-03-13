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
exports.DashboardTab = exports.cardInfos = void 0;
const csstips = __importStar(require("csstips"));
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const icons_1 = require("../../components/shared/icons");
const styles_1 = require("../../styles");
const core_1 = require("@material-ui/core");
const utils_1 = require("../utils");
const enable_api_1 = require("./enable_api");
const learn_more_link_1 = require("../../components/shared/learn_more_link");
const service_provider_1 = require("../../service/service_provider");
exports.cardInfos = [
    {
        title: 'Models',
        description: `Models are built from your datasets or unmanaged data sources. There are many different types of machine learning models available on Vertex AI, depending on your use case and level of experience with machine learning.`,
        landingPage: `${utils_1.CONSOLE_LINK_PREFIX}/models`,
        docs: `${utils_1.LEARN_MORE_API}/start/training-methods`,
    },
    {
        title: 'Custom Training',
        description: `Custom trained models use training pipelines that orchestrate custom training jobs and hyperparameter tuning with additional steps like adding a dataset or uploading the model to Vertex AI for prediction serving.`,
        landingPage: `${utils_1.CONSOLE_LINK_PREFIX}/training/custom-jobs`,
        docs: `${utils_1.LEARN_MORE_API}/training/custom-training`,
    },
    {
        title: 'Endpoints',
        description: `Endpoints are machine learning models made available for online prediction requests. Endpoints are useful for timely predictions from many users (for example, in response to an application request). You can also request batch predictions if you don't need immediate results.`,
        landingPage: `${utils_1.CONSOLE_LINK_PREFIX}/endpoints`,
        docs: `${utils_1.LEARN_MORE_API}/predictions/deploy-model-console`,
    },
];
const localStyles = typestyle_1.stylesheet({
    card: Object.assign(Object.assign({}, styles_1.BASE_FONT), { margin: '16px 16px 0px 16px', padding: '16px 16px 16px 16px' }),
    title: Object.assign(Object.assign(Object.assign({}, csstips.flex), styles_1.BASE_FONT), { fontWeight: 'bold', fontSize: '16px', padding: '4px 5px', margin: '5px 0px' }),
    cardSubtitle: Object.assign(Object.assign({}, styles_1.BASE_FONT), { fontWeight: 'normal', fontSize: '14px', margin: '5px 0px', padding: '4px 5px' }),
    cardTable: {
        padding: '0px',
        margin: '0px',
    },
    tableKey: {
        padding: '4px !important',
        fontSize: '14px',
        lineHeight: '0px',
        fontWeight: 'bold !important', // needed for !important clause
    },
    tableValue: {
        padding: '4px !important',
        fontSize: '14px',
        lineHeight: '0px',
    },
    tab: Object.assign({}, csstips.flex),
    button: {
        color: styles_1.COLORS.blue + ' !important',
    },
    bottomMargin: {
        marginBottom: '16px !important',
    },
});
/** Tab for displaying links to docs and landing pages and user info. */
class DashboardTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const vertexAIService = service_provider_1.ServiceProvider.vertexAIService;
        const userValues = {
            project: { text: 'Project', value: vertexAIService.projectId },
            region: { text: 'Region', value: vertexAIService.region },
            machineConfiguration: {
                text: 'Machine configuration',
                value: vertexAIService.machineValConfig,
            },
            gpuConfiguration: {
                text: 'GPU configuration',
                value: vertexAIService.gpuConfig
                    ? `${vertexAIService.gpuConfig.type} x ${vertexAIService.gpuConfig.coreCount}`
                    : 'None',
            },
            bucket: { text: 'Bucket', value: vertexAIService.bucketName },
        };
        this.setState({ userValues });
    }
    render() {
        return (React.createElement("div", { className: localStyles.tab }, !this.props.isAPIEnabled ? (React.createElement(enable_api_1.EnableApi, { onAPIEnabled: this.props.onAPIEnabled })) : (React.createElement(React.Fragment, null,
            exports.cardInfos.map(cardInfo => this._getLearnMoreCard(cardInfo)),
            this.state.userValues && (React.createElement(core_1.Card, { id: "user-info-card", className: typestyle_1.classes(localStyles.card, localStyles.bottomMargin) },
                React.createElement(core_1.Table, { className: localStyles.cardTable },
                    React.createElement(core_1.TableBody, null, Object.entries(this.state.userValues).map(keyValue => this._getTableRow(keyValue[0], keyValue[1]))))))))));
    }
    _getLearnMoreCard(cardInfo) {
        const idKey = `${cardInfo.title.replace(' ', '-').toLowerCase()}-card`;
        return (React.createElement(core_1.Card, { id: idKey, key: idKey, className: localStyles.card },
            React.createElement("a", { href: cardInfo.landingPage, target: "_blank" },
                React.createElement("span", { className: localStyles.title }, cardInfo.title),
                React.createElement(icons_1.SmallLaunchIcon, null)),
            React.createElement("p", { className: localStyles.cardSubtitle },
                cardInfo.description,
                ' ',
                React.createElement(learn_more_link_1.LearnMoreLink, { href: cardInfo.docs }))));
    }
    _getTableRow(key, userValue) {
        return (React.createElement(core_1.TableRow, { key: key },
            React.createElement(core_1.TableCell, { className: localStyles.tableKey, align: "left" }, userValue.text),
            React.createElement(core_1.TableCell, { className: localStyles.tableValue, align: "left" }, userValue.value)));
    }
}
exports.DashboardTab = DashboardTab;
