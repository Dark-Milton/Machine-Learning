import { NotebookProvider } from './notebook_provider';
import { OperationPollingResponse, OperationService } from './operation_service';
export declare const SERVICE_MANAGER = "https://servicemanagement.googleapis.com/v1";
/**
 * A service for common actions and calls involving APIs.
 */
export declare class ApiService {
    private readonly _notebookProvider;
    private readonly _operationService;
    private readonly _transportService;
    private readonly _isApiEnabledCache;
    constructor(_notebookProvider: NotebookProvider, _operationService: OperationService);
    private get projectId();
    private get region();
    isAPIEnabled(path: string): Promise<boolean>;
    enableAPI(service: string): Promise<OperationPollingResponse>;
    isVertexAPIEnabled(): Promise<boolean>;
    enableVertexAPI(): Promise<OperationPollingResponse>;
    private _parseLocation;
}
