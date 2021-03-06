import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application';
import { IGitExtension } from './tokens';
export { DiffModel } from './components/diff/model';
export { NotebookDiff } from './components/diff/NotebookDiff';
export { PlainTextDiff } from './components/diff/PlainTextDiff';
export { Git, IGitExtension } from './tokens';
declare const _default: (JupyterFrontEndPlugin<void, JupyterFrontEnd.IShell, "desktop" | "mobile"> | JupyterFrontEndPlugin<IGitExtension, JupyterFrontEnd.IShell, "desktop" | "mobile">)[];
/**
 * Export the plugin as default.
 */
export default _default;
