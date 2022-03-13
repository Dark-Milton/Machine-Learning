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
exports.GCSDrive = void 0;
const signaling_1 = require("@lumino/signaling");
const services_1 = require("@jupyterlab/services");
const DRIVE_NAME_GCS = 'GCS';
const GCS_LINK_PREFIX = 'https://storage.cloud.google.com/';
/**
 * A Contents.IDrive implementation that Google Cloud Storage.
 */
class GCSDrive {
    /**
     * Construct a new drive object.
     */
    constructor(gcsHandlerService) {
        this.gcsHandlerService = gcsHandlerService;
        this.activitySignal = new signaling_1.Signal(this);
        this._isDisposed = false;
        this._fileChanged = new signaling_1.Signal(this);
        /**
         * The server settings of the manager.
         */
        this.serverSettings = services_1.ServerConnection.makeSettings();
    }
    /**
     * The name of the drive.
     */
    get name() {
        return DRIVE_NAME_GCS;
    }
    /**
     * A signal emitted when a file operation takes place.
     */
    //fileChanged: ISignal<IDrive, IChangedArgs>;
    get fileChanged() {
        return this._fileChanged;
    }
    /**
     * Test whether the manager has been disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources held by the manager.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        signaling_1.Signal.clearData(this);
    }
    /**
     * Get a file or directory.
     *
     * @param localPath: The path to the file.
     *
     * @param options: The options used to fetch the file.
     *
     * @returns A promise which resolves with the file content.
     */
    get(localPath, options) {
        return this.showActivity(() => this.gcsHandlerService.getPathContents(localPath));
    }
    /**
     * Get an encoded download url given a file path.
     *
     * @param A promise which resolves with the absolute POSIX
     *   file path on the server.
     */
    getDownloadUrl(localPath) {
        return Promise.resolve(GCS_LINK_PREFIX + localPath);
    }
    /**
     * Create a new untitled file or directory in the specified directory path.
     *
     * @param options: The options used to create the file.
     *
     * @returns A promise which resolves with the created file content when the
     *    file is created.
     */
    newUntitled(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const newValue = yield this.showActivity(() => this.gcsHandlerService.newUntitled(options));
            this._fileChanged.emit({
                type: 'new',
                oldValue: null,
                newValue,
            });
            return newValue;
        });
    }
    /**
     * Delete a file.
     *
     * @param localPath - The path to the file.
     *
     * @returns A promise which resolves when the file is deleted.
     */
    delete(localPath) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.showActivity(() => this.gcsHandlerService.delete(localPath));
            this._fileChanged.emit({
                type: 'delete',
                oldValue: { path: localPath },
                newValue: null,
            });
        });
    }
    /**
     * Rename a file or directory.
     *
     * @param oldLocalPath - The original file path.
     *
     * @param newLocalPath - The new file path.
     *
     * @returns A promise which resolves with the new file content model when the
     *   file is renamed.
     */
    rename(oldLocalPath, newLocalPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.showActivity(() => this.gcsHandlerService.rename(oldLocalPath, newLocalPath));
            this._fileChanged.emit({
                type: 'rename',
                oldValue: { path: oldLocalPath },
                newValue: data,
            });
            return data;
        });
    }
    /**
     * Save a file.
     *
     * @param localPath - The desired file path.
     *
     * @param options - Optional overrides to the model.
     *
     * @returns A promise which resolves with the file content model when the
     *   file is saved.
     */
    save(localPath, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.showActivity(() => this.gcsHandlerService.save(localPath, options || {}));
            this._fileChanged.emit({
                type: 'save',
                newValue: null,
                oldValue: data,
            });
            return data;
        });
    }
    /**
     * Copy a file into a given directory.
     *
     * @param localPath - The original file path.
     *
     * @param toLocalDir - The destination directory path.
     *
     * @returns A promise which resolves with the new content model when the
     *  file is copied.
     */
    copy(localPath, toLocalDir) {
        return this.showActivity(() => this.gcsHandlerService.copy(localPath, toLocalDir));
    }
    /**
     * Create a checkpoint for a file.
     *
     * @param localPath - The path of the file.
     *
     * @returns A promise which resolves with the new checkpoint model when the
     *   checkpoint is created.
     */
    createCheckpoint(localPath) {
        return this.showActivity(() => this.gcsHandlerService.createCheckpoint(localPath));
    }
    /**
     * List available checkpoints for a file.
     *
     * @param localPath - The path of the file.
     *
     * @returns A promise which resolves with a list of checkpoint models for
     *    the file.
     */
    listCheckpoints(localPath) {
        return this.showActivity(() => this.gcsHandlerService.listCheckpoints(localPath));
    }
    /**
     * Restore a file to a known checkpoint state.
     *
     * @param localPath - The path of the file.
     *
     * @param checkpointID - The id of the checkpoint to restore.
     *
     * @returns A promise which resolves when the checkpoint is restored.
     */
    restoreCheckpoint(localPath, checkpointID) {
        return this.showActivity(() => this.gcsHandlerService.restoreCheckpoint(localPath, checkpointID));
    }
    /**
     * Delete a checkpoint for a file.
     *
     * @param localPath - The path of the file.
     *
     * @param checkpointID - The id of the checkpoint to delete.
     *
     * @returns A promise which resolves when the checkpoint is deleted.
     */
    deleteCheckpoint(localPath, checkpointID) {
        return this.showActivity(() => this.gcsHandlerService.deleteCheckpoint(localPath, checkpointID));
    }
    /** Shows the activity indicator around the initiation and completion of a Promise */
    showActivity(promise) {
        this.activitySignal.emit(true);
        return promise().finally(() => void this.activitySignal.emit(false));
    }
}
exports.GCSDrive = GCSDrive;
