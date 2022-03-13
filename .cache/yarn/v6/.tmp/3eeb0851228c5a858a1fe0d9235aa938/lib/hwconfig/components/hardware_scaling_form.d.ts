import * as React from 'react';
import { Option } from '../../utils';
import { HardwareConfiguration, DetailsResponse } from '../data/data';
import { Accelerator } from '../data/accelerator_types';
import { MachineTypeConfiguration } from '../data/machine_types';
interface Props {
    acceleratorTypes: Accelerator[];
    details: DetailsResponse;
    machineTypes: MachineTypeConfiguration[];
    onSubmit: (configuration: HardwareConfiguration) => void;
    onDialogClose: () => void;
}
interface State {
    configuration: HardwareConfiguration;
    gpuCountOptions: Option[];
    gpuTypeOptions: Option[];
}
export declare const FORM_STYLES: {
    checkboxContainer: string;
    formContainer: string;
    topPadding: string;
};
export declare class HardwareScalingForm extends React.Component<Props, State> {
    private oldConfiguration;
    constructor(props: Props);
    render(): JSX.Element;
    private canAttachGpu;
    private onAttachGpuChange;
    private onGpuTypeChange;
    private onGpuCountChange;
    private onMachineTypeChange;
    private submitForm;
    private gpuRestrictionMessage;
}
export {};
