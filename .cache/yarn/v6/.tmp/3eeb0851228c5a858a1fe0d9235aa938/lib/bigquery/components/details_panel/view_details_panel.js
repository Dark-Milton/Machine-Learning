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
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const React = __importStar(require("react"));
const service_provider_1 = require("../../../service/service_provider");
const utils_1 = require("../../../utils");
const starter_queries_1 = require("../../utils/starter_queries");
const widget_manager_1 = require("../../utils/widgetManager/widget_manager");
const loading_panel_1 = __importDefault(require("../loading_panel"));
const query_editor_tab_widget_1 = require("../query_editor/query_editor_tab/query_editor_tab_widget");
const header_1 = require("../shared/header");
const styles_1 = require("../shared/styles");
const dataset_details_panel_1 = require("./dataset_details_panel");
const details_panel_1 = require("./details_panel");
class ViewDetailsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLoaded: false,
            isLoading: false,
            details: { details: {} },
            rows: [],
        };
    }
    componentDidUpdate(prevProps) {
        const isFirstLoad = !(this.state.hasLoaded || prevProps.isVisible) && this.props.isVisible;
        if (isFirstLoad) {
            this.getDetails();
        }
    }
    getDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setState({ isLoading: true });
                const details = yield service_provider_1.ServiceProvider.bigQueryService.listViewDetails(this.props.view_id);
                const detailsObj = details.details;
                const rows = [
                    { name: 'View ID', value: detailsObj.id },
                    { name: 'Created', value: utils_1.formatDate(detailsObj.date_created) },
                    { name: 'Last modified', value: utils_1.formatDate(detailsObj.last_modified) },
                    {
                        name: 'View expiration',
                        value: detailsObj.expires ? utils_1.formatDate(detailsObj.expires) : 'Never',
                    },
                    {
                        name: 'Use Legacy SQL',
                        value: detailsObj.legacy_sql ? 'true' : 'false',
                    },
                ];
                this.setState({ hasLoaded: true, details, rows });
            }
            catch (err) {
                utils_1.appLog.warn('Error retrieving view details', err);
            }
            finally {
                this.setState({ isLoading: false });
            }
        });
    }
    render() {
        if (this.state.isLoading) {
            return React.createElement(loading_panel_1.default, null);
        }
        else {
            return (React.createElement("div", { className: dataset_details_panel_1.localStyles.container },
                React.createElement(header_1.Header, null,
                    this.props.view_name,
                    React.createElement(core_1.Button, { onClick: () => {
                            const starterQuery = starter_queries_1.getStarterQuery('VIEW', this.props.view_id, this.state.details.details.legacy_sql);
                            const options = {
                                widgetType: query_editor_tab_widget_1.QueryEditorTabWidget,
                                windowType: 'main',
                                widgetArgs: [
                                    starterQuery,
                                    this.state.details.details.legacy_sql,
                                ],
                            };
                            widget_manager_1.WidgetManager.getInstance().launchWidget(options);
                        }, startIcon: React.createElement(icons_1.Code, null), style: {
                            textTransform: 'none',
                            color: styles_1.gColor('BLUE'),
                        } }, "Query view")),
                React.createElement("div", { className: dataset_details_panel_1.localStyles.body },
                    React.createElement(details_panel_1.DetailsPanel, { details: this.state.details.details, rows: this.state.rows, detailsType: "VIEW" }))));
        }
    }
}
exports.default = ViewDetailsPanel;
