/// <reference types="react" />
import { ReactWidget } from '@jupyterlab/apputils';
/** Widget to be registered in the main panel. */
export declare class ModelDetailsWidget extends ReactWidget {
    private readonly model_id;
    private readonly name;
    constructor(model_id: string, name: string);
    render(): JSX.Element;
}
