/**
 * Modified from nbdime
 * https://github.com/jupyter/nbdime/blob/master/packages/labextension/src/widget.ts
 */
import { Toolbar } from '@jupyterlab/apputils';
import { Contents } from '@jupyterlab/services';
import { INotebookContent } from '@jupyterlab/nbformat';
import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { Message } from '@lumino/messaging';
import { Panel } from '@lumino/widgets';
import { NotebookMergeWidget } from 'nbdime/lib/merge/widget';
import { NotebookDiffWidget } from 'nbdime/lib/diff/widget';
import { Git } from '../../tokens';
import { ITranslator, TranslationBundle } from '@jupyterlab/translation';
/**
 * Class of the root of the actual diff, the scroller element
 */
export declare const ROOT_CLASS = "nbdime-root";
/**
 * Diff callback to be registered for notebook files.
 *
 * @param model Diff model
 * @param toolbar MainAreaWidget toolbar
 * @returns Diff notebook widget
 */
export declare const createNotebookDiff: (model: Git.Diff.IModel, renderMime: IRenderMimeRegistry, toolbar?: Toolbar, translator?: ITranslator) => Promise<NotebookDiff>;
/**
 * NotebookDiff widget
 */
export declare class NotebookDiff extends Panel implements Git.Diff.IDiffWidget {
    constructor(model: Git.Diff.IModel, renderMime: IRenderMimeRegistry, translator?: TranslationBundle);
    /**
     * Whether the unchanged cells are hidden or not
     */
    get areUnchangedCellsHidden(): boolean;
    set areUnchangedCellsHidden(v: boolean);
    /**
     * Helper to determine if a notebook merge should be shown.
     */
    private get _hasConflict();
    /**
     * Nbdime notebook widget.
     */
    get nbdimeWidget(): NotebookDiffWidget | NotebookMergeWidget;
    /**
     * Promise which fulfills when the widget is ready.
     */
    get ready(): Promise<void>;
    /**
     * Checks if all conflicts have been resolved.
     *
     * @see https://github.com/jupyter/nbdime/blob/a74b538386d05e3e9c26753ad21faf9ff4d269d7/packages/webapp/src/app/save.ts#L2
     */
    get isFileResolved(): boolean;
    /**
     * Gets the file model of a resolved merge conflict,
     * and rejects if unable to retrieve.
     *
     * Note: `isFileResolved` is assumed to not have been called,
     * or to have been called just before calling this method for caching purposes.
     */
    getResolvedFile(): Promise<Partial<Contents.IModel>>;
    /**
     * Refresh diff
     *
     * Note: Update the content and recompute the diff
     */
    refresh(): Promise<void>;
    protected createDiffView(challengerContent: string, referenceContent: string): Promise<NotebookDiffWidget>;
    protected createMergeView(challengerContent: string, referenceContent: string, baseContent: string): Promise<NotebookMergeWidget>;
    /**
     * Handle `'activate-request'` messages.
     */
    protected onActivateRequest(msg: Message): void;
    /**
     * Display an error instead of the file diff
     *
     * @param error Error object
     */
    protected showError(error: Error): void;
    protected _areUnchangedCellsHidden: boolean;
    protected _isReady: Promise<void>;
    protected _lastSerializeModel: INotebookContent | null;
    protected _model: Git.Diff.IModel;
    protected _nbdWidget: NotebookMergeWidget | NotebookDiffWidget;
    protected _renderMime: IRenderMimeRegistry;
    protected _scroller: Panel;
    protected _trans: TranslationBundle;
}
