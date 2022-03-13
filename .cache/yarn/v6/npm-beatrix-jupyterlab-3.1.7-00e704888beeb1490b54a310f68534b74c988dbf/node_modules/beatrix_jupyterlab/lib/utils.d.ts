/** Interface for an <option> inside a <select> */
export interface Option {
    text: string;
    value: string | number;
    disabled?: boolean;
}
declare type ApiEnvironment = 'AUTOPUSH' | 'STAGING' | 'PROD';
/**
 * Subset of GCE VM Metadata for Vertex AI Workbench
 * https://cloud.google.com/compute/docs/storing-retrieving-metadata
 */
export interface VmMetadata {
    instance: {
        attributes: {
            'image-url'?: string;
            'notebooks-api'?: ApiEnvironment;
            'proxy-user-mail'?: string;
            'runtime-resource-name'?: string;
        };
        image: string;
        machineType: string;
        name: string;
        zone: string;
    };
    project: {
        projectId: string;
        numericProjectId: string;
    };
}
/** Returns an option whose value matches the given value. */
export declare function findOptionByValue<T extends Option>(options: T[], value: string | number | undefined): T | undefined;
/** Removes the item from the list if found */
export declare function removeFromList<T>(list: T[], value: T): void;
/** Link to Cloud Console */
export declare const CLOUD_CONSOLE = "https://console.cloud.google.com";
/** Prefix for all plugin IDs that allows the entire extension to be disabled */
export declare const PLUGIN_PREFIX = "beatrix_jupyterlab";
/**
 * Retrieves Metadata from the VM. By default, will use the /aipn/v2/metadata
 * route which was updated in
 * https://dlvm-review.googlesource.com/c/binaries-build/+/15200. If that route
 * does not return the expected VmMetadata structure, the /aipn/v2/details route
 * will be used.
 */
export declare function getMetadata(useDetailsRoute?: boolean): Promise<VmMetadata>;
export declare function formatDate(dateString: string): string;
export declare function formatTime(dateString: string): string;
export declare function formatTimestamp(timestamp: number): string;
export declare function formatBytes(numBytes: number, numDecimals?: number): string;
export declare function formatMs(ms: number): string;
/** Returns the appropriate API endpoint for the environment. */
export declare function getApiEndpointForEnvironment(apiEnvironment: ApiEnvironment): string;
/** Returns a Promise that will resolve in a fixed amount of time. */
export declare function sleep(timeInMs?: number): Promise<unknown>;
export declare function logError(errorEvent: ErrorEvent): Promise<void>;
export declare function logUnhandledRejection(event: PromiseRejectionEvent): Promise<void>;
declare class AppLog {
    private _sendToBackendEnabled;
    set sendToBackendEnabled(value: boolean);
    private sendLogMessage;
    messageToString(message?: any, ...optionalParams: any[]): string;
    debug(message?: any, ...optionalParams: any[]): void;
    info(message?: any, ...optionalParams: any[]): void;
    log(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
}
export declare function isError(candidate: any): candidate is Error;
export declare const appLog: AppLog;
export {};
