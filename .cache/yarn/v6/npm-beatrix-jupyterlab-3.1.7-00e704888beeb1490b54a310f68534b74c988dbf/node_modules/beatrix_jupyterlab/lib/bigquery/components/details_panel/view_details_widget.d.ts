/// <reference types="react" />
import { ReactWidget } from '@jupyterlab/apputils';
/** Widget to be registered in the main panel. */
export declare class ViewDetailsWidget extends ReactWidget {
    private readonly view_id;
    private readonly name;
    constructor(view_id: string, name: string);
    render(): JSX.Element;
}
