import { Signal } from '@lumino/signaling';
import { Deployment } from '../deploy/deployment_service';
import { EnvironmentService } from './environment_service';
import { NotebookProvider } from './notebook_provider';
interface ApiClientObjectMap<T> {
    [key: string]: T;
}
interface Status {
    code?: number;
    message?: string;
}
export declare enum ActivityType {
    OPERATION = 0,
    DEPLOYMENT = 1,
    CUSTOM_KERNEL_LOAD = 2
}
export interface Operation {
    name?: string;
    metadata?: ApiClientObjectMap<any>;
    done?: boolean;
    error?: Status;
    response?: ApiClientObjectMap<any>;
}
export interface Activity {
    type: ActivityType;
    description: string;
    operation?: Operation;
    pollUrl?: string;
    link?: string;
    deployment?: Deployment;
    customKernelImage?: string;
    isKernelReady?: boolean;
}
/**
 * Class to interact with GCP services that support long operations behaviors.
 */
export declare class ActivityLogService {
    private readonly _notebookProvider;
    private readonly _openActivityLogSignal;
    private readonly _environmentService;
    private readonly activities;
    private readonly _transportService;
    constructor(_notebookProvider: NotebookProvider, _openActivityLogSignal: Signal<unknown, void>, _environmentService: EnvironmentService);
    addNew(activity: Activity): void;
    getSignal(): Signal<unknown, void>;
    openPanel(): void;
    updateAndGetActivites(): Promise<Activity[]>;
    private _getLatestActivity;
    private _getLatestOperation;
    private _getCustomKernelStatus;
    private _updateOperationIfPending;
}
export {};
