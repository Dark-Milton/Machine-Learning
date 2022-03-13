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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishedPlugin = exports.PUBLISHED_NOTEBOOK_PLUGIN_ID = void 0;
const docmanager_1 = require("@jupyterlab/docmanager");
const filebrowser_1 = require("@jupyterlab/filebrowser");
const plugin_1 = require("../service/plugin");
const service_provider_1 = require("../service/service_provider");
const utils_1 = require("../utils");
const button_extension_1 = require("./button_extension");
const publish_dialog_1 = require("./components/publish_dialog");
const published_notebooks_widget_1 = require("./components/published_notebooks_widget");
const published_service_1 = require("./service/published_service");
const application_1 = require("@jupyterlab/application");
/** Published plugin id */
exports.PUBLISHED_NOTEBOOK_PLUGIN_ID = `${utils_1.PLUGIN_PREFIX}:published_plugin`;
const COMMAND_ID = `${utils_1.PLUGIN_PREFIX}_published:publish`;
/** Registers publish command */
function addCommand(app, factory, publishDialogWidget) {
    const { commands } = app;
    const { tracker } = factory;
    // Adds commands to the registry.
    commands.addCommand(COMMAND_ID, {
        execute: () => {
            var _a;
            const item = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.selectedItems().next();
            if (item) {
                publishDialogWidget.open(item);
            }
        },
        iconClass: 'jp-PublishIcon',
        isVisible: () => {
            var _a;
            const item = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.selectedItems().next();
            return !!(item === null || item === void 0 ? void 0 : item.name.endsWith('.ipynb'));
        },
        label: 'Share Notebook',
        mnemonic: 0,
    });
    // Adds commands to the context menu.
    app.contextMenu.addItem({
        command: COMMAND_ID,
        selector: '.jp-DirListing-item[data-isdir="false"]',
    });
}
/**
 * Beatrix Published plugin.
 */
exports.PublishedPlugin = {
    id: exports.PUBLISHED_NOTEBOOK_PLUGIN_ID,
    requires: [
        filebrowser_1.IFileBrowserFactory,
        docmanager_1.IDocumentManager,
        application_1.ILayoutRestorer,
        plugin_1.IServiceProvider,
    ],
    activate: (app, factory, docManager, layoutRestorer) => __awaiter(void 0, void 0, void 0, function* () {
        service_provider_1.ServiceProvider.publishedService = new published_service_1.PublishedService(service_provider_1.ServiceProvider.gcsService);
        const publishDialogWidget = new publish_dialog_1.PublishDialogWidget(docManager);
        publishDialogWidget.id = 'jp-Beatrix-Published-PublishDialogWidget';
        app.shell.add(publishDialogWidget, 'top');
        const publishedNotebooksWidget = new published_notebooks_widget_1.PublishedNotebooksWidget();
        publishedNotebooksWidget.id =
            'jp-Beatrix-Published-PublishedNotebooksWidget';
        app.shell.add(publishedNotebooksWidget, 'left');
        layoutRestorer.add(publishedNotebooksWidget, publishedNotebooksWidget.id);
        addCommand(app, factory, publishDialogWidget);
        app.docRegistry.addWidgetExtension('Notebook', new button_extension_1.PublishButtonExtension(publishDialogWidget));
    }),
    autoStart: true,
};
