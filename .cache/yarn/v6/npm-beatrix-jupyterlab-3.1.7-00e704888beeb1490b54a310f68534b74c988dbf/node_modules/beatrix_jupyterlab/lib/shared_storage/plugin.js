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
exports.SharedStoragePlugin = exports.SHARED_STORAGE_PLUGIN_ID = void 0;
const filebrowser_1 = require("@jupyterlab/filebrowser");
const statusbar_1 = require("@jupyterlab/statusbar");
const ui_components_1 = require("@jupyterlab/ui-components");
const eject_svg_1 = __importDefault(require("../../style/images/eject.svg"));
const notebook_provider_1 = require("../service/notebook_provider");
const utils_1 = require("../utils");
const shared_storage_manager_1 = require("./shared_storage_manager");
const shared_storage_service_1 = require("./shared_storage_service");
exports.SHARED_STORAGE_PLUGIN_ID = `${utils_1.PLUGIN_PREFIX}:shared_storage_manager_plugin`;
const UNMOUNT_COMMAND_ID = `${utils_1.PLUGIN_PREFIX}_shared_storage:unmount`;
/**
 * Plugin to manage shared storage mount points.
 */
exports.SharedStoragePlugin = {
    id: exports.SHARED_STORAGE_PLUGIN_ID,
    requires: [filebrowser_1.IFileBrowserFactory, statusbar_1.IStatusBar, notebook_provider_1.NotebookProviderToken],
    activate: (app, fileBrowserFactory, statusBar) => __awaiter(void 0, void 0, void 0, function* () {
        const sharedStorageService = new shared_storage_service_1.SharedStorageService();
        const sharedStorageManager = new shared_storage_manager_1.SharedStorageManager(sharedStorageService, fileBrowserFactory, statusBar);
        yield sharedStorageService.initialize();
        // Mount button
        sharedStorageManager.createMountButton();
        // Indicator when browsing a mounted folder
        sharedStorageManager.connectSharedFolderIndicator();
        // Unmount behaviors
        const { commands } = app;
        const { tracker } = fileBrowserFactory;
        commands.addCommand(UNMOUNT_COMMAND_ID, {
            execute: () => {
                sharedStorageManager.onUnmountBucket();
            },
            isVisible: () => {
                var _a;
                const item = (_a = tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.selectedItems().next();
                return !!(item &&
                    sharedStorageManager.sharedStorageService.isMountedBucket(item.path));
            },
            icon: ui_components_1.LabIcon.resolve({
                icon: { name: `${utils_1.PLUGIN_PREFIX}:unmount`, svgstr: eject_svg_1.default },
            }),
            label: 'Unmount',
        });
        app.contextMenu.addItem({
            command: UNMOUNT_COMMAND_ID,
            selector: '.jp-DirListing-item[data-file-type="directory"]',
        });
    }),
    autoStart: true,
};
