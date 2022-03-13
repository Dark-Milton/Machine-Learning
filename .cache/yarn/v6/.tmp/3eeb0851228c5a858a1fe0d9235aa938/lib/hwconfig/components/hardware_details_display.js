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
exports.HardwareDetailsDisplay = void 0;
const csstips = __importStar(require("csstips"));
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const styles_1 = require("../../styles");
const accelerator_types_1 = require("../data/accelerator_types");
const data_1 = require("../data/data");
const styles_2 = require("../data/styles");
const machine_types_1 = require("../data/machine_types");
const core_1 = require("@material-ui/core");
const DetailsTableCell = core_1.withStyles({
    root: Object.assign(Object.assign({}, styles_1.BASE_FONT), { borderBottom: 0, paddingBottom: '2px', paddingLeft: '8px', paddingRight: '8px', paddingTop: '2px', verticalAlign: 'top' }),
})(core_1.TableCell);
const localStyles = typestyle_1.stylesheet({
    container: Object.assign(Object.assign({}, csstips.vertical), { alignItems: 'center', marginLeft: '50px', marginRight: '50px' }),
    subheading: {
        fontSize: '13px',
        marginBottom: '8px',
        marginTop: '4px',
        padding: 0,
    },
    tableCell: {
        width: '190px',
    },
});
/** Component to display hardware details. */
function HardwareDetailsDisplay(props) {
    const { machineType, acceleratorConfig } = props.hardwareDetails;
    const machineTypeLast = machineType ? data_1.extractLast(machineType) : undefined;
    const machineTypeText = machineTypeLast
        ? machine_types_1.getMachineTypeText(machineTypeLast, props.machineTypes)
        : 'Unknown';
    return (React.createElement("div", { className: localStyles.container },
        React.createElement("span", { className: typestyle_1.classes(styles_2.STYLES.subheading, localStyles.subheading) }, props.title),
        React.createElement(core_1.TableContainer, null,
            React.createElement(core_1.Table, null,
                React.createElement(core_1.TableBody, null,
                    machineTypeText && (React.createElement(core_1.TableRow, null,
                        React.createElement(DetailsTableCell, null, "Machine type:"),
                        React.createElement(DetailsTableCell, { className: localStyles.tableCell }, machineTypeText))),
                    acceleratorConfig && (React.createElement(core_1.TableRow, null,
                        React.createElement(DetailsTableCell, null, "GPUs:"),
                        React.createElement(DetailsTableCell, { className: localStyles.tableCell }, !acceleratorConfig.coreCount
                            ? 'None'
                            : `${acceleratorConfig.coreCount} ${accelerator_types_1.getGpuTypeText(acceleratorConfig.type || '')}`))))))));
}
exports.HardwareDetailsDisplay = HardwareDetailsDisplay;
