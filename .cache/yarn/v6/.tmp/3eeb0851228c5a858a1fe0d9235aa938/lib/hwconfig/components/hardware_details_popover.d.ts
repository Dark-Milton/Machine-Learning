import { ISignal } from '@lumino/signaling';
import React from 'react';
import { DetailsResponse } from '../data/data';
interface Detail {
    label: string;
    utilization: number;
}
/** Displays label and utilization of a given hardware */
export declare function Detail(props: Detail): JSX.Element;
interface Props {
    onModifyHardwareClick: () => void;
    showPopoverSignal: ISignal<unknown, void>;
    vmDetails: DetailsResponse;
}
interface State {
    cpuDetail?: Detail;
    gpuDetail?: Detail;
    isOpen: boolean;
    memoryDetail?: Detail;
    isRuntime?: boolean;
}
/** Button that opens the hardware configuration dialog when clicked */
export declare const ModifyHardwareButton: React.ComponentType<any>;
/** Displays a popover containing hardware details */
export declare class HardwareDetailsPopover extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    render(): JSX.Element;
    private onClose;
    private onModifyHardwareClick;
    private setStateFromDetails;
}
export {};
