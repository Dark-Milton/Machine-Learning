import { Contents } from '@jupyterlab/services';
import { GcsListObjectResponse, GcsObjectResponse, GcsService } from '../../service/gcs_service';
import { PublishedNotebookMetadata, PublishedNotebooks } from '../types';
export declare const SHARED_DIRECTORY = "shared/";
export declare const NOTEBOOK_EXTENSION = ".ipynb";
export declare function getNameWithExtension(name: string, extension?: string): string;
export declare class PublishedService {
    private readonly _gcsService;
    private readonly bucketName;
    constructor(_gcsService: GcsService);
    /**
     * @returns a GcsListObjectResponse with the complete list of objects
     * belonging to the "Published" bucket of the specified project.
     * Published buckets are denoted with the suffix '-published-notebooks'
     * in their name.
     */
    listAllObjectsFromPublishedBucket(pageSize: number, pageToken?: string): Promise<GcsListObjectResponse>;
    /**
     * @param publishedBucket the name of the published bucket.
     * @param objectPath path to the object in the published bucket,
     * including the name of the object.
     */
    getGcsPublishedObject(objectPath: string): Promise<GcsObjectResponse>;
    /**
     * Uploads a notebook file to GCS.
     */
    insertNotebook(notebookPath: string, notebookContents: string): Promise<void>;
    /**
     * Patches the specified GCS object's metadata.
     */
    setMetadata(notebookName: string, metadata: Record<string, string>): Promise<void>;
    /**
     * Imports the Published Notebook from GCS into the user's local
     * notebook instance.
     */
    importPublishedNotebook(publishedNotebook: string, directoryName: string, importName: string): Promise<void>;
    fetchPublishedNotebookMetadata(notebookFile: Contents.IModel, environmentImage: string): Promise<PublishedNotebookMetadata>;
    /**
     * Deletes the specified published notebook, and returns true upon success.
     */
    deletePublishedNotebook(notebookName: string): Promise<boolean>;
    /**
     * Fetches Published Notebook objects from GCS and returns them as
     * an array of Published Notebooks.
     */
    fetchPublishedNotebooks(pageSize: number, pageToken?: string): Promise<PublishedNotebooks>;
}
