import { Contents } from '@jupyterlab/services';
import { TranslationBundle } from '@jupyterlab/translation';
import { Widget } from '@lumino/widgets';
import { MergeView } from 'codemirror';
import { Git } from '../../tokens';
/**
 * Diff callback to be registered for plain-text files.
 *
 * @param model Diff model
 * @param toolbar MainAreaWidget toolbar
 * @returns PlainText diff widget
 */
export declare const createPlainTextDiff: Git.Diff.ICallback;
/**
 * Plain Text Diff widget
 */
export declare class PlainTextDiff extends Widget implements Git.Diff.IDiffWidget {
    constructor(model: Git.Diff.IModel, translator?: TranslationBundle);
    /**
     * Helper to determine if three-way diff should be shown.
     */
    private get _hasConflict();
    /**
     * Checks if the conflicted file has been resolved.
     */
    get isFileResolved(): boolean;
    /**
     * Promise which fulfills when the widget is ready.
     */
    get ready(): Promise<void>;
    /**
     * Gets the file model of a resolved merge conflict,
     * and rejects if unable to retrieve.
     */
    getResolvedFile(): Promise<Partial<Contents.IModel>>;
    /**
     * Callback to create the diff widget once the widget
     * is attached so CodeMirror get proper size.
     */
    onAfterAttach(): void;
    /**
     * Undo onAfterAttach
     */
    onBeforeDetach(): void;
    /**
     * Refresh diff
     *
     * Note: Update the content and recompute the diff
     */
    refresh(): Promise<void>;
    /**
     * Create wrapper node
     */
    protected static createNode(...labels: string[]): HTMLElement;
    /**
     * Create the Plain Text Diff view
     *
     * Note: baseContent will only be passed when displaying
     *       a three-way merge conflict.
     */
    protected createDiffView(challengerContent: string, referenceContent: string, baseContent?: string): Promise<void>;
    /**
     * Display an error instead of the file diff
     *
     * @param error Error object
     */
    protected showError(error: Error): void;
    protected getDefaultOptions(): Partial<MergeView.MergeViewEditorConfiguration>;
    protected _container: HTMLElement;
    protected _isReady: Promise<void>;
    protected _mergeView: MergeView.MergeViewEditor;
    protected _model: Git.Diff.IModel;
    protected _trans: TranslationBundle;
    private _reference;
    private _challenger;
    private _base;
}
