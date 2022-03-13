import { MarkdownCell } from '@jupyterlab/cells';
import { CustomEditor } from './editor';
import { CellIntegration, IntegrationOptions } from './integrations/cell_integration';
import { Widget } from '@lumino/widgets';
export declare const CHANGE_HANDLER_DELAY = 250;
export declare class CustomMarkdownCell extends MarkdownCell {
    private changeHandlingTimeout;
    private delayedContentChange;
    activeIntegration: CellIntegration<any, any> | undefined;
    integrationOptions: IntegrationOptions<any>;
    private originalMimeType;
    constructor(options: IOptions);
    get editor(): CustomEditor;
    private handleModelChange;
    /**
     * Runs 250ms after typing stops (after the most recent model change that was less than 250ms ago)
     * 250 may not be accurate, double check the `CHANGE_HANDLER_DELAY` variable.
     */
    private onTimedContentChange;
    private detectIntegration;
    private deactivateIntegration;
    renderInput(widget: Widget): void;
}
/**
 * Options for the custom cell.
 */
export declare type IOptions = MarkdownCell.IOptions;
