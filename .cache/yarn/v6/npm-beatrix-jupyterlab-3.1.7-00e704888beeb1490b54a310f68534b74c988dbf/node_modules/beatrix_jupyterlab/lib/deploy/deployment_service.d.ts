/** Interface for a Deployment */
export interface Deployment {
    id: string;
    startTimeMs: number;
    endTimeMs: number | null;
    url: string;
    filename: string;
    inProgress: boolean;
    bytesWritten: number;
    status: number | null;
}
/** Class to manage Deployment HTTP methods. */
export declare class DeploymentService {
    private readonly serverSettings;
    private readonly serverUrl;
    /** Initiates a deployment process on the server. */
    startDeployment(url: string, filename?: string): Promise<Deployment>;
    /** Retrives the status of an existing deployment process. */
    getDeployment(id: string): Promise<Deployment>;
    private _convertBodyToDeployment;
    /** Tries to retrieve the "error" JSON property from the response. */
    private _getErrorMessage;
}
