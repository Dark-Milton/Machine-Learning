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
exports.HardwareScalingStatus = exports.Status = void 0;
const core_1 = require("@material-ui/core");
const csstips = __importStar(require("csstips"));
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const styles_1 = require("../../styles");
const styles_2 = require("../data/styles");
const workbench_512_color_png_1 = __importDefault(require("../../../style/images/workbench_512_color.png"));
const action_bar_1 = require("./action_bar");
const error_display_1 = require("./error_display");
const hardware_details_display_1 = require("./hardware_details_display");
const data_1 = require("../data/data");
const service_provider_1 = require("../../service/service_provider");
const utils_1 = require("../../utils");
const localStyles = typestyle_1.stylesheet({
    container: Object.assign(Object.assign({}, csstips.vertical), { alignItems: 'center', backgroundColor: 'var(--jp-layout-color1)' }),
    containerPadding: {
        padding: '24px 24px 12px 24px',
    },
    containerBottomPadding: {
        paddingBottom: '12px',
    },
    image: {
        marginBottom: '40px',
        height: '320px',
    },
    bottomText: {
        marginTop: '48px',
        fontSize: '12px',
        color: 'var(--jp-ui-font-color2)',
    },
    loader: {
        color: `${styles_1.COLORS.link} !important`,
        height: '24px !important',
        marginBottom: '16px !important',
        marginTop: '40px !important',
        width: '24px !important',
    },
    paragraph: {
        fontSize: '13px',
    },
});
var Status;
(function (Status) {
    Status[Status["Switching runtime"] = 0] = "Switching runtime";
    Status[Status["Complete"] = 1] = "Complete";
    Status[Status["Error"] = 2] = "Error";
})(Status = exports.Status || (exports.Status = {}));
// Constants to determine how many polls are done for the server to restart (4m)
const RETRIES = 60; // 60 * 5 = 5m
const WAIT_INTERVAL = 5000; // 5s
function preventPageClose(event) {
    event.preventDefault();
    event.returnValue = '';
}
class HardwareScalingStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: Status['Switching runtime'],
            hardwareDetails: { name: '' },
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            window.addEventListener('beforeunload', preventPageClose);
            const { hardwareConfiguration, onCompletion } = this.props;
            const { machineType, attachGpu, gpuType, gpuCount } = hardwareConfiguration;
            try {
                const operation = yield service_provider_1.ServiceProvider.hardwareService.switchRuntime(Object.assign({ machineType: machineType.name }, (attachGpu ? { gpuType, coreCount: gpuCount } : {})));
                this.setState({ operation });
                // switchRuntime does not stop the runtime immediately, so we must wait
                // until it is stopped before proceeding.
                yield this.pollDetailsUntilUnavailable();
                const vmDetails = yield this.pollDetails();
                onCompletion();
                const hardwareConfig = data_1.detailsToHardwareConfiguration(vmDetails);
                const hardwareDetails = {
                    name: vmDetails.instance.name,
                    machineType: hardwareConfig.machineType.name,
                    acceleratorConfig: {
                        type: hardwareConfig.gpuType,
                        coreCount: hardwareConfig.gpuCount,
                    },
                };
                this.updateStatus(Status.Complete, hardwareDetails);
            }
            catch (err) {
                this.showError(err);
            }
        });
    }
    componentWillUnmount() {
        window.removeEventListener('beforeunload', preventPageClose);
    }
    render() {
        const { status, error, hardwareDetails, operation } = this.state;
        const { onDialogClose, machineTypes } = this.props;
        if (status === Status['Error']) {
            return (React.createElement(error_display_1.ErrorDisplay, { onDialogClose: onDialogClose, error: error, hardwareDetails: hardwareDetails, machineTypes: machineTypes, operation: operation }));
        }
        else if (status === Status['Complete']) {
            return (React.createElement("div", { className: typestyle_1.classes(localStyles.containerPadding, localStyles.container) },
                React.createElement("img", { className: localStyles.image, alt: "Vertex Workbench logo", src: workbench_512_color_png_1.default }),
                React.createElement("p", { className: styles_2.STYLES.heading }, "Hardware modified successfully"),
                React.createElement("div", { className: localStyles.containerBottomPadding },
                    React.createElement(hardware_details_display_1.HardwareDetailsDisplay, { hardwareDetails: hardwareDetails, machineTypes: machineTypes, title: "Your new configuration" }),
                    React.createElement(action_bar_1.ActionBar, { onPrimaryClick: onDialogClose, primaryLabel: "Close" }))));
        }
        else {
            return (React.createElement("div", { className: typestyle_1.classes(localStyles.containerPadding, localStyles.container) },
                React.createElement(core_1.CircularProgress, { className: localStyles.loader }),
                React.createElement("p", { className: styles_2.STYLES.heading }, "Modifying hardware"),
                React.createElement("p", { className: localStyles.paragraph }, "Switching hardware to match your selections."),
                React.createElement("p", { className: localStyles.bottomText }, "The switching process will take 5-10 minutes. Don't close this page before it is finished.")));
        }
    }
    updateStatus(status, hardwareDetails) {
        this.setState({ status, hardwareDetails });
    }
    showError(error, newHardwareDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            let { operation } = this.state;
            if (operation === null || operation === void 0 ? void 0 : operation.name) {
                // Retrieve the latest operation status
                try {
                    operation = yield service_provider_1.ServiceProvider.hardwareService.getOperation(operation.name || '');
                }
                catch (err) {
                    utils_1.appLog.warn(`Unable to retrieve switchRuntime Operation ${operation.name}`);
                }
            }
            this.setState({
                status: Status.Error,
                hardwareDetails: newHardwareDetails
                    ? newHardwareDetails
                    : this.state.hardwareDetails,
                error,
                operation,
            });
        });
    }
    /*
     * Functions similarly to pollDetails except that this function returns when
     * an error is thrown from getVmDetails.
     */
    pollDetailsUntilUnavailable() {
        return __awaiter(this, void 0, void 0, function* () {
            const retries = (90 * 1000) / WAIT_INTERVAL; // 90s
            for (let tries = 0; tries < retries; tries++) {
                try {
                    yield service_provider_1.ServiceProvider.hardwareService.getVmDetails();
                }
                catch (err) {
                    return;
                }
                yield new Promise(resolve => setTimeout(resolve, WAIT_INTERVAL));
            }
            throw new Error('Notebook did not shutdown after 90s.');
        });
    }
    pollDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let tries = 0; tries < RETRIES; tries++) {
                try {
                    return yield service_provider_1.ServiceProvider.hardwareService.getVmDetails();
                }
                catch (err) {
                    if (tries === RETRIES - 1) {
                        throw err;
                    }
                    yield new Promise(resolve => setTimeout(resolve, WAIT_INTERVAL));
                }
            }
            throw new Error(`Unable to retrieve Details after ${RETRIES} retries`);
        });
    }
}
exports.HardwareScalingStatus = HardwareScalingStatus;
