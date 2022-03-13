import { Cell, MarkdownCell } from '@jupyterlab/cells';
import { NotebookPanel, StaticNotebook } from '@jupyterlab/notebook';
import { CustomMarkdownCell } from './custom_markdown_cell';
/**
 * A custom implementation of the Content Factory
 * This factory will be used to override the creation of various widgets in the JupyterLab environment.
 */
export declare class CustomContentFactory extends NotebookPanel.ContentFactory {
    constructor(options: Cell.ContentFactory.IOptions);
    createMarkdownCell(options: MarkdownCell.IOptions, parent: StaticNotebook): CustomMarkdownCell;
}
