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
exports.localStyles = void 0;
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const styles_1 = require("../../../styles");
const starter_queries_1 = require("../../utils/starter_queries");
const loading_panel_1 = __importDefault(require("../loading_panel"));
const query_editor_tab_widget_1 = require("../query_editor/query_editor_tab/query_editor_tab_widget");
const header_1 = require("../shared/header");
const info_card_1 = __importDefault(require("../shared/info_card"));
const styles_2 = require("../shared/styles");
const tabs_1 = require("../shared/tabs");
const table_details_panel_1 = require("./table_details_panel");
const table_preview_1 = __importDefault(require("./table_preview"));
const widget_manager_1 = require("../../utils/widgetManager/widget_manager");
const service_provider_1 = require("../../../service/service_provider");
exports.localStyles = typestyle_1.stylesheet({
    body: {
        margin: '24px',
        marginBottom: 0,
        fontSize: '13px',
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
    },
    tableDetailsRoot: Object.assign({ display: 'flex', flexFlow: 'column', height: '100%' }, styles_1.BASE_FONT),
});
var TabInds;
(function (TabInds) {
    TabInds[TabInds["details"] = 0] = "details";
    TabInds[TabInds["preview"] = 1] = "preview";
})(TabInds || (TabInds = {}));
class TableDetailsTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLoaded: false,
            isLoading: false,
            details: { details: {} },
            rows: [],
            currentTab: TabInds.details,
            showPartitionCard: true,
        };
    }
    handleChange(event, newValue) {
        this.setState({ currentTab: newValue });
    }
    render() {
        if (this.state.isLoading) {
            return React.createElement(loading_panel_1.default, null);
        }
        else {
            return (React.createElement("div", { className: exports.localStyles.tableDetailsRoot },
                React.createElement(header_1.Header, null, this.props.table_name),
                React.createElement("div", { className: exports.localStyles.body, style: {
                        marginTop: '16px',
                    } },
                    React.createElement("div", null,
                        React.createElement(core_1.Button, { onClick: () => {
                                const options = {
                                    widgetType: query_editor_tab_widget_1.QueryEditorTabWidget,
                                    windowType: 'main',
                                    widgetArgs: [starter_queries_1.getStarterQuery('TABLE', this.props.table_id)],
                                };
                                widget_manager_1.WidgetManager.getInstance().launchWidget(options);
                            }, startIcon: React.createElement(icons_1.Code, null), style: {
                                textTransform: 'none',
                                color: styles_2.gColor('BLUE'),
                                justifyContent: 'flex-start',
                                maxWidth: 'fit-content',
                            } }, "Query table"),
                        React.createElement(core_1.Button, { onClick: () => {
                                service_provider_1.ServiceProvider.bigQueryService.createNotebookBigQueryTableStatsCountMagics(this.props.table_id);
                            }, style: {
                                textTransform: 'none',
                                color: styles_2.gColor('BLUE'),
                            } }, "Generate Statistics")),
                    this.props.partitioned && this.state.showPartitionCard && (React.createElement(info_card_1.default, { message: React.createElement("div", null,
                            "This is a partitioned table.",
                            ' ',
                            React.createElement("a", { style: { textDecoration: 'underline' }, href: "https://cloud.google.com/bigquery/docs/partitioned-tables?_ga=2.65379946.-555088760.1592854116", target: "_blank" }, "Learn more")), color: "gray", icon: React.createElement(icons_1.Info, null), button: React.createElement(core_1.Button, { size: "small", style: {
                                textTransform: 'none',
                                color: 'var(--jp-ui-font-color1)',
                            }, onClick: () => {
                                this.setState({ showPartitionCard: false });
                            } }, "Dismiss") })),
                    React.createElement(tabs_1.StyledTabs, { value: this.state.currentTab, onChange: this.handleChange.bind(this), color: styles_2.gColor('BLUE') },
                        React.createElement(tabs_1.StyledTab, { label: "Details", color: styles_2.gColor('BLUE') }),
                        React.createElement(tabs_1.StyledTab, { label: "Preview", color: styles_2.gColor('BLUE') })),
                    React.createElement(tabs_1.TabPanel, { value: this.state.currentTab, index: TabInds.details, TabInds: TabInds },
                        React.createElement(table_details_panel_1.TableDetailsPanel, { tableId: this.props.table_id, isVisible: this.props.isVisible })),
                    React.createElement(tabs_1.TabPanel, { value: this.state.currentTab, index: TabInds.preview, TabInds: TabInds },
                        React.createElement(table_preview_1.default, { tableId: this.props.table_id, isVisible: this.props.isVisible })))));
        }
    }
}
exports.default = TableDetailsTabs;
