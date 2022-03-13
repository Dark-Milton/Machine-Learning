"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectedQueryInfoBar = exports.QueryInfoBar = exports.OpenQueryEditorTabButton = exports.CopyButton = exports.QueryValidationMessage = exports.BytesProcessedMessage = exports.ErrorMessage = exports.OptionalText = exports.CancelButton = exports.QueryButton = exports.ButtonText = void 0;
const copy_to_clipboard_1 = __importDefault(require("copy-to-clipboard"));
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const typestyle_1 = require("typestyle");
const styles_1 = require("../../../../styles");
const utils_1 = require("../../../../utils");
const snackbarSlice_1 = require("../../../reducers/snackbarSlice");
const snackbar_1 = require("../../shared/snackbar");
const query_editor_tab_widget_1 = require("../query_editor_tab/query_editor_tab_widget");
const icons_1 = require("@material-ui/icons");
const core_1 = require("@material-ui/core");
const query_text_editor_1 = require("./query_text_editor");
const widget_manager_1 = require("../../../utils/widgetManager/widget_manager");
const styleSheet = typestyle_1.stylesheet({
    buttonInfoBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '5px 10px 5px 16px',
        backgroundColor: 'var(--jp-layout-color0)',
        borderBottom: '1px solid var(--jp-border-color2)',
    },
    message: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageIcon: {
        marginRight: '0.5rem',
    },
    icon: {
        color: styles_1.COLORS.inverse,
    },
});
function ButtonText({ text }) {
    return (react_1.default.createElement(core_1.Typography, { style: { fontSize: '0.8rem' }, className: query_text_editor_1.styleSheet.statusBarText }, text));
}
exports.ButtonText = ButtonText;
const StyledButton = core_1.withStyles({
    root: {
        color: styles_1.COLORS.white,
        backgroundColor: styles_1.COLORS.focus,
        fontSize: '10px !important',
        margin: '2px 5px 0px 2px !important',
        '&:hover': {
            backgroundColor: 'var(--jp-brand-color0)',
        },
    },
})(core_1.Button);
function QueryButton({ queryState, submitQuery, }) {
    const content = queryState === query_text_editor_1.QueryStates.PENDING ? 'Running' : 'Submit Query';
    const startIcon = queryState === query_text_editor_1.QueryStates.PENDING ? (react_1.default.createElement(core_1.CircularProgress, { size: "1rem", thickness: 5, color: "secondary" })) : (react_1.default.createElement(icons_1.PlayCircleFilledRounded, null));
    return (react_1.default.createElement(StyledButton, { size: "small", variant: "contained", onClick: queryState !== query_text_editor_1.QueryStates.PENDING ? submitQuery : () => void 0, title: "Submit/Cancel Query", startIcon: startIcon },
        react_1.default.createElement(ButtonText, { text: content })));
}
exports.QueryButton = QueryButton;
function CancelButton({ cancelQuery }) {
    return (react_1.default.createElement(core_1.Button, { onClick: cancelQuery, size: "small", startIcon: react_1.default.createElement(icons_1.PauseCircleOutline, null), color: "primary", className: "cancel-button", style: {
            marginLeft: '5px',
        } },
        react_1.default.createElement(ButtonText, { text: "Stop" })));
}
exports.CancelButton = CancelButton;
function OptionalText({ text, config = {}, }) {
    return (!!text && (react_1.default.createElement(core_1.Typography, Object.assign({ style: { fontSize: '0.7rem' }, className: query_text_editor_1.styleSheet.statusBarText }, config), text)));
}
exports.OptionalText = OptionalText;
function ErrorMessage({ message }) {
    return (!!message && (react_1.default.createElement("div", { className: styleSheet.message },
        react_1.default.createElement(icons_1.ErrorOutlineOutlined, { className: styleSheet.messageIcon, color: "error", fontSize: "small" }),
        react_1.default.createElement("div", { className: "err-msg" },
            react_1.default.createElement(OptionalText, { text: message })))));
}
exports.ErrorMessage = ErrorMessage;
function BytesProcessedMessage({ bytesProcessed, }) {
    return ((!!bytesProcessed || bytesProcessed === 0) && (react_1.default.createElement("div", { className: styleSheet.message },
        react_1.default.createElement(icons_1.CheckCircleOutline, { className: styleSheet.messageIcon, fontSize: "small", htmlColor: "rgb(15, 157, 88)" }),
        react_1.default.createElement("div", { className: "size-msg" },
            react_1.default.createElement(OptionalText, { text: `This query will process ${utils_1.formatBytes(bytesProcessed, 1)} when run.` })))));
}
exports.BytesProcessedMessage = BytesProcessedMessage;
function QueryValidationMessage({ bytesProcessed, message, ifMsgErr, }) {
    return ifMsgErr ? (react_1.default.createElement(ErrorMessage, { message: message })) : (react_1.default.createElement(BytesProcessedMessage, { bytesProcessed: bytesProcessed }));
}
exports.QueryValidationMessage = QueryValidationMessage;
function CopyButton({ query, openSnackbar, }) {
    return (react_1.default.createElement(core_1.IconButton, { size: "small", onClick: () => {
            copy_to_clipboard_1.default(query.trim());
            openSnackbar({
                message: 'Query copied',
                autoHideDuration: snackbar_1.COPIED_AUTOHIDE_DURATION,
            });
        }, className: "copy-button", title: "Copy Query" },
        react_1.default.createElement(icons_1.FileCopyOutlined, { fontSize: "small", className: styleSheet.icon })));
}
exports.CopyButton = CopyButton;
function OpenQueryEditorTabButton({ query, }) {
    return (react_1.default.createElement(core_1.IconButton, { size: "small", onClick: _ => {
            const options = {
                widgetType: query_editor_tab_widget_1.QueryEditorTabWidget,
                windowType: 'main',
                widgetArgs: [query],
            };
            widget_manager_1.WidgetManager.getInstance().launchWidget(options);
        }, className: "open-tab-editor", title: "Open query editor" },
        react_1.default.createElement(icons_1.FullscreenOutlined, { className: styleSheet.icon })));
}
exports.OpenQueryEditorTabButton = OpenQueryEditorTabButton;
function QueryInfoBar({ ifIncell, queryState, bytesProcessed, message, ifMsgErr, query, submitQuery, cancelQuery, openSnackbar, }) {
    return (react_1.default.createElement("div", { className: styleSheet.buttonInfoBar },
        react_1.default.createElement("div", { style: {
                display: 'flex',
            } },
            react_1.default.createElement(QueryButton, { queryState: queryState, submitQuery: submitQuery }),
            queryState === query_text_editor_1.QueryStates.PENDING && (react_1.default.createElement(CancelButton, { cancelQuery: cancelQuery })),
            react_1.default.createElement("div", { style: {
                    marginLeft: '5px',
                    display: 'flex',
                } },
                react_1.default.createElement(CopyButton, { query: query, openSnackbar: openSnackbar }),
                ifIncell && react_1.default.createElement(OpenQueryEditorTabButton, { query: query }))),
        react_1.default.createElement("div", { style: {
                alignSelf: 'center',
                display: 'flex',
                flexDirection: 'row',
            } },
            react_1.default.createElement(QueryValidationMessage, { bytesProcessed: bytesProcessed, message: message, ifMsgErr: ifMsgErr }))));
}
exports.QueryInfoBar = QueryInfoBar;
const mapStateToProps = state => {
    const snackbar = state.snackbar;
    return { snackbar };
};
const mapDispatchToProps = {
    openSnackbar: snackbarSlice_1.openSnackbar,
};
exports.ConnectedQueryInfoBar = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(QueryInfoBar);
