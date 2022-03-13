/// <reference types="react" />
import { ReactWidget } from '@jupyterlab/apputils';
import { IStatusBar } from '@jupyterlab/statusbar';
interface DeploymentCompletion {
    message: string;
    isSuccessful: boolean;
}
interface Props {
    url: string;
    onDismiss: () => void;
    completion?: DeploymentCompletion;
}
/** Component to show the deployment status */
export declare function DeploymentStatus({ url, onDismiss, completion }: Props): JSX.Element;
/** ReactWidget class to display status of a Deployment */
declare class DeploymentStatusWidget extends ReactWidget {
    private readonly url;
    private readonly statusBar;
    private readonly completionSignal;
    private disposable?;
    constructor(url: string, statusBar: IStatusBar);
    /** Registers and shows the widget in the StatusBar */
    showStatus(): void;
    /** Shows the completion snackbar message */
    showCompletionMessage(message: string, isSuccessful?: boolean): void;
    render(): JSX.Element;
    private _onDismiss;
}
/** Function to return a DeployStatusWidget */
export declare function createDeploymentStatusWidget(url: string, statusBar: IStatusBar): DeploymentStatusWidget;
export {};
