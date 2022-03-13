import { IDocumentManager } from '@jupyterlab/docmanager';
import { Contents } from '@jupyterlab/services';
import { NotebookProvider } from './notebook_provider';
/**
 * A service for common actions and calls involving Google Cloud Storage.
 */
export declare class GcsService {
    private readonly _notebookProvider;
    private readonly _docManager;
    private readonly _contentsManager;
    private readonly _transportService;
    private sharedBucket;
    /** Standardized bucket name for Notebooks including project ID and geo */
    readonly defaultBucketName: string;
    constructor(_notebookProvider: NotebookProvider, _docManager: IDocumentManager, _contentsManager: Contents.IManager);
    /**
     * @returns an object with the property 'item' that contains all the buckets
     * belonging to the specified projectId argument.
     */
    listBuckets(projectId: string): Promise<GcsListBucketResponse>;
    /**
     * Returns the specified bucket by name.
     */
    getGcsBucket(bucketName: string): Promise<GcsBucket>;
    /**
     * Checks if the given bucket exists
     */
    hasGcsBucket(bucketName: string): Promise<boolean>;
    /**
     * Creates a new GCS bucket.
     */
    createBucket(projectId?: string, bucketName?: string, location?: string, uniformAccess?: boolean): Promise<GcsBucket>;
    /**
     * @param bucketName the name of the bucket to upload to
     * @param objectName the designated name to save the object as
     * @param contents a stringified JSON of the object to upload
     * @returns if the object was successfully inserted into the cloud bucket
     */
    insertObject(bucketName: string, objectName: string, contents: string): Promise<void>;
    /**
     * Patches the targeted object with the specified data.
     * @param patch should be an object with attributes being the relevant
     * portions of GcsObjectResponse
     */
    patchObject(bucketName: string, objectName: string, patch: unknown): Promise<void>;
    /**
     * @param bucketName the name of the bucket to access from
     * @param objectPath the file path of the desired object
     */
    getGcsObject(bucketName: string, objectPath: string): Promise<GcsObjectResponse>;
    /**
     * Fetches an object from the specified bucket as stringified JSON.
     */
    getObjectAsString(bucketName: string, objectPath: string): Promise<string>;
    /**
     * Creates a new file in the Notebook instance at @importDirectory and copies
     * the contents of the object at the specified @notebookPath from GCS
     * into that new file.
     * @param importName leave this as an empty string if needRetrievedName=true
     */
    importNotebook(bucketName: string, notebookPath: string, importDirectory: string, importName?: string): Promise<void>;
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
    listObjects(bucketName: string, parameters?: {
        delimiter?: string;
        pageSize?: number;
        pageToken?: string;
        prefix?: string;
    }): Promise<GcsListObjectResponse>;
    /**
     * Deletes the specified object from the GCS bucket.
     */
    deleteObject(bucketName: string, objectName: string): Promise<void>;
    getMultiRegionLocation(locationId: string): string;
    /**
     * Retrieves or creates the default Bucket used by multiple plugins.
     */
    getOrCreateDefaultBucket(): Promise<GcsBucket>;
}
export interface BucketResponse {
    bucket: GcsBucket;
}
export interface GcsBucket {
    id?: string;
    name: string;
    iamConfiguration?: {
        uniformBucketLevelAccess?: {
            /** If set, access is controlled only by bucket-level or above IAM policies. */
            enabled?: boolean;
        };
    };
}
export interface GcsListBucketResponse {
    items: GcsBucket[];
}
/**
 * Params @updated and @timeCreated are strings formatted in RFC 3339 format.
 */
export interface GcsObjectResponse {
    bucket: string;
    name: string;
    updated: string;
    timeCreated: string;
    metadata?: Record<string, string>;
}
export interface GcsListObjectResponse {
    nextPageToken: string;
    items?: Array<GcsObjectResponse>;
}
