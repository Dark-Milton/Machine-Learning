import { Option } from '../../utils';
import { MachineType } from './machine_types';
interface Instance {
    attributes: {
        framework: string;
        title: string;
        version: string;
        'proxy-user-mail': string;
        'runtime-resource-name'?: string;
    };
    cpuPlatform: string;
    id: number;
    image: string;
    machineType: MachineType;
    name: string;
    zone: string;
}
interface Project {
    numericProjectId: number;
    projectId: string;
}
export interface Utilization {
    cpu: number;
    memory: number;
}
interface Gpu {
    name: string;
    driver_version: string;
    cuda_version: string;
    count: number;
    gpu: number;
    memory: number;
    temperature: string;
}
/** Details response information from server extension. */
export interface DetailsResponse {
    instance: Instance;
    project: Project;
    gpu: Gpu;
    utilization: Utilization;
}
export interface HardwareConfiguration {
    machineType: MachineType;
    attachGpu: boolean;
    gpuType: string;
    gpuCount: number;
    diskType?: string;
    diskSizeGb?: string;
}
export declare function isEqualHardwareConfiguration(a: HardwareConfiguration, b: HardwareConfiguration): boolean;
export declare function detailsToHardwareConfiguration(details: DetailsResponse): HardwareConfiguration;
/** The average number of hours in a month, i.e., 365 / 12 * 24 */
export declare const HOURS_PER_MONTH = 730;
export declare const NO_SUSTAINED_DISCOUNT_PREFIXES: string[];
export declare const REGIONS: Option[];
export declare function extractLast(str: string): string;
interface AttributeMapper {
    label: string;
    mapper: (details: DetailsResponse) => string;
}
export declare const MAPPED_ATTRIBUTES: AttributeMapper[];
export declare const REFRESHABLE_MAPPED_ATTRIBUTES: {
    label: string;
    mapper: (details: DetailsResponse) => string;
}[];
export {};
