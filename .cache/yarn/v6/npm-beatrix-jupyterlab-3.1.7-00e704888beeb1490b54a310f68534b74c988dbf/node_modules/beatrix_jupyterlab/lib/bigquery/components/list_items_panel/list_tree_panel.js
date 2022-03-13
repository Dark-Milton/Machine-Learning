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
const Add_1 = __importDefault(require("@material-ui/icons/Add"));
const Refresh_1 = __importDefault(require("@material-ui/icons/Refresh"));
const csstips = __importStar(require("csstips"));
const React = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const typestyle_1 = require("typestyle");
const dialog_1 = require("../../../components/shared/dialog");
const styles_1 = require("../../../styles");
const snackbarSlice_1 = require("../../reducers/snackbarSlice");
const widget_manager_1 = require("../../utils/widgetManager/widget_manager");
const query_editor_tab_widget_1 = require("../query_editor/query_editor_tab/query_editor_tab_widget");
const query_history_widget_1 = require("../query_history/query_history_widget");
const snackbar_1 = __importDefault(require("../shared/snackbar"));
const styles_2 = require("../shared/styles");
const list_search_results_1 = __importDefault(require("./list_search_results"));
const list_tree_item_1 = require("./list_tree_item");
const search_bar_1 = require("./search_bar");
const core_1 = require("@material-ui/core");
const dataTreeSlice_1 = require("../../reducers/dataTreeSlice");
const styles_3 = require("../../../styles");
const utils_1 = require("../../../utils");
const service_provider_1 = require("../../../service/service_provider");
const localStyles = typestyle_1.stylesheet({
    headerContainer: {
        borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)',
        fontWeight: 500,
        fontSize: '14px',
        margin: 0,
        padding: '10px 12px',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
    },
    resources: {
        borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)',
        padding: '8px 12px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        overflow: 'hidden',
    },
    resourcesTitle: {
        fontWeight: 500,
        fontSize: '13px',
        margin: 0,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '8px',
        alignItems: 'center',
    },
    search: {
        marginBottom: '8px',
    },
    buttonWithIcon: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
    },
    buttonLabel: {
        fontWeight: 400,
        fontSize: 'var(--jp-ui-font-size1)',
        textTransform: 'initial',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    editQueryButton: {
        margin: 'auto',
        flexGrow: 0,
        minWidth: 0,
    },
    pinProjectsButton: {
        margin: 'auto',
        flexGrow: 0,
        padding: 0,
        minWidth: 0,
    },
    list: Object.assign({ margin: 0, flexDirection: 'column', display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '1fr', flexGrow: 1, overflow: 'auto', padding: 0 }, csstips.flex),
    resourceTree: {
        gridColumnStart: 1,
        gridRowStart: 1,
    },
    hidden: Object.assign({ display: 'none', margin: 0, padding: 0 }, csstips.flex),
    showing: Object.assign({ zIndex: 1, gridColumnStart: 1, gridRowStart: 1, backgroundColor: 'var(--jp-layout-color1)', margin: 0, padding: 0 }, csstips.flex),
    panel: Object.assign(Object.assign({ backgroundColor: 'var(--jp-layout-color1)', height: '100%' }, styles_1.BASE_FONT), csstips.vertical),
    enableSearch: Object.assign(Object.assign({}, csstips.flex), { display: 'flex', flexDirection: 'row', alignItems: 'center' }),
    queryHistory: {
        fontWeight: 500,
        fontSize: '13px',
        margin: 0,
        padding: '10px 14px',
        '&:hover': {
            backgroundColor: 'var(--jp-layout-color2)',
            opacity: 1,
            cursor: 'pointer',
        },
    },
    input: {
        backgroundColor: 'var(--jp-input-active-background)',
        color: 'var(--jp-ui-font-color1)',
    },
});
class ListItemsPanel extends React.Component {
    constructor(props) {
        super(props);
        // Handlers for searching
        this.handleOpenSearchDialog = () => {
            const { searchToggled } = this.state;
            this.setState({
                searchToggled: !searchToggled,
                dialogOpen: true,
            });
        };
        this.handleEnableSearch = () => {
            this.setState({
                dialogOpen: false,
                searchEnabled: true,
            });
        };
        this.handleCancelDialog = () => {
            this.setState({ dialogOpen: false, searchToggled: false });
        };
        this.handleKeyPress = (event) => __awaiter(this, void 0, void 0, function* () {
            const { projectIds } = this.props;
            if (event.key === 'Enter') {
                const searchKey = event.target.value;
                this.setState({ searchResults: [] });
                if (projectIds.length !== 0) {
                    this.setState({ isLoadingSearch: true, isSearching: true });
                    yield Promise.all(projectIds.map((project) => __awaiter(this, void 0, void 0, function* () {
                        yield this.search(searchKey, project);
                    })));
                    this.setState({ isLoadingSearch: false });
                }
                else {
                    utils_1.appLog.warn('Error searching, wait until data tree loads and try again');
                }
            }
        });
        this.handleClear = () => {
            this.setState({ isSearching: false });
        };
        // Handlers for pinning projects
        this.addNewProject = (newProjectId) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.setState({ loadingPinnedProject: true });
                yield service_provider_1.ServiceProvider.bigQueryService
                    .getProject(newProjectId)
                    .then(project => {
                    if (project) {
                        this.props.addProject(project);
                    }
                    else {
                        this.props.openSnackbar({
                            message: `Project ${newProjectId} does not exist.`,
                        });
                    }
                });
            }
            catch (err) {
                utils_1.appLog.warn('Error checking access', err);
            }
            finally {
                this.handleClosePinProject();
                this.setState({ loadingPinnedProject: false });
            }
        });
        this.handleOpenPinProject = () => {
            this.setState({ pinProjectDialogOpen: true });
        };
        this.handlePinnedProjectChange = event => {
            this.setState({ pinnedProject: event.target.value });
        };
        this.handleClosePinProject = () => {
            this.setState({ pinProjectDialogOpen: false });
        };
        this.openQueryHistory = () => __awaiter(this, void 0, void 0, function* () {
            const options = {
                widgetType: query_history_widget_1.QueryHistoryWidget,
                windowType: 'main',
                id: 'QueryHistoryWidget',
                widgetArgs: [],
            };
            widget_manager_1.WidgetManager.getInstance().launchWidget(options);
        });
        this.state = {
            hasLoaded: false,
            isLoading: false,
            isLoadingSearch: false,
            searchToggled: false,
            searchEnabled: false,
            dialogOpen: false,
            isSearching: false,
            searchResults: [],
            pinProjectDialogOpen: false,
            pinnedProject: '',
            loadingPinnedProject: false,
            collapseAll: true,
        };
    }
    search(searchKey, project) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield service_provider_1.ServiceProvider.bigQueryService
                    .searchProjects(searchKey, project)
                    .then(results => {
                    this.setState({
                        searchResults: this.state.searchResults.concat(results.searchResults),
                    });
                });
            }
            catch (err) {
                utils_1.appLog.warn('Error searching', err);
                this.handleOpenSearchDialog();
                this.props.openSnackbar({
                    message: `Error: Searching not allowed in project ${project}.
        Enable the Data Catalog API in this project to continue.`,
                });
            }
        });
    }
    componentDidUpdate(prevProps) {
        const isFirstLoad = !(this.state.hasLoaded || prevProps.isVisible) && this.props.isVisible;
        if (isFirstLoad) {
            this.getProjects();
        }
    }
    render() {
        const { isLoading, isLoadingSearch, isSearching, searchResults, searchEnabled, dialogOpen, pinProjectDialogOpen, loadingPinnedProject, pinnedProject, collapseAll, } = this.state;
        const { snackbar, dataTree, context, updateProject, updateDataset, openSnackbar, removeProject, } = this.props;
        const showSearchResults = isSearching
            ? localStyles.showing
            : localStyles.hidden;
        return (React.createElement("div", { className: localStyles.panel },
            React.createElement(core_1.Portal, null,
                React.createElement(snackbar_1.default, { open: snackbar.open, message: snackbar.message, autoHideDuration: snackbar.autoHideDuration })),
            React.createElement("header", { className: localStyles.headerContainer },
                React.createElement("div", { className: styles_3.CSS.headerTitle }, "BigQuery"),
                React.createElement("div", { className: styles_3.CSS.buttonContainer },
                    React.createElement(core_1.Tooltip, { title: "Open SQL editor" },
                        React.createElement(core_1.Button, { size: "small", variant: "outlined", className: localStyles.editQueryButton, onClick: () => {
                                const options = {
                                    widgetType: query_editor_tab_widget_1.QueryEditorTabWidget,
                                    windowType: 'main',
                                    widgetArgs: [undefined],
                                };
                                widget_manager_1.WidgetManager.getInstance().launchWidget(options);
                            }, style: {
                                color: styles_2.gColor('BLUE'),
                                border: '1px solid var(--jp-border-color2)',
                            } },
                            React.createElement("div", { className: localStyles.buttonLabel }, "Open SQL editor"))))),
            React.createElement("div", { className: localStyles.resources },
                React.createElement("div", { className: localStyles.resourcesTitle },
                    React.createElement("div", null, "Resources"),
                    React.createElement("div", { className: styles_3.CSS.buttonContainer },
                        React.createElement(core_1.Tooltip, { title: "Refresh" },
                            React.createElement(core_1.IconButton, { size: "small", "aria-label": "close", color: "inherit", onClick: () => this.handleRefreshAll() },
                                React.createElement(Refresh_1.default, { fontSize: "small" }))),
                        React.createElement(core_1.Tooltip, { title: "Add project" },
                            React.createElement(core_1.IconButton, { size: "small", "aria-label": "close", color: "inherit", onClick: this.handleOpenPinProject },
                                React.createElement(Add_1.default, { fontSize: "small" }))))),
                React.createElement("div", { className: localStyles.search, onClick: searchEnabled ? null : this.handleOpenSearchDialog },
                    React.createElement(search_bar_1.SearchBar, { handleKeyPress: this.handleKeyPress, handleClear: this.handleClear, defaultText: 'Search...' })),
                isLoading ? (React.createElement(core_1.LinearProgress, null)) : (React.createElement("ul", { className: localStyles.list },
                    React.createElement("div", { className: localStyles.resourceTree }, Array.isArray(dataTree.projectIds) ? (dataTree.projectIds.map(projectId => (React.createElement("div", { key: projectId },
                        React.createElement(list_tree_item_1.ProjectResource, { project: dataTree.projects[projectId], context: context, updateProject: updateProject, updateDataset: updateDataset, openSnackbar: openSnackbar, removeProject: removeProject, collapseAll: collapseAll, updateCollapseAll: () => this.updateCollapseAll() }))))) : (React.createElement(core_1.LinearProgress, null))),
                    React.createElement("div", { className: showSearchResults }, isLoadingSearch ? (React.createElement(core_1.LinearProgress, null)) : (React.createElement(list_search_results_1.default, { context: context, searchResults: searchResults })))))),
            React.createElement("div", { className: localStyles.queryHistory, onClick: this.openQueryHistory }, "Query history"),
            React.createElement(dialog_1.DialogComponent, { header: "Requirements to Enable Searching", open: dialogOpen, onSubmit: this.handleEnableSearch, onCancel: this.handleCancelDialog, onClose: this.handleCancelDialog, submitLabel: "I have enabled the API", children: React.createElement("p", null,
                    "To start using BigQuery's Search feature, you'll need to first enable the",
                    ' ',
                    React.createElement("a", { style: { color: styles_2.gColor('BLUE'), textDecoration: 'underline' }, href: "https://console.developers.google.com/apis/api/datacatalog.googleapis.com/overview", target: "_blank" }, "Google Data Catalog API"),
                    ' ',
                    "for all pinned projects. Once you click \"Enable\", this may take up to 2-3 minutes before you can start searching.") }),
            React.createElement(dialog_1.DialogComponent, { header: "Pin a Project", open: pinProjectDialogOpen, onSubmit: () => this.addNewProject(pinnedProject), submitDisabled: this.state.pinnedProject === '', onCancel: this.handleClosePinProject, onClose: this.handleClosePinProject, submitLabel: "Pin Project", children: React.createElement("div", { style: { display: 'flex', flexDirection: 'column' } },
                    React.createElement("p", null, "Enter a project name to be pinned in the data tree for easy access."),
                    React.createElement("p", null,
                        "Warning: pins are not saved, and will be removed once the page is refreshed. ",
                        React.createElement("br", null),
                        " ",
                        React.createElement("br", null),
                        "Enter a project name: ",
                        React.createElement("br", null),
                        " ",
                        React.createElement("br", null)),
                    React.createElement("input", { className: localStyles.input, type: "text", value: this.state.pinnedProject, onChange: this.handlePinnedProjectChange }),
                    loadingPinnedProject && React.createElement(core_1.LinearProgress, null)) })));
    }
    getProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setState({ isLoading: true });
                yield service_provider_1.ServiceProvider.bigQueryService
                    .listProjects()
                    .then((data) => {
                    data.projects[dataTreeSlice_1.PUBLIC_DATA_PROJECT.id] = dataTreeSlice_1.PUBLIC_DATA_PROJECT;
                    data.projectIds.unshift(dataTreeSlice_1.PUBLIC_DATA_PROJECT.id);
                    this.props.updateDataTree(data);
                    this.setState({ hasLoaded: true });
                });
            }
            catch (err) {
                utils_1.appLog.warn('Error retrieving projects', err);
            }
            finally {
                this.setState({ isLoading: false });
            }
        });
    }
    handleRefreshAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setState({ isLoading: true });
                yield this.updateAll();
            }
            catch (err) {
                utils_1.appLog.warn('Error refreshing', err);
            }
            finally {
                this.setState({ isLoading: false, collapseAll: true });
            }
        });
    }
    updateAll() {
        const { dataTree } = this.props;
        if (Array.isArray(dataTree.projectIds)) {
            if (dataTree.projectIds.length === 0) {
                this.getProjects();
            }
            else {
                dataTree.projectIds.map((projectId) => __awaiter(this, void 0, void 0, function* () {
                    const newProject = {
                        id: projectId,
                        name: projectId,
                    };
                    this.props.updateProject(newProject);
                }));
            }
        }
    }
    updateCollapseAll() {
        this.setState({ collapseAll: !this.state.collapseAll });
    }
}
const mapStateToProps = state => {
    const currentProject = state.dataTree.data.projectIds[0];
    const snackbar = state.snackbar;
    const { projectIds } = state.dataTree.data;
    const dataTree = state.dataTree.data;
    return { currentProject, snackbar, projectIds, dataTree };
};
const mapDispatchToProps = {
    updateDataTree: dataTreeSlice_1.updateDataTree,
    updateProject: dataTreeSlice_1.updateProject,
    updateDataset: dataTreeSlice_1.updateDataset,
    addProject: dataTreeSlice_1.addProject,
    openSnackbar: snackbarSlice_1.openSnackbar,
    removeProject: dataTreeSlice_1.removeProject,
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ListItemsPanel);
