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
exports.ProjectResource = exports.DatasetResource = exports.TableResource = exports.ModelResource = exports.Resource = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const notebook_1 = require("@jupyterlab/notebook");
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const lab_1 = require("@material-ui/lab");
const csstips = __importStar(require("csstips"));
const react_1 = __importDefault(require("react"));
const typestyle_1 = require("typestyle");
const context_menu_1 = require("../../../components/shared/context_menu");
const constants_1 = require("../../constants");
const starter_queries_1 = require("../../utils/starter_queries");
const dataset_details_widget_1 = require("../details_panel/dataset_details_widget");
const model_details_widget_1 = require("../details_panel/model_details_widget");
const table_details_widget_1 = require("../details_panel/table_details_widget");
const view_details_widget_1 = require("../details_panel/view_details_widget");
const query_editor_tab_widget_1 = require("../query_editor/query_editor_tab/query_editor_tab_widget");
const snackbar_1 = require("../shared/snackbar");
const styles_1 = require("../shared/styles");
const widget_manager_1 = require("../../utils/widgetManager/widget_manager");
const utils_1 = require("../../../utils");
const service_provider_1 = require("../../../service/service_provider");
const localStyles = typestyle_1.stylesheet({
    item: Object.assign({ alignItems: 'center', listStyle: 'none', height: '40px', paddingRight: '8px' }, csstips.horizontal),
    itemName: Object.assign({ flexDirection: 'row' }, csstips.horizontal),
    details: Object.assign(Object.assign({ alignItems: 'center', paddingLeft: '4px' }, csstips.horizontal), csstips.flex),
    icon: {
        padding: '0 0 0 5px',
    },
    list: Object.assign({ margin: '0', padding: '0' }, csstips.flex),
    root: {
        flexGrow: 1,
    },
    circularProgress: {
        padding: 5,
    },
    resourceName: {
        fontFamily: 'var(--jp-ui-font-family)',
        fontSize: 'var(--jp-ui-font-size1)',
    },
    resourceIcons: {
        display: 'flex',
        alignContent: 'center',
    },
    datasetName: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
    },
});
// Class names to aid in test driving
const PROJECT_TREE_ITEM_CLASS = 'jp-BigQueryProject';
const DATASET_TREE_ITEM_CLASS = 'jp-BigQueryDataset';
const TABLE_TREE_ITEM_CLASS = 'jp-BigQueryTable';
class Resource extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.copyID = dataTreeItem => {
            this.props.openSnackbar({
                message: 'ID copied',
                autoHideDuration: snackbar_1.COPIED_AUTOHIDE_DURATION,
            });
            apputils_1.Clipboard.copyToSystem(dataTreeItem.id);
        };
        this.copyBoilerplateQuery = dataTreeItem => {
            this.props.openSnackbar({
                message: 'Query copied',
                autoHideDuration: snackbar_1.COPIED_AUTOHIDE_DURATION,
            });
            apputils_1.Clipboard.copyToSystem(starter_queries_1.getStarterQuery(dataTreeItem.type, dataTreeItem.id));
        };
        this.createTableStatsMagicsNotebook = dataTreeItem => {
            service_provider_1.ServiceProvider.bigQueryService.createNotebookBigQueryTableStatsCountMagics(dataTreeItem.id);
        };
        this.queryResource = (dataTreeItem) => {
            const notebookTrack = this.props.context.notebookTrack;
            const query = starter_queries_1.getStarterQuery(dataTreeItem.type, dataTreeItem.id, dataTreeItem.legacySql);
            const curWidget = notebookTrack.currentWidget;
            const incellEnabled = widget_manager_1.WidgetManager.getInstance().getIncellEnabled();
            if (!incellEnabled || !curWidget || !curWidget.content.isVisible) {
                // no active notebook or not visible
                const options = {
                    widgetType: query_editor_tab_widget_1.QueryEditorTabWidget,
                    windowType: 'main',
                    widgetArgs: [query, dataTreeItem.legacySql],
                };
                widget_manager_1.WidgetManager.getInstance().launchWidget(options);
            }
            else {
                // exist notebook and visible
                const notebook = curWidget.content;
                notebook_1.NotebookActions.insertBelow(notebook);
                const cell = notebookTrack.activeCell;
                const code = `%%bigquery_editor ${dataTreeItem.legacySql ? '--use_legacy_sql' : ''}\n\n` + query;
                cell.model.value.text = code;
            }
        };
        this.getIcon = iconType => {
            return (react_1.default.createElement(core_1.Icon, { className: localStyles.resourceIcons },
                react_1.default.createElement("div", { className: `jp-Icon jp-Icon-20 jp-${iconType}Icon` })));
        };
    }
}
exports.Resource = Resource;
class ModelResource extends Resource {
    constructor(props) {
        super(props);
        this.openModelDetails = (event, model) => {
            event && event.stopPropagation();
            const widgetType = model_details_widget_1.ModelDetailsWidget;
            this.props.context.manager.launchWidgetForId(model.id, widgetType, model.id, model.name);
        };
        this.contextMenuItems = [
            {
                label: 'Open model details',
                handler: dataTreeItem => this.openModelDetails(null, dataTreeItem),
            },
            {
                label: 'Query model',
                handler: dataTreeItem => this.queryResource(dataTreeItem),
            },
            {
                label: 'Copy model ID',
                handler: dataTreeItem => this.copyID(dataTreeItem),
            },
            {
                label: 'Copy boilerplate query',
                handler: dataTreeItem => this.copyBoilerplateQuery(dataTreeItem),
            },
        ];
    }
    render() {
        const { model } = this.props;
        return (react_1.default.createElement(lab_1.TreeItem, { nodeId: model.id, icon: this.getIcon('Model'), label: react_1.default.createElement(context_menu_1.ContextMenu, { items: this.contextMenuItems.map(item => ({
                    label: item.label,
                    onClick: () => item.handler(model),
                })) },
                react_1.default.createElement("div", { className: localStyles.resourceName }, model.name)), onDoubleClick: event => this.openModelDetails(event, model) }));
    }
}
exports.ModelResource = ModelResource;
class TableResource extends Resource {
    constructor(props) {
        super(props);
        this.openTableDetails = (event, table) => {
            event && event.stopPropagation();
            const widgetType = table_details_widget_1.TableDetailsWidget;
            this.props.context.manager.launchWidgetForId(table.id, widgetType, table.id, table.name, table.partitioned);
        };
        this.openViewDetails = (event, view) => {
            event && event.stopPropagation();
            const widgetType = view_details_widget_1.ViewDetailsWidget;
            this.props.context.manager.launchWidgetForId(view.id, widgetType, view.id, view.name);
        };
        this.getTableIcon = table => {
            if (table.partitioned) {
                return this.getIcon('PartitionedTable');
            }
            else {
                return this.getIcon('Table');
            }
        };
        this.tableContextMenuItems = [
            {
                label: 'Open table details',
                handler: dataTreeItem => this.openTableDetails(null, dataTreeItem),
            },
            {
                label: 'Query table',
                handler: dataTreeItem => this.queryResource(dataTreeItem),
            },
            {
                label: 'Copy table ID',
                handler: dataTreeItem => this.copyID(dataTreeItem),
            },
            {
                label: 'Copy boilerplate query',
                handler: dataTreeItem => this.copyBoilerplateQuery(dataTreeItem),
            },
            {
                label: 'Create Table Stats Notebook',
                handler: dataTreeItem => this.createTableStatsMagicsNotebook(dataTreeItem),
            },
        ];
        this.viewContextMenuItems = [
            {
                label: 'Open view details',
                handler: dataTreeItem => this.openViewDetails(null, dataTreeItem),
            },
            {
                label: 'Query view',
                handler: dataTreeItem => this.queryResource(dataTreeItem),
            },
            {
                label: 'Copy view ID',
                handler: dataTreeItem => this.copyID(dataTreeItem),
            },
            {
                label: 'Copy boilerplate query',
                handler: dataTreeItem => this.copyBoilerplateQuery(dataTreeItem),
            },
        ];
    }
    render() {
        const { table } = this.props;
        return (react_1.default.createElement("div", null, table.type === 'TABLE' ? (react_1.default.createElement(lab_1.TreeItem, { className: TABLE_TREE_ITEM_CLASS, nodeId: table.id, icon: this.getTableIcon(table), label: react_1.default.createElement(context_menu_1.ContextMenu, { items: this.tableContextMenuItems.map(item => ({
                    label: item.label,
                    onClick: () => item.handler(table),
                })) },
                react_1.default.createElement("div", { className: localStyles.resourceName }, table.name)), onDoubleClick: event => this.openTableDetails(event, table) })) : table.type === 'VIEW' ? (react_1.default.createElement(lab_1.TreeItem, { nodeId: table.id, icon: this.getIcon('View'), label: react_1.default.createElement(context_menu_1.ContextMenu, { items: this.viewContextMenuItems.map(item => ({
                    label: item.label,
                    onClick: () => item.handler(table),
                })) },
                react_1.default.createElement("div", { className: localStyles.resourceName }, table.name)), onDoubleClick: event => this.openViewDetails(event, table) })) : (react_1.default.createElement("div", null, "Table references an external data source"))));
    }
}
exports.TableResource = TableResource;
class DatasetResource extends Resource {
    constructor(props) {
        super(props);
        this.expandDataset = dataset => {
            this.getDatasetChildren(dataset);
        };
        this.handleExpandDataset = dataset => {
            if (!Array.isArray(dataset.tableIds) || !Array.isArray(dataset.modelIds)) {
                this.expandDataset(dataset);
            }
        };
        this.openDatasetDetails = (event, dataset) => {
            const widgetType = dataset_details_widget_1.DatasetDetailsWidget;
            this.props.context.manager.launchWidgetForId(dataset.id, widgetType, dataset.id, dataset.name);
        };
        this.contextMenuItems = [
            {
                label: 'Open dataset details',
                handler: dataTreeItem => this.openDatasetDetails(null, dataTreeItem),
            },
            {
                label: 'Copy dataset ID',
                handler: dataTreeItem => this.copyID(dataTreeItem),
            },
            {
                label: 'Refresh dataset',
                handler: () => this.handleRefreshDataset(this.props.dataset),
            },
        ];
        this.state = {
            expanded: [],
            loading: false,
        };
    }
    getDatasetChildren(dataset) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDataset = {
                id: dataset.id,
                name: dataset.name,
                projectId: dataset.projectId,
                tables: {},
                tableIds: [],
                models: {},
                modelIds: [],
            };
            try {
                this.setState({ loading: true });
                const tablesResult = service_provider_1.ServiceProvider.bigQueryService
                    .listTables(dataset.projectId, dataset.name)
                    .then(data => {
                    newDataset.tables = data.tables || {};
                    newDataset.tableIds = data.tableIds || [];
                })
                    .catch(err => {
                    utils_1.appLog.warn('Error retrieving dataset tables', err);
                    throw err;
                });
                const modelsResult = service_provider_1.ServiceProvider.bigQueryService
                    .listModels(dataset.projectId, dataset.name)
                    .then(data => {
                    newDataset.models = data.models || {};
                    newDataset.modelIds = data.modelIds || [];
                })
                    .catch(err => {
                    utils_1.appLog.warn('Error retrieving dataset models', err);
                    throw err;
                });
                yield Promise.all([tablesResult, modelsResult]);
                this.props.updateDataset(newDataset);
            }
            catch (err) {
                utils_1.appLog.warn('Error retrieving dataset children', err);
            }
            finally {
                this.setState({ loading: false });
            }
        });
    }
    handleRefreshDataset(dataset) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.expandDataset(dataset);
        });
    }
    render() {
        const { dataset } = this.props;
        const { loading } = this.state;
        return (react_1.default.createElement("div", { className: localStyles.itemName },
            react_1.default.createElement(lab_1.TreeItem, { className: DATASET_TREE_ITEM_CLASS, nodeId: dataset.id, label: react_1.default.createElement(context_menu_1.ContextMenu, { items: this.contextMenuItems.map(item => ({
                        label: item.label,
                        onClick: () => item.handler(dataset),
                    })) },
                    react_1.default.createElement("div", { className: localStyles.datasetName },
                        react_1.default.createElement(core_1.Icon, { className: localStyles.resourceIcons },
                            react_1.default.createElement("div", { className: `jp-Icon jp-Icon-20 ${constants_1.ICONS.dataset}` })),
                        react_1.default.createElement("div", { className: localStyles.resourceName }, dataset.name))), onDoubleClick: event => this.openDatasetDetails(event, dataset), onLabelClick: event => event.preventDefault(), onIconClick: () => this.handleExpandDataset(dataset), style: { width: '100%' } }, Array.isArray(dataset.tableIds) &&
                Array.isArray(dataset.modelIds) &&
                !loading ? (react_1.default.createElement("ul", null,
                dataset.tableIds.map(tableId => (react_1.default.createElement("div", { key: tableId },
                    react_1.default.createElement(TableResource, { context: this.props.context, table: dataset.tables[tableId], openSnackbar: this.props.openSnackbar })))),
                dataset.modelIds.map(modelId => (react_1.default.createElement("div", { key: modelId },
                    react_1.default.createElement(ModelResource, { context: this.props.context, model: dataset.models[modelId], openSnackbar: this.props.openSnackbar })))))) : (react_1.default.createElement(core_1.CircularProgress, { size: 20, className: localStyles.circularProgress, style: { color: styles_1.gColor('BLUE') } })))));
    }
}
exports.DatasetResource = DatasetResource;
class ProjectResource extends Resource {
    constructor(props) {
        super(props);
        this.handleOpenSnackbar = error => {
            this.props.openSnackbar({ message: error });
        };
        this.expandProject = project => {
            this.getDatasets(project);
        };
        this.handleExpandProject = project => {
            this.props.updateCollapseAll(false);
            if (!Array.isArray(project.datasetIds) && !project.error) {
                this.setState({ loading: true });
                this.expandProject(project);
            }
            this.setState({ loading: false });
        };
        this.handleToggle = (event, nodeIds) => {
            this.setState({ expanded: nodeIds });
        };
        this.contextMenuItems = [
            {
                label: 'Copy Project ID',
                handler: dataTreeItem => this.copyID(dataTreeItem),
            },
            {
                label: 'Refresh project',
                handler: () => this.handleRefreshProject(this.props.project),
            },
            {
                label: 'Unpin project',
                handler: () => this.handleUnpinProject(this.props.project),
            },
        ];
        this.state = {
            expanded: [],
            loading: true,
        };
    }
    getDatasets(project) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProject = {
                id: project.id,
                name: project.name,
            };
            try {
                this.setState({ loading: true });
                yield service_provider_1.ServiceProvider.bigQueryService
                    .listDatasets(project)
                    .then((data) => {
                    if (data.datasetIds.length === 0) {
                        newProject['error'] = `No datasets available for ${project.name}. Check your permissions for this project.`;
                    }
                    else {
                        newProject['datasets'] = data.datasets;
                        newProject['datasetIds'] = data.datasetIds;
                    }
                });
            }
            catch (err) {
                const fullError = err.response.statusText;
                utils_1.appLog.warn('Error retrieving datasets: ', fullError);
                const errorMessage = fullError.split('datasets: ')[1] ||
                    'The project does not exist or does not have BigQuery enabled.';
                newProject['error'] = `Error: ${errorMessage}`;
            }
            finally {
                if (newProject['error']) {
                    this.handleOpenSnackbar(newProject['error']);
                }
                this.props.updateProject(newProject);
                this.setState({ loading: false });
            }
        });
    }
    handleRefreshProject(project) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.expandProject(project);
            this.setState({ expanded: [project.id] });
        });
    }
    handleUnpinProject(project) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.props.removeProject(project);
        });
    }
    componentDidUpdate() {
        if (this.props.collapseAll && this.state.expanded.length > 0) {
            this.setState({ expanded: [] });
        }
    }
    render() {
        const { project } = this.props;
        const { loading, expanded } = this.state;
        return (react_1.default.createElement(lab_1.TreeView, { className: localStyles.root, defaultCollapseIcon: react_1.default.createElement(icons_1.ArrowDropDown, { fontSize: "small" }), defaultExpanded: ['root'], defaultExpandIcon: react_1.default.createElement(icons_1.ArrowRight, { fontSize: "small" }), expanded: expanded, onNodeToggle: this.handleToggle },
            react_1.default.createElement(lab_1.TreeItem, { className: PROJECT_TREE_ITEM_CLASS, nodeId: project.id, label: react_1.default.createElement(context_menu_1.ContextMenu, { items: this.contextMenuItems.map(item => ({
                        label: item.label,
                        onClick: () => item.handler(project),
                    })) },
                    react_1.default.createElement("div", { className: localStyles.resourceName }, project.name)), onIconClick: () => this.handleExpandProject(project), onLabelClick: event => event.preventDefault() }, Array.isArray(project.datasetIds) && !loading ? (project.datasetIds.map(datasetId => (react_1.default.createElement("div", { key: datasetId },
                react_1.default.createElement(DatasetResource, { context: this.props.context, dataset: project.datasets[datasetId], updateDataset: this.props.updateDataset, openSnackbar: this.props.openSnackbar }))))) : project.error ? (react_1.default.createElement("div", null, project.error)) : (react_1.default.createElement(core_1.CircularProgress, { size: 20, className: localStyles.circularProgress, style: { color: styles_1.gColor('BLUE') } })))));
    }
}
exports.ProjectResource = ProjectResource;
