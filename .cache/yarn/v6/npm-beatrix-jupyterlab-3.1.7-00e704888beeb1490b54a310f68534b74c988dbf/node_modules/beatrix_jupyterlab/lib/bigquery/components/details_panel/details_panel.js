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
exports.DetailsPanel = exports.localStyles = void 0;
const core_1 = require("@material-ui/core");
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const read_only_editor_1 = require("../shared/read_only_editor");
const schema_table_1 = require("../shared/schema_table");
const striped_rows_1 = require("../shared/striped_rows");
exports.localStyles = typestyle_1.stylesheet({
    title: {
        fontSize: '16px',
        marginBottom: '10px',
    },
    panel: {
        backgroundColor: 'var(--jp-layout-color0)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    detailsBody: {
        fontSize: '13px',
        marginTop: '24px',
        marginBottom: '24px',
    },
    labelContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            marginRight: '8px',
            marginBottom: '8px',
        },
    },
    rowTitle: {
        width: '150px',
    },
    row: {
        display: 'flex',
        padding: '6px',
    },
    bold: {
        fontWeight: 500,
    },
});
const StyledChip = core_1.withStyles({
    root: {
        color: (props) => 
        // white :  blue600
        props.darkmode ? 'var(--jp-ui-font-color1)' : '#1A73E8',
        backgroundColor: (props) => 
        // blue300 at 30% opacity : blue600 at 10% opacity
        props.darkmode ? 'rgba(138, 180, 248, 0.3)' : 'rgba(26, 115, 232, 0.1)',
    },
})((props) => React.createElement(core_1.Chip, Object.assign({}, props)));
const getTitle = type => {
    switch (type) {
        case 'DATASET':
            return 'Dataset info';
        case 'TABLE':
            return 'Table info';
        case 'VIEW':
            return 'View info';
        case 'MODEL':
            return 'Model details';
    }
};
const DetailsPanel = props => {
    const { details, rows, detailsType, trainingRows } = props;
    return (React.createElement("div", { className: exports.localStyles.panel },
        React.createElement("div", { className: exports.localStyles.detailsBody },
            React.createElement(core_1.Grid, { container: true, spacing: 4 },
                React.createElement(core_1.Grid, { item: true, xs: 6 },
                    React.createElement("div", { className: exports.localStyles.title }, "Description"),
                    React.createElement("div", null, details.description ? details.description : 'None')),
                React.createElement(core_1.Grid, { item: true, xs: 6 },
                    React.createElement("div", null,
                        React.createElement("div", { className: exports.localStyles.title }, "Labels"),
                        details.labels ? (React.createElement("div", { className: exports.localStyles.labelContainer }, details.labels.map((value, index) => {
                            return (React.createElement(StyledChip, { size: "small", key: index, label: value, darkmode: false }));
                        }))) : ('None'))),
                React.createElement(core_1.Grid, { item: true, xs: 12 },
                    React.createElement("div", { className: exports.localStyles.title }, getTitle(detailsType)),
                    React.createElement(striped_rows_1.StripedRows, { rows: rows })),
                detailsType === 'MODEL' && (React.createElement(core_1.Grid, { item: true, xs: 12 },
                    React.createElement("div", { className: exports.localStyles.title }, "Training options"),
                    trainingRows && React.createElement(striped_rows_1.StripedRows, { rows: trainingRows }))),
                (detailsType === 'TABLE' || detailsType === 'VIEW') && (React.createElement(core_1.Grid, { item: true, xs: 12 },
                    React.createElement("div", { className: exports.localStyles.title }, "Schema"),
                    details.schema && details.schema.length > 0 ? (React.createElement(schema_table_1.SchemaTable, { schema: details.schema })) : ('Table does not have a schema.'))),
                detailsType === 'VIEW' && (React.createElement(core_1.Grid, { item: true, xs: 12 },
                    React.createElement("div", { className: exports.localStyles.title }, "Query"),
                    React.createElement(read_only_editor_1.ReadOnlyEditor, { query: details.query || '' }))),
                detailsType === 'MODEL' && (React.createElement(core_1.Grid, { item: true, xs: 12 },
                    React.createElement("div", { className: exports.localStyles.title }, "Label columns"),
                    React.createElement("div", null, details.schema_labels && details.schema_labels.length > 0 ? (React.createElement(schema_table_1.ModelSchemaTable, { schema: details.schema_labels })) : ('Model does not have any label columns.')))),
                detailsType === 'MODEL' && (React.createElement(core_1.Grid, { item: true, xs: 12 },
                    React.createElement("div", { className: exports.localStyles.title }, "Feature columns"),
                    React.createElement("div", null, details.feature_columns &&
                        details.feature_columns.length > 0 ? (React.createElement(schema_table_1.ModelSchemaTable, { schema: details.feature_columns })) : ('Model does not have any feature columns.'))))))));
};
exports.DetailsPanel = DetailsPanel;
