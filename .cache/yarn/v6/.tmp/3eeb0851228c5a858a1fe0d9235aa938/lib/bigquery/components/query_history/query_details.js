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
exports.QueryDetails = void 0;
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const constants_1 = require("../../constants");
const utils_1 = require("../../../utils");
const widget_manager_1 = require("../../utils/widgetManager/widget_manager");
const query_editor_tab_widget_1 = require("../query_editor/query_editor_tab/query_editor_tab_widget");
const info_card_1 = __importDefault(require("../shared/info_card"));
const read_only_editor_1 = require("../shared/read_only_editor");
const striped_rows_1 = require("../shared/striped_rows");
const styles_1 = require("../shared/styles");
const localStyles = typestyle_1.stylesheet({
    detailsTopArea: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '14px',
    },
    queryTime: {
        width: '85px',
        color: 'gray',
    },
    openQueryButton: {
        display: 'flex',
        alignItems: 'center',
        color: 'var(--jp-ui-font-color1)',
        border: 'var(--jp-border-width) solid var(--jp-border-color2)',
        backgroundColor: 'var(--jp-layout-color0)',
        '&:hover': {
            boxShadow: '1px 1px 3px 0px var(--jp-border-color2)',
            cursor: 'pointer',
        },
    },
});
function QueryDetails(props) {
    var _a;
    const { details, created, errored, query } = props.job;
    const rows = !details
        ? []
        : [
            {
                name: 'Job ID',
                value: `${details.project}:${details.location}.${details.id}`,
            },
            { name: 'User', value: details.user },
            { name: 'Location', value: details.location },
            {
                name: 'Creation time',
                value: utils_1.formatTimestamp(Number.parseInt(details.created)),
            },
            {
                name: 'Start time',
                value: utils_1.formatTimestamp(Number.parseInt(details.started)),
            },
            {
                name: 'End time',
                value: utils_1.formatTimestamp(Number.parseInt(details.ended)),
            },
            {
                name: 'Duration',
                value: details.duration
                    ? `${details.duration.toFixed(1)} sec`
                    : '0.0 sec',
            },
            {
                name: 'Bytes processed',
                value: details.bytesProcessed
                    ? utils_1.formatBytes(details.bytesProcessed, 2)
                    : (details === null || details === void 0 ? void 0 : details.from_cache)
                        ? '0 B (results cached)'
                        : '0 B',
            },
            { name: 'Job priority', value: details.priority },
            { name: 'Destination table', value: details.destination },
            {
                name: 'Use legacy SQL',
                value: details.useLegacySql ? 'true' : 'false',
            },
        ];
    return (React.createElement("div", null,
        React.createElement("div", { className: localStyles.detailsTopArea },
            React.createElement("div", null,
                !errored && `Query completed in ${details === null || details === void 0 ? void 0 : details.duration.toFixed(3)} sec`,
                React.createElement("div", { className: localStyles.queryTime }, utils_1.formatTimestamp(Number.parseInt(created)))),
            React.createElement("button", { className: localStyles.openQueryButton, onClick: () => {
                    const options = {
                        widgetType: query_editor_tab_widget_1.QueryEditorTabWidget,
                        windowType: 'main',
                        widgetArgs: [query],
                    };
                    widget_manager_1.WidgetManager.getInstance().launchWidget(options);
                } },
                React.createElement(core_1.Icon, { style: {
                        display: 'flex',
                        alignContent: 'center',
                    } },
                    React.createElement("div", { className: `jp-Icon jp-Icon-20 ${constants_1.ICONS.editor}` })),
                "Open query in editor")),
        errored && (React.createElement(info_card_1.default, { color: styles_1.gColor('RED'), message: (_a = details === null || details === void 0 ? void 0 : details.errorResult) === null || _a === void 0 ? void 0 : _a.message, icon: React.createElement(icons_1.Error, null) })),
        React.createElement("div", { style: { marginBottom: '12px' } },
            React.createElement(read_only_editor_1.ReadOnlyEditor, { query: query })),
        React.createElement(striped_rows_1.StripedRows, { rows: rows })));
}
exports.QueryDetails = QueryDetails;
