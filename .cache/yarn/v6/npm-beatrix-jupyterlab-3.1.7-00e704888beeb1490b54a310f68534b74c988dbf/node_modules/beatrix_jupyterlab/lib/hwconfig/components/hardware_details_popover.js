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
exports.HardwareDetailsPopover = exports.ModifyHardwareButton = exports.Detail = void 0;
const core_1 = require("@material-ui/core");
const csstips = __importStar(require("csstips"));
const react_1 = __importDefault(require("react"));
const typestyle_1 = require("typestyle");
const toolbar_1 = require("../../components/toolbar");
const STYLES = typestyle_1.stylesheet({
    container: Object.assign(Object.assign({ padding: '16px' }, csstips.horizontal), csstips.horizontallySpaced('48px')),
    detailContainer: Object.assign(Object.assign(Object.assign({}, csstips.vertical), csstips.center), csstips.verticallySpaced('4px')),
});
/** Displays label and utilization of a given hardware */
function Detail(props) {
    const { label, utilization } = props;
    return (react_1.default.createElement("div", { className: STYLES.detailContainer },
        react_1.default.createElement("span", null, label),
        react_1.default.createElement("span", { style: { fontWeight: 'bold' } },
            utilization,
            "%")));
}
exports.Detail = Detail;
/** Button that opens the hardware configuration dialog when clicked */
exports.ModifyHardwareButton = core_1.withStyles({
    root: {
        justifyContent: 'left',
        padding: '12px',
        textTransform: 'none',
        width: '100%',
    },
})(core_1.Button);
/** Displays a popover containing hardware details */
class HardwareDetailsPopover extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
        this.onClose = this.onClose.bind(this);
        this.onModifyHardwareClick = this.onModifyHardwareClick.bind(this);
    }
    componentDidMount() {
        this.props.showPopoverSignal.connect(() => {
            this.setState({
                isOpen: true,
            });
        });
        this.setStateFromDetails();
    }
    componentDidUpdate(prevProps) {
        if (this.props.vmDetails !== prevProps.vmDetails) {
            this.setStateFromDetails();
        }
    }
    render() {
        const { cpuDetail, gpuDetail, isOpen, memoryDetail, isRuntime } = this.state;
        const id = isOpen
            ? 'jp-beatrixHardwareConfig-hardwareDetailsPopover'
            : undefined;
        return (react_1.default.createElement(core_1.Popover, { id: id, open: isOpen, anchorEl: document.getElementById(toolbar_1.HARDWARE_BUTTON_ID), onClose: this.onClose, anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            }, transformOrigin: {
                vertical: 'top',
                horizontal: 'right',
            } },
            react_1.default.createElement("div", { className: STYLES.container },
                cpuDetail && (react_1.default.createElement(Detail, { label: cpuDetail.label, utilization: cpuDetail.utilization })),
                memoryDetail && (react_1.default.createElement(Detail, { label: memoryDetail.label, utilization: memoryDetail.utilization })),
                gpuDetail && (react_1.default.createElement(Detail, { label: gpuDetail.label, utilization: gpuDetail.utilization }))),
            react_1.default.createElement(core_1.Divider, null),
            react_1.default.createElement(exports.ModifyHardwareButton, { disabled: !isRuntime, onClick: this.onModifyHardwareClick }, "Modify hardware")));
    }
    onClose() {
        this.setState({
            isOpen: false,
        });
    }
    onModifyHardwareClick() {
        this.onClose();
        this.props.onModifyHardwareClick();
    }
    setStateFromDetails() {
        const vmDetails = this.props.vmDetails;
        // TODO(b/194694936): Replace parsing with specific MachineType fields
        const machineType = vmDetails.instance.machineType;
        const tokens = machineType.description.split(',');
        for (const token of tokens) {
            if (token.trim().includes('vCPU')) {
                this.setState({
                    cpuDetail: {
                        label: token.trim(),
                        utilization: vmDetails.utilization.cpu,
                    },
                });
            }
            else if (token.trim().endsWith('RAM')) {
                this.setState({
                    memoryDetail: {
                        label: token.trim(),
                        utilization: vmDetails.utilization.memory,
                    },
                });
            }
        }
        const gpu = vmDetails.gpu;
        if (gpu.name) {
            const count = Number(gpu.count);
            this.setState({
                gpuDetail: {
                    label: gpu.count + ' ' + gpu.name + ' GPU' + (count > 1 ? 's' : ''),
                    utilization: gpu.memory,
                },
            });
        }
        else {
            this.setState({
                gpuDetail: undefined,
            });
        }
        const isRuntime = !!vmDetails.instance.attributes['runtime-resource-name'];
        this.setState({ isRuntime });
    }
}
exports.HardwareDetailsPopover = HardwareDetailsPopover;
