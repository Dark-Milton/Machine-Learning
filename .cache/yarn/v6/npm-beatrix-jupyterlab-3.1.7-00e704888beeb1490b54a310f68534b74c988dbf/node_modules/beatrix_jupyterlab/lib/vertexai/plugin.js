"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VertexAIPlugin = exports.PLUGIN_ID = void 0;
const application_1 = require("@jupyterlab/application");
const docmanager_1 = require("@jupyterlab/docmanager");
const filebrowser_1 = require("@jupyterlab/filebrowser");
const plugin_1 = require("../service/plugin");
const service_provider_1 = require("../service/service_provider");
const utils_1 = require("../utils");
const commands_1 = require("./commands");
const panel_widget_1 = require("./components/panel_widget");
const upload_custom_widget_1 = require("./components/upload_custom_widget");
const project_state_1 = require("./service/project_state");
const vertex_ai_service_1 = require("./service/vertex_ai_service");
const notebook_provider_1 = require("../service/notebook_provider");
/** Plugin id */
exports.PLUGIN_ID = `${utils_1.PLUGIN_PREFIX}:vertex_ai_plugin`;
/**
 * Beatrix VertexAI plugin.
 */
exports.VertexAIPlugin = {
    id: exports.PLUGIN_ID,
    requires: [
        notebook_provider_1.NotebookProviderToken,
        filebrowser_1.IFileBrowserFactory,
        docmanager_1.IDocumentManager,
        application_1.ILayoutRestorer,
        plugin_1.IServiceProvider,
    ],
    activate: (app, notebookProvider, factory, documentManager, layoutRestorer) => {
        const projectStateService = new project_state_1.ProjectStateService(notebookProvider.projectId);
        service_provider_1.ServiceProvider.vertexAIService = new vertex_ai_service_1.VertexAIService(notebookProvider, projectStateService, documentManager, service_provider_1.ServiceProvider.gcsHandlerService, service_provider_1.ServiceProvider.activityLogService, service_provider_1.ServiceProvider.operationService, service_provider_1.ServiceProvider.apiService);
        const panelWidget = new panel_widget_1.VertexAIPanelWidget();
        const uploadCustomModelsWidget = new upload_custom_widget_1.UploadCustomModelsWidget();
        // Add the widgets to the shell and add the trigger button
        panelWidget.id = 'jp-Beatrix-Vertex-VertexAIPanelWidget';
        uploadCustomModelsWidget.id = 'jp-Beatrix-Vertex-UploadCustomModelsWidget';
        app.shell.add(panelWidget, 'left');
        layoutRestorer.add(panelWidget, panelWidget.id);
        commands_1.addCommands(app, factory, uploadCustomModelsWidget);
    },
    autoStart: true,
};
