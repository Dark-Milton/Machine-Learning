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
exports.PublishDialogWidget = exports.PublishedDialogComponent = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const signaling_1 = require("@lumino/signaling");
const core_1 = require("@material-ui/core");
const lab_1 = require("@material-ui/lab");
const react_1 = __importStar(require("react"));
const dialog_1 = require("../../components/shared/dialog");
const message_1 = require("../../components/shared/message");
const text_input_1 = require("../../components/shared/text_input");
const service_provider_1 = require("../../service/service_provider");
const utils_1 = require("../../utils");
const published_service_1 = require("../service/published_service");
const MAX_DESCRIPTION_LENGTH = 1000;
/** Component for a dialog to publish a notebook to GCS */
function PublishedDialogComponent({ docManager, onClose, notebookFile, environmentImage, }) {
    const [notebookName, setNotebookName] = react_1.useState(notebookFile.name);
    const [description, setDescription] = react_1.useState('');
    const [currentPublishedName, setCurrentPublishedName] = react_1.useState('');
    const [currentEnvironment, setCurrentEnvironment] = react_1.useState('');
    const [isLoading, setIsLoading] = react_1.useState(false);
    const [isRepublish, setIsRepublish] = react_1.useState(false);
    const [waitSubmit, setWaitSubmit] = react_1.useState(true);
    const [waitDescription, setWaitDescription] = react_1.useState(true);
    const [submittedStatus, setSubmittedStatus] = react_1.useState({
        isSubmitted: false,
        message: '',
    });
    /**
     * Publishes the selected notebook file from the filebrowser into the
     * appropriate gcs bucket.
     */
    const onSubmitDialog = (description) => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        try {
            // Opens selected file in order to access its contents for uploading.
            const docWidget = docManager.openOrReveal(notebookFile.path);
            if (!docWidget) {
                throw new Error('docWidget is undefined');
            }
            yield docWidget.revealed;
            const notebookContent = docWidget.context.model.toString();
            const defaultKernelName = docWidget.context.model.defaultKernelName;
            // As provided by the user.
            const newNotebookName = published_service_1.getNameWithExtension(notebookName || '');
            // Uploads selected file to the bucket.
            yield service_provider_1.ServiceProvider.publishedService.insertNotebook(newNotebookName, notebookContent);
            // Patches the published Notebook object with the description provided
            // by the user, and default kernel name. Stored in GCS Object metadata.
            yield service_provider_1.ServiceProvider.publishedService.setMetadata(newNotebookName, {
                description: description,
                defaultKernelName: defaultKernelName,
                environmentImage: currentEnvironment,
            });
            setSubmittedStatus({
                isSubmitted: true,
                message: 'Notebook successfully published!',
            });
        }
        catch (err) {
            setSubmittedStatus({
                isSubmitted: true,
                message: 'Something went wrong! Failed to publish notebook.',
            });
        }
        setIsLoading(false);
        onClose();
    });
    const onNameFormChange = (event) => {
        setNotebookName(event.target.value);
    };
    const onDescriptionFormChange = (event) => {
        setDescription(event.target.value);
    };
    const handleSnackbarClose = () => {
        setSubmittedStatus({
            isSubmitted: false,
            message: '',
        });
    };
    const getCurrentPublishedName = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const gcsObjectResponse = yield service_provider_1.ServiceProvider.publishedService.getGcsPublishedObject((notebookFile === null || notebookFile === void 0 ? void 0 : notebookFile.name) || '');
            setCurrentPublishedName(gcsObjectResponse.name);
        }
        catch (_a) {
            setCurrentPublishedName('');
        }
    });
    const fetchPreviousDescription = () => __awaiter(this, void 0, void 0, function* () {
        if (!notebookFile)
            return;
        const metadataResponse = yield service_provider_1.ServiceProvider.publishedService.fetchPublishedNotebookMetadata(notebookFile, environmentImage);
        setDescription(metadataResponse.description);
        setCurrentEnvironment(metadataResponse.environmentImage);
        setWaitSubmit(false);
        setWaitDescription(false);
    });
    // Updates visibility of override warning message.
    react_1.useEffect(() => {
        const newNotebookName = published_service_1.getNameWithExtension(notebookName || '');
        const republish = currentPublishedName === newNotebookName && !isLoading ? true : false;
        setIsRepublish(republish);
    }, [notebookName, currentPublishedName]);
    // Upon initial render, fire off async functions which will update state
    react_1.useEffect(() => {
        setWaitDescription(true);
        setDescription('');
        getCurrentPublishedName();
        fetchPreviousDescription();
    }, []);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(dialog_1.DialogComponent, { header: "Share Notebook File", open: true, cancelLabel: "Close", onCancel: onClose, submitLabel: "Share", onSubmit: () => {
                onSubmitDialog(description);
            }, submitDisabled: waitSubmit, children: react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'column' } },
                react_1.default.createElement("p", null, "Share this notebook for project members to view and download. You can include a description for the notebook."),
                react_1.default.createElement(text_input_1.TextInput, { label: "Notebook name", value: notebookName, onChange: onNameFormChange }),
                react_1.default.createElement(text_input_1.TextInput, { label: "Description", formHelperText: "Max 1000 chars", value: description, maxLength: MAX_DESCRIPTION_LENGTH, multiline: true, onChange: onDescriptionFormChange, disabled: waitDescription }),
                isLoading && (react_1.default.createElement(message_1.Message, { asActivity: isLoading, text: 'Sharing notebook...' })),
                isRepublish && (react_1.default.createElement(lab_1.Alert, { severity: "warning" }, "File name already exists as a shared notebook. Clicking \"Share\" will override existing version."))) }),
        react_1.default.createElement(core_1.Snackbar, { open: submittedStatus.isSubmitted, message: submittedStatus.message, autoHideDuration: 3000, onClose: handleSnackbarClose })));
}
exports.PublishedDialogComponent = PublishedDialogComponent;
/**
 * Creates the dialog popup component for publishing notebook files(.ipynb).
 */
class PublishDialogWidget extends apputils_1.ReactWidget {
    constructor(_docManager) {
        super();
        this._docManager = _docManager;
        this._isOpenSignal = new signaling_1.Signal(this);
    }
    /**
     * Opens the sharing dialog. If the default GCS bucket does not exist
     * and cannot be created, an error message is shown.
     */
    open(notebookFile) {
        return __awaiter(this, void 0, void 0, function* () {
            this._notebookFile = notebookFile;
            try {
                yield service_provider_1.ServiceProvider.gcsService.getOrCreateDefaultBucket();
                this._isOpenSignal.emit(true);
            }
            catch (err) {
                utils_1.appLog.error('Unable to provision GCS Bucket for Sharing', err);
                apputils_1.showErrorMessage('Unable to provision GCS Bucket for Sharing', err);
            }
        });
    }
    render() {
        return (react_1.default.createElement(apputils_1.UseSignal, { signal: this._isOpenSignal }, (_, isOpen) => isOpen && this._notebookFile ? (react_1.default.createElement(PublishedDialogComponent, { docManager: this._docManager, onClose: () => void this._isOpenSignal.emit(false), notebookFile: this._notebookFile, environmentImage: "" // TODO(b/199282130) fix
         })) : null));
    }
}
exports.PublishDialogWidget = PublishDialogWidget;
