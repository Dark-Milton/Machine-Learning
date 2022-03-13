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
exports.HardwareConfigWidget = exports.HardwareConfig = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const react_1 = __importDefault(require("react"));
const service_provider_1 = require("../service/service_provider");
const hardware_configuration_dialog_1 = require("./components/hardware_configuration_dialog");
const hardware_details_popover_1 = require("./components/hardware_details_popover");
const machine_types_1 = require("./data/machine_types");
/** Wraps the HardwareConfigurationDialog and controls its behavior. */
class HardwareConfig extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            openForm: false,
        };
        this.onModifyHardwareClick = this.onModifyHardwareClick.bind(this);
    }
    componentDidMount() {
        this.props.dialogTriggeredSignal.connect(() => {
            this.setState({ isOpen: true, openForm: false });
        });
        this.getVmDetails();
    }
    render() {
        const { notebookProvider, showPopoverSignal } = this.props;
        const { acceleratorTypes, isOpen, machineTypes, openForm, vmDetails } = this.state;
        const shouldDisplayDialog = !!vmDetails && isOpen;
        return (react_1.default.createElement("div", null,
            vmDetails && (react_1.default.createElement(hardware_details_popover_1.HardwareDetailsPopover, { onModifyHardwareClick: this.onModifyHardwareClick, showPopoverSignal: showPopoverSignal, vmDetails: vmDetails })),
            shouldDisplayDialog && (react_1.default.createElement(hardware_configuration_dialog_1.HardwareConfigurationDialog, { open: true, openForm: openForm, acceleratorTypes: acceleratorTypes || [], machineTypes: machineTypes || [], details: vmDetails, onClose: () => {
                    this.setState({ isOpen: false });
                }, onCompletion: () => {
                    this.getVmDetails();
                    notebookProvider.refresh();
                }, receivedError: false }))));
    }
    onModifyHardwareClick() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.state.machineTypes || !this.state.acceleratorTypes) {
                yield this.getFormOptions();
            }
            this.setState({ isOpen: true, openForm: true });
        });
    }
    getVmDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            const vmDetails = yield service_provider_1.ServiceProvider.hardwareService.getVmDetails();
            this.setState({ vmDetails });
        });
    }
    getFormOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            let { acceleratorTypes, machineTypes } = this.state;
            if (!((acceleratorTypes === null || acceleratorTypes === void 0 ? void 0 : acceleratorTypes.length) && (machineTypes === null || machineTypes === void 0 ? void 0 : machineTypes.length))) {
                const [machineTypesResponse, acceleratorTypesResponse] = yield Promise.all([
                    service_provider_1.ServiceProvider.hardwareService.getMachineTypes(),
                    service_provider_1.ServiceProvider.hardwareService.getAcceleratorTypes(),
                ]);
                machineTypes = machine_types_1.getMachineTypeConfigurations(machineTypesResponse);
                acceleratorTypes = acceleratorTypesResponse;
            }
            this.setState({ machineTypes, acceleratorTypes });
        });
    }
}
exports.HardwareConfig = HardwareConfig;
/** Widget to manage display of the hardware config dialog. */
class HardwareConfigWidget extends apputils_1.ReactWidget {
    constructor(dialogTriggeredSignal, showPopoverSignal, notebookProvider) {
        super();
        this.dialogTriggeredSignal = dialogTriggeredSignal;
        this.showPopoverSignal = showPopoverSignal;
        this.notebookProvider = notebookProvider;
    }
    render() {
        return (react_1.default.createElement(HardwareConfig, { dialogTriggeredSignal: this.dialogTriggeredSignal, showPopoverSignal: this.showPopoverSignal, notebookProvider: this.notebookProvider }));
    }
}
exports.HardwareConfigWidget = HardwareConfigWidget;
