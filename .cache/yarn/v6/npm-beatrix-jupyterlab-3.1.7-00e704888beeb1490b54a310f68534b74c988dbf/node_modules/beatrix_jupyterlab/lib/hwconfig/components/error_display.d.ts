/// <reference types="react" />
import { MachineTypeConfiguration } from '../data/machine_types';
import { HardwareDetails, Operation } from '../service/hardware_service';
interface Props {
    error: unknown;
    onDialogClose: () => void;
    machineTypes: MachineTypeConfiguration[];
    hardwareDetails?: HardwareDetails;
    operation?: Operation;
}
/** Component to show an error after a hardware switch operation. */
export declare function ErrorDisplay(props: Props): JSX.Element;
export {};
