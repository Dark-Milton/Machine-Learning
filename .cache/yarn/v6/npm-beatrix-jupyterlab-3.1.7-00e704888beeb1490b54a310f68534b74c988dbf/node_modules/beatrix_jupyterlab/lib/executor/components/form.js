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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutorForm = exports.InnerExecutorForm = void 0;
const formik_1 = require("formik");
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const message_1 = require("../../components/shared/message");
const select_input_1 = require("../../components/shared/select_input");
const submit_button_1 = require("../../components/shared/submit_button");
const text_input_1 = require("../../components/shared/text_input");
const toggle_switch_input_1 = require("../../components/shared/toggle_switch_input");
const styles_1 = require("../../styles");
const cron_1 = require("../cron");
const action_bar_1 = require("./action_bar");
const advanced_options_1 = require("./advanced_options");
const description_1 = require("./description");
const environment_selector_1 = require("../../components/shared/environment_selector");
const schedule_builder_1 = require("./schedule_builder/schedule_builder");
const data_1 = require("../data");
const environment_data_1 = require("../../environment_data");
const service_provider_1 = require("../../service/service_provider");
const utils_1 = require("../../utils");
const PARAMETERS_REGEX = '^(s*[A-Za-z0-9_]+s*=s*[A-Za-z0-9_.]+s*,s*)*([A-Za-z0-9_]+s*=s*[A-Za-z0-9_.]+s*)$';
const IAM_MESSAGE = 'The following IAM permissions are missing';
// Build a unique name from the opened Notebook and current timestamp
function getName(notebookName) {
    const sliceStart = notebookName.lastIndexOf('/') === -1
        ? 0
        : notebookName.lastIndexOf('/') + 1;
    let name = notebookName
        .slice(sliceStart, notebookName.lastIndexOf('.'))
        .toLowerCase()
        .replace(/[^a-zA-Z0-9_]/g, '_');
    const firstCharCode = name.charCodeAt(0);
    // Add letter if first character is not a letter
    if (firstCharCode < 97 || firstCharCode > 122) {
        name = `a${name}`;
    }
    return `${name}__${Date.now()}`;
}
const localStyles = typestyle_1.stylesheet({
    content: {
        overflowY: 'scroll',
        overflowX: 'hidden',
        borderTop: '1px solid ' + styles_1.COLORS.line,
        borderBottom: '1px solid ' + styles_1.COLORS.line,
        paddingLeft: '24px',
        paddingRight: '24px',
        paddingTop: '16px',
        flexGrow: 2,
    },
    footer: {
        paddingBottom: '16px',
        paddingLeft: '36px',
        paddingRight: '36px',
    },
    caption: {
        minHeight: '30px',
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: '16px',
        marginTop: '5px',
        color: styles_1.COLORS.caption,
    },
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
});
/**
 * Inner form used for Scheduling wrapped by Formik
 */
class InnerExecutorForm extends React.Component {
    constructor(props) {
        super(props);
        this.missingPermissions = this.props.permissions.toExecute;
        this.machineTypeOptions = data_1.N1_MASTER_TYPES;
        this.acceleratorTypeOptions = data_1.getAcceleratorTypes(this.props.values.masterType || '');
        this.acceleratorCountOptions = data_1.ACCELERATOR_COUNTS_1_2_4_8;
        this.state = { useUnixCronFormat: false };
        this._onScheduleTypeChange = this._onScheduleTypeChange.bind(this);
        this._onMasterTypeChanged = this._onMasterTypeChanged.bind(this);
        this._onAcceleratorTypeChange = this._onAcceleratorTypeChange.bind(this);
        this._onAdvancedOptionsChange = this._onAdvancedOptionsChange.bind(this);
        this._onEnvironmentChanged = this._onEnvironmentChanged.bind(this);
        this.updateCronSchedule = this.updateCronSchedule.bind(this);
    }
    updateCronSchedule(newSchedule) {
        this.props.setFieldValue('schedule', newSchedule, false);
    }
    render() {
        const { values, submitForm, handleChange, isSubmitting, errors } = this.props;
        const { useUnixCronFormat } = this.state;
        const status = this.props.status;
        const expandByDefault = this.props.gcpSettings.serviceAccount &&
            this.props.gcpSettings.serviceAccount !== '';
        return (React.createElement("form", { className: localStyles.container },
            React.createElement("div", { className: localStyles.content },
                React.createElement(description_1.Description, null),
                React.createElement("p", { className: styles_1.CSS.heading },
                    "Notebook: ",
                    this.props.notebookName),
                React.createElement(text_input_1.TextInput, { label: values.scheduleType === data_1.RECURRING
                        ? 'Schedule name'
                        : 'Execution name', name: "name", value: values.name, hasError: !!errors.name, error: errors.name, onChange: handleChange, formHelperText: "Up to 128 lowercase letters, numbers, or underscores." }),
                React.createElement(select_input_1.SelectInput, { label: "Machine type", name: "masterType", value: values.masterType, options: this.machineTypeOptions, onChange: this._onMasterTypeChanged }),
                React.createElement("div", { className: styles_1.CSS.scheduleBuilderRow },
                    React.createElement("div", { className: styles_1.CSS.flex1 },
                        React.createElement(select_input_1.SelectInput, { label: "Accelerator type", name: "acceleratorType", value: values.acceleratorType, options: this.acceleratorTypeOptions, onChange: this._onAcceleratorTypeChange })),
                    React.createElement("div", { className: styles_1.CSS.flex1 }, values.acceleratorType && (React.createElement(select_input_1.SelectInput, { label: "Accelerator count", name: "acceleratorCount", value: values.acceleratorCount, options: this.acceleratorCountOptions, onChange: handleChange })))),
                React.createElement(environment_selector_1.EnvironmentSelector, { notebook: this.props.notebook, onChange: this._onEnvironmentChanged }),
                React.createElement(select_input_1.SelectInput, { label: "Type", name: "scheduleType", value: values.scheduleType, options: data_1.SCHEDULE_TYPES, onChange: this._onScheduleTypeChange }),
                values.scheduleType === data_1.RECURRING && (React.createElement(schedule_builder_1.ScheduleBuilder, { schedule: values.schedule || '', onScheduleChange: this.updateCronSchedule, useUnixCronFormat: !!useUnixCronFormat })),
                values.scheduleType === data_1.RECURRING && (React.createElement(toggle_switch_input_1.ToggleSwitch, { name: "useUnixCronFormat", checked: useUnixCronFormat, labelRight: 'Use user-friendly scheduler', labelLeft: 'Use UNIX cron format', onChange: () => this.setState({
                        useUnixCronFormat: !useUnixCronFormat,
                    }) })),
                React.createElement("p", { className: localStyles.caption }, values.scheduleType === data_1.RECURRING
                    ? cron_1.getNextExecutionDate(values.schedule || '')
                    : 'Execution will start immediately after being submitted'),
                React.createElement(advanced_options_1.AdvancedOptions, { expandByDefault: !!expandByDefault, gcpSettings: this.props.gcpSettings, onAdvancedOptionsChanged: this._onAdvancedOptionsChange })),
            React.createElement("div", { className: localStyles.footer },
                React.createElement(action_bar_1.ActionBar, { onClose: this.props.onClose, closeLabel: "Cancel", alignLeft: true, closeOnRight: true, error: status && !status.lastSubmitted ? (React.createElement(message_1.Message, { asActivity: isSubmitting, asError: status.asError, text: status.message })) : errors && errors.gcsBucket ? (React.createElement(message_1.Message, { asActivity: false, asError: true, text: errors.gcsBucket })) : errors && errors.parameters ? (React.createElement(message_1.Message, { asError: true, text: errors.parameters })) : this.missingPermissions.length > 0 ? (React.createElement(message_1.Message, { asError: true, text: `${IAM_MESSAGE}: ${this.missingPermissions.join(', ')}` })) : null }, this.missingPermissions.length === 0 && (React.createElement(submit_button_1.SubmitButton, { actionPending: isSubmitting, onClick: submitForm, text: "Submit" }))))));
    }
    _onMasterTypeChanged(e) {
        this.acceleratorTypeOptions = data_1.getAcceleratorTypes(e.target.value);
        const { handleChange, setFieldValue } = this.props;
        const value = e.target.value;
        if (!data_1.isAcceleratorCompatible(this.props.values.acceleratorType || '', value)) {
            setFieldValue('acceleratorType', e.target.value === '' ? '' : this.acceleratorTypeOptions[0].value, false);
            setFieldValue('acceleratorCount', '', false);
        }
        // Update accelerator count option in A100 case to single option list.
        if (this.props.values.acceleratorType === data_1.A100_VALUE) {
            this.acceleratorCountOptions = data_1.getAcceleratorCountForA100(value);
            setFieldValue('acceleratorCount', this.acceleratorCountOptions[0].value, false);
        }
        handleChange(e);
    }
    _onScheduleTypeChange(e) {
        const { handleChange, setFieldValue, onScheduleTypeChange } = this.props;
        const value = e.target.value;
        this.missingPermissions =
            value === data_1.RECURRING
                ? this.props.permissions.toSchedule
                : this.props.permissions.toExecute;
        setFieldValue('scheduleType', value);
        handleChange(e);
        onScheduleTypeChange(value !== data_1.RECURRING);
    }
    _onAcceleratorTypeChange(e) {
        const { handleChange, setFieldValue } = this.props;
        const value = e.target.value;
        if (!value) {
            setFieldValue('acceleratorCount', '', false);
        }
        else {
            if (value === data_1.A100_VALUE) {
                this.machineTypeOptions = data_1.A2_MASTER_TYPES;
                this.acceleratorCountOptions = [data_1.ACCELERATOR_COUNTS_1_2_4_8_16[0]];
            }
            else {
                this.machineTypeOptions = data_1.N1_MASTER_TYPES;
                this.acceleratorCountOptions = data_1.ACCELERATOR_COUNTS_1_2_4_8;
            }
            setFieldValue('masterType', this.machineTypeOptions[0].value, false);
            setFieldValue('acceleratorCount', this.acceleratorCountOptions[0].value, false);
        }
        handleChange(e);
    }
    _onAdvancedOptionsChange(formValues) {
        this.props.setFieldValue('gcsBucket', formValues.gcsBucket, false);
        this.props.setFieldValue('serviceAccount', formValues.serviceAccount, false);
        this.props.setFieldValue('network', formValues.network, false);
        this.props.setFieldValue('parameters', formValues.parameters, false);
    }
    _onEnvironmentChanged(images) {
        this.props.setFieldValue('imageUri', images.imageUri, false);
        this.props.setFieldValue('customContainerImageUri', images.customContainerImageUri || undefined, false);
        this.props.setFieldValue('kernelName', images.kernelName, false);
    }
} // end InnerSchedulerForm
exports.InnerExecutorForm = InnerExecutorForm;
function updateSettingsFromRequest(request, scheduleType, settings) {
    const promises = [];
    if (settings.get('location').composite !== request.location) {
        promises.push(settings.set('location', request.location));
    }
    if (settings.get('gcsBucket').composite !== request.gcsBucket) {
        promises.push(settings.set('gcsBucket', request.gcsBucket));
    }
    if (settings.get('masterType').composite !== request.masterType) {
        promises.push(settings.set('masterType', request.masterType));
    }
    if (settings.get('acceleratorType').composite !== request.acceleratorType) {
        promises.push(settings.set('acceleratorType', request.acceleratorType));
    }
    if (settings.get('acceleratorCount').composite !== request.acceleratorCount) {
        promises.push(settings.set('acceleratorCount', request.acceleratorCount));
    }
    if (settings.get('scheduleType').composite !== scheduleType) {
        promises.push(settings.set('scheduleType', scheduleType));
    }
    if (settings.get('environmentImage').composite !== request.imageUri) {
        promises.push(settings.set('environmentImage', request.imageUri));
    }
    if (settings.get('serviceAccount').composite !== request.serviceAccount) {
        promises.push(settings.set('serviceAccount', request.serviceAccount || ''));
    }
    if (settings.get('network').composite !== request.network) {
        promises.push(settings.set('network', request.network || ''));
    }
    Promise.all(promises).catch(err => {
        utils_1.appLog.warn(`Unable to save ${promises.length} settings`, err);
    });
}
/** Handles the form Submission to Vertex. */
function submit(values, formikBag) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, imageUri, customContainerImageUri, masterType, scaleTier, scheduleType, location, schedule, acceleratorType, acceleratorCount, serviceAccount, network, parameters, kernelName, } = values;
        const { notebook, notebookName, settings, onShowFormChange } = formikBag.props;
        const { setStatus, setSubmitting } = formikBag;
        const gcsBucket = values.gcsBucket.includes('gs://')
            ? values.gcsBucket
            : 'gs://' + values.gcsBucket;
        const gcsFolder = `${gcsBucket}/executor_files/${name}`;
        const inputNotebookGcsPath = `${gcsFolder}/${notebookName}`;
        const outputNotebookFolder = gcsFolder;
        const request = {
            name,
            imageUri: imageUri === String(environment_data_1.CUSTOM_CONTAINER.value)
                ? customContainerImageUri || ''
                : imageUri,
            inputNotebookGcsPath,
            masterType: masterType || '',
            outputNotebookFolder,
            scaleTier,
            gcsBucket,
            location,
            acceleratorType: acceleratorType || '',
            acceleratorCount: acceleratorCount || '',
            kernelSpec: kernelName,
        };
        if (serviceAccount) {
            request.serviceAccount = serviceAccount;
        }
        if (network) {
            request.network = network;
        }
        if (parameters) {
            request.parameters = parameters;
        }
        const status = {
            asError: false,
            message: `Uploading ${notebookName} to ${request.inputNotebookGcsPath}`,
        };
        setStatus(status);
        try {
            yield service_provider_1.ServiceProvider.executorService.uploadNotebook(notebook.toString(), request.inputNotebookGcsPath);
        }
        catch (err) {
            status.asError = true;
            status.message = `${err}: Unable to upload ${notebookName} to ${request.inputNotebookGcsPath}`;
            setStatus(status);
            setSubmitting(false);
            return;
        }
        try {
            if (scheduleType === data_1.RECURRING && schedule) {
                status.message = 'Submitting schedule';
                setStatus(status);
                const response = yield service_provider_1.ServiceProvider.executorService.scheduleNotebook(request, schedule);
                if (!response.error) {
                    status.lastSubmitted = { request, schedule };
                }
                else {
                    status.asError = true;
                    status.message = `${response.error}: Unable to submit schedule`;
                }
            }
            else {
                status.message = 'Submitting execution';
                setStatus(status);
                const response = yield service_provider_1.ServiceProvider.executorService.executeNotebook(request);
                if (!response.error) {
                    status.lastSubmitted = { request };
                }
                else {
                    status.asError = true;
                    status.message = `${response.error}: Unable to submit execution`;
                }
            }
            updateSettingsFromRequest(request, scheduleType, settings);
        }
        catch (err) {
            status.asError = true;
            status.message = `${err}: Unable to submit ${scheduleType === data_1.RECURRING && schedule ? 'schedule' : 'execution'}`;
        }
        setStatus(status);
        onShowFormChange(status);
        setSubmitting(false);
    });
}
function mapPropsToValues(props) {
    return {
        name: getName(props.notebookName),
        imageUri: props.gcpSettings.environmentImage || '',
        location: service_provider_1.ServiceProvider.executorService.locationId || data_1.DEFAULT_LOCATION,
        scaleTier: data_1.CUSTOM,
        masterType: String(data_1.N1_MASTER_TYPES[0].value),
        acceleratorType: '',
        acceleratorCount: '',
        scheduleType: props.gcpSettings.scheduleType === data_1.RECURRING ? data_1.RECURRING : data_1.SINGLE,
        schedule: '',
        gcsBucket: props.gcpSettings.gcsBucket || '',
        serviceAccount: props.gcpSettings.serviceAccount || '',
        network: props.gcpSettings.network || '',
    };
}
function validate(values) {
    const { name, scheduleType, schedule, gcsBucket, imageUri, customContainerImageUri, parameters, } = values;
    const error = {};
    let nameString = 'Execution';
    if (scheduleType === data_1.RECURRING) {
        nameString = 'Schedule';
    }
    if (!name) {
        error.name = `${nameString} name is required`;
    }
    else if (!name.match(/^[a-z0-9_]*$/g)) {
        error.name = `${nameString} name can only contain lowercase letters, numbers, or underscores.`;
    }
    if (scheduleType === data_1.RECURRING && !schedule) {
        error.schedule = 'Frequency is required';
    }
    if (!gcsBucket) {
        error.gcsBucket = 'A cloud storage bucket is required to store results';
    }
    if (imageUri === String(environment_data_1.CUSTOM_CONTAINER.value)) {
        if (!customContainerImageUri) {
            error.customContainerImageUri =
                'A docker container image must be provided for a custom container';
        }
    }
    if (parameters && !parameters.match(PARAMETERS_REGEX)) {
        error.parameters =
            'Parameters must follow format: parameter1=value1,parameter2=value2';
    }
    return error;
}
/** Form Component to submit Scheduled Notebooks */
exports.ExecutorForm = formik_1.withFormik({
    mapPropsToValues,
    handleSubmit: submit,
    validate,
})(InnerExecutorForm);
