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
exports.HardwareScalingForm = exports.FORM_STYLES = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const checkbox_input_1 = require("../../components/shared/checkbox_input");
const learn_more_link_1 = require("../../components/shared/learn_more_link");
const message_1 = require("../../components/shared/message");
const styles_1 = require("../../styles");
const styles_2 = require("../data/styles");
const action_bar_1 = require("./action_bar");
const machine_type_select_1 = require("./machine_type_select");
const select_input_1 = require("./select_input");
const data_1 = require("../data/data");
const accelerator_types_1 = require("../data/accelerator_types");
const machine_types_1 = require("../data/machine_types");
const hardware_configuration_description_1 = require("./hardware_configuration_description");
exports.FORM_STYLES = typestyle_1.stylesheet({
    checkboxContainer: {
        padding: '18px 0px 8px 0px',
    },
    formContainer: {
        width: '468px',
    },
    topPadding: {
        paddingTop: '10px',
    },
});
const GPU_INCOMPATIBLE_FRAMEWORKS = ['R:3', 'NumPy/SciPy/scikit-learn'];
const GPU_RESTRICTION_MESSAGE = `Based on the zone, framework, and machine type of the instance,
the available GPU types and the minimum number of GPUs that can be selected may vary. `;
const GPU_RESTRICTION_LINK = 'https://cloud.google.com/compute/docs/gpus';
const INFO_MESSAGE = `If you have chosen to attach GPUs to your instance,
the NVIDIA GPU driver will be installed automatically on the next startup.`;
class HardwareScalingForm extends React.Component {
    constructor(props) {
        super(props);
        this.oldConfiguration = data_1.detailsToHardwareConfiguration(props.details);
        this.state = {
            configuration: this.oldConfiguration,
            // Update the gpu count options based on the selected gpu type
            gpuCountOptions: accelerator_types_1.getGpuCountOptionsList(props.acceleratorTypes, props.details.gpu.name),
            gpuTypeOptions: accelerator_types_1.getGpuTypeOptionsList(props.acceleratorTypes, props.details.instance.cpuPlatform, this.oldConfiguration.machineType),
        };
    }
    render() {
        const { onDialogClose, machineTypes } = this.props;
        const { configuration, gpuCountOptions, gpuTypeOptions } = this.state;
        const { gpuType, gpuCount, attachGpu, machineType } = configuration;
        const configurationModified = !data_1.isEqualHardwareConfiguration(this.oldConfiguration, configuration);
        return (React.createElement("div", null,
            React.createElement("header", { className: styles_2.STYLES.dialogHeader }, hardware_configuration_description_1.TITLE),
            React.createElement("div", { className: styles_2.STYLES.containerPadding },
                React.createElement("div", { className: exports.FORM_STYLES.formContainer },
                    React.createElement(hardware_configuration_description_1.HardwareConfigurationDescription, null),
                    React.createElement("span", { className: styles_2.STYLES.subheading }, "Machine Configuration"),
                    React.createElement(machine_type_select_1.NestedSelect, { label: "Machine type", nestedOptionsList: machineTypes.map(machineType => ({
                            header: machineType.base,
                            options: machineType.configurations,
                        })), onChange: machineType => this.onMachineTypeChange(machineType), value: machine_types_1.machineTypeToOption(machineType) }),
                    React.createElement("span", { className: styles_2.STYLES.subheading }, "GPU Configuration"),
                    this.gpuRestrictionMessage(),
                    React.createElement("div", { className: exports.FORM_STYLES.checkboxContainer },
                        React.createElement(checkbox_input_1.CheckboxInput, { label: "Attach GPUs", name: "attachGpu", checked: attachGpu && this.canAttachGpu(machineType.name), onChange: e => this.onAttachGpuChange(e), disabled: !this.canAttachGpu(machineType.name) })),
                    attachGpu && this.canAttachGpu(machineType.name) && (React.createElement("div", { className: typestyle_1.classes(styles_1.CSS.scheduleBuilderRow, exports.FORM_STYLES.topPadding) },
                        React.createElement("div", { className: styles_1.CSS.flex1 },
                            React.createElement(select_input_1.SelectInput, { label: "GPU type", name: "gpuType", value: gpuType, options: gpuTypeOptions, onChange: e => this.onGpuTypeChange(e) })),
                        React.createElement("div", { className: styles_1.CSS.flex1 },
                            React.createElement(select_input_1.SelectInput, { label: "Number of GPUs", name: "gpuCount", value: String(gpuCount), options: gpuCountOptions, onChange: e => this.onGpuCountChange(e) })))),
                    attachGpu && (React.createElement("div", { className: styles_2.STYLES.infoMessage },
                        React.createElement(message_1.Message, { asError: false, asActivity: false, text: INFO_MESSAGE })))),
                React.createElement(action_bar_1.ActionBar, { primaryLabel: "Next", onPrimaryClick: () => this.submitForm(), primaryDisabled: !configurationModified, secondaryLabel: "Cancel", onSecondaryClick: onDialogClose }))));
    }
    /*
     * If this returns false, the GPU fields in the form will be disabled and
     * the user will not be able to attach a GPU to their configuration.
     * Currently only N1 general-purpose machines and A2 accelerator-optimized
     * machines support GPUs:
     * https://cloud.google.com/compute/docs/gpus#restrictions
     */
    canAttachGpu(machineTypeName) {
        const { framework } = this.props.details.instance.attributes;
        /** Assume framework is compatible if it can't be fetched as the
         * reshaping process will catch this error anyways.
         */
        const isValidFramework = framework
            ? !GPU_INCOMPATIBLE_FRAMEWORKS.some(incompatibleFramework => framework.startsWith(incompatibleFramework))
            : true;
        const isValidMachineType = machineTypeName.startsWith(machine_types_1.N1_MACHINE_PREFIX) ||
            machineTypeName.startsWith(machine_types_1.A2_MACHINE_PREFIX);
        return isValidFramework && isValidMachineType;
    }
    onAttachGpuChange(event) {
        const configuration = Object.assign(Object.assign({}, this.state.configuration), { attachGpu: event.target.checked, gpuType: event.target.checked
                ? String(this.state.gpuTypeOptions[0].value)
                : accelerator_types_1.NO_ACCELERATOR_TYPE, gpuCount: event.target.checked
                ? Number(this.state.gpuCountOptions[0].value)
                : accelerator_types_1.NO_ACCELERATOR_COUNT });
        this.setState({ configuration });
    }
    onGpuTypeChange(event) {
        const newGpuCountOptions = accelerator_types_1.getGpuCountOptionsList(this.props.acceleratorTypes, event.target.value);
        const configuration = Object.assign(Object.assign({}, this.state.configuration), { gpuType: event.target.value, gpuCount: Number(newGpuCountOptions[0].value) });
        this.setState({
            configuration,
            gpuCountOptions: newGpuCountOptions,
        });
    }
    onGpuCountChange(event) {
        const configuration = Object.assign(Object.assign({}, this.state.configuration), { gpuCount: Number(event.target.value) });
        this.setState({ configuration });
    }
    onMachineTypeChange(newMachineTypeOption) {
        const attachGpu = this.state.configuration.attachGpu &&
            this.canAttachGpu(newMachineTypeOption.value);
        const newMachineType = machine_types_1.optionToMachineType(newMachineTypeOption);
        const newGpuTypeOptions = accelerator_types_1.getGpuTypeOptionsList(this.props.acceleratorTypes, this.props.details.instance.cpuPlatform, newMachineType);
        const configuration = Object.assign(Object.assign({}, this.state.configuration), { machineType: newMachineType, attachGpu, gpuType: attachGpu
                ? newGpuTypeOptions[0].value
                : accelerator_types_1.NO_ACCELERATOR_TYPE, gpuCount: attachGpu
                ? this.state.configuration.gpuCount
                : accelerator_types_1.NO_ACCELERATOR_COUNT });
        this.setState({
            configuration,
            gpuTypeOptions: newGpuTypeOptions,
        });
    }
    submitForm() {
        const configuration = Object.assign({}, this.state.configuration);
        if (!configuration.attachGpu) {
            /**
             * If configuration originally had a GPU we want to explicity attach an
             * accelerator of type NO_ACCELERATOR_TYPE through the Notebooks API to remove it
             */
            configuration.attachGpu = this.oldConfiguration
                ? this.oldConfiguration.attachGpu
                : configuration.attachGpu;
        }
        this.props.onSubmit(configuration);
    }
    gpuRestrictionMessage() {
        return (React.createElement("p", { className: styles_2.STYLES.paragraph },
            GPU_RESTRICTION_MESSAGE,
            React.createElement(learn_more_link_1.LearnMoreLink, { href: GPU_RESTRICTION_LINK })));
    }
}
exports.HardwareScalingForm = HardwareScalingForm;
