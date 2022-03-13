/// <reference types="react" />
import { ReactWidget } from '@jupyterlab/apputils';
/** Widget to be registered in the main panel. */
export declare class TableDetailsWidget extends ReactWidget {
    private readonly table_id;
    private readonly name;
    private readonly partitioned;
    constructor(table_id: string, name: string, partitioned: boolean);
    render(): JSX.Element;
}
