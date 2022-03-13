import { IDocumentManager } from '@jupyterlab/docmanager';
import { ApiService } from '../../service/api_service';
import { GCSHandlerService } from '../../service/gcs_handler_service';
import { NotebookProvider } from '../../service/notebook_provider';
import { Operation, OperationService } from '../../service/operation_service';
import { ProjectStateService } from './project_state';
import { Activity, ActivityLogService } from '../../service/activity_log_service';
import { Endpoint, EndpointAPIResponse, Model, ModelsAPIResponse, DeployedModelInfo, DeployData, CustomModel, StringOrError } from '../interfaces';
import { ApiResponse } from '../../service/transport';
export declare const BUCKET_NAME_SUFFIX = "-nbvertexai";
/**
 * Class to interact with GCP services that support Vertex AI behaviors.
 */
export declare class VertexAIService {
    private readonly _notebookProvider;
    private readonly _projectStateService;
    private readonly _docManager;
    private readonly _gcsHandlerService;
    private readonly _activityLogService;
    private readonly _operationService;
    private readonly _apiService;
    private readonly apiUrl;
    private readonly _transportService;
    constructor(_notebookProvider: NotebookProvider, _projectStateService: ProjectStateService, _docManager: IDocumentManager, _gcsHandlerService: GCSHandlerService, _activityLogService: ActivityLogService, _operationService: OperationService, _apiService: ApiService);
    get projectId(): string;
    get locationId(): string;
    get region(): string;
    get serviceAccount(): string;
    get gpuConfig(): import("../../service/notebook_provider").AcceleratorConfig;
    get machineValConfig(): string;
    get bucketName(): string;
    waitForActivityInPanel(activity: Activity): void;
    getAllDeployedModelsForModel(model: Model): Promise<DeployedModelInfo[]>;
    listEndpoints(pageSize?: number, pageToken?: string): Promise<EndpointAPIResponse>;
    listModels(pageSize?: number, pageToken?: string): Promise<ModelsAPIResponse>;
    getDataType(endpoint: Endpoint): Promise<string>;
    uploadModel(customModel: CustomModel): Promise<void>;
    createEndpoint(endpointName: string): Promise<ApiResponse<Operation>>;
    deployModel(model: Model, deployData: DeployData): Promise<ApiResponse<Operation>>;
    createEndpointAndPollTillDone(endpointName: string): Promise<StringOrError>;
    deployModelAndShowInPanel(model: Model, deployData: DeployData): Promise<void>;
    isAPIEnabled(): Promise<boolean>;
    enableAPI(): Promise<import("../../service/operation_service").OperationPollingResponse>;
    private _parseLocation;
    private _getEndpoint;
    private _getDataset;
    private _getTrainingPipeline;
    private _getModel;
    private uploadLocalModel;
    private _buildUploadModelRequest;
    private _mapToDeployedModelInfo;
    private _createModel;
}
