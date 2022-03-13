"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomMarkdownCell = exports.CHANGE_HANDLER_DELAY = void 0;
const cells_1 = require("@jupyterlab/cells");
const signaling_1 = require("@lumino/signaling");
const bigquery_1 = require("./integrations/bigquery");
exports.CHANGE_HANDLER_DELAY = 250;
class CustomMarkdownCell extends cells_1.MarkdownCell {
    constructor(options) {
        super(options);
        this.originalMimeType = this.model.mimeType;
        this.model.contentChanged.connect(() => this.handleModelChange(), this);
        this.delayedContentChange = new signaling_1.Signal(this);
        this.delayedContentChange.connect((...args) => this.detectIntegration(...args));
        this.integrationOptions = {
            cell: this,
            contentChangedSignal: this.delayedContentChange,
            renderHeaderWidget: (widget) => this.editor.renderHeaderWidget(widget),
            renderFooterWidget: (widget) => this.editor.renderFooterWidget(widget),
        };
        this.onTimedContentChange();
        if (this.activeIntegration)
            this.showEditor();
    }
    get editor() {
        return super.editor;
    }
    handleModelChange() {
        if (this.changeHandlingTimeout)
            clearTimeout(this.changeHandlingTimeout);
        this.changeHandlingTimeout = setTimeout(() => {
            this.onTimedContentChange();
        }, exports.CHANGE_HANDLER_DELAY);
    }
    /**
     * Runs 250ms after typing stops (after the most recent model change that was less than 250ms ago)
     * 250 may not be accurate, double check the `CHANGE_HANDLER_DELAY` variable.
     */
    onTimedContentChange() {
        this.delayedContentChange.emit(this.model.value.text);
    }
    detectIntegration(_, cellContents) {
        if (bigquery_1.BigQueryIntegration.test(cellContents)) {
            if (!(this.activeIntegration instanceof bigquery_1.BigQueryIntegration)) {
                this.activeIntegration = new bigquery_1.BigQueryIntegration(Object.assign({}, this.integrationOptions));
            }
            return;
        }
        this.deactivateIntegration();
    }
    deactivateIntegration() {
        var _a;
        this.editor.hideIntegrationWidgets();
        (_a = this.activeIntegration) === null || _a === void 0 ? void 0 : _a.deactivate();
        this.activeIntegration = undefined;
        this.model.mimeType = this.originalMimeType;
    }
    renderInput(widget) {
        if (this.activeIntegration)
            return this.activeIntegration.run();
        return super.renderInput(widget);
    }
}
exports.CustomMarkdownCell = CustomMarkdownCell;
