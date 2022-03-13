/// <reference types="react" />
import { ReactWidget } from '@jupyterlab/apputils';
import { ISignal } from '@lumino/signaling';
export declare class UploadCustomModelsWidget extends ReactWidget {
    private _isOpenSignal;
    private _isOpen;
    private _filePath;
    constructor();
    get isOpen(): boolean;
    set isOpen(isOpen: boolean);
    get isOpenSignal(): ISignal<this, boolean>;
    set filePath(path: string | undefined);
    render(): JSX.Element;
}
