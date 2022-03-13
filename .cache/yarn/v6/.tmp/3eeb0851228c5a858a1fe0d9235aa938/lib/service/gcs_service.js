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
exports.GcsService = void 0;
const utils_1 = require("../utils");
const transport_1 = require("./transport");
const CLOUD_STORAGE = 'https://www.googleapis.com/storage/v1/b';
const STORAGE_UPLOAD = 'https://storage.googleapis.com/upload/storage/v1';
/**
 * A service for common actions and calls involving Google Cloud Storage.
 */
class GcsService {
    constructor(_notebookProvider, _docManager, _contentsManager) {
        this._notebookProvider = _notebookProvider;
        this._docManager = _docManager;
        this._contentsManager = _contentsManager;
        this._transportService = this._notebookProvider.serverTransportService;
        this.sharedBucket = undefined;
        /** Standardized bucket name for Notebooks including project ID and geo */
        this.defaultBucketName = [
            this._notebookProvider.projectId,
            this.getMultiRegionLocation(this._notebookProvider.region).toLowerCase(),
            'notebooks',
        ].join('-');
    }
    /**
     * @returns an object with the property 'item' that contains all the buckets
     * belonging to the specified projectId argument.
     */
    listBuckets(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this._transportService.submit({
                    path: CLOUD_STORAGE,
                    method: transport_1.GET,
                    params: { project: projectId },
                });
                return response.result;
            }
            catch (error) {
                transport_1.handleApiError(error);
            }
        });
    }
    /**
     * Returns the specified bucket by name.
     */
    getGcsBucket(bucketName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this._transportService.submit({
                    path: `${CLOUD_STORAGE}/${bucketName}`,
                })).result;
            }
            catch (err) {
                transport_1.handleApiError(err);
            }
        });
    }
    /**
     * Checks if the given bucket exists
     */
    hasGcsBucket(bucketName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getGcsBucket(bucketName);
                return true;
            }
            catch (err) {
                utils_1.appLog.warn(`GCS Bucket matching ${bucketName} does not exist`);
                return false;
            }
        });
    }
    /**
     * Creates a new GCS bucket.
     */
    createBucket(projectId = this._notebookProvider.projectId, bucketName = this.defaultBucketName, location = this._notebookProvider.region, uniformAccess = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                name: bucketName,
                location: location ? this.getMultiRegionLocation(location) : undefined,
                iamConfiguration: {
                    uniformBucketLevelAccess: {
                        enabled: uniformAccess,
                    },
                },
            };
            try {
                const response = yield this._transportService.submit({
                    path: CLOUD_STORAGE,
                    method: 'POST',
                    params: { project: projectId },
                    body,
                });
                return response.result;
            }
            catch (error) {
                transport_1.handleApiError(error);
            }
        });
    }
    /**
     * @param bucketName the name of the bucket to upload to
     * @param objectName the designated name to save the object as
     * @param contents a stringified JSON of the object to upload
     * @returns if the object was successfully inserted into the cloud bucket
     */
    insertObject(bucketName, objectName, contents) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._transportService.submit({
                    path: `${STORAGE_UPLOAD}/b/${bucketName}/o`,
                    method: transport_1.POST,
                    headers: { 'Content-Type': 'application/json' },
                    body: contents,
                    params: {
                        name: objectName,
                        uploadType: 'media',
                    },
                });
            }
            catch (err) {
                transport_1.handleApiError(err);
            }
        });
    }
    /**
     * Patches the targeted object with the specified data.
     * @param patch should be an object with attributes being the relevant
     * portions of GcsObjectResponse
     */
    patchObject(bucketName, objectName, patch) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._transportService.submit({
                    path: `${CLOUD_STORAGE}/${bucketName}/o/${encodeURIComponent(objectName)}`,
                    method: transport_1.PATCH,
                    headers: { 'Content-Type': 'application/json' },
                    body: patch,
                });
            }
            catch (err) {
                transport_1.handleApiError(err);
            }
        });
    }
    /**
     * @param bucketName the name of the bucket to access from
     * @param objectPath the file path of the desired object
     */
    getGcsObject(bucketName, objectPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this._transportService.submit({
                    path: `${CLOUD_STORAGE}/${bucketName}/o/${encodeURIComponent(objectPath)}`,
                });
                return response.result;
            }
            catch (err) {
                transport_1.handleApiError(err);
            }
        });
    }
    /**
     * Fetches an object from the specified bucket as stringified JSON.
     */
    getObjectAsString(bucketName, objectPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this._transportService.submit({
                    path: `${CLOUD_STORAGE}/${bucketName}/o/${encodeURIComponent(objectPath)}`,
                    params: {
                        alt: 'media',
                    },
                });
                return typeof response.result === 'string'
                    ? response.result
                    : JSON.stringify(response.result);
            }
            catch (err) {
                transport_1.handleApiError(err);
            }
        });
    }
    /**
     * Creates a new file in the Notebook instance at @importDirectory and copies
     * the contents of the object at the specified @notebookPath from GCS
     * into that new file.
     * @param importName leave this as an empty string if needRetrievedName=true
     */
    importNotebook(bucketName, notebookPath, importDirectory, importName = '') {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const contentsObj = JSON.parse(yield this.getObjectAsString(bucketName, notebookPath));
            let fileName;
            // New directory to be made should end with a '/'.
            if (importDirectory.endsWith('/')) {
                importDirectory = importDirectory.slice(0, -1);
            }
            if (!importName) {
                const retrievedName = (_c = (_b = (_a = contentsObj.metadata) === null || _a === void 0 ? void 0 : _a.papermill) === null || _b === void 0 ? void 0 : _b.input_path) === null || _c === void 0 ? void 0 : _c.split('/').pop();
                fileName = retrievedName ? retrievedName : 'Untitled.ipynb';
            }
            else {
                fileName = importName;
            }
            const path = `${importDirectory}/${fileName}`;
            // Ensure folder exists before saving
            try {
                yield this._contentsManager.get(importDirectory);
            }
            catch (err) {
                yield this._contentsManager.save(importDirectory, { type: 'directory' });
            }
            yield this._contentsManager.save(path, {
                content: contentsObj,
                type: 'notebook',
            });
            if (!this._docManager.openOrReveal(path)) {
                throw new Error(`Unable to open gs://${bucketName}/${notebookPath}`);
            }
        });
    }
    /**
     * @param bucketName
     * @param pageSize sets the amount of objects to be fetched. Max value of
     * 1000 for each call to GCS.
     * @param pageToken A previously-returned page token representing part of
     * the larger set of results to view. The pageToken is an encoded field that
     * marks the name and generation of the last object in the returned list.
     * In a subsequent request using the pageToken, items that come after the
     * pageToken are shown (up to pageSize). If you start a listing and then
     * create an object in the bucket before using a pageToken to continue
     * listing, you do not see the new object in subsequent listing results if
     * it is in part of the object namespace already listed.
     * @returns an object with the properties 'pageToken' and 'items'.
     * 'pageToken' should be used for the next function call if more objects
     * remain to be fetched. 'items' is an array that holds all the objects
     * belonging to the specified bucket.
     */
    listObjects(bucketName, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = Object.assign(Object.assign(Object.assign(Object.assign({}, ((parameters === null || parameters === void 0 ? void 0 : parameters.delimiter) ? { delimiter: parameters.delimiter } : {})), ((parameters === null || parameters === void 0 ? void 0 : parameters.pageSize) ? { maxResults: parameters.pageSize } : {})), ((parameters === null || parameters === void 0 ? void 0 : parameters.pageToken) ? { pageToken: parameters.pageToken } : {})), ((parameters === null || parameters === void 0 ? void 0 : parameters.prefix) ? { prefix: parameters.prefix } : {}));
                const response = yield this._transportService.submit({
                    path: `${CLOUD_STORAGE}/${bucketName}/o`,
                    params: params,
                });
                return response.result;
            }
            catch (error) {
                transport_1.handleApiError(error);
            }
        });
    }
    /**
     * Deletes the specified object from the GCS bucket.
     */
    deleteObject(bucketName, objectName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._transportService.submit({
                    path: `${CLOUD_STORAGE}/${bucketName}/o/${encodeURIComponent(objectName)}`,
                    method: transport_1.DELETE,
                });
            }
            catch (error) {
                transport_1.handleApiError(error);
            }
        });
    }
    getMultiRegionLocation(locationId) {
        const notebookLocationId = locationId.toLowerCase();
        if (notebookLocationId.startsWith('europe')) {
            return 'EU';
        }
        else if (notebookLocationId.startsWith('asia')) {
            return 'ASIA';
        }
        else if (notebookLocationId.startsWith('northamerica')) {
            return 'NORTHAMERICA-NORTHEAST1';
        }
        else if (notebookLocationId.startsWith('southamerica')) {
            return 'SOUTHAMERICA-EAST1';
        }
        else if (notebookLocationId.startsWith('australia')) {
            return 'AUSTRALIA-SOUTHEAST1';
        }
        return 'US';
    }
    /**
     * Retrieves or creates the default Bucket used by multiple plugins.
     */
    getOrCreateDefaultBucket() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.sharedBucket)
                return this.sharedBucket;
            try {
                const bucket = yield this.getGcsBucket(this.defaultBucketName);
                this.sharedBucket = Promise.resolve(bucket);
                return this.sharedBucket;
                // eslint-disable-next-line no-empty
            }
            catch (err) { }
            const bucket = yield this.createBucket();
            this.sharedBucket = Promise.resolve(bucket);
            return this.sharedBucket;
        });
    }
}
exports.GcsService = GcsService;
