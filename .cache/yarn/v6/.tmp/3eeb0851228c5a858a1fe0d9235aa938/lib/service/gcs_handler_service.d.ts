import { Contents, ServerConnection } from '@jupyterlab/services';
/**
 * Performs GCS operations through the backend client
 */
export declare class GCSHandlerService {
    /**
     * The server settings of the manager.
     */
    readonly serverSettings: ServerConnection.ISettings;
    getPathContents(localPath: string): Promise<Contents.IModel>;
    newUntitled(options?: Contents.ICreateOptions): Promise<Contents.IModel>;
    delete(localPath: string): Promise<void>;
    rename(oldLocalPath: string, newLocalPath: string): Promise<Contents.IModel>;
    save(localPath: string, options: Partial<Contents.IModel>): Promise<Contents.IModel>;
    copy(localPath: string, toLocalDir: string): Promise<Contents.IModel>;
    createCheckpoint(localPath: string): Promise<Contents.ICheckpointModel>;
    listCheckpoints(localPath: string): Promise<Contents.ICheckpointModel[]>;
    restoreCheckpoint(localPath: string, checkpointID: string): Promise<void>;
    deleteCheckpoint(localPath: string, checkpointID: string): Promise<void>;
}
