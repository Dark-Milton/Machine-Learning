import { IDocumentManager } from '@jupyterlab/docmanager';
import { IFileBrowserFactory } from '@jupyterlab/filebrowser';
import { IStatusBar } from '@jupyterlab/statusbar';
import { DeploymentService } from './deployment_service';
/** Class to manage a deployment from a public URL */
export declare class DeploymentManager {
    private readonly deploymentService;
    private readonly statusBar;
    private readonly documentManager;
    private readonly fileBrowserFactory;
    private readonly browser;
    constructor(deploymentService: DeploymentService, statusBar: IStatusBar, documentManager: IDocumentManager, fileBrowserFactory: IFileBrowserFactory);
    /**
     * Prompts the user for confirmation and executes the deployment process,
     * which will poll through to completion.
     */
    confirmAndDeploy(url: string): Promise<void>;
    private _pollDeployment;
}
