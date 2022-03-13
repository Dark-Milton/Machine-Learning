interface ApiClientObjectMap<T> {
    [key: string]: T;
}
export interface NotebooksApiLocation {
    name?: string;
    locationId?: string;
    displayName?: string;
    labels?: ApiClientObjectMap<string>;
    metadata?: ApiClientObjectMap<unknown>;
}
export interface EndpointAPIResponse {
    endpoints?: Endpoint[];
    nextPageToken?: string;
}
export interface Option {
    value: string;
    text: string;
}
export interface ModelsAPIResponse {
    models?: ApiModel[];
    nextPageToken?: string;
}
export interface Endpoint {
    name?: string;
    displayName?: string;
    description?: string;
    deployedModels?: DeployedModel[];
    trafficSplit?: TrafficSplit;
    updateTime?: string;
}
export interface NewEndpoint {
    name: string;
}
export interface CreateNewEndpoint {
    displayName: string;
}
export interface DeployData {
    minNodes: number;
    maxNodes?: number;
    submissionError?: boolean;
    trafficSplits: TrafficSplit;
    endpointName: string;
    endpointDisplayName: string;
    machineType: string;
}
export interface ModelsSpec {
    id?: string;
    displayName?: string;
}
export interface EndpointProps {
    name?: string;
    displayName?: string;
    deployedModels?: ModelsSpec[];
}
export interface PredictSchemata {
    instanceSchemaUri?: string;
    parametersSchemaUri?: string;
    predictionSchemaUri?: string;
}
export interface DeployedModelRef {
    endpoint?: string;
    deployedModelId?: string;
}
export interface DeployedModel {
    id?: string;
    model?: string;
    displayName?: string;
    createTime?: string;
    serviceAccount?: string;
    dedicatedResources?: DedicatedResources;
    automaticResources?: AutomaticResources;
}
export interface DeployedModelInfo {
    endpointID: string;
    endpointName: string;
    modelName: string;
    modelID: string;
    createTime: string;
    trafficSplit: number | string;
}
export interface TrafficSplit {
    [key: string]: number;
}
export interface DataItem {
    name?: string;
    createTime?: string;
    updateTime?: string;
}
declare enum PipelineState {
    PIPELINE_STATE_UNSPECIFIED = 0,
    PIPELINE_STATE_QUEUED = 1,
    PIPELINE_STATE_PENDING = 2,
    PIPELINE_STATE_RUNNING = 3,
    PIPELINE_STATE_SUCCEEDED = 4,
    PIPELINE_STATE_FAILED = 5,
    PIPELINE_STATE_CANCELLING = 6,
    PIPELINE_STATE_CANCELLED = 7,
    PIPELINE_STATE_PAUSED = 8
}
export interface TrainingPipeline {
    name?: string;
    displayName?: string;
    inputDataConfig?: InputDataConfig;
    modelToUpload?: Model;
    state?: PipelineState;
    createTime?: string;
}
export interface ApiModel {
    name?: string;
    displayName?: string;
    description?: string;
    trainingPipeline?: string;
    predictSchemata?: PredictSchemata;
    artifactUri?: string;
    createTime?: string;
    updateTime?: string;
    deployedModels?: DeployedModelRef[];
    supportedDeploymentResourcesTypes?: string[];
}
export interface Model {
    id?: string;
    name?: string;
    displayName?: string;
    useDedicatedResources: boolean;
    updateTime?: string;
    deployedModels?: DeployedModelRef[];
    predictSchemata?: PredictSchemata;
    trainingPipeline?: string;
}
export interface CustomModel {
    displayName?: string;
    artifactUri?: string;
    imageUri?: string;
    predictSchemata?: PredictSchemata;
}
interface InputDataConfig {
    datasetId?: string;
}
export interface Dataset {
    name?: string;
    displayName?: string;
    createTime?: string;
    updateTime?: string;
    labels?: DatasetLabel;
}
export interface DatasetLabel {
    [key: string]: string;
}
export interface StringOrError {
    result: string;
    isError?: boolean;
}
export interface DedicatedResources {
    machineSpec: MachineSpec;
    minReplicaCount: number;
    maxReplicaCount?: number;
}
export interface AutomaticResources {
    minReplicaCount: number;
    maxReplicaCount?: number;
}
export interface MachineSpec {
    machineType: string;
}
export interface CardInfo {
    title: string;
    description: string;
    landingPage: string;
    docs: string;
}
export interface UserValues {
    project: Option;
    region: Option;
    machineConfiguration: Option;
    gpuConfiguration: Option;
    bucket: Option;
}
export {};
