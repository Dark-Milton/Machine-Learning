/**
 * Modified from nbdime
 * https://github.com/jupyter/nbdime/blob/master/packages/labextension/src/widget.ts
 */
import { PromiseDelegate } from '@lumino/coreutils';
import { Panel, Widget } from '@lumino/widgets';
import { NotebookMergeModel } from 'nbdime/lib/merge/model';
import { CELLMERGE_CLASS, NotebookMergeWidget } from 'nbdime/lib/merge/widget';
import { UNCHANGED_MERGE_CLASS } from 'nbdime/lib/merge/widget/common';
import { NotebookDiffModel } from 'nbdime/lib/diff/model';
import { CELLDIFF_CLASS, NotebookDiffWidget } from 'nbdime/lib/diff/widget';
import { CHUNK_PANEL_CLASS, UNCHANGED_DIFF_CLASS } from 'nbdime/lib/diff/widget/common';
import { requestAPI } from '../../git';
import { nullTranslator } from '@jupyterlab/translation';
/**
 * Class of the outermost widget, the draggable tab
 */
const NBDIME_CLASS = 'nbdime-Widget';
/**
 * Class of the root of the actual diff, the scroller element
 */
export const ROOT_CLASS = 'nbdime-root';
/**
 * DOM class for whether or not to hide unchanged cells
 */
const HIDE_UNCHANGED_CLASS = 'jp-mod-hideUnchanged';
/**
 * Diff callback to be registered for notebook files.
 *
 * @param model Diff model
 * @param toolbar MainAreaWidget toolbar
 * @returns Diff notebook widget
 */
export const createNotebookDiff = async (model, renderMime, toolbar, translator) => {
    // Create the notebook diff view
    const trans = translator.load('jupyterlab_git');
    const diffWidget = new NotebookDiff(model, renderMime, trans);
    diffWidget.addClass('jp-git-diff-root');
    await diffWidget.ready;
    // Add elements in toolbar
    if (toolbar) {
        const checkbox = document.createElement('input');
        const label = document.createElement('label');
        checkbox.className = 'nbdime-hide-unchanged';
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        label.appendChild(checkbox);
        label.appendChild(document.createElement('span')).textContent = trans.__('Hide unchanged cells');
        toolbar.addItem('hideUnchanged', new Widget({ node: label }));
        if (model.hasConflict) {
            // Move merge notebook controls in the toolbar
            toolbar.addItem('clear-outputs', diffWidget.nbdimeWidget.widgets[0]);
        }
        // Connect toolbar checkbox and notebook diff widget
        diffWidget.areUnchangedCellsHidden = checkbox.checked;
        checkbox.onchange = () => {
            diffWidget.areUnchangedCellsHidden = checkbox.checked;
        };
    }
    return diffWidget;
};
/**
 * NotebookDiff widget
 */
export class NotebookDiff extends Panel {
    constructor(model, renderMime, translator) {
        super();
        this._areUnchangedCellsHidden = false;
        this._lastSerializeModel = null;
        const getReady = new PromiseDelegate();
        this._isReady = getReady.promise;
        this._model = model;
        this._renderMime = renderMime;
        this._trans = translator !== null && translator !== void 0 ? translator : nullTranslator.load('jupyterlab_git');
        this.addClass(NBDIME_CLASS);
        this.refresh()
            .then(() => {
            getReady.resolve();
        })
            .catch(reason => {
            console.error(this._trans.__('Failed to refresh Notebook diff.'), reason, reason === null || reason === void 0 ? void 0 : reason.traceback);
        });
    }
    /**
     * Whether the unchanged cells are hidden or not
     */
    get areUnchangedCellsHidden() {
        return this._areUnchangedCellsHidden;
    }
    set areUnchangedCellsHidden(v) {
        if (this._areUnchangedCellsHidden !== v) {
            Private.toggleShowUnchanged(this._scroller, this._hasConflict, this._areUnchangedCellsHidden);
            this._areUnchangedCellsHidden = v;
        }
    }
    /**
     * Helper to determine if a notebook merge should be shown.
     */
    get _hasConflict() {
        return this._model.hasConflict;
    }
    /**
     * Nbdime notebook widget.
     */
    get nbdimeWidget() {
        return this._nbdWidget;
    }
    /**
     * Promise which fulfills when the widget is ready.
     */
    get ready() {
        return this._isReady;
    }
    /**
     * Checks if all conflicts have been resolved.
     *
     * @see https://github.com/jupyter/nbdime/blob/a74b538386d05e3e9c26753ad21faf9ff4d269d7/packages/webapp/src/app/save.ts#L2
     */
    get isFileResolved() {
        const widget = this.nbdimeWidget;
        this._lastSerializeModel = widget.model.serialize();
        const validated = widget.validateMerged(this._lastSerializeModel);
        return (JSON.stringify(this._lastSerializeModel) === JSON.stringify(validated));
    }
    /**
     * Gets the file model of a resolved merge conflict,
     * and rejects if unable to retrieve.
     *
     * Note: `isFileResolved` is assumed to not have been called,
     * or to have been called just before calling this method for caching purposes.
     */
    async getResolvedFile() {
        var _a;
        return Promise.resolve({
            format: 'json',
            type: 'notebook',
            content: (_a = this._lastSerializeModel) !== null && _a !== void 0 ? _a : this.nbdimeWidget.model.serialize()
        });
    }
    /**
     * Refresh diff
     *
     * Note: Update the content and recompute the diff
     */
    async refresh() {
        var _a, _b;
        if (!((_a = this._scroller) === null || _a === void 0 ? void 0 : _a.parent)) {
            while (this.widgets.length > 0) {
                this.widgets[0].dispose();
            }
            const header = Private.diffHeader(this._model.reference.label, this._model.challenger.label, this._hasConflict, this._trans.__('Common Ancestor'));
            this.addWidget(header);
            this._scroller = new Panel();
            this._scroller.addClass(ROOT_CLASS);
            this._scroller.node.tabIndex = -1;
            this.addWidget(this._scroller);
        }
        try {
            // ENH request content only if it changed
            const referenceContent = await this._model.reference.content();
            const challengerContent = await this._model.challenger.content();
            const baseContent = await ((_b = this._model.base) === null || _b === void 0 ? void 0 : _b.content());
            const createView = baseContent
                ? this.createMergeView.bind(this)
                : this.createDiffView.bind(this);
            this._nbdWidget = await createView(challengerContent, referenceContent, baseContent);
            while (this._scroller.widgets.length > 0) {
                this._scroller.widgets[0].dispose();
            }
            this._scroller.addWidget(this._nbdWidget);
            try {
                await this._nbdWidget.init();
                Private.markUnchangedRanges(this._scroller.node, this._hasConflict);
            }
            catch (reason) {
                // FIXME there is a bug in nbdime and init got reject due to recursion limit hit
                // console.error(`Failed to init notebook diff view: ${reason}`);
                // getReady.reject(reason);
                console.debug(this._trans.__('Failed to init notebook diff view: %1', reason));
                Private.markUnchangedRanges(this._scroller.node, this._hasConflict);
            }
        }
        catch (reason) {
            this.showError(reason);
        }
    }
    async createDiffView(challengerContent, referenceContent) {
        const data = await requestAPI('diffnotebook', 'POST', {
            currentContent: challengerContent,
            previousContent: referenceContent
        });
        const model = new NotebookDiffModel(data.base, data.diff);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return new NotebookDiffWidget(model, this._renderMime);
    }
    async createMergeView(challengerContent, referenceContent, baseContent) {
        const data = await requestAPI('diffnotebook', 'POST', {
            currentContent: challengerContent,
            previousContent: referenceContent,
            baseContent
        });
        const model = new NotebookMergeModel(data.base, data.merge_decisions);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return new NotebookMergeWidget(model, this._renderMime);
    }
    /**
     * Handle `'activate-request'` messages.
     */
    onActivateRequest(msg) {
        var _a;
        if ((_a = this._scroller) === null || _a === void 0 ? void 0 : _a.parent) {
            this._scroller.node.focus();
        }
    }
    /**
     * Display an error instead of the file diff
     *
     * @param error Error object
     */
    showError(error) {
        var _a;
        console.error(this._trans.__('Failed to load file diff.'), error, (_a = error) === null || _a === void 0 ? void 0 : _a.traceback);
        while (this.widgets.length > 0) {
            this.widgets[0].dispose();
        }
        const msg = (error.message || error).replace('\n', '<br />');
        this.node.innerHTML = `<p class="jp-git-diff-error">
      <span>${this._trans.__('Error Loading Notebook Diff:')}</span>
      <span class="jp-git-diff-error-message">${msg}</span>
    </p>`;
    }
}
var Private;
(function (Private) {
    /**
     * Create a header widget for the diff view.
     */
    function diffHeader(localLabel, remoteLabel, hasConflict, baseLabel) {
        const bannerClass = hasConflict
            ? 'jp-git-merge-banner'
            : 'jp-git-diff-banner';
        const node = document.createElement('div');
        node.className = 'jp-git-diff-header';
        node.innerHTML = `<div class="${bannerClass}">
        <span>${localLabel}</span>
        <span class="jp-spacer"></span>
        ${hasConflict
            ? // Add extra space during notebook merge view
                `<span>${baseLabel}</span><span class="jp-spacer"></span>`
            : ''}
        <span>${remoteLabel}</span>
      </div>`;
        return new Widget({ node });
    }
    Private.diffHeader = diffHeader;
    /**
     * Toggle whether to show or hide unchanged cells.
     *
     * This simply marks with a class, real work is done by CSS.
     */
    function toggleShowUnchanged(root, hasConflict, show) {
        const hiding = root.hasClass(HIDE_UNCHANGED_CLASS);
        if (show === undefined) {
            show = hiding;
        }
        else if (hiding !== show) {
            // Nothing to do
            return;
        }
        if (show) {
            root.removeClass(HIDE_UNCHANGED_CLASS);
        }
        else {
            markUnchangedRanges(root.node, hasConflict);
            root.addClass(HIDE_UNCHANGED_CLASS);
        }
        root.update();
    }
    Private.toggleShowUnchanged = toggleShowUnchanged;
    /**
     * Gets the chunk element of an added/removed cell, or the cell element for others
     * @param cellElement
     */
    function getChunkElement(cellElement) {
        if (!cellElement.parentElement ||
            !cellElement.parentElement.parentElement) {
            return cellElement;
        }
        const chunkCandidate = cellElement.parentElement.parentElement;
        if (chunkCandidate.classList.contains(CHUNK_PANEL_CLASS)) {
            return chunkCandidate;
        }
        return cellElement;
    }
    /**
     * Marks certain cells with
     */
    function markUnchangedRanges(root, hasConflict) {
        var _a;
        const CELL_CLASS = hasConflict ? CELLMERGE_CLASS : CELLDIFF_CLASS;
        const UNCHANGED_CLASS = hasConflict
            ? UNCHANGED_MERGE_CLASS
            : UNCHANGED_DIFF_CLASS;
        const NOTEBOOK_CLASS = hasConflict
            ? '.jp-Notebook-merge'
            : '.jp-Notebook-diff';
        const children = root.querySelectorAll(`.${CELL_CLASS}`);
        let rangeStart = -1;
        for (let i = 0; i < children.length; ++i) {
            const child = children[i];
            if (!child.classList.contains(UNCHANGED_CLASS)) {
                // Visible
                if (rangeStart !== -1) {
                    // Previous was hidden
                    const N = i - rangeStart;
                    getChunkElement(child).setAttribute('data-nbdime-NCellsHiddenBefore', N.toString());
                    rangeStart = -1;
                }
            }
            else if (rangeStart === -1) {
                rangeStart = i;
            }
        }
        if (rangeStart !== -1) {
            // Last element was part of a hidden range, need to mark
            // the last cell that will be visible.
            const N = children.length - rangeStart;
            if (rangeStart === 0) {
                // All elements were hidden, nothing to mark
                // Add info on root instead
                const tag = (_a = root.querySelector(NOTEBOOK_CLASS)) !== null && _a !== void 0 ? _a : root;
                tag.setAttribute('data-nbdime-AllCellsHidden', N.toString());
                return;
            }
            const lastVisible = children[rangeStart - 1];
            getChunkElement(lastVisible).setAttribute('data-nbdime-NCellsHiddenAfter', N.toString());
        }
    }
    Private.markUnchangedRanges = markUnchangedRanges;
})(Private || (Private = {}));
//# sourceMappingURL=NotebookDiff.js.map