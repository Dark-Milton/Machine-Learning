import * as React from 'react';
import { MachineTypeConfiguration } from '../data/machine_types';
import { HardwareDetails, Operation } from '../service/hardware_service';
import { HardwareConfiguration } from '../data/data';
export declare enum Status {
    'Switching runtime' = 0,
    'Complete' = 1,
    'Error' = 2
}
interface Props {
    hardwareConfiguration: HardwareConfiguration;
    machineTypes: MachineTypeConfiguration[];
    onDialogClose: () => void;
    onCompletion: () => void;
}
interface State {
    status: Status;
    hardwareDetails: HardwareDetails;
    error?: unknown;
    operation?: Operation;
}
export declare class HardwareScalingStatus extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private updateStatus;
    private showError;
    private pollDetailsUntilUnavailable;
    private pollDetails;
}
export {};
