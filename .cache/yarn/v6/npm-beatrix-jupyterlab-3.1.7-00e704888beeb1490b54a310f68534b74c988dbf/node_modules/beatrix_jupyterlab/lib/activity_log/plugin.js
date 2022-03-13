"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityLogPlugin = exports.PLUGIN_ID = void 0;
const application_1 = require("@jupyterlab/application");
const activity_log_service_1 = require("../service/activity_log_service");
const plugin_1 = require("../service/plugin");
const service_provider_1 = require("../service/service_provider");
const utils_1 = require("../utils");
const panel_widget_1 = require("./components/panel_widget");
const notebook_provider_1 = require("../service/notebook_provider");
/** Plugin id */
exports.PLUGIN_ID = `${utils_1.PLUGIN_PREFIX}:activity_log_plugin`;
/**
 * Beatrix ActivityLog plugin.
 */
exports.ActivityLogPlugin = {
    id: exports.PLUGIN_ID,
    requires: [application_1.ILayoutRestorer, notebook_provider_1.NotebookProviderToken, plugin_1.IServiceProvider],
    activate: (app, layoutRestorer, notebookProvider) => {
        const panelWidget = new panel_widget_1.ActivityLogWidget();
        // Add the widgets to the shell and add the trigger button
        panelWidget.id = 'jp-Beatrix-ActivityLogWidget';
        app.shell.add(panelWidget, 'right');
        layoutRestorer.add(panelWidget, panelWidget.id);
        service_provider_1.ServiceProvider.activityLogService.getSignal().connect(() => {
            app.shell.activateById(panelWidget.id);
        });
        // Register Activities for custom kernels
        if (notebookProvider.notebookSnapshot.customKernelImages) {
            for (const i of notebookProvider.notebookSnapshot.customKernelImages) {
                service_provider_1.ServiceProvider.activityLogService.addNew({
                    type: activity_log_service_1.ActivityType.CUSTOM_KERNEL_LOAD,
                    description: `Loading kernel from ${i}`,
                    customKernelImage: i,
                });
            }
            app.restored.then(() => service_provider_1.ServiceProvider.activityLogService.openPanel());
        }
    },
    autoStart: true,
};
