/// <reference types="react" />
import { ReactWidget } from '@jupyterlab/apputils';
/** Widget to be registered in the main panel. */
export declare class DatasetDetailsWidget extends ReactWidget {
    private readonly dataset_id;
    private readonly name;
    constructor(dataset_id: string, name: string);
    render(): JSX.Element;
}
