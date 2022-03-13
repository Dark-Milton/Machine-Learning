import { Token } from '@lumino/coreutils';
import { Signal } from '@lumino/signaling';
import { ServerProxyTransportService } from './transport';
/** DI token for the NotebookProvider class. */
export declare const NotebookProviderToken: Token<NotebookProvider>;
declare type DiskType = 'DISK_TYPE_UNSPECIFIED' | 'PD_STANDARD' | 'PD_SSD' | 'PD_BALANCED';
declare type RuntimeAcceleratorConfigType = 'ACCELERATOR_TYPE_UNSPECIFIED' | 'NVIDIA_TESLA_K80' | 'NVIDIA_TESLA_P100' | 'NVIDIA_TESLA_V100' | 'NVIDIA_TESLA_P4' | 'NVIDIA_TESLA_T4' | 'NVIDIA_TESLA_A100' | 'TPU_V2' | 'TPU_V3' | 'NVIDIA_TESLA_T4_VWS' | 'NVIDIA_TESLA_P100_VWS' | 'NVIDIA_TESLA_P4_VWS';
declare type State = 'STATE_UNSPECIFIED' | 'STARTING' | 'PROVISIONING' | 'ACTIVE' | 'STOPPING' | 'STOPPED' | 'DELETING' | 'UPGRADING' | 'INITIALIZING';
/** Stores information about accelerator used. */
export interface AcceleratorConfig {
    type: RuntimeAcceleratorConfigType;
    coreCount: string;
}
interface InstanceDisk {
    boot: boolean;
    deviceName: string;
    diskSizeGb: string;
}
/** Stores user and notebook information including environment. */
export interface NotebookInstance {
    name: string;
    proxyUri: string;
    instanceOwners?: string[];
    machineType: string;
    acceleratorConfig?: AcceleratorConfig;
    state: State;
    disks?: InstanceDisk[];
    metadata: {
        framework: string;
        'proxy-user-mail'?: string;
        title: string;
        version: string;
    };
}
/** Notebook resource. */
export interface Notebook {
    name: string;
    zone: string;
    state: State;
    isManaged: boolean;
    owner: string;
    proxyUri: string;
    machineType: string;
    diskType: DiskType;
    diskSizeGb: string;
    acceleratorConfig?: AcceleratorConfig;
    customKernelImages?: string[];
}
/** Factory for services consumed by other extensions. */
export declare class NotebookProvider {
    readonly serverTransportService: ServerProxyTransportService;
    readonly apiEndpoint: string;
    private notebook;
    readonly projectId: string;
    readonly locationId: string;
    readonly notebookName: string;
    readonly machineType: string;
    readonly acceleratorConfig: AcceleratorConfig | undefined;
    readonly owner: string;
    readonly notebookSignal: Signal<NotebookProvider, Notebook>;
    private constructor();
    get notebookSnapshot(): Notebook;
    get region(): string;
    refresh(): Promise<void>;
    /** Factory method to build a NotebookProvider instance. */
    static build(serverTransportService: ServerProxyTransportService, notebookName: string, apiEndpoint: string): Promise<NotebookProvider>;
    /** Returns a Notebook. */
    private static get;
    /** Returns a Notebook from a Managed Runtime. */
    private static getForRuntime;
    /** Returns a Notebook from a semi-Managed Instance. */
    private static getForInstance;
}
export {};
