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
exports.PublishedListItem = void 0;
const core_1 = require("@material-ui/core");
const react_1 = __importStar(require("react"));
const dialog_1 = require("../../components/shared/dialog");
const list_item_1 = require("../../components/shared/list_item");
const message_1 = require("../../components/shared/message");
const text_input_1 = require("../../components/shared/text_input");
const environment_data_1 = require("../../environment_data");
const cron_1 = require("../../executor/cron");
const service_provider_1 = require("../../service/service_provider");
const published_list_items_styles_1 = require("../styles/published_list_items_styles");
const types_1 = require("../types");
const published_service_1 = require("../service/published_service");
/** List item for a published Notebook */
function PublishedListItem({ publishedNotebook, handleDoDelete, }) {
    const [expandDescription, setExpandDescription] = react_1.useState(false);
    const [directory, setDirectory] = react_1.useState(published_service_1.SHARED_DIRECTORY);
    const [notebookNameInput, setNotebookNameInput] = react_1.useState(publishedNotebook.name);
    const [fullImportPath, setFullImportPath] = react_1.useState(`${directory}${notebookNameInput}`);
    const [isOpenImport, setIsOpenImport] = react_1.useState(false);
    const [waitSubmitImport, setWaitSubmitImport] = react_1.useState(false);
    const [isLoading, setIsLoading] = react_1.useState(false);
    const [shouldCreateExecution, setShouldCreateExecution] = react_1.useState(false);
    const shouldRefreshExecution = react_1.useRef(false);
    const compatibleEnvImg = () => {
        for (const framework of environment_data_1.ENVIRONMENT_IMAGES) {
            if (framework.value === publishedNotebook.environmentImage) {
                return framework.text;
            }
        }
        return publishedNotebook.environmentImage;
    };
    const handleImportNotebook = () => __awaiter(this, void 0, void 0, function* () {
        setWaitSubmitImport(true);
        setIsLoading(true);
        const formattedName = published_service_1.getNameWithExtension(notebookNameInput);
        yield service_provider_1.ServiceProvider.publishedService.importPublishedNotebook(publishedNotebook.name, directory, formattedName);
        setIsLoading(false);
        handleCloseImportDialog();
    });
    const handleDeleteNotebook = () => __awaiter(this, void 0, void 0, function* () {
        const isDeleted = yield service_provider_1.ServiceProvider.publishedService.deletePublishedNotebook(publishedNotebook.name);
        if (isDeleted) {
            handleDoDelete();
        }
    });
    const handleCloseImportDialog = () => {
        setIsOpenImport(false);
    };
    const handleOpenImportDialog = () => {
        setIsOpenImport(true);
        setWaitSubmitImport(false);
    };
    const updateImportArgs = (event) => {
        const inputString = event.target.value;
        const i = inputString.lastIndexOf('/');
        const dirSegment = inputString.substring(0, i + 1);
        const nameSegment = inputString.substring(i + 1);
        setDirectory(dirSegment);
        setNotebookNameInput(nameSegment);
        setFullImportPath(inputString);
    };
    react_1.useEffect(() => {
        if (shouldRefreshExecution) {
            setShouldCreateExecution(true);
            shouldRefreshExecution.current = false;
        }
    }, [shouldRefreshExecution, shouldCreateExecution]);
    react_1.useEffect(() => {
        setShouldCreateExecution(false);
    }, []);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(list_item_1.ListItem, { title: publishedNotebook.name, titleAction: handleOpenImportDialog, captions: [
                cron_1.customShortDateFormat(new Date(publishedNotebook.updated || publishedNotebook.timeCreated)),
                compatibleEnvImg() !== types_1.UNKNOWN_ENV_IMG
                    ? `Compatible with ${compatibleEnvImg()}`
                    : '',
            ], learnMoreLink: {
                href: publishedNotebook.viewerLink,
                text: 'View notebook',
            }, subMenuItems: closeHandler => [
                react_1.default.createElement(core_1.MenuItem, { key: "import", dense: true, onClick: () => {
                        handleOpenImportDialog();
                        closeHandler();
                    } }, "Import notebook"),
                react_1.default.createElement(core_1.MenuItem, { key: "delete", dense: true, onClick: () => {
                        handleDeleteNotebook();
                        closeHandler();
                    } }, "Delete"),
            ] }, publishedNotebook.description && (react_1.default.createElement("div", { className: expandDescription
                ? published_list_items_styles_1.styleSheet.descriptionLong
                : published_list_items_styles_1.styleSheet.descriptionShort },
            react_1.default.createElement("span", { onClick: () => setExpandDescription(!expandDescription) }, publishedNotebook.description)))),
        react_1.default.createElement(dialog_1.DialogComponent, { header: "Import Notebook file", open: isOpenImport, cancelLabel: "Close", onCancel: handleCloseImportDialog, submitLabel: "Import", onSubmit: handleImportNotebook, submitDisabled: waitSubmitImport, children: react_1.default.createElement("div", null,
                react_1.default.createElement("p", null, "Please enter where you would like this file to be imported."),
                react_1.default.createElement(text_input_1.TextInput, { value: fullImportPath, onChange: updateImportArgs, formHelperText: `WARNING: importing files of the same name will override the\n
                existing local file.` }),
                isLoading && (react_1.default.createElement(message_1.Message, { asActivity: true, text: 'Importing notebook' }))) })));
}
exports.PublishedListItem = PublishedListItem;
