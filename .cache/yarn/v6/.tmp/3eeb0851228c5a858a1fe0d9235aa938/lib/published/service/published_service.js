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
exports.PublishedService = exports.getNameWithExtension = exports.NOTEBOOK_EXTENSION = exports.SHARED_DIRECTORY = void 0;
const transport_1 = require("../../service/transport");
const types_1 = require("../types");
exports.SHARED_DIRECTORY = 'shared/';
exports.NOTEBOOK_EXTENSION = '.ipynb';
function getNameWithExtension(name, extension = exports.NOTEBOOK_EXTENSION) {
    return name.endsWith(extension) ? name : name + extension;
}
exports.getNameWithExtension = getNameWithExtension;
class PublishedService {
    constructor(_gcsService) {
        this._gcsService = _gcsService;
        this.bucketName = this._gcsService.defaultBucketName;
    }
    /**
     * @returns a GcsListObjectResponse with the complete list of objects
     * belonging to the "Published" bucket of the specified project.
     * Published buckets are denoted with the suffix '-published-notebooks'
     * in their name.
     */
    listAllObjectsFromPublishedBucket(pageSize, pageToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const gcsListObjects = yield this._gcsService.listObjects(this.bucketName, {
                pageSize,
                pageToken,
            });
            return gcsListObjects;
        });
    }
    /**
     * @param publishedBucket the name of the published bucket.
     * @param objectPath path to the object in the published bucket,
     * including the name of the object.
     */
    getGcsPublishedObject(objectPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._gcsService.getGcsObject(this.bucketName, objectPath);
            return response;
        });
    }
    /**
     * Uploads a notebook file to GCS.
     */
    insertNotebook(notebookPath, notebookContents) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._gcsService.insertObject(this.bucketName, notebookPath, notebookContents);
        });
    }
    /**
     * Patches the specified GCS object's metadata.
     */
    setMetadata(notebookName, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            const patch = {
                metadata: Object.assign({}, metadata),
            };
            yield this._gcsService.patchObject(this.bucketName, notebookName, patch);
        });
    }
    /**
     * Imports the Published Notebook from GCS into the user's local
     * notebook instance.
     */
    importPublishedNotebook(publishedNotebook, directoryName, importName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._gcsService.importNotebook(this.bucketName, publishedNotebook, directoryName, importName);
        });
    }
    fetchPublishedNotebookMetadata(notebookFile, environmentImage) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const response = {
                description: '',
                environmentImage: environmentImage,
            };
            try {
                const gcsObjectResponse = yield this.getGcsPublishedObject(notebookFile.name);
                if ((_a = gcsObjectResponse.metadata) === null || _a === void 0 ? void 0 : _a.description) {
                    response.description = (_b = gcsObjectResponse.metadata) === null || _b === void 0 ? void 0 : _b.description;
                }
                if ((_c = gcsObjectResponse.metadata) === null || _c === void 0 ? void 0 : _c.environmentImage) {
                    response.environmentImage =
                        (_d = gcsObjectResponse.metadata) === null || _d === void 0 ? void 0 : _d.environmentImage;
                }
            }
            catch (err) {
                // Expects a 404 error if the selected file is currently not published.
                if (String(err).indexOf('404') === -1) {
                    transport_1.handleApiError(err);
                }
            }
            return response;
        });
    }
    /**
     * Deletes the specified published notebook, and returns true upon success.
     */
    deletePublishedNotebook(notebookName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._gcsService.deleteObject(this.bucketName, notebookName);
            }
            catch (error) {
                return false;
            }
            return true;
        });
    }
    /**
     * Fetches Published Notebook objects from GCS and returns them as
     * an array of Published Notebooks.
     */
    fetchPublishedNotebooks(pageSize, pageToken) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const gcsListObjectResponse = yield this.listAllObjectsFromPublishedBucket(pageSize, pageToken);
            const fetchedNotebooks = [];
            for (const notebook of gcsListObjectResponse.items || []) {
                const viewerLink = `${types_1.VIEWER_LINK_BASE}/${notebook.bucket}/${notebook.name}`;
                fetchedNotebooks.push(Object.assign(Object.assign({}, notebook), { viewerLink: viewerLink, description: (_a = notebook.metadata) === null || _a === void 0 ? void 0 : _a.description, defaultKernelName: (_b = notebook.metadata) === null || _b === void 0 ? void 0 : _b.defaultKernelName, environmentImage: ((_c = notebook.metadata) === null || _c === void 0 ? void 0 : _c.environmentImage) || types_1.UNKNOWN_ENV_IMG }));
            }
            // Sorts by biggest(most recent) time value.
            fetchedNotebooks.sort((a, b) => {
                return (new Date(b.updated || b.timeCreated).valueOf() -
                    new Date(a.updated || a.timeCreated).valueOf());
            });
            return {
                notebooks: fetchedNotebooks,
                pageToken: gcsListObjectResponse.nextPageToken,
            };
        });
    }
}
exports.PublishedService = PublishedService;
