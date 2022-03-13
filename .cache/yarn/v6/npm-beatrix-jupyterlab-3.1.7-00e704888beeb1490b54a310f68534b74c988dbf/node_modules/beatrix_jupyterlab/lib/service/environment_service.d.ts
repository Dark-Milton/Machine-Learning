import { KernelSpecManager } from '@jupyterlab/services';
interface KernelDetails {
    displayName: string;
    name: string;
    container?: string;
    googleKernelName?: string;
}
/**
 * Stores and retrieves environment (kernelspec) details.
 */
export declare class EnvironmentService {
    private readonly kernelSpecManager;
    private readonly kernelSpecs;
    constructor(kernelSpecManager: KernelSpecManager);
    getKernelDetails(name: string): Promise<KernelDetails | undefined>;
    /** Refreshes kernelspecs from the server and repopulates the local map. */
    refreshKernelSpecs(): Promise<void>;
    private populateKernelSpecs;
}
export {};
