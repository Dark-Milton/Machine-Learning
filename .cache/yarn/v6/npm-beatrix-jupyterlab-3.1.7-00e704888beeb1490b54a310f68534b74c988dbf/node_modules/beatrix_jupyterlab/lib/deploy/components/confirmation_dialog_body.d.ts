/// <reference types="react" />
import { ReactWidget } from '@jupyterlab/apputils';
/** Widget for displaying the deployment confirmation dialog body. */
export declare class ConfirmationDialogBody extends ReactWidget {
    private readonly downloadUrl;
    constructor(downloadUrl: string);
    render(): JSX.Element;
}
