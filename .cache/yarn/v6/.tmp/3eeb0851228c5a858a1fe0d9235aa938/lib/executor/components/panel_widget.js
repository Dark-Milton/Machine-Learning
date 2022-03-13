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
exports.ExecutorPanelWidget = exports.ExecutorPanel = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const signaling_1 = require("@lumino/signaling");
const React = __importStar(require("react"));
const badge_1 = require("../../components/shared/badge");
const icons_1 = require("../../components/shared/icons");
const message_1 = require("../../components/shared/message");
const theme_1 = require("../../components/shared/theme");
const service_provider_1 = require("../../service/service_provider");
const styles_1 = require("../../styles");
const job_list_item_1 = require("./job_list_item");
const core_1 = require("@material-ui/core");
const paginated_list_1 = require("../../components/shared/paginated_list");
const StyledTabs = core_1.withStyles({
    indicator: {
        backgroundColor: 'rgba(0,0,0,0)',
    },
})(core_1.Tabs);
const StyledTab = core_1.withStyles({
    root: {
        textTransform: 'none',
        borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)',
        fontSize: '14px',
    },
    selected: {
        borderBottom: '2px solid ' + styles_1.COLORS.focus,
    },
})(core_1.Tab);
const TITLE_TEXT = 'Notebook Executor';
/** Panel component for displaying Vertex AI executions */
class ExecutorPanel extends React.Component {
    constructor(props) {
        super(props);
        this.refreshExecutionsSignal = new signaling_1.Signal(this);
        this.refreshSchedulesSignal = new signaling_1.Signal(this);
        this.state = {
            tab: 0,
        };
        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.displayItem = this.displayItem.bind(this);
        this.checkMatch = this.checkMatch.bind(this);
        this.listExecutions = this.listExecutions.bind(this);
        this.listSchedules = this.listSchedules.bind(this);
    }
    componentDidMount() {
        try {
            const projectId = service_provider_1.ServiceProvider.executorService.projectId;
            this.setState({ projectId });
        }
        catch (err) {
            this.setState({ error: `${err}: Unable to determine GCP project` });
        }
    }
    handleChangeTab(event, newValue) {
        this.setState({ tab: newValue });
    }
    handleRefresh() {
        if (this.state.tab === 0) {
            this.refreshExecutionsSignal.emit();
        }
        else {
            this.refreshSchedulesSignal.emit();
        }
    }
    render() {
        const { error, tab } = this.state;
        return (React.createElement("div", { className: styles_1.CSS.panel },
            React.createElement("div", { className: styles_1.CSS.headerContainer },
                React.createElement("header", { className: styles_1.CSS.headerTitle },
                    TITLE_TEXT,
                    " ",
                    React.createElement(badge_1.Badge, { value: "preview" })),
                React.createElement("div", { className: styles_1.CSS.buttonContainer },
                    React.createElement(core_1.IconButton, { title: "Refresh", onClick: this.handleRefresh },
                        React.createElement(icons_1.RefreshIcon, null)))),
            error ? (React.createElement(message_1.Message, { text: error, asError: true })) : (React.createElement(React.Fragment, null,
                React.createElement(StyledTabs, { value: tab, indicatorColor: "primary", variant: "fullWidth", onChange: this.handleChangeTab },
                    React.createElement(StyledTab, { label: "Executions" }),
                    React.createElement(StyledTab, { label: "Schedules" })),
                React.createElement("div", { className: styles_1.CSS.paginatedListContainer, role: "tabpanel", hidden: tab !== 0 },
                    React.createElement(paginated_list_1.PaginatedList, { listItems: this.listExecutions, displayItem: this.displayItem, checkMatch: this.checkMatch, refreshSignal: this.refreshExecutionsSignal })),
                React.createElement("div", { className: styles_1.CSS.paginatedListContainer, role: "tabpanel", hidden: tab !== 1 },
                    React.createElement(paginated_list_1.PaginatedList, { listItems: this.listSchedules, displayItem: this.displayItem, checkMatch: this.checkMatch, refreshSignal: this.refreshSchedulesSignal }))))));
    }
    displayItem(item) {
        const { projectId, tab } = this.state;
        const job = tab === 0 ? item : item;
        return React.createElement(job_list_item_1.JobListItem, { key: job.id, job: job, projectId: projectId || '' });
    }
    checkMatch(item, filter) {
        const job = this.state.tab === 0 ? item : item;
        return job.name.includes(filter);
    }
    listExecutions(pageSize, pageToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield service_provider_1.ServiceProvider.executorService.listExecutions('', pageSize, pageToken);
            return {
                items: response.executions,
                pageToken: response.pageToken,
            };
        });
    }
    listSchedules(pageSize, pageToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield service_provider_1.ServiceProvider.executorService.listSchedules(pageSize, pageToken);
            return {
                items: response.schedules,
                pageToken: response.pageToken,
            };
        });
    }
}
exports.ExecutorPanel = ExecutorPanel;
/** Widget to be registered in the left-side panel. */
class ExecutorPanelWidget extends apputils_1.ReactWidget {
    constructor() {
        super();
        this.visibleSignal = new signaling_1.Signal(this);
        this.title.iconClass = 'jp-Icon jp-Icon-20 jp-ExecutorIcon';
        this.title.caption = TITLE_TEXT;
    }
    onAfterHide() {
        this.visibleSignal.emit(false);
    }
    onAfterShow() {
        this.visibleSignal.emit(true);
    }
    render() {
        return (React.createElement(apputils_1.UseSignal, { signal: this.visibleSignal }, (_, isVisible) => isVisible ? (React.createElement(core_1.ThemeProvider, { theme: theme_1.commonTheme },
            React.createElement(ExecutorPanel, null))) : null));
    }
}
exports.ExecutorPanelWidget = ExecutorPanelWidget;
