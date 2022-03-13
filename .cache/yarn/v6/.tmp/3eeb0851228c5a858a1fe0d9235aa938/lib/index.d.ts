import { JupyterFrontEndPlugin } from '@jupyterlab/application';
import '../style/index.css';
import { Signals } from './signals';
import { NotebookProvider } from './service/notebook_provider';
declare const _default: (JupyterFrontEndPlugin<void, import("@jupyterlab/application").JupyterFrontEnd.IShell, "desktop" | "mobile"> | JupyterFrontEndPlugin<import("./query_parameters").QueryParametersService, import("@jupyterlab/application").JupyterFrontEnd.IShell, "desktop" | "mobile"> | JupyterFrontEndPlugin<import("@jupyterlab/application").IConnectionLost, import("@jupyterlab/application").JupyterFrontEnd.IShell, "desktop" | "mobile"> | JupyterFrontEndPlugin<import("./cell_behaviors/manager").BeatrixCellManager, import("@jupyterlab/application").JupyterFrontEnd.IShell, "desktop" | "mobile"> | JupyterFrontEndPlugin<import("./cell_behaviors/cell_tracker").CellTracker, import("@jupyterlab/application").JupyterFrontEnd.IShell, "desktop" | "mobile"> | JupyterFrontEndPlugin<import("@jupyterlab/notebook").NotebookPanel.IContentFactory, import("@jupyterlab/application").JupyterFrontEnd.IShell, "desktop" | "mobile"> | JupyterFrontEndPlugin<Promise<NotebookProvider>, import("@jupyterlab/application").JupyterFrontEnd.IShell, "desktop" | "mobile"> | JupyterFrontEndPlugin<Signals, import("@jupyterlab/application").JupyterFrontEnd.IShell, "desktop" | "mobile">)[];
/**
 * Export all plugins as default to ensure they are registered
 */
export default _default;
