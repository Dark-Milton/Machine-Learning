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
exports.VertexAIPanelWidget = exports.VertexAIPanel = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const signaling_1 = require("@lumino/signaling");
const core_1 = require("@material-ui/core");
const csstips = __importStar(require("csstips"));
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const badge_1 = require("../../components/shared/badge");
const select_input_1 = require("../../components/shared/select_input");
const service_provider_1 = require("../../service/service_provider");
const styles_1 = require("../../styles");
const utils_1 = require("../utils");
const dashboard_tab_1 = require("./dashboard_tab");
const endpoints_item_1 = require("./endpoints_item");
const models_tab_item_1 = require("./models_tab_item");
const resource_list_1 = require("./resource_list");
const upload_custom_drawer_1 = require("./upload_custom_drawer");
const DASHBOARD_OPTION = {
    text: 'Dashboard',
    value: 'dashboard',
};
const MODELS_OPTION = {
    text: 'Models',
    value: 'models',
};
const ENDPOINTS_OPTION = {
    text: 'Endpoints',
    value: 'endpoints',
};
const NAVIGATION_OPTIONS = [DASHBOARD_OPTION, MODELS_OPTION, ENDPOINTS_OPTION];
const NO_API_NAVIGATION_OPTIONS = [DASHBOARD_OPTION];
const TITLE_TEXT = 'Vertex AI';
const localStyles = typestyle_1.stylesheet({
    headerContainer: Object.assign(Object.assign({}, csstips.horizontal), { padding: '16px 16px 0px 16px' }),
    header: Object.assign({ fontWeight: 'bold', fontSize: '16px', margin: 0, padding: '8px 12px 0px 12px' }, csstips.flex),
    panel: Object.assign(Object.assign({ backgroundColor: styles_1.COLORS.white, height: '100%' }, styles_1.BASE_FONT), csstips.vertical),
    selector: {
        padding: '8px 16px 0px 16px',
    },
    view: Object.assign(Object.assign({ overflow: 'auto' }, csstips.flex), csstips.vertical),
});
/** Panel component for displaying Vertex AI integration */
class VertexAIPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            navigation: DASHBOARD_OPTION,
            isAPIEnabled: false,
        };
        this.onVisible = this.onVisible.bind(this);
        this.onNavigation = this.onNavigation.bind(this);
        this.onAPIEnabled = this.onAPIEnabled.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.isVisible !== this.props.isVisible && this.props.isVisible) {
            this.onVisible();
        }
    }
    onVisible() {
        return __awaiter(this, void 0, void 0, function* () {
            const isAPIEnabled = yield service_provider_1.ServiceProvider.vertexAIService.isAPIEnabled();
            this.setState({ isAPIEnabled, isLoading: false });
        });
    }
    onNavigation(e) {
        const navigation = NAVIGATION_OPTIONS.find(o => o.value === e.target.value);
        if (navigation) {
            this.setState({ navigation });
        }
    }
    onAPIEnabled() {
        this.setState({ isAPIEnabled: true });
    }
    render() {
        const { navigation, isLoading } = this.state;
        return (React.createElement("div", { className: localStyles.panel },
            React.createElement("div", { className: localStyles.headerContainer },
                React.createElement("header", { className: localStyles.header },
                    TITLE_TEXT,
                    " ",
                    React.createElement(badge_1.Badge, { value: "experimental" }))),
            React.createElement("div", { className: localStyles.selector },
                React.createElement(select_input_1.SelectInput, { label: "Resource type", name: "navigation", value: String(navigation.value), noBottomSpacing: true, options: this.state.isAPIEnabled
                        ? NAVIGATION_OPTIONS
                        : NO_API_NAVIGATION_OPTIONS, onChange: this.onNavigation })),
            isLoading && React.createElement(core_1.LinearProgress, null),
            !isLoading && (React.createElement("div", { className: localStyles.view },
                navigation === DASHBOARD_OPTION && (React.createElement(dashboard_tab_1.DashboardTab, { isAPIEnabled: this.state.isAPIEnabled, onAPIEnabled: this.onAPIEnabled })),
                navigation === MODELS_OPTION && this.getModelsList(),
                navigation === ENDPOINTS_OPTION && this.getEndpointsList()))));
    }
    getModelsList() {
        return (React.createElement(resource_list_1.ResourceList, { listResources: (pageSize, pageToken) => __awaiter(this, void 0, void 0, function* () {
                const result = yield service_provider_1.ServiceProvider.vertexAIService.listModels(pageSize, pageToken);
                return {
                    items: result.models || [],
                    pageToken: result.nextPageToken || '',
                };
            }), displayItem: item => {
                const model = item;
                return React.createElement(models_tab_item_1.ModelItem, { key: model.name, model: model });
            }, additionalActions: React.createElement(upload_custom_drawer_1.UploadCustomModelsDrawer, null), checkMatch: (item, filter) => {
                const model = item;
                return model.displayName
                    ? model.displayName.includes(filter)
                    : utils_1.parseIdFromName(model.name).includes(filter);
            } }));
    }
    getEndpointsList() {
        return (React.createElement(resource_list_1.ResourceList, { listResources: (pageSize, pageToken) => __awaiter(this, void 0, void 0, function* () {
                const result = yield service_provider_1.ServiceProvider.vertexAIService.listEndpoints(pageSize, pageToken);
                return {
                    items: result.endpoints || [],
                    pageToken: result.nextPageToken || '',
                };
            }), displayItem: item => {
                const endpoint = item;
                return React.createElement(endpoints_item_1.EndpointItem, { key: endpoint.name, endpoint: endpoint });
            }, checkMatch: (item, filter) => {
                const endpoint = item;
                return endpoint.displayName
                    ? endpoint.displayName.includes(filter)
                    : utils_1.parseIdFromName(endpoint.name).includes(filter);
            } }));
    }
}
exports.VertexAIPanel = VertexAIPanel;
/** Widget to be registered in the left-side panel. */
class VertexAIPanelWidget extends apputils_1.ReactWidget {
    constructor() {
        super();
        this.visibleSignal = new signaling_1.Signal(this);
        this.title.iconClass = 'jp-Icon jp-Icon-20 jp-VertexAIIcon';
        this.title.caption = TITLE_TEXT;
    }
    onAfterHide() {
        this.visibleSignal.emit(false);
    }
    onAfterShow() {
        this.visibleSignal.emit(true);
    }
    render() {
        return (React.createElement(apputils_1.UseSignal, { signal: this.visibleSignal }, (_, isVisible) => React.createElement(VertexAIPanel, { isVisible: !!isVisible })));
    }
}
exports.VertexAIPanelWidget = VertexAIPanelWidget;
