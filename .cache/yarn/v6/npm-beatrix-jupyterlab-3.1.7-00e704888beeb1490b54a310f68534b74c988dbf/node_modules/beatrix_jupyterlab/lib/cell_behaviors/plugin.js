"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomCellMenuActionsPlugin = exports.CustomCellFactoryPlugin = exports.CellTrackerPlugin = exports.CellManagerPlugin = exports.CUSTOM_CELL_MENU_ACTIONS_PLUGIN_ID = exports.CUSTOM_CELL_PLUGIN_ID = exports.CELL_MANAGER_PLUGIN_ID = exports.CELL_TRACKER_PLUGIN_ID = void 0;
const notebook_1 = require("@jupyterlab/notebook");
require("../../style/cell_behaviors/index.css");
const utils_1 = require("../utils");
const cell_tracker_1 = require("./cell_tracker");
const constants_1 = require("./constants");
const content_factory_1 = require("./custom_cell/content_factory");
const bigquery_1 = require("./custom_cell/integrations/bigquery");
const manager_1 = require("./manager");
/** Plugin IDs */
exports.CELL_TRACKER_PLUGIN_ID = `${utils_1.PLUGIN_PREFIX}:cell_tracker_plugin`;
exports.CELL_MANAGER_PLUGIN_ID = `${utils_1.PLUGIN_PREFIX}:cell_manager_plugin`;
exports.CUSTOM_CELL_PLUGIN_ID = `${utils_1.PLUGIN_PREFIX}:custom_cell_plugin`;
exports.CUSTOM_CELL_MENU_ACTIONS_PLUGIN_ID = `${utils_1.PLUGIN_PREFIX}:custom_cell_menu_actions_plugin`;
/**
 * Plugin to expose the CellManager
 */
exports.CellManagerPlugin = {
    id: exports.CELL_MANAGER_PLUGIN_ID,
    provides: manager_1.BeatrixCellManagerToken,
    requires: [notebook_1.INotebookTracker, cell_tracker_1.CellTrackerToken],
    autoStart: true,
    activate: (_, notebookTracker, cellTracker) => new manager_1.BeatrixCellManager(notebookTracker, cellTracker),
};
/** Plugin to expose the CellTracker */
exports.CellTrackerPlugin = {
    id: exports.CELL_TRACKER_PLUGIN_ID,
    requires: [notebook_1.INotebookTracker],
    provides: cell_tracker_1.CellTrackerToken,
    autoStart: true,
    activate: (_, notebookTracker) => new cell_tracker_1.CellTracker(notebookTracker),
};
/**
 * The custom cell factory provider.
 */
exports.CustomCellFactoryPlugin = {
    id: exports.CUSTOM_CELL_PLUGIN_ID,
    provides: notebook_1.NotebookPanel.IContentFactory,
    autoStart: true,
    activate: () => new content_factory_1.CustomContentFactory({}),
};
exports.CustomCellMenuActionsPlugin = {
    id: exports.CUSTOM_CELL_MENU_ACTIONS_PLUGIN_ID,
    requires: [manager_1.BeatrixCellManagerToken],
    autoStart: true,
    activate: (_, beatrixCellManager) => {
        beatrixCellManager.addAction(manager_1.CellType.ALL, 'bigquery', {
            execute: bigquery_1.BigQueryIntegration.triggerIntegration,
            iconClass: constants_1.ICONS.bigQuery,
            order: 0,
            title: 'BigQuery Integration',
        });
    },
};
