/** Interface representing a GCS bucket and its local mount point if applicable */
export interface Bucket {
    type: string;
    path: string;
    name: string;
    lastModified: string;
    mountPoint: string | null;
    last_modified?: string;
    mount_point?: string;
}
/** Response from /aipn/v2/storage */
export interface ListBucketsResponse {
    buckets: Array<Partial<Bucket>>;
}
export declare class SharedStorageService {
    private readonly serverSettings;
    private readonly serverUrl;
    private readonly mountedBucketsMap;
    /** Initialize the service to populate a map of mounted buckets. */
    initialize(): Promise<void>;
    /** Retrieve the list of Buckets and their associated mount points. */
    list(): Promise<Bucket[]>;
    /**
     * Mount the given bucket to the given mount point. The mount point must be
     * relative to the JupyterLab root directory and must not start with a slash.
     */
    mount(bucketName: string, mountPoint: string): Promise<Bucket>;
    unmount(mountPoint: string): Promise<void>;
    /** Returns whether or not the given path is a mounted bucket */
    isMountedBucket(folderPath: string): boolean;
    /**
     * Returns whether or not the given path is a Shared Storage location.
     * This includes the bucket itself and its subdirectories.
     */
    isShared(folderPath: string): boolean;
    private populateBucket;
}
