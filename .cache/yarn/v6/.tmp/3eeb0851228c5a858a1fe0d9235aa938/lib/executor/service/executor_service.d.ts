import { ApiService } from '../../service/api_service';
import { GcsService } from '../../service/gcs_service';
import { NotebookProvider } from '../../service/notebook_provider';
import { OperationService } from '../../service/operation_service';
import { ProjectStateService } from './project_state';
import { ExecuteNotebookRequest, Buckets, Executions, Schedules, Bucket, CreateScheduleResponse, CreateExecutionResponse, EnableTrainingAPIResponse, NotebooksApiLocation } from '../interfaces';
/**
 * Class to interact with GCP services that support Executor behaviors.
 */
export declare class ExecutorService {
    private readonly _notebookProvider;
    private readonly _projectStateService;
    private readonly _gcsService;
    private readonly _operationService;
    private readonly _apiService;
    private readonly _transportService;
    private readonly apiEndpoint;
    private _locationsPromise;
    constructor(_notebookProvider: NotebookProvider, _projectStateService: ProjectStateService, _gcsService: GcsService, _operationService: OperationService, _apiService: ApiService);
    get projectId(): string;
    get locationId(): string;
    /**
     * Uploads the specified Notebook JSON representation to the specified path.
     */
    uploadNotebook(notebookContents: string, gcsPath: string): Promise<void>;
    /**
     * Downloads the notebook located at the gcsPath provided and retrieves the file name from the
     * JSON. Creates a new import directory and attempts to rename it, if it fails then creates
     * the notebook in the already-existing directory and deletes the new directory.
     *
     * @param gcsPath Path to the notebook we want to create.
     */
    importNotebook(gcsPath: string): Promise<void>;
    /**
     * Submits a Notebook for recurring scheduled execution on Vertex AI via a
     * new Cloud Scheduler job.
     * @param request
     * @param zone
     * @param schedule
     */
    scheduleNotebook(request: ExecuteNotebookRequest, schedule: string): Promise<CreateScheduleResponse>;
    /**
     * Submits a Notebook for immediate execution on Vertex AI.
     * @param cloudFunctionUrl
     * @param request
     */
    executeNotebook(request: ExecuteNotebookRequest): Promise<CreateExecutionResponse>;
    /**
     * Gets list of AiPlatform Executions
     * @param cloudFunctionUrl
     * @param request
     */
    listExecutions(filter?: string, pageSize?: number, pageToken?: string): Promise<Executions>;
    /**
     * Gets list of AiPlatformSchedules
     * @param cloudFunctionUrl
     * @param request
     */
    listSchedules(pageSize?: number, pageToken?: string): Promise<Schedules>;
    /**
     * List the available locations for the Notebook service caching the response
     * if it is non-empty to be replayed later.
     */
    listLocations(): Promise<NotebooksApiLocation[]>;
    createUniformAccessBucket(name: string): Promise<Bucket>;
    listBuckets(): Promise<Buckets>;
    isTrainingAPIEnabled(): Promise<boolean>;
    enableTrainingAPI(): Promise<EnableTrainingAPIResponse>;
    private _buildCreateExecutionRequest;
    private _buildCreateScheduleRequest;
    private buildExecutionTemplate;
    private _getGcsPathParts;
    private createExecution;
    private createSchedule;
    private encodeUri;
    private createBucket;
    /**
     *  Throws an error if the list response contains unreachable resources
     *  without any valid resources.
     */
    private throwUnreachableError;
    /**
     * Builds the link to the Vertex AI custom jobs page. If the jobUri is set,
     * it will build the link to the details page
     * (vertex-ai/locations/<locationId>/training/<jobId>?project=<projectId>),
     * otherwise it will link to the custom jobs list page.
     */
    private getVertexAiLink;
}
