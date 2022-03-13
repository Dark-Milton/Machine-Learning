import { ReactWidget } from '@jupyterlab/apputils';
import { ISignal } from '@lumino/signaling';
import React from 'react';
import { NotebookProvider } from '../service/notebook_provider';
import { Accelerator } from './data/accelerator_types';
import { DetailsResponse } from './data/data';
import { MachineTypeConfiguration } from './data/machine_types';
interface Props {
    dialogTriggeredSignal: ISignal<any, void>;
    showPopoverSignal: ISignal<any, void>;
    notebookProvider: NotebookProvider;
}
interface State {
    isOpen: boolean;
    openForm: boolean;
    vmDetails?: DetailsResponse;
    acceleratorTypes?: Accelerator[];
    machineTypes?: MachineTypeConfiguration[];
}
/** Wraps the HardwareConfigurationDialog and controls its behavior. */
export declare class HardwareConfig extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    render(): JSX.Element;
    private onModifyHardwareClick;
    private getVmDetails;
    private getFormOptions;
}
/** Widget to manage display of the hardware config dialog. */
export declare class HardwareConfigWidget extends ReactWidget {
    private readonly dialogTriggeredSignal;
    private readonly showPopoverSignal;
    private readonly notebookProvider;
    constructor(dialogTriggeredSignal: ISignal<any, void>, showPopoverSignal: ISignal<any, void>, notebookProvider: NotebookProvider);
    render(): JSX.Element;
}
export {};
