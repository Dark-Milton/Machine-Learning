import { NotebookProvider } from './notebook_provider';
import { ApiResponse } from './transport';
export interface Operation {
    name?: string;
    metadata?: ApiClientObjectMap<any>;
    done?: boolean;
    error?: Status;
    response?: ApiClientObjectMap<any>;
}
interface Status {
    code?: number;
    message?: string;
}
export interface ApiClientObjectMap<T> {
    [key: string]: T;
}
export interface OperationPollingResponse {
    error?: string;
}
/**
 * A service for common actions and calls involving operations.
 */
export declare class OperationService {
    private readonly _notebookProvider;
    private readonly _transportService;
    private readonly apiEndpoint;
    constructor(_notebookProvider: NotebookProvider);
    pollAndParseOperation(response: ApiResponse<Operation>, operationUrl?: string): Promise<OperationPollingResponse>;
    /**
     * Polls the provided Operation at 1s intervals until it has completed.
     * This method will always resolve an Operation object even if polling fails
     * repeatedly.
     */
    private _pollOperation;
}
export {};
