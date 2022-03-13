import { IFileBrowserFactory } from '@jupyterlab/filebrowser';
import { IStatusBar } from '@jupyterlab/statusbar';
import { SharedStorageService } from './shared_storage_service';
/** Class to managed all Shared Storage operations and UX. */
export declare class SharedStorageManager {
    readonly sharedStorageService: SharedStorageService;
    private readonly fileBrowserFactory;
    private readonly statusBar;
    private readonly browser;
    constructor(sharedStorageService: SharedStorageService, fileBrowserFactory: IFileBrowserFactory, statusBar: IStatusBar);
    /** Action to handle the mounting of a bucket. */
    onMountBucket(): Promise<void>;
    /** Action to handle the unmounting of a bucket. */
    onUnmountBucket(): Promise<void>;
    /** Creates a new ToolbarButton for mounting buckets */
    createMountButton(): void;
    connectSharedFolderIndicator(): void;
    private showOperationStatus;
    private connectFileBrowserModelSlots;
}
