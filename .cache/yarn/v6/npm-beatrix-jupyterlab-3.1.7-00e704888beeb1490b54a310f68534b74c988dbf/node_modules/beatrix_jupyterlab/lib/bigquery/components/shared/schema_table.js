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
exports.ModelSchemaTable = exports.SchemaTable = exports.StyledTableRow = exports.TableHeadCell = exports.localStyles = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const core_1 = require("@material-ui/core");
const styles_1 = require("../../../styles");
exports.localStyles = typestyle_1.stylesheet({
    bold: {
        fontWeight: 500,
    },
});
// TODO: style for dark mode. Currently does not match striped rows
exports.TableHeadCell = core_1.withStyles({
    root: {
        color: 'var(--jp-ui-font-color1)',
        backgroundColor: 'var(--jp-rendermime-table-row-background)',
        whiteSpace: 'nowrap',
        fontSize: '13px',
        padding: '4px 16px 4px 16px',
        border: 0,
        BASE_FONT: styles_1.BASE_FONT,
    },
})(core_1.TableCell);
const formatFieldName = (name) => {
    if (name.includes('.')) {
        const child = name.substr(name.lastIndexOf('.') + 1);
        const parents = name.substr(0, name.lastIndexOf('.') + 1);
        return (React.createElement("div", null,
            React.createElement("span", { style: { color: 'gray' } }, parents),
            ' ',
            React.createElement("span", { className: exports.localStyles.bold }, child)));
    }
    else {
        return React.createElement("div", { className: exports.localStyles.bold }, name);
    }
};
const StyledTableCell = core_1.withStyles({
    root: {
        color: 'var(--jp-ui-font-color1)',
        fontSize: '13px',
        BASE_FONT: styles_1.BASE_FONT,
        border: 0,
    },
})(core_1.TableCell);
exports.StyledTableRow = core_1.withStyles({
    root: {
        borderBottom: '1px solid var(--jp-border-color2)',
    },
})(core_1.TableRow);
const SchemaTable = (props) => {
    return (React.createElement(core_1.Table, { size: "small", style: { width: 'auto', tableLayout: 'auto' } },
        React.createElement(core_1.TableHead, null,
            React.createElement(core_1.TableRow, null,
                React.createElement(exports.TableHeadCell, null, "Field name"),
                React.createElement(exports.TableHeadCell, null, "Type"),
                React.createElement(exports.TableHeadCell, null, "Mode"),
                React.createElement(exports.TableHeadCell, null, "Description"))),
        React.createElement(core_1.TableBody, { style: {
                backgroundColor: 'var(--jp-layout-color0)',
            } }, props.schema.map((field, index) => {
            var _a;
            return (React.createElement(exports.StyledTableRow, { key: `schema_row_${index}` },
                React.createElement(StyledTableCell, null, formatFieldName(field.name)),
                React.createElement(StyledTableCell, null, field.type),
                React.createElement(StyledTableCell, null, field.mode),
                React.createElement(StyledTableCell, null, (_a = field.description) !== null && _a !== void 0 ? _a : '')));
        }))));
};
exports.SchemaTable = SchemaTable;
const ModelSchemaTable = (props) => {
    return (React.createElement(core_1.Table, { size: "small", style: { width: 'auto', tableLayout: 'auto' } },
        React.createElement(core_1.TableHead, null,
            React.createElement(core_1.TableRow, null,
                React.createElement(exports.TableHeadCell, null, "Field name"),
                React.createElement(exports.TableHeadCell, null, "Type"))),
        React.createElement(core_1.TableBody, { style: {
                color: 'var(--jp-ui-font-color1)',
                backgroundColor: 'var(--jp-layout-color0)',
            } }, props.schema.map((field, index) => {
            return (React.createElement(exports.StyledTableRow, { key: `schema_row_${index}` },
                React.createElement(StyledTableCell, null, formatFieldName(field.name)),
                React.createElement(StyledTableCell, null, field.type)));
        }))));
};
exports.ModelSchemaTable = ModelSchemaTable;
