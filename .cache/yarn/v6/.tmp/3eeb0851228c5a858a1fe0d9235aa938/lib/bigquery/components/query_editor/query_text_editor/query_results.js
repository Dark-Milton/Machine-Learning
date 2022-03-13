"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectedQueryResults = exports.QueryResults = exports.localStyles = void 0;
const notebook_1 = require("@jupyterlab/notebook");
const core_1 = require("@material-ui/core");
const copy_to_clipboard_1 = __importDefault(require("copy-to-clipboard"));
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const typestyle_1 = require("typestyle");
const service_provider_1 = require("../../../../service/service_provider");
const utils_1 = require("../../../../utils");
const snackbarSlice_1 = require("../../../reducers/snackbarSlice");
const widget_manager_1 = require("../../../utils/widgetManager/widget_manager");
const bq_table_1 = require("../../shared/bq_table");
const snackbar_1 = require("../../shared/snackbar");
const styles_1 = require("../../shared/styles");
exports.localStyles = typestyle_1.stylesheet({
    resultsContainer: {
        // 5/9 of panel height (in relation to editor)
        flex: 5,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
    },
    inCell: {
        height: '350px',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        alignItems: 'center',
        background: 'white',
        borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)',
        borderTop: 'var(--jp-border-width) solid var(--jp-border-color2)',
        display: 'flex',
        fontSize: '18px',
        justifyContent: 'space-between',
        padding: '5px 10px 5px 16px',
    },
    headerTitleBox: {
        display: 'flex',
        alignItems: 'center',
    },
    queryStatusMessage: {
        fontSize: '0.8rem !important',
        marginLeft: '1rem !important',
        marginTop: 'auto !important',
        color: 'gray !important',
    },
    headerButton: {
        textTransform: 'none !important',
        fontSize: '0.7rem !important',
        color: `${styles_1.gColor('BLUE')} !important`,
    },
});
function DataStudioButton({ projectId, query, }) {
    const openInDataStudio = react_1.useCallback(() => {
        const config = {
            sql: query,
            billingProjectId: projectId,
            projectId: projectId,
            connectorType: 'BIG_QUERY',
            sqlType: 'STANDARD_SQL',
        };
        const url = 'https://datastudio.google.com/c/u/0/linking/setupAnalysis?config=' +
            JSON.stringify(config);
        window.open(url);
    }, [projectId, query]);
    return (react_1.default.createElement(core_1.Button, { onClick: openInDataStudio, className: exports.localStyles.headerButton }, "Explore in Data Studio"));
}
function DataFrameButton({ isInCell, queryFlags, query, openSnackbar, }) {
    const copyCodeForDataFrame = react_1.useCallback(() => {
        const processedFlags = {};
        let ifEmpty = true;
        for (const [flag, value] of Object.entries(queryFlags)) {
            if (value !== null && value !== void 0 ? value : undefined !== undefined) {
                processedFlags[flag] = value;
                ifEmpty = false;
            }
        }
        let code = `# The following two lines are only necessary to run once.\n` +
            `# Comment out otherwise for speed-up.\n` +
            `from google.cloud.bigquery import Client, QueryJobConfig\n` +
            `client = Client()\n\n`;
        if (ifEmpty) {
            code += `query = """${query.trim()}"""\n` + `job = client.query(query)\n`;
        }
        else {
            const flagsJson = JSON.stringify(processedFlags, null, 2);
            code +=
                `flags=${flagsJson}\n` +
                    `job_config = bigquery.QueryJobConfig(**flags)\n` +
                    `query = """${query.trim()}"""\n` +
                    `job = client.query(query, job_config=job_config)\n`;
        }
        code += `df = job.to_dataframe()`;
        if (isInCell) {
            const notebookTrack = widget_manager_1.WidgetManager.getInstance().getNotebookTracker();
            const curWidget = notebookTrack.currentWidget;
            const notebook = curWidget.content;
            notebook_1.NotebookActions.insertBelow(notebook);
            const cell = notebookTrack.activeCell;
            cell.model.value.text = code;
        }
        else {
            copy_to_clipboard_1.default(code);
            openSnackbar({
                message: 'Code copied to your clipboard',
                autoHideDuration: snackbar_1.COPIED_AUTOHIDE_DURATION,
            });
        }
    }, [queryFlags, query, isInCell, openSnackbar]);
    return (react_1.default.createElement(core_1.Button, { onClick: copyCodeForDataFrame, className: exports.localStyles.headerButton }, isInCell ? 'Query and load as DataFrame' : 'Copy code for DataFrame'));
}
function QueryStatusMessage({ duration, bytesProcessed, }) {
    const message = react_1.useMemo(() => {
        const readableBytes = bytesProcessed || bytesProcessed === 0
            ? utils_1.formatBytes(bytesProcessed, 1)
            : '';
        const durationString = duration || duration === 0 ? `${duration} sec elapsed` : '';
        const bytesString = readableBytes ? `${readableBytes} processed` : '';
        const str = [durationString, bytesString]
            .filter(string => string)
            .join(', ');
        return `Query complete${str ? ` (${str})` : ''}`;
    }, [duration, bytesProcessed]);
    return (react_1.default.createElement(core_1.Typography, { className: exports.localStyles.queryStatusMessage }, message));
}
function QueryResults({ editorType, queryFlags, query, openSnackbar, jobReference, duration, bytesProcessed, }) {
    const isInCell = editorType === 'IN_CELL';
    const projectId = service_provider_1.ServiceProvider.bigQueryService.projectId;
    return (react_1.default.createElement("div", { className: isInCell ? exports.localStyles.inCell : exports.localStyles.resultsContainer },
        react_1.default.createElement("div", { className: exports.localStyles.header },
            react_1.default.createElement("div", { className: exports.localStyles.headerTitleBox },
                react_1.default.createElement("p", null, "Query results"),
                react_1.default.createElement(QueryStatusMessage, { duration: duration, bytesProcessed: bytesProcessed })),
            react_1.default.createElement("div", null,
                react_1.default.createElement(DataFrameButton, { isInCell: isInCell, queryFlags: queryFlags, query: query, openSnackbar: openSnackbar }),
                react_1.default.createElement(DataStudioButton, { projectId: projectId, query: query }))),
        react_1.default.createElement(bq_table_1.BQTable, { jobReference: jobReference })));
}
exports.QueryResults = QueryResults;
const mapStateToProps = state => {
    const snackbar = state.snackbar;
    return { snackbar };
};
const mapDispatchToProps = {
    openSnackbar: snackbarSlice_1.openSnackbar,
};
exports.ConnectedQueryResults = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(QueryResults);
