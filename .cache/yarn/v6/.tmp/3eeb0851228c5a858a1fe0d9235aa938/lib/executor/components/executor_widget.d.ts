/// <reference types="react" />
import { ReactWidget } from '@jupyterlab/apputils';
import { INotebookModel } from '@jupyterlab/notebook';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { ProjectStateService } from '../service/project_state';
/** Information provided to the ExecutorWidget when a launch is requested */
export interface ExecutorNotebookContext {
    timestamp: number;
    notebookName: string;
    notebook: INotebookModel;
}
/** Widget responsive to changes in the NotebookContext */
export declare class ExecutorWidget extends ReactWidget {
    private readonly projectStateService;
    private readonly settings;
    /** Signal containing the currently active Notebook context */
    private readonly _executorContextSignal;
    constructor(projectStateService: ProjectStateService, settings: ISettingRegistry.ISettings);
    /** Opens the ExecutorDrawer */
    open(notebookContext: ExecutorNotebookContext): Promise<void>;
    protected render(): JSX.Element;
    /**
     * Validates the state of the default Notebooks bucket. If it is present
     * or can be created, this is used as the gcsBucket setting for new
     * Executions. Failures are disregarded as buckets can be created from the
     * form.
     */
    private _validateBucket;
}
