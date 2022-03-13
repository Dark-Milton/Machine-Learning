import { ISettingRegistry } from '@jupyterlab/settingregistry';
import * as React from 'react';
import { ExecuteNotebookRequest } from '../interfaces';
import { ExecutorNotebookContext } from './executor_widget';
import { GetPermissionsResponse, ProjectStateService } from '../service/project_state';
export interface SubmittedMessage {
    message: string;
    link: string;
}
/** Definition for a function that closes the Drawer. */
export declare type OnClose = () => void;
/** Definition for a function that changes the schedule type. */
export declare type OnScheduleTypeChange = (creatingExecution: boolean) => void;
/** Callback function that accepts a boolean to show if the api has been enabled  */
export declare type OnSetupRequiredChanged = (enabled: boolean) => void;
/** Callback function that accepts a status to track whether or not to show a submitted dialog or the form  */
export declare type OnShowFormChange = (status: Status) => void;
/** Extension settings. */
export interface GcpSettings {
    projectId: string;
    gcsBucket: string;
    location?: string;
    scaleTier?: string;
    scheduleType?: string;
    environmentImage?: string;
    serviceAccount?: string;
    network?: string;
}
export interface Status {
    asError?: boolean;
    message: string;
    lastSubmitted?: {
        request: ExecuteNotebookRequest;
        schedule?: string;
    };
}
interface Props {
    projectStateService: ProjectStateService;
    request?: ExecutorNotebookContext;
    settings: ISettingRegistry.ISettings;
}
interface State {
    isClosedByUser: boolean;
    gcpSettings?: GcpSettings;
    permissions?: GetPermissionsResponse;
    creatingExecution: boolean;
    setupRequired: boolean;
    status?: Status;
}
/**
 * Drawer wrapping the Executor UI.
 */
export declare class ExecutorDrawer extends React.Component<Props, State> {
    private getPermissionsPromise?;
    constructor(props: Props);
    /** Establishes the binding for Settings Signal and invokes the handler. */
    componentDidMount(): void;
    componentWillUnmount(): void;
    /**
     * Set the drawer to be open since for any new request with a valid Notebook.
     */
    componentDidUpdate(prevProps: Props): Promise<void>;
    render(): JSX.Element;
    private _showInDrawer;
    private _showInDialog;
    private _onResetSettings;
    private _onReset;
    private _settingsChanged;
    private _onScheduleTypeChange;
    private _onSetupRequiredChange;
    private _onShowFormChange;
    private _onClose;
    private _isOpen;
    private _checkPermissions;
}
export {};
