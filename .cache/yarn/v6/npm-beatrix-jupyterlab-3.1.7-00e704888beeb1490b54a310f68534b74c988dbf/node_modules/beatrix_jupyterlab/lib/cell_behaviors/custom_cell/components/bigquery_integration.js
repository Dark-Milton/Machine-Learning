"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigQueryIntegrationFooter = exports.BigQueryIntegrationHeader = exports.BIGQUERY_INTEGRATION_FOOTER_CLASS = exports.BIGQUERY_INTEGRATION_HEADER_CLASS = void 0;
const react_1 = __importDefault(require("react"));
const typestyle_1 = require("typestyle");
const query_results_1 = require("../../../bigquery/components/query_editor/query_text_editor/query_results");
const query_info_bar_1 = require("../../../bigquery/components/query_editor/query_text_editor/query_info_bar");
exports.BIGQUERY_INTEGRATION_HEADER_CLASS = 'bigquery-integration-header';
exports.BIGQUERY_INTEGRATION_FOOTER_CLASS = 'bigquery-integration-footer';
const styleSheet = typestyle_1.stylesheet({
    footer: {
        maxHeight: '500px',
    },
});
/**
 * TODO(b/209452299): replace with a method that takes string and ms delay
 * and shows a pop up (without actual but complex redux dependency)
 */
const fakeOpenSnackbar = () => void 0;
function BigQueryIntegrationHeader({ query, queryState, expectedBytesProcessed, errorMessage, submitQuery, cancelQuery, }) {
    return (react_1.default.createElement("div", { className: exports.BIGQUERY_INTEGRATION_HEADER_CLASS },
        react_1.default.createElement(query_info_bar_1.QueryInfoBar, { ifIncell: true, queryState: queryState, bytesProcessed: expectedBytesProcessed, message: errorMessage, ifMsgErr: !!errorMessage, query: query, submitQuery: submitQuery, cancelQuery: cancelQuery, openSnackbar: fakeOpenSnackbar })));
}
exports.BigQueryIntegrationHeader = BigQueryIntegrationHeader;
function BigQueryIntegrationFooter({ renderResults, jobReference, query, actualBytesProcessed, }) {
    return (react_1.default.createElement("div", { className: `${styleSheet.footer} ${exports.BIGQUERY_INTEGRATION_FOOTER_CLASS}` }, !!renderResults && (react_1.default.createElement(query_results_1.QueryResults, { jobReference: jobReference, query: query, queryFlags: {}, bytesProcessed: actualBytesProcessed, duration: 0, editorType: 'IN_CELL', openSnackbar: fakeOpenSnackbar }))));
}
exports.BigQueryIntegrationFooter = BigQueryIntegrationFooter;
