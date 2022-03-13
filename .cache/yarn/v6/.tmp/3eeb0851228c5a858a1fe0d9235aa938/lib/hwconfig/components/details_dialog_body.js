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
exports.DetailsDialogBody = void 0;
const React = __importStar(require("react"));
const data_1 = require("../data/data");
const styles_1 = require("../data/styles");
const action_bar_1 = require("./action_bar");
const core_1 = require("@material-ui/core");
const useStyles = core_1.makeStyles({
    table: {
        minWidth: 350,
    },
    container: {
        boxShadow: 'none',
        elevation: 0,
        backgroundColor: 'var(--jp-layout-color1)',
        marginTop: '-8px',
    },
    header: {
        color: 'var(--jp-ui-font-color1)',
    },
    value: {
        color: 'var(--jp-ui-font-color2)',
    },
});
function SimpleTable(details) {
    const tableClasses = useStyles();
    return (React.createElement(core_1.TableContainer, { className: tableClasses.container, component: core_1.Paper },
        React.createElement(core_1.Table, { className: tableClasses.table, "aria-label": "simple table" },
            React.createElement(core_1.TableBody, null, data_1.MAPPED_ATTRIBUTES.map(am => {
                const { label, mapper } = am;
                let value = mapper(details);
                if (label.endsWith('Utilization')) {
                    value = value.split(': ').pop();
                }
                return (React.createElement(core_1.TableRow, { key: label },
                    React.createElement(core_1.TableCell, { className: tableClasses.header, component: "th", scope: "row" }, am.label),
                    React.createElement(core_1.TableCell, { className: tableClasses.value, align: "right" }, value)));
            })))));
}
function isLoadingDetails(details, receivedError) {
    return !(details || receivedError);
}
function DetailsDialogBody(props) {
    const { details, receivedError, onDialogClose, onUpdate } = props;
    const isRuntime = !!details.instance.attributes['runtime-resource-name'];
    return (React.createElement("div", null,
        React.createElement("header", { className: styles_1.STYLES.dialogHeader }, "Notebook Details"),
        React.createElement("dl", { className: styles_1.STYLES.containerPadding },
            isLoadingDetails(Boolean(details), receivedError) ? (React.createElement("div", { className: styles_1.STYLES.containerSize },
                React.createElement("p", { className: styles_1.STYLES.paragraph }, "Retrieving Notebook details..."))) : receivedError ? (React.createElement("div", { className: styles_1.STYLES.containerSize },
                React.createElement("p", { className: styles_1.STYLES.paragraph }, "Unable to retrieve Notebook details, please check your server logs"))) : (SimpleTable(details)),
            React.createElement(action_bar_1.ActionBar, { primaryLabel: "Modify hardware", secondaryLabel: "Close", onPrimaryClick: onUpdate, onSecondaryClick: onDialogClose, primaryDisabled: !isRuntime }))));
}
exports.DetailsDialogBody = DetailsDialogBody;
