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
exports.GCSHandlerService = void 0;
const coreutils_1 = require("@jupyterlab/coreutils");
const services_1 = require("@jupyterlab/services");
const buffer_1 = require("buffer");
const utils_1 = require("../utils");
const AIPN_PREFIX = 'aipn/v2/';
/**
 * Performs GCS operations through the backend client
 */
class GCSHandlerService {
    constructor() {
        /**
         * The server settings of the manager.
         */
        this.serverSettings = services_1.ServerConnection.makeSettings();
    }
    getPathContents(localPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestUrl = coreutils_1.URLExt.join(this.serverSettings.baseUrl, AIPN_PREFIX, 'files', localPath);
            const response = yield services_1.ServerConnection.makeRequest(requestUrl, {}, this.serverSettings);
            const content = yield response.json();
            if (content.error) {
                utils_1.appLog.error(content.error);
                throw content.error;
            }
            if (content.type === 'directory') {
                const directory_contents = content.content.map((c) => {
                    return {
                        name: c.name,
                        path: c.path,
                        format: 'json',
                        type: c.type,
                        created: '',
                        writable: true,
                        last_modified: c.last_modified,
                        mimetype: c.mimetype,
                        content: c.content,
                    };
                });
                const directory = {
                    type: 'directory',
                    path: localPath.trim(),
                    name: localPath.trim(),
                    format: 'json',
                    content: directory_contents,
                    created: '',
                    writable: true,
                    last_modified: content.last_modified,
                    mimetype: '',
                };
                return directory;
            }
            else if (content.type === 'file') {
                const decoded_content = buffer_1.Buffer.from(content.content.content.replace(/\n/g, ''), 'base64').toString('utf8');
                return {
                    type: 'file',
                    path: content.content.path,
                    name: content.content.name,
                    format: 'text',
                    content: decoded_content,
                    created: '',
                    writable: true,
                    last_modified: content.content.last_modified,
                    mimetype: content.content.mimetype,
                };
            }
            else {
                // content.type === "notebook"
                return {
                    type: 'notebook',
                    path: content.content.path,
                    name: content.content.name,
                    format: 'json',
                    content: content.content.content,
                    created: '',
                    writable: true,
                    last_modified: '',
                    mimetype: content.content.mimetype,
                };
            }
        });
    }
    newUntitled(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options || options.path === '/' || options.path === '') {
                throw ('Cannot create new files in the root directory. ' +
                    'Only GCS buckets can be created here.');
            }
            const requestUrl = coreutils_1.URLExt.join(this.serverSettings.baseUrl, AIPN_PREFIX, 'new');
            const body = options;
            const requestInit = {
                body: JSON.stringify(body),
                method: 'POST',
            };
            const response = yield services_1.ServerConnection.makeRequest(requestUrl, requestInit, this.serverSettings);
            const content = yield response.json();
            if (content.error) {
                utils_1.appLog.error(content.error);
                throw content.error;
            }
            if (content.type === 'directory') {
                const directory_contents = content.content.map((c) => {
                    return {
                        name: c.name,
                        path: c.path,
                        format: 'json',
                        type: c.type,
                        created: '',
                        writable: true,
                        last_modified: '',
                        mimetype: c.mimetype,
                        content: c.content,
                    };
                });
                const directory = {
                    type: 'directory',
                    path: content.path,
                    name: content.name,
                    format: 'json',
                    content: directory_contents,
                    created: '',
                    writable: true,
                    last_modified: '',
                    mimetype: '',
                };
                return directory;
            }
            else if (content.type === 'file') {
                const decoded_content = buffer_1.Buffer.from(content.content.content.replace(/\n/g, ''), 'base64').toString('utf8');
                return {
                    type: 'file',
                    path: content.content.path,
                    name: content.content.name,
                    format: 'text',
                    content: decoded_content,
                    created: '',
                    writable: true,
                    last_modified: '',
                    mimetype: content.content.mimetype,
                };
            }
            else {
                // content.type === "notebook"
                return {
                    type: 'notebook',
                    path: content.content.path,
                    name: content.content.name,
                    format: 'json',
                    content: content.content.content,
                    created: '',
                    writable: true,
                    last_modified: '',
                    mimetype: content.content.mimetype,
                };
            }
        });
    }
    delete(localPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestUrl = coreutils_1.URLExt.join(this.serverSettings.baseUrl, AIPN_PREFIX, 'delete', localPath);
            const requestInit = {
                method: 'DELETE',
            };
            const response = yield services_1.ServerConnection.makeRequest(requestUrl, requestInit, this.serverSettings);
            const content = yield response.json();
            if (content.error) {
                utils_1.appLog.error(content.error);
                throw content.error;
            }
        });
    }
    rename(oldLocalPath, newLocalPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestUrl = coreutils_1.URLExt.join(this.serverSettings.baseUrl, AIPN_PREFIX, 'move');
            const body = {
                oldLocalPath: oldLocalPath,
                newLocalPath: newLocalPath,
            };
            const requestInit = {
                body: JSON.stringify(body),
                method: 'POST',
            };
            const response = yield services_1.ServerConnection.makeRequest(requestUrl, requestInit, this.serverSettings);
            const content = yield response.json();
            if (content.error) {
                utils_1.appLog.error(content.error);
                throw content.error;
            }
            let data;
            if (content.type === 'directory') {
                const directory_contents = content.content.map((c) => {
                    return {
                        name: c.name,
                        path: c.path,
                        format: 'json',
                        type: c.type,
                        created: '',
                        writable: true,
                        last_modified: '',
                        mimetype: c.mimetype,
                        content: c.content,
                    };
                });
                data = {
                    type: 'directory',
                    path: content.path,
                    name: content.name,
                    format: 'json',
                    content: directory_contents,
                    created: '',
                    writable: true,
                    last_modified: '',
                    mimetype: '',
                };
            }
            else if (content.type === 'file') {
                const decoded_content = buffer_1.Buffer.from(content.content.content.replace(/\n/g, ''), 'base64').toString('utf8');
                data = {
                    type: 'file',
                    path: content.content.path,
                    name: content.content.name,
                    format: 'text',
                    content: decoded_content,
                    created: '',
                    writable: true,
                    last_modified: '',
                    mimetype: content.content.mimetype,
                };
            }
            else {
                // content.type === "notebook"
                data = {
                    type: 'notebook',
                    path: content.content.path,
                    name: content.content.name,
                    format: 'json',
                    content: content.content.content,
                    created: '',
                    writable: true,
                    last_modified: '',
                    mimetype: content.content.mimetype,
                };
            }
            return data;
        });
    }
    save(localPath, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestUrl = coreutils_1.URLExt.join(this.serverSettings.baseUrl, AIPN_PREFIX, 'upload', localPath);
            const requestInit = {
                body: JSON.stringify(options),
                method: 'POST',
            };
            const response = yield services_1.ServerConnection.makeRequest(requestUrl, requestInit, this.serverSettings);
            const content = yield response.json();
            if (content.error) {
                utils_1.appLog.error(content.error);
                throw content.error;
            }
            const data = {
                type: options.type || 'file',
                path: options.path || '',
                name: '',
                format: options.format || 'text',
                content: options.content,
                created: options.created || '',
                writable: true,
                last_modified: options.last_modified || '',
                mimetype: options.mimetype || '',
            };
            return data;
        });
    }
    copy(localPath, toLocalDir) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestUrl = coreutils_1.URLExt.join(this.serverSettings.baseUrl, AIPN_PREFIX, 'copy');
            const body = {
                localPath: localPath,
                toLocalDir: toLocalDir,
            };
            const requestInit = {
                body: JSON.stringify(body),
                method: 'POST',
            };
            const response = yield services_1.ServerConnection.makeRequest(requestUrl, requestInit, this.serverSettings);
            const content = yield response.json();
            if (content.error) {
                utils_1.appLog.error(content.error);
                throw content.error;
            }
            return {
                type: 'file',
                path: content.path,
                name: content.path,
                format: 'text',
                content: null,
                created: '',
                writable: true,
                last_modified: '',
                mimetype: '',
            };
        });
    }
    createCheckpoint(localPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestUrl = coreutils_1.URLExt.join(this.serverSettings.baseUrl, AIPN_PREFIX, 'checkpoint');
            const body = {
                action: 'createCheckpoint',
                localPath: localPath,
            };
            const requestInit = {
                body: JSON.stringify(body),
                method: 'POST',
            };
            const response = yield services_1.ServerConnection.makeRequest(requestUrl, requestInit, this.serverSettings);
            const content = yield response.json();
            if (content.error) {
                utils_1.appLog.error(content.error);
                throw content.error;
            }
            return content.checkpoint;
        });
    }
    listCheckpoints(localPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestUrl = coreutils_1.URLExt.join(this.serverSettings.baseUrl, AIPN_PREFIX, 'checkpoint');
            const body = {
                action: 'listCheckpoints',
                localPath: localPath,
            };
            const requestInit = {
                body: JSON.stringify(body),
                method: 'POST',
            };
            const response = yield services_1.ServerConnection.makeRequest(requestUrl, requestInit, this.serverSettings);
            const content = yield response.json();
            if (content.error) {
                utils_1.appLog.error(content.error);
                throw content.error;
            }
            return content.checkpoints;
        });
    }
    restoreCheckpoint(localPath, checkpointID) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestUrl = coreutils_1.URLExt.join(this.serverSettings.baseUrl, AIPN_PREFIX, 'checkpoint');
            const body = {
                action: 'restoreCheckpoint',
                localPath: localPath,
                checkpointID: checkpointID,
            };
            const requestInit = {
                body: JSON.stringify(body),
                method: 'POST',
            };
            const response = yield services_1.ServerConnection.makeRequest(requestUrl, requestInit, this.serverSettings);
            const content = yield response.json();
            if (content.error) {
                utils_1.appLog.error(content.error);
                throw content.error;
            }
        });
    }
    deleteCheckpoint(localPath, checkpointID) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestUrl = coreutils_1.URLExt.join(this.serverSettings.baseUrl, AIPN_PREFIX, 'checkpoint');
            const body = {
                action: 'deleteCheckpoint',
                localPath: localPath,
                checkpointID: checkpointID,
            };
            const requestInit = {
                body: JSON.stringify(body),
                method: 'POST',
            };
            const response = yield services_1.ServerConnection.makeRequest(requestUrl, requestInit, this.serverSettings);
            const content = yield response.json();
            if (content.error) {
                utils_1.appLog.error(content.error);
                throw content.error;
            }
        });
    }
}
exports.GCSHandlerService = GCSHandlerService;
