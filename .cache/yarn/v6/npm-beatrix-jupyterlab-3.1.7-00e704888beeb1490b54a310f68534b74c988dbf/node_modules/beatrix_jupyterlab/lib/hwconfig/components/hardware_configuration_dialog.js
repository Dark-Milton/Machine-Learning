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
exports.HardwareConfigurationDialog = exports.View = void 0;
const core_1 = require("@material-ui/core");
const React = __importStar(require("react"));
const confirmation_page_1 = require("./confirmation_page");
const details_dialog_body_1 = require("./details_dialog_body");
const hardware_scaling_form_1 = require("./hardware_scaling_form");
const hardware_scaling_status_1 = require("./hardware_scaling_status");
const data_1 = require("../data/data");
var View;
(function (View) {
    View[View["DETAILS"] = 0] = "DETAILS";
    View[View["FORM"] = 1] = "FORM";
    View[View["CONFIRMATION"] = 2] = "CONFIRMATION";
    View[View["STATUS"] = 3] = "STATUS";
})(View = exports.View || (exports.View = {}));
class HardwareConfigurationDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: this.props.openForm ? View.FORM : View.DETAILS,
        };
    }
    render() {
        return React.createElement(core_1.Dialog, { open: this.props.open }, this.getDisplay());
    }
    getDisplay() {
        const { acceleratorTypes, details, machineTypes, receivedError, onClose, onCompletion, } = this.props;
        const { hardwareConfiguration, view } = this.state;
        switch (view) {
            case View.DETAILS:
                return (React.createElement(details_dialog_body_1.DetailsDialogBody, { details: details, receivedError: receivedError, onDialogClose: onClose, onUpdate: () => this.setState({ view: View.FORM }) }));
            case View.FORM:
                return (React.createElement(hardware_scaling_form_1.HardwareScalingForm, { acceleratorTypes: acceleratorTypes, details: details, machineTypes: machineTypes, onDialogClose: onClose, onSubmit: (config) => {
                        this.setState({
                            view: View.CONFIRMATION,
                            hardwareConfiguration: config,
                        });
                    } }));
        }
        if (hardwareConfiguration) {
            switch (view) {
                case View.CONFIRMATION:
                    return (React.createElement(confirmation_page_1.ConfirmationPage, { formData: hardwareConfiguration, currentConfiguration: data_1.detailsToHardwareConfiguration(details), onDialogClose: onClose, onSubmit: () => {
                            this.setState({
                                view: View.STATUS,
                            });
                        } }));
                case View.STATUS:
                    return (React.createElement(hardware_scaling_status_1.HardwareScalingStatus, { machineTypes: machineTypes, hardwareConfiguration: hardwareConfiguration, onDialogClose: onClose, onCompletion: onCompletion }));
            }
        }
    }
}
exports.HardwareConfigurationDialog = HardwareConfigurationDialog;
