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
exports.SharedStorageManager = void 0;
const mount_form_1 = require("./components/mount_form");
const mount_status_1 = require("./components/mount_status");
const shared_indicator_1 = require("./components/shared_indicator");
const apputils_1 = require("@jupyterlab/apputils");
/** Class to managed all Shared Storage operations and UX. */
class SharedStorageManager {
    constructor(sharedStorageService, fileBrowserFactory, statusBar) {
        this.sharedStorageService = sharedStorageService;
        this.fileBrowserFactory = fileBrowserFactory;
        this.statusBar = statusBar;
        this.browser = this.fileBrowserFactory.defaultBrowser;
    }
    /** Action to handle the mounting of a bucket. */
    onMountBucket() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield apputils_1.showDialog({
                title: 'Mount a bucket',
                body: new mount_form_1.MountForm(),
                buttons: [
                    apputils_1.Dialog.cancelButton({ label: 'Cancel' }),
                    apputils_1.Dialog.okButton({ label: 'Mount' }),
                ],
            });
            if (!result.button.accept)
                return;
            let statusItem;
            try {
                const bucketName = result.value;
                if (!bucketName) {
                    throw new Error('bucketName is undefined');
                }
                statusItem = this.showOperationStatus(bucketName);
                yield this.sharedStorageService.mount(bucketName, bucketName);
                this.browser.model.refresh();
            }
            catch (err) {
                apputils_1.showErrorMessage('Failed to mount bucket', String(err));
            }
            if (statusItem) {
                statusItem.dispose();
            }
        });
    }
    /** Action to handle the unmounting of a bucket. */
    onUnmountBucket() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const item = (_a = this.fileBrowserFactory.tracker.currentWidget) === null || _a === void 0 ? void 0 : _a.selectedItems().next();
            if (!item)
                return;
            const result = yield apputils_1.showDialog({
                title: 'Confirm unmount of shared folder',
                body: `Are you sure you want to unmount ${item.path}?`,
            });
            if (!result.button.accept)
                return;
            const statusItem = this.showOperationStatus(item.path, false);
            try {
                yield this.sharedStorageService.unmount(item.path);
                this.browser.model.refresh();
            }
            catch (err) {
                apputils_1.showErrorMessage('Failed to unmount folder from bucket', String(err));
            }
            statusItem.dispose();
        });
    }
    /** Creates a new ToolbarButton for mounting buckets */
    createMountButton() {
        const mount = new apputils_1.ToolbarButton({
            iconClass: 'jp-GCSFilebrowserIcon',
            onClick: () => {
                this.onMountBucket();
            },
            tooltip: 'Mount Shared Storage',
        });
        this.browser.toolbar.addItem('mount', mount);
        this.connectFileBrowserModelSlots(() => {
            if (this.sharedStorageService.isShared(this.browser.model.path)) {
                mount.hide();
            }
            else {
                mount.show();
            }
        });
    }
    connectSharedFolderIndicator() {
        const sharedIndicator = new shared_indicator_1.SharedIndicator();
        this.connectFileBrowserModelSlots(() => {
            if (this.sharedStorageService.isShared(this.browser.model.path)) {
                sharedIndicator.show();
            }
            else {
                sharedIndicator.hide();
            }
        });
        this.browser.toolbar.addItem('sharedIndicator', sharedIndicator);
        // Hide the indicator immediately after it is added to the toolbar so that
        // it doesn't appear while the file system is loading.
        sharedIndicator.hide();
    }
    showOperationStatus(bucketName, isMount = true) {
        return this.statusBar.registerStatusItem('jp-Beatrix-SharedStorage-MountStatus', {
            item: new mount_status_1.MountStatus(bucketName, isMount),
            align: 'left',
        });
    }
    connectFileBrowserModelSlots(slotFn) {
        this.browser.model.refreshed.connect(slotFn);
        this.browser.model.fileChanged.connect(slotFn);
        this.browser.model.pathChanged.connect(slotFn);
    }
}
exports.SharedStorageManager = SharedStorageManager;
