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
exports.ConfirmationPage = void 0;
const React = __importStar(require("react"));
const message_1 = require("../../components/shared/message");
const accelerator_types_1 = require("../data/accelerator_types");
const styles_1 = require("../data/styles");
const action_bar_1 = require("./action_bar");
const hardware_configuration_description_1 = require("./hardware_configuration_description");
const INFO_MESSAGE = `Updating your configuration will take 5-10 minutes. During this
time you will not be able to access your notebook instance.`;
function displayConfiguration(configuration, title) {
    const { machineType, attachGpu, gpuType, gpuCount } = configuration;
    return (React.createElement("div", null,
        React.createElement("span", { className: styles_1.STYLES.subheading }, title),
        React.createElement("div", { className: styles_1.STYLES.paragraph },
            "Machine type: ",
            machineType.description),
        attachGpu && gpuType !== accelerator_types_1.NO_ACCELERATOR_TYPE && (React.createElement("div", { className: styles_1.STYLES.paragraph }, `GPUs: ${gpuCount} ${accelerator_types_1.getGpuTypeText(gpuType)}`))));
}
function ConfirmationPage(props) {
    const { formData, currentConfiguration, onDialogClose, onSubmit } = props;
    return (React.createElement("div", null,
        React.createElement("header", { className: styles_1.STYLES.dialogHeader }, hardware_configuration_description_1.TITLE),
        React.createElement("div", { className: styles_1.STYLES.containerPadding },
            React.createElement("div", { className: styles_1.STYLES.containerSize },
                React.createElement(hardware_configuration_description_1.HardwareConfigurationDescription, null),
                displayConfiguration(currentConfiguration, 'Old Configuration'),
                displayConfiguration(formData, 'New Configuration'),
                React.createElement("div", { className: styles_1.STYLES.infoMessage },
                    React.createElement(message_1.Message, { asError: false, asActivity: false, text: INFO_MESSAGE }))),
            React.createElement(action_bar_1.ActionBar, { primaryLabel: "Submit", onPrimaryClick: () => onSubmit(), secondaryLabel: "Cancel", onSecondaryClick: onDialogClose }))));
}
exports.ConfirmationPage = ConfirmationPage;
