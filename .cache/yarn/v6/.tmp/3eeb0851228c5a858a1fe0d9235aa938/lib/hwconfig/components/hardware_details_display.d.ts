/// <reference types="react" />
import { HardwareDetails } from '../service/hardware_service';
import { MachineTypeConfiguration } from '../data/machine_types';
interface Props {
    hardwareDetails: HardwareDetails;
    machineTypes: MachineTypeConfiguration[];
    title: string;
}
/** Component to display hardware details. */
export declare function HardwareDetailsDisplay(props: Props): JSX.Element;
export {};
