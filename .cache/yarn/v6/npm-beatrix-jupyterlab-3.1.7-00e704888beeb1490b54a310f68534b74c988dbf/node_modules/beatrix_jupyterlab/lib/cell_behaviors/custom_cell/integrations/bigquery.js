"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigQueryIntegration = exports.BIGQUERY_FOOTER_WIDGET_CLASS = exports.BIGQUERY_HEADER_WIDGET_CLASS = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const notebook_1 = require("@jupyterlab/notebook");
const react_1 = __importDefault(require("react"));
const query_text_editor_1 = require("../../../bigquery/components/query_editor/query_text_editor/query_text_editor");
const service_provider_1 = require("../../../service/service_provider");
const utils_1 = require("../../../utils");
const bigquery_integration_1 = require("../components/bigquery_integration");
const cell_integration_1 = require("./cell_integration");
exports.BIGQUERY_HEADER_WIDGET_CLASS = 'bigquery-integration-header-widget';
exports.BIGQUERY_FOOTER_WIDGET_CLASS = 'bigquery-integration-footer-widget';
class BigQueryIntegration extends cell_integration_1.CellIntegration {
    static test(cellText) {
        return (typeof BigQueryIntegration.extractQueryFromCellText(cellText) === 'string');
    }
    static extractQueryFromCellText(cellText) {
        var _a;
        return (_a = cellText === null || cellText === void 0 ? void 0 : cellText.match(BigQueryIntegration.REGEX)) === null || _a === void 0 ? void 0 : _a[1];
    }
    static triggerIntegration(notebook) {
        var _a, _b;
        notebook_1.NotebookActions.changeCellType(notebook, 'markdown');
        const cellText = ((_a = notebook.activeCell) === null || _a === void 0 ? void 0 : _a.model.value.text) || '';
        if (!BigQueryIntegration.test(cellText)) {
            (_b = notebook.activeCell) === null || _b === void 0 ? void 0 : _b.model.value.insert(0, '#@bigquery\n');
        }
    }
    initialize() {
        this.state = {
            query: BigQueryIntegration.extractQueryFromCellText(this.cell.model.value.text) || '',
            queryState: query_text_editor_1.QueryStates.READY,
            renderResults: false,
            actualBytesProcessed: null,
        };
    }
    activate() {
        this.renderHeaderWidget(this.newHeaderWidget());
        this.renderFooterWidget(this.newFooterWidget());
        this.cell.model.mimeType = 'text/x-sql';
        super.activate();
    }
    newHeaderWidget() {
        const widget = apputils_1.ReactWidget.create(react_1.default.createElement(apputils_1.UseSignal, { signal: this.changed, initialArgs: this.state }, (sender, updatedBigQueryState) => {
            return (react_1.default.createElement(bigquery_integration_1.BigQueryIntegrationHeader, { query: (updatedBigQueryState === null || updatedBigQueryState === void 0 ? void 0 : updatedBigQueryState.query) || '', queryState: (updatedBigQueryState === null || updatedBigQueryState === void 0 ? void 0 : updatedBigQueryState.queryState) || query_text_editor_1.QueryStates.READY, expectedBytesProcessed: (updatedBigQueryState === null || updatedBigQueryState === void 0 ? void 0 : updatedBigQueryState.expectedBytesProcessed) || null, errorMessage: (updatedBigQueryState === null || updatedBigQueryState === void 0 ? void 0 : updatedBigQueryState.errorMessage) || null, submitQuery: () => __awaiter(this, void 0, void 0, function* () { return yield this.submitQuery(); }), cancelQuery: () => __awaiter(this, void 0, void 0, function* () { return yield this.cancelQuery(); }) }));
        }));
        widget.addClass(exports.BIGQUERY_HEADER_WIDGET_CLASS);
        return widget;
    }
    newFooterWidget() {
        const widget = apputils_1.ReactWidget.create(react_1.default.createElement(apputils_1.UseSignal, { signal: this.changed, initialArgs: this.state }, (sender, updatedBigQueryState) => {
            return (react_1.default.createElement(bigquery_integration_1.BigQueryIntegrationFooter, { renderResults: (updatedBigQueryState === null || updatedBigQueryState === void 0 ? void 0 : updatedBigQueryState.renderResults) || false, jobReference: (updatedBigQueryState === null || updatedBigQueryState === void 0 ? void 0 : updatedBigQueryState.jobReference) || {}, query: (updatedBigQueryState === null || updatedBigQueryState === void 0 ? void 0 : updatedBigQueryState.query) || '', actualBytesProcessed: (updatedBigQueryState === null || updatedBigQueryState === void 0 ? void 0 : updatedBigQueryState.actualBytesProcessed) || 0 }));
        }));
        widget.addClass(exports.BIGQUERY_FOOTER_WIDGET_CLASS);
        return widget;
    }
    handleErrors(errors) {
        const errorMessage = errors[0].message;
        this.updateState({
            errorMessage: errorMessage,
            queryState: query_text_editor_1.QueryStates.ERROR,
        });
    }
    contentChangeListener(_, cellContents) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = BigQueryIntegration.extractQueryFromCellText(cellContents);
            this.updateState({
                query,
                expectedBytesProcessed: undefined,
                errorMessage: undefined,
            });
            if (!query)
                return; // ensures there is more than just the annotation in the cell
            const queryJob = yield service_provider_1.ServiceProvider.bigQueryService.queryJob(service_provider_1.ServiceProvider.bigQueryService.projectId, query, true);
            if (queryJob.errors && queryJob.errors.length) {
                this.handleErrors(queryJob.errors);
            }
            else if (queryJob.totalBytesProcessed) {
                this.updateState({
                    expectedBytesProcessed: Number.parseInt(queryJob.totalBytesProcessed),
                    errorMessage: '',
                    queryState: query_text_editor_1.QueryStates.READY,
                });
            }
        });
    }
    submitQuery() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (((_a = this.state) === null || _a === void 0 ? void 0 : _a.queryState) !== query_text_editor_1.QueryStates.READY &&
                ((_b = this.state) === null || _b === void 0 ? void 0 : _b.queryState) !== query_text_editor_1.QueryStates.CANCELLED) {
                return;
            }
            this.updateState({
                queryState: query_text_editor_1.QueryStates.PENDING,
            });
            const queryJob = yield service_provider_1.ServiceProvider.bigQueryService.queryJob(service_provider_1.ServiceProvider.bigQueryService.projectId, this.state.query);
            if (this.state.queryState === query_text_editor_1.QueryStates.CANCELLED) {
                return;
            }
            if (queryJob.errors && queryJob.errors.length) {
                return this.handleErrors(queryJob.errors);
            }
            if (!queryJob.jobReference) {
                return;
            }
            try {
                yield service_provider_1.ServiceProvider.bigQueryService.queryJobQueryResults(queryJob.jobReference, 0);
            }
            catch (err) {
                utils_1.appLog.error(err);
                if (utils_1.isError(err)) {
                    this.updateState({
                        errorMessage: err.message,
                        queryState: query_text_editor_1.QueryStates.ERROR,
                    });
                }
                return;
            }
            if (this.state.queryState === query_text_editor_1.QueryStates.CANCELLED) {
                return;
            }
            this.updateState({
                queryState: query_text_editor_1.QueryStates.READY,
                jobReference: queryJob.jobReference,
                expectedBytesProcessed: undefined,
                actualBytesProcessed: this.state.expectedBytesProcessed,
                renderResults: true,
            });
        });
    }
    cancelQuery() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (((_a = this.state) === null || _a === void 0 ? void 0 : _a.queryState) !== query_text_editor_1.QueryStates.PENDING ||
                !((_b = this.state) === null || _b === void 0 ? void 0 : _b.jobReference))
                return;
            yield service_provider_1.ServiceProvider.bigQueryService.queryJobCancel((_c = this.state) === null || _c === void 0 ? void 0 : _c.jobReference);
            this.updateState({
                queryState: query_text_editor_1.QueryStates.CANCELLED,
            });
        });
    }
    run() {
        this.submitQuery();
    }
}
exports.BigQueryIntegration = BigQueryIntegration;
BigQueryIntegration.REGEX = /^\s*#@ ?BigQuery\b.*\s*([\w\W]*)/i;
