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
exports.ErrorDisplay = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const message_1 = require("../../components/shared/message");
const styles_1 = require("../../styles");
const styles_2 = require("../data/styles");
const action_bar_1 = require("./action_bar");
const hardware_details_display_1 = require("./hardware_details_display");
const operationStyle = typestyle_1.style({
    backgroundColor: styles_1.COLORS.secondary,
    fontSize: '11px',
    overflow: 'scroll',
    borderColor: styles_1.COLORS.line,
    borderRadius: '2px',
    borderStyle: 'solid',
    borderWidth: '1px',
});
/** Component to show an error after a hardware switch operation. */
function ErrorDisplay(props) {
    const { onDialogClose, error, hardwareDetails, machineTypes, operation } = props;
    return (React.createElement("div", { className: styles_2.STYLES.containerPadding },
        React.createElement("div", { className: styles_2.STYLES.containerSize },
            React.createElement("span", { className: styles_2.STYLES.heading }, "Failed to reshape your notebook"),
            React.createElement(message_1.Message, { text: String(error), asError: true }),
            operation && (React.createElement("div", null,
                React.createElement("p", { className: styles_2.STYLES.subheading }, "Operation details"),
                React.createElement("pre", { className: operationStyle }, JSON.stringify(operation, null, 2)))),
            hardwareDetails && (React.createElement(hardware_details_display_1.HardwareDetailsDisplay, { hardwareDetails: hardwareDetails, machineTypes: machineTypes, title: "Your current configuration" }))),
        React.createElement(action_bar_1.ActionBar, { primaryLabel: "Close", onPrimaryClick: onDialogClose })));
}
exports.ErrorDisplay = ErrorDisplay;
