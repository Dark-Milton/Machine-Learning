/// <reference types="react" />
import { ReactWidget } from '@jupyterlab/apputils';
export declare class MountStatus extends ReactWidget {
    private readonly bucketName;
    private actionText;
    constructor(bucketName: string, mounting: boolean);
    render(): JSX.Element;
}
