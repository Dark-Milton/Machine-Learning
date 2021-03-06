"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NbdimeWidget = void 0;
const services_1 = require("@jupyterlab/services");
const widgets_1 = require("@lumino/widgets");
const model_1 = require("nbdime/lib/diff/model");
const widget_1 = require("nbdime/lib/diff/widget");
const common_1 = require("nbdime/lib/diff/widget/common");
const request_1 = require("nbdime/lib/request");
/**
 * Class of the outermost widget, the draggable tab
 */
const NBDIME_CLASS = 'nbdime-Widget';
/**
 * Class of the root of the actual diff, the scroller element
 */
const ROOT_CLASS = 'nbdime-root';
/**
 * DOM class for whether or not to hide unchanged cells
 */
const HIDE_UNCHANGED_CLASS = 'jp-mod-hideUnchanged';
class NbdimeWidget extends widgets_1.Panel {
    /**
     *
     */
    constructor(options) {
        super();
        this.addClass(NBDIME_CLASS);
        this.base = options.base;
        this.remote = options.remote;
        this.rendermime = options.rendermime;
        let header = Private.diffHeader(options);
        this.addWidget(header);
        this.scroller = new widgets_1.Panel();
        this.scroller.addClass(ROOT_CLASS);
        this.scroller.node.tabIndex = -1;
        this.addWidget(this.scroller);
        let hideUnchangedChk = header.node.getElementsByClassName('nbdime-hide-unchanged')[0];
        hideUnchangedChk.checked = options.hideUnchanged === undefined
            ? true : options.hideUnchanged;
        hideUnchangedChk.onchange = () => {
            Private.toggleShowUnchanged(this.scroller, !hideUnchangedChk.checked);
        };
        if (options.hideUnchanged) {
            Private.toggleShowUnchanged(this.scroller, false);
        }
        let args;
        if (this.remote) {
            args = { base: this.base, remote: this.remote };
        }
        else if (options.baseLabel === 'Checkpoint') {
            args = { base: `checkpoint:${this.base}` };
        }
        else {
            args = { base: `git:${this.base}` };
        }
        request_1.requestApiJson(services_1.ServerConnection.makeSettings().baseUrl, 'nbdime/api/diff', args, this.onData.bind(this), this.onError.bind(this));
        this.id = `nbdime-${JSON.stringify(args)}`;
        this.title.closable = true;
        return this;
    }
    dispose() {
        super.dispose();
        this.rendermime = null;
        this.header = null;
        this.scroller = null;
    }
    /**
     * Handle `'activate-request'` messages.
     */
    onActivateRequest(msg) {
        this.scroller.node.focus();
    }
    onData(data) {
        if (this.isDisposed) {
            return;
        }
        let base = data['base'];
        let diff = data['diff'];
        let nbdModel = new model_1.NotebookDiffModel(base, diff);
        let nbdWidget = new widget_1.NotebookDiffWidget(nbdModel, this.rendermime);
        this.scroller.addWidget(nbdWidget);
        let work = nbdWidget.init();
        work.then(() => {
            Private.markUnchangedRanges(this.scroller.node);
        });
        return work;
    }
    onError(error) {
        if (this.isDisposed) {
            return;
        }
        let widget = new widgets_1.Widget();
        widget.node.innerHTML = `Failed to fetch diff: ${error.message}`;
        this.scroller.addWidget(widget);
    }
}
exports.NbdimeWidget = NbdimeWidget;
var Private;
(function (Private) {
    /**
     * Create a header widget for the diff view.
     */
    function diffHeader(options) {
        let { base, remote, baseLabel, remoteLabel } = options;
        if (remote) {
            if (baseLabel === undefined) {
                baseLabel = base;
            }
            if (remoteLabel === undefined) {
                remoteLabel = remote;
            }
        }
        else {
            if (!baseLabel) {
                baseLabel = 'git HEAD';
            }
            remoteLabel = base;
        }
        let node = document.createElement('div');
        node.className = 'nbdime-Diff';
        node.innerHTML = `
      <div class="nbdime-header-buttonrow">
        <label><input class="nbdime-hide-unchanged" type="checkbox">Hide unchanged cells</label>
        <button class="nbdime-export" style="display: none">Export diff</button>
      </div>
      <div class=nbdime-header-banner>
        <span class="nbdime-header-base"></span>
        <span class="nbdime-header-remote"></span>
      </div>`;
        node.getElementsByClassName("nbdime-header-base")[0].innerText = baseLabel;
        node.getElementsByClassName("nbdime-header-remote")[0].innerText = remoteLabel;
        return new widgets_1.Widget({ node });
    }
    Private.diffHeader = diffHeader;
    /**
     * Toggle whether to show or hide unchanged cells.
     *
     * This simply marks with a class, real work is done by CSS.
     */
    function toggleShowUnchanged(root, show) {
        let hiding = root.hasClass(HIDE_UNCHANGED_CLASS);
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
            markUnchangedRanges(root.node);
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
        if (!cellElement.parentElement || !cellElement.parentElement.parentElement) {
            return cellElement;
        }
        let chunkCandidate = cellElement.parentElement.parentElement;
        if (chunkCandidate.classList.contains(common_1.CHUNK_PANEL_CLASS)) {
            return chunkCandidate;
        }
        return cellElement;
    }
    /**
     * Marks certain cells with
     */
    function markUnchangedRanges(root) {
        let children = root.querySelectorAll(`.${widget_1.CELLDIFF_CLASS}`);
        let rangeStart = -1;
        for (let i = 0; i < children.length; ++i) {
            let child = children[i];
            if (!child.classList.contains(common_1.UNCHANGED_DIFF_CLASS)) {
                // Visible
                if (rangeStart !== -1) {
                    // Previous was hidden
                    let N = i - rangeStart;
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
            let N = children.length - rangeStart;
            if (rangeStart === 0) {
                // All elements were hidden, nothing to mark
                // Add info on root instead
                let tag = root.querySelector('.jp-Notebook-diff') || root;
                tag.setAttribute('data-nbdime-AllCellsHidden', N.toString());
                return;
            }
            let lastVisible = children[rangeStart - 1];
            getChunkElement(lastVisible).setAttribute('data-nbdime-NCellsHiddenAfter', N.toString());
        }
    }
    Private.markUnchangedRanges = markUnchangedRanges;
})(Private || (Private = {}));
//# sourceMappingURL=widget.js.map