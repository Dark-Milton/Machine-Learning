import * as React from 'react';
import { Accelerator } from '../data/accelerator_types';
import { MachineTypeConfiguration } from '../data/machine_types';
import { HardwareConfiguration, DetailsResponse } from '../data/data';
export declare enum View {
    DETAILS = 0,
    FORM = 1,
    CONFIRMATION = 2,
    STATUS = 3
}
interface Props {
    open: boolean;
    openForm?: boolean;
    receivedError: boolean;
    onClose: () => void;
    onCompletion: () => void;
    details: DetailsResponse;
    acceleratorTypes: Accelerator[];
    machineTypes: MachineTypeConfiguration[];
}
interface State {
    view: View;
    hardwareConfiguration?: HardwareConfiguration;
}
export declare class HardwareConfigurationDialog extends React.Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element;
    private getDisplay;
}
export {};
