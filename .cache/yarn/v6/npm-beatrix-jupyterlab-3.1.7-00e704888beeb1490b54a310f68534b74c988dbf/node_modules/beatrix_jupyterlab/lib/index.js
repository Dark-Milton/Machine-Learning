"use strict";
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
require("../style/index.css");
const activation_1 = require("./activation");
const plugin_1 = require("./activity_log/plugin");
const plugin_2 = require("./bigquery/plugin");
const header_1 = require("./components/header");
const splash_screen_1 = require("./components/splash_screen");
const toolbar_1 = require("./components/toolbar");
const plugin_3 = require("./deploy/plugin");
const plugin_4 = require("./executor/plugin");
const plugin_5 = require("./gcsfilebrowser/plugin");
const plugin_6 = require("./hwconfig/plugin");
const plugin_7 = require("./onerror/plugin");
const query_parameters_1 = require("./query_parameters");
const plugin_8 = require("./refreshcreds/plugin");
const auth_service_1 = require("./service/auth_service");
const plugin_9 = require("./service/plugin");
const plugin_10 = require("./shared_storage/plugin");
const signals_1 = require("./signals");
const styles_1 = require("./styles");
const utils_1 = require("./utils");
const transport_1 = require("./service/transport");
const notebook_provider_1 = require("./service/notebook_provider");
const plugin_11 = require("./cell_behaviors/plugin");
/**
 * Beatrix notebook provider plugin. Ensures that the user has authenticated
 * with their end-user credential on the machine and then builds and returns
 * a NotebookProvider that can be used with other extensions.
 */
const NotebookProviderPlugin = {
    id: `${utils_1.PLUGIN_PREFIX}:notebook_provider_plugin`,
    requires: [],
    activate: () => __awaiter(void 0, void 0, void 0, function* () {
        styles_1.replaceFavIcon();
        splash_screen_1.SPLASH_SCREEN.show();
        const metadata = yield utils_1.getMetadata();
        const transportService = new transport_1.ServerProxyTransportService();
        const apiEndpoint = utils_1.getApiEndpointForEnvironment(metadata.instance.attributes['notebooks-api'] || 'PROD');
        let notebookProvider;
        if (metadata.instance.attributes['runtime-resource-name']) {
            const notebookName = metadata.instance.attributes['runtime-resource-name'];
            const projectId = notebookName.split('/')[1];
            const authService = new auth_service_1.AuthService(projectId);
            notebookProvider = activation_1.getNotebookProviderForRuntime(transportService, authService, notebookName, apiEndpoint);
        }
        else {
            const { projectId } = metadata.project;
            const { zone, name } = metadata.instance;
            const location = zone.split('/').pop();
            const notebookName = `projects/${projectId}/locations/${location}/instances/${name}`;
            notebookProvider = notebook_provider_1.NotebookProvider.build(transportService, notebookName, apiEndpoint).catch(e => {
                const errorMessage = transport_1.getMessageFromApiError(e);
                utils_1.appLog.warn(`Unable to GET ${notebookName}: ${errorMessage}`);
                return null;
            });
        }
        return notebookProvider.finally(() => void splash_screen_1.SPLASH_SCREEN.hide());
    }),
    provides: notebook_provider_1.NotebookProviderToken,
    autoStart: true,
};
/**
 * Beatrix shell display components plugin.
 */
const ShellPlugin = {
    id: `${utils_1.PLUGIN_PREFIX}:shell_plugin`,
    requires: [notebook_provider_1.NotebookProviderToken],
    activate: (app, notebookProvider) => {
        if (!notebookProvider) {
            utils_1.appLog.warn('Unable to resolve NotebookProvider. No Google plugins will be activated');
            return;
        }
        splash_screen_1.SPLASH_SCREEN.show();
        const headerWidget = new header_1.HeaderWidget(notebookProvider.notebookName, notebookProvider.notebookSnapshot.isManaged);
        const toolbarWidget = new toolbar_1.ToolbarWidget(notebookProvider);
        headerWidget.id = 'jp-Beatrix-HeaderWidget';
        toolbarWidget.id = 'jp-Beatrix-ToolbarWidget';
        app.shell.add(headerWidget, 'top');
        app.shell.add(toolbarWidget, 'top');
        styles_1.applyCustomTheme();
        app.restored.then(() => {
            const topPanel = document.getElementById('jp-top-panel');
            if (topPanel) {
                topPanel.style.minHeight = '56px';
            }
            const mainPanel = document.getElementById('jp-main-content-panel');
            if (mainPanel) {
                mainPanel.style.top = '56px';
            }
            // Remove splash screen after 1s delay to avoid seeing Jupyter spinner
            setTimeout(() => void splash_screen_1.SPLASH_SCREEN.remove(), 300);
        });
        return {
            showDetailsSignal: headerWidget.showDetailsSignal,
            showPopoverSignal: toolbarWidget.showPopoverSignal,
        };
    },
    provides: signals_1.BeatrixSignalsToken,
    autoStart: true,
};
/**
 * Export all plugins as default to ensure they are registered
 */
exports.default = [
    plugin_1.ActivityLogPlugin,
    plugin_8.ConnectionLostPlugin,
    plugin_7.OnErrorPlugin,
    plugin_2.BigQueryPlugin,
    plugin_11.CellTrackerPlugin,
    plugin_11.CellManagerPlugin,
    plugin_11.CustomCellFactoryPlugin,
    plugin_11.CustomCellMenuActionsPlugin,
    plugin_3.DeployPlugin,
    plugin_4.ExecutorPlugin,
    plugin_5.GCSFileBrowserPlugin,
    plugin_6.HardwarePlugin,
    NotebookProviderPlugin,
    query_parameters_1.QueryParametersPlugin,
    plugin_9.ServiceProviderPlugin,
    plugin_10.SharedStoragePlugin,
    ShellPlugin,
];
