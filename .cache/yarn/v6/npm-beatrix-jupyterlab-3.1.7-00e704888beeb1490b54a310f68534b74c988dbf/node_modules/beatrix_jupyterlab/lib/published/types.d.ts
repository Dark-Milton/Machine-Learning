import { GcsObjectResponse } from '../service/gcs_service';
export declare const VIEWER_LINK_BASE = "https://notebooks.cloud.google.com/view";
export declare const UNKNOWN_ENV_IMG = "unknown";
export interface Bucket {
    name: string;
}
export interface GcpSettings {
    projectId: string;
    environmentImage: string;
}
export interface PublishedNotebookMetadata {
    description: string;
    environmentImage: string;
}
export interface PublishedNotebook extends GcsObjectResponse {
    viewerLink: string;
    description?: string;
    defaultKernelName?: string;
    environmentImage?: string;
}
export interface PublishedNotebooks {
    notebooks: Array<PublishedNotebook>;
    pageToken: string;
}
export interface SubmittedStatus {
    isSubmitted: boolean;
    message: string;
}
