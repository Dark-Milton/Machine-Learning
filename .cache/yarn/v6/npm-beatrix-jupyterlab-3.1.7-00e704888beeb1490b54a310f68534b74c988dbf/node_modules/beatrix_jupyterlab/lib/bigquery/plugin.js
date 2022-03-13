"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigQueryPlugin = exports.PLUGIN_ID = void 0;
const docmanager_1 = require("@jupyterlab/docmanager");
const notebook_1 = require("@jupyterlab/notebook");
require("../../style/bigquery/index.css");
const utils_1 = require("../utils");
const list_tree_item_widget_1 = require("./components/list_items_panel/list_tree_item_widget");
const constants_1 = require("./constants");
const bigquery_service_1 = require("./service/bigquery_service");
const widget_manager_1 = require("./utils/widgetManager/widget_manager");
const application_1 = require("@jupyterlab/application");
const notebook_provider_1 = require("../service/notebook_provider");
const service_provider_1 = require("../service/service_provider");
/** Plugin id */
exports.PLUGIN_ID = `${utils_1.PLUGIN_PREFIX}:bigquery_plugin`;
function activateBigQueryPlugin(app, notebookTracker, notebookProvider, documentManager, layoutRestorer) {
    widget_manager_1.WidgetManager.initInstance(app, true, notebookTracker);
    const manager = widget_manager_1.WidgetManager.getInstance();
    const context = {
        app: app,
        manager: manager,
        notebookTrack: notebookTracker,
    };
    service_provider_1.ServiceProvider.bigQueryService = new bigquery_service_1.BigQueryService(notebookProvider.serverTransportService, notebookProvider.projectId, documentManager);
    const listItemsWidget = manager.launchWidget({
        widgetType: list_tree_item_widget_1.ListItemsWidget,
        windowType: 'left',
        id: 'jp-Beatrix-BigQuery-ListItemsWidget',
        postProcess: (widget) => {
            widget.addClass(constants_1.ICONS.bigQuery);
            widget.addClass('jp-SideBar-tabIcon');
        },
        widgetArgs: [context],
        windowArgs: { rank: 100 },
    });
    layoutRestorer.add(listItemsWidget, listItemsWidget.id);
}
/** BigQuery plugin */
exports.BigQueryPlugin = {
    id: exports.PLUGIN_ID,
    requires: [
        notebook_1.INotebookTracker,
        notebook_provider_1.NotebookProviderToken,
        docmanager_1.IDocumentManager,
        application_1.ILayoutRestorer,
    ],
    activate: activateBigQueryPlugin,
    autoStart: true,
};
