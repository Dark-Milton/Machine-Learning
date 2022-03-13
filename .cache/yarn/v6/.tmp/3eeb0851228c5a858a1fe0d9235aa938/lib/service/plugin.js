"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProviderPlugin = exports.IServiceProvider = void 0;
const docmanager_1 = require("@jupyterlab/docmanager");
const coreutils_1 = require("@lumino/coreutils");
const signaling_1 = require("@lumino/signaling");
const utils_1 = require("../utils");
const activity_log_service_1 = require("./activity_log_service");
const api_service_1 = require("./api_service");
const environment_service_1 = require("./environment_service");
const gcs_handler_service_1 = require("./gcs_handler_service");
const gcs_service_1 = require("./gcs_service");
const notebook_provider_1 = require("./notebook_provider");
const operation_service_1 = require("./operation_service");
const service_provider_1 = require("./service_provider");
/** DI token for the ServiceProviderPlugin class. */
exports.IServiceProvider = new coreutils_1.Token('beatrix:ServiceProvider');
exports.ServiceProviderPlugin = {
    id: `${utils_1.PLUGIN_PREFIX}:service_provider_plugin`,
    requires: [notebook_provider_1.NotebookProviderToken, docmanager_1.IDocumentManager],
    provides: exports.IServiceProvider,
    activate: (app, notebookProvider, documentManager) => {
        const activityLogSignal = new signaling_1.Signal({});
        service_provider_1.ServiceProvider.environmentService = new environment_service_1.EnvironmentService(app.serviceManager.kernelspecs);
        service_provider_1.ServiceProvider.activityLogService = new activity_log_service_1.ActivityLogService(notebookProvider, activityLogSignal, service_provider_1.ServiceProvider.environmentService);
        service_provider_1.ServiceProvider.operationService = new operation_service_1.OperationService(notebookProvider);
        service_provider_1.ServiceProvider.apiService = new api_service_1.ApiService(notebookProvider, service_provider_1.ServiceProvider.operationService);
        service_provider_1.ServiceProvider.gcsService = new gcs_service_1.GcsService(notebookProvider, documentManager, app.serviceManager.contents);
        service_provider_1.ServiceProvider.gcsHandlerService = new gcs_handler_service_1.GCSHandlerService();
    },
    autoStart: true,
};
