"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardwarePlugin = exports.PLUGIN_ID = void 0;
const statusbar_1 = require("@jupyterlab/statusbar");
const signals_1 = require("../signals");
const utils_1 = require("../utils");
const hardware_config_1 = require("./hardware_config");
const resource_graphs_1 = require("./resource_graphs");
const hardware_service_1 = require("./service/hardware_service");
const notebook_provider_1 = require("../service/notebook_provider");
const service_provider_1 = require("../service/service_provider");
/** Plugin id */
exports.PLUGIN_ID = `${utils_1.PLUGIN_PREFIX}:hardware_plugin`;
/**
 * Beatrix hardware configuration/resource graphs plugin.
 */
exports.HardwarePlugin = {
    id: exports.PLUGIN_ID,
    requires: [notebook_provider_1.NotebookProviderToken, signals_1.BeatrixSignalsToken, statusbar_1.IStatusBar],
    activate: (app, notebookProvider, signals, statusBar) => {
        service_provider_1.ServiceProvider.hardwareService = new hardware_service_1.HardwareService(notebookProvider);
        const hardwareWidget = new hardware_config_1.HardwareConfigWidget(signals.showDetailsSignal, signals.showPopoverSignal, notebookProvider);
        hardwareWidget.id = 'jp-Beatrix-HwConfig-HardwareConfigWidget';
        app.shell.add(hardwareWidget, 'top');
        statusBar.registerStatusItem('jp-beatrixStatus', {
            item: new resource_graphs_1.ResourceGraphs(),
            align: 'left',
        });
    },
    autoStart: true,
};
