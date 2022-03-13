import { Option } from '../../utils';
import { MachineType } from './machine_types';
export interface Accelerator {
    name: string;
    description: string;
    maximumCardsPerInstance: number;
}
/**
 * The master list of AI Platform Accelerator types.
 * https://cloud.google.com/ai-platform/training/docs/using-gpus#compute-engine-machine-types-with-gpu
 * https://cloud.google.com/ai-platform/notebooks/docs/reference/rest/v1beta1/projects.locations.instances#AcceleratorType
 */
export declare const NO_ACCELERATOR_TYPE = "ACCELERATOR_TYPE_UNSPECIFIED";
export declare const NO_ACCELERATOR_COUNT = 0;
export declare const ACCELERATOR_TYPES: Option[];
export declare function getGpuTypeText(value: string): string;
/**
 * AI Platform Accelerator counts.
 * https://cloud.google.com/ai-platform/training/docs/using-gpus
 */
export declare const ACCELERATOR_COUNTS_1_2_4_8: Option[];
export declare function nvidiaNameToEnum(name: string): string;
/**
 * Format gcloud compute acceleratorType to match the AcceleratorType
 * enums that are used in the Notebooks API and ensure it exists:
 */
export declare function acceleratorNameToEnum(name: string): string;
export declare function getGpuTypeOptionsList(accelerators: Accelerator[], cpuPlatform: string, machineType: MachineType): Option[];
export declare function getGpuCountOptionsList(accelerators: Accelerator[], acceleratorName: string): Option[];
