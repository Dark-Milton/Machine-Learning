/// <reference types="react" />
import { ReactWidget } from '@jupyterlab/apputils';
import { ISignal } from '@lumino/signaling';
export declare class PanelHeader extends ReactWidget {
    private readonly activitySignal;
    constructor(activitySignal: ISignal<unknown, boolean>);
    render(): JSX.Element;
}
