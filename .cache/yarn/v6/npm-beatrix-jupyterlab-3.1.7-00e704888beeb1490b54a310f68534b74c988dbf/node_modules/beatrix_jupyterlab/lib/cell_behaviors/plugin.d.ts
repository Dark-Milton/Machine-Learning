import { JupyterFrontEndPlugin } from '@jupyterlab/application';
import { NotebookPanel } from '@jupyterlab/notebook';
import '../../style/cell_behaviors/index.css';
import { CellTracker } from './cell_tracker';
import { BeatrixCellManager } from './manager';
/** Plugin IDs */
export declare const CELL_TRACKER_PLUGIN_ID: string;
export declare const CELL_MANAGER_PLUGIN_ID: string;
export declare const CUSTOM_CELL_PLUGIN_ID: string;
export declare const CUSTOM_CELL_MENU_ACTIONS_PLUGIN_ID: string;
/**
 * Plugin to expose the CellManager
 */
export declare const CellManagerPlugin: JupyterFrontEndPlugin<BeatrixCellManager>;
/** Plugin to expose the CellTracker */
export declare const CellTrackerPlugin: JupyterFrontEndPlugin<CellTracker>;
/**
 * The custom cell factory provider.
 */
export declare const CustomCellFactoryPlugin: JupyterFrontEndPlugin<NotebookPanel.IContentFactory>;
export declare const CustomCellMenuActionsPlugin: JupyterFrontEndPlugin<void>;
