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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBar = void 0;
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const constants_1 = require("../../constants");
const utils_1 = require("../../../utils");
const widget_manager_1 = require("../../utils/widgetManager/widget_manager");
const query_editor_tab_widget_1 = require("../query_editor/query_editor_tab/query_editor_tab_widget");
const styles_1 = require("../shared/styles");
const localStyles = typestyle_1.stylesheet({
    query: {
        flex: 1,
        minWidth: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    queryTime: {
        width: '85px',
        color: 'gray',
    },
    queryBar: {
        display: 'flex',
        overflow: 'hidden',
        padding: '0px 10px 0px 10px',
        borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)',
        backgroundColor: 'var(--jp-layout-color0)',
        alignItems: 'center',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    openQueryButtonSmall: {
        border: 'var(--jp-border-width) solid var(--jp-layout-color0)',
        backgroundColor: 'var(--jp-layout-color0)',
        '&:hover': {
            border: 'var(--jp-border-width) solid var(--jp-border-color2)',
            cursor: 'pointer',
        },
    },
    icon: {
        marginRight: '12px',
    },
});
// Bar displaying past query and time it was made. Meant to be clicked to open past query details.
const QueryBar = (props) => {
    const { jobs, jobId } = props;
    return (React.createElement("div", { className: localStyles.queryBar },
        React.createElement("div", { className: localStyles.queryTime }, utils_1.formatTimestamp(Number.parseInt(jobs[jobId].created))),
        jobs[jobId].errored ? (React.createElement(icons_1.Error, { fontSize: "inherit", className: localStyles.icon, style: { fill: styles_1.gColor('RED') } })) : (React.createElement(icons_1.CheckCircle, { fontSize: "inherit", className: localStyles.icon, style: { fill: styles_1.gColor('GREEN') } })),
        React.createElement("div", { className: localStyles.query }, jobs[jobId].query),
        React.createElement("button", { className: localStyles.openQueryButtonSmall, onClick: event => {
                event.stopPropagation();
                const options = {
                    widgetType: query_editor_tab_widget_1.QueryEditorTabWidget,
                    windowType: 'main',
                    widgetArgs: [jobs[jobId].query],
                };
                widget_manager_1.WidgetManager.getInstance().launchWidget(options);
            } },
            React.createElement(core_1.Icon, { style: {
                    display: 'flex',
                    alignContent: 'center',
                } },
                React.createElement("div", { className: `jp-Icon jp-Icon-20 ${constants_1.ICONS.editor}` })))));
};
exports.QueryBar = QueryBar;
