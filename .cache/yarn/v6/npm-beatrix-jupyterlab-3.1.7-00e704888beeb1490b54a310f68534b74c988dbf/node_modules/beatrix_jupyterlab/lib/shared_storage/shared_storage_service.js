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
exports.SharedStorageService = void 0;
const services_1 = require("@jupyterlab/services");
const transport_1 = require("../service/transport");
class SharedStorageService {
    constructor() {
        this.serverSettings = services_1.ServerConnection.makeSettings();
        this.serverUrl = `${this.serverSettings.baseUrl}aipn/v2/storage`;
        this.mountedBucketsMap = new Map();
    }
    /** Initialize the service to populate a map of mounted buckets. */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const buckets = yield this.list();
            this.mountedBucketsMap.clear();
            for (const bucket of buckets) {
                if (bucket.mountPoint) {
                    this.mountedBucketsMap.set(bucket.mountPoint, bucket);
                }
            }
        });
    }
    /** Retrieve the list of Buckets and their associated mount points. */
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.ServerConnection.makeRequest(this.serverUrl, {}, this.serverSettings);
            if (!response.ok) {
                throw new Error(`Unable to retrieve buckets from ${this.serverUrl}`);
            }
            const body = (yield response.json());
            return body.buckets.map(bucket => this.populateBucket(bucket));
        });
    }
    /**
     * Mount the given bucket to the given mount point. The mount point must be
     * relative to the JupyterLab root directory and must not start with a slash.
     */
    mount(bucketName, mountPoint) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.serverUrl}/${mountPoint}`;
            const response = yield services_1.ServerConnection.makeRequest(url, {
                body: JSON.stringify({
                    bucketName,
                }),
                method: transport_1.POST,
            }, this.serverSettings);
            if (!response.ok) {
                const { error } = (yield response.json());
                throw new Error(`Unable to mount ${bucketName} on ${mountPoint} through ${url} - ${error.message}`);
            }
            const bucket = this.populateBucket(yield response.json());
            if (!bucket.mountPoint) {
                throw new Error(`Unable to mount ${bucketName} on ${mountPoint} - mountPoint is undefined`);
            }
            this.mountedBucketsMap.set(bucket.mountPoint, bucket);
            return bucket;
        });
    }
    unmount(mountPoint) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.serverUrl}/${mountPoint}`;
            const response = yield services_1.ServerConnection.makeRequest(url, {
                method: transport_1.DELETE,
            }, this.serverSettings);
            if (!response.ok) {
                throw new Error(`Unable to unmount ${mountPoint} through ${url}`);
            }
            this.mountedBucketsMap.delete(mountPoint);
        });
    }
    /** Returns whether or not the given path is a mounted bucket */
    isMountedBucket(folderPath) {
        return this.mountedBucketsMap.has(folderPath);
    }
    /**
     * Returns whether or not the given path is a Shared Storage location.
     * This includes the bucket itself and its subdirectories.
     */
    isShared(folderPath) {
        return this.isMountedBucket(folderPath.split('/')[0]);
    }
    populateBucket(bucket) {
        return {
            type: bucket.type || '',
            path: bucket.path || '',
            name: bucket.name || '',
            lastModified: bucket.last_modified || '',
            mountPoint: bucket.mount_point || null,
        };
    }
}
exports.SharedStorageService = SharedStorageService;
