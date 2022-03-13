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
exports.BQTable = exports.TablePaginationActions = exports.StyledPagination = void 0;
const react_1 = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const schema_table_1 = require("./schema_table");
const styles_1 = require("../../../styles");
const loading_panel_1 = __importDefault(require("../loading_panel"));
const icons_2 = require("@material-ui/icons");
const info_card_1 = __importDefault(require("../shared/info_card"));
const styles_2 = require("../shared/styles");
const service_provider_1 = require("../../../service/service_provider");
const utils_1 = require("../../../utils");
const localStyles = typestyle_1.stylesheet({
    paginationOptions: {
        display: 'flex',
        fontSize: '13px',
    },
    scrollable: {
        flex: 1,
        minHeight: 0,
        overflow: 'auto',
    },
    null: {
        fontStyle: 'italic',
        color: 'gray',
    },
});
const StyledIconButton = core_1.withStyles({
    root: {
        color: 'var(--jp-ui-font-color1)',
        '&.Mui-disabled': {
            color: 'var(--jp-ui-font-color3)',
        },
    },
})(core_1.IconButton);
const StyledTableCell = core_1.withStyles({
    root: {
        color: 'var(--jp-ui-font-color1)',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        maxWidth: '500px',
        fontSize: '13px',
        BASE_FONT: styles_1.BASE_FONT,
        border: 0,
    },
})(core_1.TableCell);
exports.StyledPagination = core_1.withStyles({
    root: {
        backgroundColor: 'var(--jp-layout-color0)',
        color: 'var(--jp-ui-font-color1)',
        fontSize: '13px',
        borderTop: 'var(--jp-border-width) solid var(--jp-border-color2)',
    },
    selectIcon: {
        color: 'var(--jp-ui-font-color1)',
    },
    menuItem: {
        color: 'var(--jp-ui-font-color1)',
        backgroundColor: 'var(--jp-layout-color0)',
        '&.Mui-selected': {
            backgroundColor: 'var(--jp-layout-color2)',
            '&:hover': {
                backgroundColor: 'var(--jp-layout-color2)',
            },
        },
        '&:hover': {
            backgroundColor: 'var(--jp-layout-color2)',
        },
    },
})(core_1.TablePagination);
function TablePaginationActions({ count, page, rowsPerPage, onPageChange, }) {
    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };
    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };
    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };
    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
    return (react_1.default.createElement("div", { className: localStyles.paginationOptions },
        react_1.default.createElement(StyledIconButton, { onClick: handleFirstPageButtonClick, disabled: page === 0, size: "small" },
            react_1.default.createElement(icons_1.FirstPage, null)),
        react_1.default.createElement(StyledIconButton, { onClick: handleBackButtonClick, disabled: page === 0, size: "small" },
            react_1.default.createElement(icons_1.KeyboardArrowLeft, null)),
        react_1.default.createElement(StyledIconButton, { onClick: handleNextButtonClick, disabled: page >= Math.ceil(count / rowsPerPage) - 1, size: "small" },
            react_1.default.createElement(icons_1.KeyboardArrowRight, null)),
        react_1.default.createElement(StyledIconButton, { onClick: handleLastPageButtonClick, disabled: page >= Math.ceil(count / rowsPerPage) - 1, size: "small" },
            react_1.default.createElement(icons_1.LastPage, null))));
}
exports.TablePaginationActions = TablePaginationActions;
function BQTable({ jobReference }) {
    const [page, setPage] = react_1.useState(0);
    const [rowsPerPage, setRowsPerPage] = react_1.useState(100);
    const [totalRows, setTotalRows] = react_1.useState(0);
    const [rows, setRows] = react_1.useState([]);
    const [fields, setFields] = react_1.useState([]);
    const [showLoading, setShowLoading] = react_1.useState(false);
    const [queryError, setQueryError] = react_1.useState(false);
    react_1.useEffect(() => {
        setPage(0);
    }, [jobReference]);
    const pageChange = react_1.useCallback((event, newPage) => {
        setPage(newPage);
    }, []);
    const changeRowsPerPage = react_1.useCallback(event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }, []);
    react_1.useEffect(() => {
        void (() => __awaiter(this, void 0, void 0, function* () {
            if (!jobReference.jobId)
                return;
            setQueryError(false);
            setShowLoading(true);
            try {
                const results = yield service_provider_1.ServiceProvider.bigQueryService.queryJobQueryResults(jobReference, page * rowsPerPage, rowsPerPage);
                setRows(results.rows);
                setFields(results.fields);
                setTotalRows(results.totalRows);
            }
            catch (err) {
                utils_1.appLog.error(err);
                setQueryError(true);
            }
            setShowLoading(false);
        }))();
    }, [jobReference, page, rowsPerPage]);
    const table_fields = react_1.useMemo(() => ['Row', ...fields], [fields]);
    const table_empty = fields.length === 0;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: localStyles.scrollable }, showLoading ? (react_1.default.createElement(loading_panel_1.default, null)) : queryError ? (react_1.default.createElement(info_card_1.default, { color: styles_2.gColor('RED'), message: "Error displaying query results.", icon: react_1.default.createElement(icons_2.Error, null) })) : table_empty ? (react_1.default.createElement(info_card_1.default, { color: styles_2.gColor('YELLOW'), message: "This table is empty.", icon: react_1.default.createElement(icons_2.Warning, null) })) : (react_1.default.createElement(core_1.Table, { size: "small", style: {
                width: 'auto',
                tableLayout: 'auto',
            } },
            react_1.default.createElement(core_1.TableHead, null,
                react_1.default.createElement(core_1.TableRow, null, table_fields.map((field, index) => (react_1.default.createElement(schema_table_1.TableHeadCell, { key: 'field_' + index }, field))))),
            react_1.default.createElement(core_1.TableBody, null, rows.map((row, indexRow) => (react_1.default.createElement(schema_table_1.StyledTableRow, { key: 'table_row_' + indexRow },
                react_1.default.createElement(StyledTableCell, null, page * rowsPerPage + indexRow + 1),
                row.map((cell, indexCell) => (react_1.default.createElement(StyledTableCell, { key: 'table_row_' + indexRow + '_cell' + indexCell }, cell !== null && cell !== void 0 ? cell : react_1.default.createElement("div", { className: localStyles.null }, "null"))))))))))),
        react_1.default.createElement(exports.StyledPagination, { rowsPerPageOptions: [10, 30, 50, 100, 200], count: totalRows, rowsPerPage: rowsPerPage, page: page, onPageChange: pageChange, onRowsPerPageChange: changeRowsPerPage, ActionsComponent: TablePaginationActions, component: "div" })));
}
exports.BQTable = BQTable;
