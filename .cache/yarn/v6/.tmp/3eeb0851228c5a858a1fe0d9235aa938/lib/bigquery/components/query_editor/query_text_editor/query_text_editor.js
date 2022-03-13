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
exports.QueryTextEditor = exports.QUERY_DATA_TYPE = exports.QueryStates = exports.styleSheet = void 0;
const react_1 = __importDefault(require("react"));
const react_resize_detector_1 = __importDefault(require("react-resize-detector"));
const typestyle_1 = require("typestyle");
const query_results_1 = require("./query_results");
const query_info_bar_1 = require("./query_info_bar");
const codeeditor_1 = require("@jupyterlab/codeeditor");
const codemirror_1 = require("@jupyterlab/codemirror");
const widgets_1 = require("@lumino/widgets");
const service_provider_1 = require("../../../../service/service_provider");
exports.styleSheet = typestyle_1.stylesheet({
    statusBarText: {
        textAlign: 'center',
        textTransform: 'none',
        fontWeight: 'bold',
    },
    queryTextEditor: {
        minHeight: '48px',
        flex: 2,
    },
    queryTextEditorInCell: {
        minHeight: '300px',
        height: '30vh',
    },
    wholeEditor: {
        // 4/9 of panel height (in relation to results)
        flex: 4,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid var(--jp-border-color2)',
    },
    wholeEditorInCell: {
        border: '1px solid var(--jp-border-color2)',
    },
    pendingStatus: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
});
var QueryStates;
(function (QueryStates) {
    QueryStates[QueryStates["READY"] = 0] = "READY";
    QueryStates[QueryStates["PENDING"] = 1] = "PENDING";
    QueryStates[QueryStates["ERROR"] = 2] = "ERROR";
    QueryStates[QueryStates["CANCELLED"] = 3] = "CANCELLED";
})(QueryStates = exports.QueryStates || (exports.QueryStates = {}));
exports.QUERY_DATA_TYPE = 'query_content';
class QueryTextEditor extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.editorRef = react_1.default.createRef();
        this.state = {
            queryState: QueryStates.READY,
            bytesProcessed: null,
            message: null,
            ifMsgErr: false,
            height: 0,
            renderQueryResults: false,
            query: '',
        };
        const { iniQuery } = this.props;
        this.timeoutAlarm = undefined;
        this.queryFlags = !this.props.queryFlags ? {} : this.props.queryFlags;
        // Editor
        const editorServices = new codemirror_1.CodeMirrorEditorFactory();
        const model = new codeeditor_1.CodeEditor.Model();
        model.mimeType = 'text/x-sql';
        model.value.text = iniQuery || '';
        const editorOptions = {
            model: model,
            factory: editorServices.newInlineEditor,
            config: {
                lineNumbers: true,
            },
        };
        this.codeEditorWrapper = new codeeditor_1.CodeEditorWrapper(editorOptions);
        this.editor = this.codeEditorWrapper.editor;
        this.editor.addKeydownHandler(() => {
            this.setState({ bytesProcessed: null, message: null, ifMsgErr: false });
            if (this.timeoutAlarm) {
                clearTimeout(this.timeoutAlarm);
            }
            this.timeoutAlarm = setTimeout(() => this.checkSQL(), 1500);
            return false;
        });
    }
    get query() {
        var _a;
        return ((_a = this.editor) === null || _a === void 0 ? void 0 : _a.doc.getValue()) || '';
    }
    componentDidMount() {
        widgets_1.Widget.attach(this.codeEditorWrapper, this.editorRef.current);
        this.checkSQL();
    }
    cancelQuery() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state.queryState !== QueryStates.PENDING)
                return;
            if (this.state.jobReference) {
                yield service_provider_1.ServiceProvider.bigQueryService.queryJobCancel(this.state.jobReference);
            }
            this.setState({
                queryState: QueryStates.READY,
                renderQueryResults: false,
            });
        });
    }
    submitQuery() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state.queryState === QueryStates.PENDING)
                return;
            this.setState({
                queryState: QueryStates.PENDING,
                bytesProcessed: null,
                message: null,
                ifMsgErr: false,
                renderQueryResults: false,
            });
            const queryJob = yield service_provider_1.ServiceProvider.bigQueryService.queryJob(service_provider_1.ServiceProvider.bigQueryService.projectId, this.query);
            if (queryJob.errors && queryJob.errors.length) {
                const res = queryJob.errors[0].message;
                this.setState({
                    queryState: QueryStates.ERROR,
                    bytesProcessed: null,
                    message: res,
                    ifMsgErr: true,
                });
                return;
            }
            this.setState({
                jobReference: queryJob.jobReference,
                query: this.query,
            });
            try {
                if (!queryJob.jobReference)
                    return new Error('Unable to query job results.');
                yield service_provider_1.ServiceProvider.bigQueryService.queryJobQueryResults(queryJob.jobReference, 0);
                this.setState({
                    queryState: QueryStates.READY,
                    renderQueryResults: true,
                });
            }
            catch (err) {
                this.setState({
                    queryState: QueryStates.ERROR,
                    bytesProcessed: null,
                    message: String(err),
                    ifMsgErr: true,
                });
            }
        });
    }
    checkSQL() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.query) {
                return;
            }
            const queryJob = yield service_provider_1.ServiceProvider.bigQueryService.queryJob(service_provider_1.ServiceProvider.bigQueryService.projectId, this.query, true);
            if (queryJob.errors && queryJob.errors.length) {
                const res = queryJob.errors[0].message;
                this.setState({
                    bytesProcessed: null,
                    message: res,
                    ifMsgErr: true,
                });
            }
            else if (queryJob.totalBytesProcessed) {
                this.setState({
                    bytesProcessed: Number.parseInt(queryJob.totalBytesProcessed),
                    message: null,
                    ifMsgErr: false,
                });
            }
        });
    }
    handleKeyPress(evt) {
        if ((evt.ctrlKey || evt.metaKey) && evt.key === 'Enter') {
            this.submitQuery();
        }
    }
    render() {
        // eslint-disable-next-line no-extra-boolean-cast
        const ifIncell = this.props.editorType === 'IN_CELL';
        return (react_1.default.createElement("div", { className: ifIncell ? exports.styleSheet.wholeEditorInCell : exports.styleSheet.wholeEditor, onKeyPress: this.handleKeyPress.bind(this) },
            react_1.default.createElement(query_info_bar_1.ConnectedQueryInfoBar, { ifIncell: ifIncell, queryState: this.state.queryState, bytesProcessed: this.state.bytesProcessed, message: this.state.message, ifMsgErr: this.state.ifMsgErr, query: this.query, submitQuery: this.submitQuery.bind(this), cancelQuery: this.cancelQuery.bind(this) }),
            react_1.default.createElement(react_resize_detector_1.default, null, ({ width, height }) => {
                if (this.editor) {
                    const size = height && width ? { height: height, width: width } : null;
                    this.editor.setSize(size);
                }
                return (
                // CodeEditor Parent Div
                react_1.default.createElement("div", { className: ifIncell
                        ? exports.styleSheet.queryTextEditorInCell
                        : exports.styleSheet.queryTextEditor, ref: this.editorRef }));
            }),
            this.state.renderQueryResults && this.state.jobReference ? (react_1.default.createElement(query_results_1.ConnectedQueryResults, { jobReference: this.state.jobReference, query: this.state.query, queryFlags: this.queryFlags, bytesProcessed: this.state.bytesProcessed || 0, duration: 0 })) : undefined));
    }
}
exports.QueryTextEditor = QueryTextEditor;
