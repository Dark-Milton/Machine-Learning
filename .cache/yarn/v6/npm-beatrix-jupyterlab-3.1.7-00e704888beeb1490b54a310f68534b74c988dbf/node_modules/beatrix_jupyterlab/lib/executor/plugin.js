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
exports.ExecutorPlugin = exports.PLUGIN_ID = void 0;
const application_1 = require("@jupyterlab/application");
const settingregistry_1 = require("@jupyterlab/settingregistry");
const plugin_1 = require("../service/plugin");
const service_provider_1 = require("../service/service_provider");
const utils_1 = require("../utils");
const button_extension_1 = require("./button_extension");
const executor_widget_1 = require("./components/executor_widget");
const panel_widget_1 = require("./components/panel_widget");
const executor_service_1 = require("./service/executor_service");
const project_state_1 = require("./service/project_state");
const notebook_provider_1 = require("../service/notebook_provider");
/** Plugin id */
exports.PLUGIN_ID = `${utils_1.PLUGIN_PREFIX}:executor_plugin`;
/** Executor plugin */
exports.ExecutorPlugin = {
    id: exports.PLUGIN_ID,
    requires: [
        notebook_provider_1.NotebookProviderToken,
        settingregistry_1.ISettingRegistry,
        application_1.ILayoutRestorer,
        plugin_1.IServiceProvider,
    ],
    activate: (app, notebookProvider, settingRegistry, layoutRestorer) => __awaiter(void 0, void 0, void 0, function* () {
        const settings = yield settingRegistry.load('beatrix_jupyterlab:settings');
        const projectStateService = new project_state_1.ProjectStateService(notebookProvider.serverTransportService, notebookProvider.projectId);
        service_provider_1.ServiceProvider.executorService = new executor_service_1.ExecutorService(notebookProvider, projectStateService, service_provider_1.ServiceProvider.gcsService, service_provider_1.ServiceProvider.operationService, service_provider_1.ServiceProvider.apiService);
        const executorWidget = new executor_widget_1.ExecutorWidget(projectStateService, settings);
        const panelWidget = new panel_widget_1.ExecutorPanelWidget();
        // Add the widgets to the shell and add the trigger button
        executorWidget.id = 'jp-Beatrix-Executor-ExecutorWidget';
        panelWidget.id = 'jp-Beatrix-Executor-ExecutorPanelWidget';
        app.shell.add(executorWidget, 'top');
        app.shell.add(panelWidget, 'left');
        layoutRestorer.add(panelWidget, panelWidget.id);
        app.docRegistry.addWidgetExtension('Notebook', new button_extension_1.ExecutorButtonExtension(executorWidget));
    }),
    autoStart: true,
};
