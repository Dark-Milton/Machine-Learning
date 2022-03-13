/// <reference types="@maxim_mazurok/gapi.client.compute" />
import { NotebookProvider } from '../../service/notebook_provider';
import { Accelerator } from '../data/accelerator_types';
import { DetailsResponse } from '../data/data';
export interface Operation {
    name?: string;
    metadata?: Record<string, unknown>;
    done?: boolean;
    error?: {
        code?: number;
        message?: string;
        details?: Array<Record<string, unknown>>;
    };
    response?: Record<string, unknown>;
}
interface AcceleratorConfig {
    type?: string;
    coreCount?: number;
}
export interface SwitchRuntimeParams {
    machineType?: string;
    gpuType?: string;
    coreCount?: number;
}
export interface HardwareDetails {
    name: string;
    state?: string;
    machineType?: string;
    acceleratorConfig?: AcceleratorConfig;
}
export declare type GapiMachineType = gapi.client.compute.MachineType;
export declare const COMPUTE_ENGINE_API_PATH = "https://compute.googleapis.com/compute/v1";
/**
 * Returns information about the underlying Notebook as well as helper
 * methods for other hardware resource types.
 */
export declare class HardwareService {
    private readonly notebookProvider;
    private readonly serverSettings;
    private readonly _transportService;
    private readonly projectId;
    private readonly locationId;
    private readonly name;
    private readonly zone;
    private readonly detailsUrl;
    private readonly zoneName;
    private readonly runtimeName;
    private machineTypesPromise?;
    private acceleratorTypesPromise?;
    constructor(notebookProvider: NotebookProvider);
    getVmDetails(): Promise<DetailsResponse>;
    /**
     * Retrieves a list of machine types available for the specified project in the specified region.
     */
    getMachineTypes(): Promise<GapiMachineType[]>;
    /**
     * Retrieves a list of accelerators available for the specified project in the specified region.
     */
    getAcceleratorTypes(): Promise<Accelerator[]>;
    /** Switches the hardware configuration of the Runtime. */
    switchRuntime(options: SwitchRuntimeParams): Promise<Operation>;
    /** Gets an operation. */
    getOperation(name: string): Promise<Operation>;
}
export {};
