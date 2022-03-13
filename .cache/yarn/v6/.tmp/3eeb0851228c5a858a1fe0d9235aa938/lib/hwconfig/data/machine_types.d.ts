import { Option } from '../../utils';
import { GapiMachineType } from '../service/hardware_service';
export interface MachineType {
    name: string;
    description: string;
}
export declare function optionToMachineType(option: Option): MachineType;
export declare function machineTypeToOption(machineType: MachineType): Option;
/**
 * AI Platform Machine types.
 * https://cloud.google.com/ai-platform/training/docs/machine-types#compare-machine-types
 * In a format to be used by the machine type select dropdown in
 * the hardware scaling form
 */
export interface MachineTypeConfiguration {
    base: Option;
    configurations: Option[];
}
export declare const MACHINE_TYPES: MachineTypeConfiguration[];
/** Prefix of the names of N1 machine types */
export declare const N1_MACHINE_PREFIX = "n1-";
/** Prefix of the names of A2 machine types */
export declare const A2_MACHINE_PREFIX = "a2-";
/**
 * Get description text from Machine Type value
 */
export declare function getMachineTypeText(value: string, machineTypes?: MachineTypeConfiguration[]): string;
export declare function machineTypeToBaseName(machineTypeName: string): string;
/**
 * Converts a list of MachineTypes retrieved using the compute API
 * into a list of MachineTypeConfiguration to be used by the
 * machine type select dropdown in the hardware scaling form.
 */
export declare function getMachineTypeConfigurations(machineTypes: GapiMachineType[]): MachineTypeConfiguration[];
