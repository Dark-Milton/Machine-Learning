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
exports.DeployedModelsDrawer = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const csstips = __importStar(require("csstips"));
const core_1 = require("@material-ui/core");
const styles_1 = require("../../styles");
const submit_button_1 = require("../../components/shared/submit_button");
const cron_1 = require("../../executor/cron");
const learn_more_link_1 = require("../../components/shared/learn_more_link");
const styles_2 = require("../../styles");
const core_2 = require("@material-ui/core");
const icons_1 = require("../../components/shared/icons");
const utils_1 = require("../utils");
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
    buttonContainer: {
        textAlign: 'left !important',
        padding: '16px',
    },
    tableTitle: {
        padding: '8px 0',
        margin: '0',
    },
    learnMoreLink: {
        textTransform: 'uppercase',
        a: {
            color: 'var(--jp-brand-color-1, #2196f3) !important',
        },
        padding: '16px 0',
    },
    table: {
        border: '1px solid rgba(224, 224, 224, 1)',
    },
});
class DeployedModelsDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDrawer: false,
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleOpen() {
        this.setState({ openDrawer: true });
    }
    handleClose() {
        this.setState({ openDrawer: false });
    }
    render() {
        const { endpointDisplayName, endpointConsoleLink, deployedModels, trafficSplit, } = this.props;
        return (React.createElement(React.Fragment, null,
            React.createElement("p", { onClick: this.handleOpen, className: localStyles.fullWidth }, "View deployed models"),
            React.createElement(core_1.Drawer, { open: this.state.openDrawer, anchor: "right" },
                React.createElement("header", { className: localStyles.header },
                    React.createElement("a", { target: "_blank", href: endpointConsoleLink },
                        React.createElement("span", { className: localStyles.title },
                            "Deployed Models: ",
                            endpointDisplayName),
                        React.createElement(icons_1.SmallLaunchIcon, null))),
                React.createElement("main", { className: localStyles.main }, deployedModels !== undefined ? (deployedModels.map(model => {
                    const displayName = model.displayName || utils_1.parseIdFromName(model.id || '');
                    const serviceAccount = model.serviceAccount || `None`;
                    const createTime = model.createTime
                        ? cron_1.customShortDateFormat(new Date(model.createTime))
                        : `None`;
                    const trafficSplitText = trafficSplit && model.id && trafficSplit[model.id]
                        ? `${trafficSplit[model.id]}%`
                        : 'None';
                    return (React.createElement("div", { key: model.id },
                        React.createElement("h3", { className: localStyles.tableTitle }, displayName),
                        React.createElement(core_2.Table, { size: "small", className: localStyles.table },
                            React.createElement(core_2.TableBody, null,
                                React.createElement(core_2.TableRow, { id: "service-account" },
                                    React.createElement(core_2.TableCell, { scope: "row" }, "Service account"),
                                    React.createElement(core_2.TableCell, { align: "right" }, serviceAccount)),
                                React.createElement(core_2.TableRow, { id: "create-time" },
                                    React.createElement(core_2.TableCell, { scope: "row" }, "Create time"),
                                    React.createElement(core_2.TableCell, { align: "right" }, createTime)),
                                React.createElement(core_2.TableRow, { id: "traffic-split" },
                                    React.createElement(core_2.TableCell, { scope: "row" }, "Traffic split"),
                                    React.createElement(core_2.TableCell, { align: "right" }, trafficSplitText)))),
                        React.createElement("div", { className: typestyle_1.classes(styles_2.CSS.bold, localStyles.spacing, localStyles.learnMoreLink) },
                            React.createElement(learn_more_link_1.LearnMoreLink, { noUnderline: true, href: this.getModelConsoleLink(model.model || ''), text: "View in cloud console" }))));
                })) : (React.createElement("p", null, "No deployed models."))),
                React.createElement("div", { className: localStyles.buttonContainer },
                    React.createElement(submit_button_1.SubmitButton, { actionPending: false, onClick: this.handleClose, text: "Close" })))));
    }
    getModelConsoleLink(modelPath) {
        const { 1: project, 3: location, 5: model } = modelPath.split('/');
        return `${utils_1.CONSOLE_LINK_PREFIX}/locations/${location}/models/${model}/deploy?project=${project}`;
    }
}
exports.DeployedModelsDrawer = DeployedModelsDrawer;
