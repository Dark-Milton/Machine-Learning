"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeployPlugin = void 0;
const statusbar_1 = require("@jupyterlab/statusbar");
const plugin_1 = require("../service/plugin");
const utils_1 = require("../utils");
const deployment_manager_1 = require("./deployment_manager");
const deployment_service_1 = require("./deployment_service");
const query_parameters_1 = require("../query_parameters");
const docmanager_1 = require("@jupyterlab/docmanager");
const filebrowser_1 = require("@jupyterlab/filebrowser");
/** Plugin to display the deployment confirmation dialog. */
exports.DeployPlugin = {
    id: `${utils_1.PLUGIN_PREFIX}:deploy_plugin`,
    // Depend on NotebookProviderPlugin, so that auth completes first.
    requires: [
        query_parameters_1.IQueryParametersService,
        statusbar_1.IStatusBar,
        docmanager_1.IDocumentManager,
        filebrowser_1.IFileBrowserFactory,
        plugin_1.IServiceProvider,
    ],
    activate: (_, queryParametersService, isStatusBar, documentManager, fileBrowserFactory) => {
        const downloadUrl = queryParametersService.getStringParameter('downloadUrl');
        const deploymentManager = new deployment_manager_1.DeploymentManager(new deployment_service_1.DeploymentService(), isStatusBar, documentManager, fileBrowserFactory);
        if (downloadUrl) {
            deploymentManager.confirmAndDeploy(downloadUrl);
        }
    },
    autoStart: true,
};
