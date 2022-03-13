import { ReactWidget } from '@jupyterlab/apputils';
import { Token } from '@lumino/coreutils';
import { Signal } from '@lumino/signaling';
import React from 'react';
import { NotebookProvider } from '../service/notebook_provider';
/** ID of the button to view hardware details */
export declare const HARDWARE_BUTTON_ID = "jp-beatrixToolbar-hardwareButton";
/** Button that can be clicked to view hardware details */
export declare const HardwareButton: React.ComponentType<any>;
interface Props {
    email: string;
    machineType: string;
    onShowPopover: () => void;
}
/** Displays toolbar */
export declare function Toolbar(props: Props): JSX.Element;
/** Token for the ToolbarWidget */
export declare const BeatrixToolbarToken: Token<ToolbarWidget>;
/** Widget to display top-right toolbar. */
export declare class ToolbarWidget extends ReactWidget {
    private readonly notebookProvider;
    readonly showPopoverSignal: Signal<ToolbarWidget, void>;
    constructor(notebookProvider: NotebookProvider);
    render(): JSX.Element;
}
export {};
