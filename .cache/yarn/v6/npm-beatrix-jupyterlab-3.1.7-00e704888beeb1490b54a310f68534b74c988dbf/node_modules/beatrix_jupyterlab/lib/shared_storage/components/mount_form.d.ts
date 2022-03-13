/// <reference types="react" />
import { Dialog, ReactWidget } from '@jupyterlab/apputils';
export declare class MountForm extends ReactWidget implements Dialog.IBodyWidget<string> {
    private bucketName;
    getValue(): string;
    render(): JSX.Element;
}
