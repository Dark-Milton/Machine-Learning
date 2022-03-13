import { OperationPollingResponse } from '../service/operation_service';
export interface Bucket {
    name: string;
    accessLevel?: 'uniform' | 'fine';
}
export interface Buckets {
    buckets: Bucket[];
}
/** Interfaces used by services to call and read Notebooks Executor API responses */
interface ApiClientObjectMap<T> {
    [key: string]: T;
}
export declare type EnableTrainingAPIResponse = OperationPollingResponse;
export declare type CreateScheduleResponse = OperationPollingResponse;
export declare type CreateExecutionResponse = OperationPollingResponse;
export interface ListSchedulesResponse {
    schedules?: NotebooksApiSchedule[];
    nextPageToken?: string;
    unreachable?: string[];
}
export interface ListExecutionsResponse {
    executions?: NotebooksApiExecution[];
    nextPageToken?: string;
    unreachable?: string[];
}
export interface ListLocationsResponse {
    locations?: NotebooksApiLocation[];
    nextPageToken?: string;
}
declare type NotebooksApiExecutionState = 'STATE_UNSPECIFIED' | 'QUEUED' | 'PREPARING' | 'RUNNING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLING' | 'CANCELLED' | 'PAUSED';
declare type NotebooksApiScheduleState = 'STATE_UNSPECIFIED' | 'ENABLED' | 'PAUSED' | 'DISABLED' | 'UPDATE_FAILED';
export declare type NotebooksApiExecutionTemplateScaleTier = 'SCALE_TIER_UNSPECIFIED' | 'BASIC' | 'STANDARD_1' | 'PREMIUM_1' | 'BASIC_GPU' | 'BASIC_TPU' | 'CUSTOM';
export declare type NotebooksApiSchedulerAcceleratorConfigType = 'SCHEDULER_ACCELERATOR_TYPE_UNSPECIFIED' | 'NVIDIA_TESLA_K80' | 'NVIDIA_TESLA_P100' | 'NVIDIA_TESLA_V100' | 'NVIDIA_TESLA_P4' | 'NVIDIA_TESLA_T4' | 'NVIDIA_TESLA_A100' | 'TPU_V2' | 'TPU_V3' | 'TPU_V2_POD' | 'TPU_V3_POD';
interface VertexAIParameters {
    network?: string;
}
export interface NotebooksApiExecution {
    name?: string;
    displayName?: string;
    description?: string;
    createTime?: string;
    updateTime?: string;
    state?: NotebooksApiExecutionState;
    executionTemplate?: NotebooksApiExecutionTemplate;
    outputNotebookFile?: string;
    jobUri?: string;
}
export interface NotebooksApiSchedule {
    name?: string;
    displayName?: string;
    description?: string;
    state?: NotebooksApiScheduleState;
    cronSchedule?: string;
    timeZone?: string;
    createTime?: string;
    updateTime?: string;
    executionTemplate?: NotebooksApiExecutionTemplate;
    recentExecutions?: NotebooksApiExecution[];
}
export interface NotebooksApiExecutionTemplate {
    scaleTier?: NotebooksApiExecutionTemplateScaleTier;
    masterType?: string;
    acceleratorConfig?: NotebooksApiSchedulerAcceleratorConfig;
    labels?: ApiClientObjectMap<string>;
    inputNotebookFile?: string;
    containerImageUri?: string;
    outputNotebookFolder?: string;
    paramsYamlFile?: string;
    serviceAccount?: string;
    parameters?: string;
    vertexAiParameters?: VertexAIParameters;
    kernelSpec?: string;
}
export interface NotebooksApiSchedulerAcceleratorConfig {
    type?: NotebooksApiSchedulerAcceleratorConfigType;
    coreCount?: string;
}
/** Zonal location for a Notebook API resource.  */
export interface NotebooksApiLocation {
    name?: string;
    locationId?: string;
    displayName?: string;
    labels?: ApiClientObjectMap<string>;
    metadata?: ApiClientObjectMap<unknown>;
}
/** Interfaces used by extension to display and create Executions/Schedules */
/** Message type describing a Vertex AI training Job */
export interface ExecuteNotebookRequest {
    imageUri: string;
    inputNotebookGcsPath: string;
    name: string;
    masterType: string;
    outputNotebookFolder: string;
    gcsBucket: string;
    scaleTier: string;
    location: string;
    acceleratorType: string;
    acceleratorCount: string;
    serviceAccount?: string;
    network?: string;
    parameters?: string;
    kernelSpec?: string;
}
export interface ExecutionTemplate {
    id: string;
    name: string;
    updateTime?: string;
    createTime?: string;
    gcsFile: string;
    state: string;
    link?: string;
    viewerLink?: string;
    timeZone?: string;
}
/** UI interface used to represent a Scheduled Notebook Job */
export interface Execution extends ExecutionTemplate {
    type: string;
    bucketLink?: string;
}
export interface Schedule extends ExecutionTemplate {
    schedule: string;
    hasExecutions: boolean;
}
export interface Executions {
    executions: Execution[];
    pageToken: string;
}
export interface Schedules {
    schedules: Schedule[];
    pageToken: string;
}
export {};
