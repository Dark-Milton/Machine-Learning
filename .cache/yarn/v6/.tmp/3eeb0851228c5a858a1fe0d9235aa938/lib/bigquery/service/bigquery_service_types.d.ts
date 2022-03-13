import * as BigQueryApiTypes from './bigquery_api_types';
export interface ViewDetailsObject {
    id: string;
    name: string;
    description: string;
    labels: string[];
    date_created: string;
    expires: string;
    last_modified: string;
    project: string;
    link: string;
    query: string;
    legacy_sql: boolean;
}
export interface ViewDetails {
    details: ViewDetailsObject;
}
export interface ModelDetailsObject {
    id: string;
    name: string;
    description: string;
    labels: string[];
    date_created: string;
    expires: string;
    location: string;
    last_modified: string;
    model_type: string;
    schema_labels: ModelSchema[];
    feature_columns: ModelSchema[];
    training_runs: string[];
}
export interface ModelSchema {
    name: string;
    type: string;
}
export interface ModelDetails {
    details: ModelDetailsObject;
}
export interface TrainingRunDetailsObject extends BigQueryApiTypes.TrainingOptions {
    actualIterations: number;
}
export interface TrainingRunDetails {
    details: TrainingRunDetailsObject;
}
export interface DatasetDetailsObject {
    id: string;
    name: string;
    description: string;
    labels: string[];
    date_created: string;
    default_expiration: number;
    location: string;
    last_modified: string;
    project: string;
    link: string;
}
export interface DatasetDetails {
    details: DatasetDetailsObject;
}
export interface QueryHistory {
    jobs: JobsObject;
    jobIds: string[];
    lastFetchTime: number;
}
export interface JobIdsObject {
    [key: string]: string[];
}
export interface JobsObject {
    [key: string]: Job;
}
export interface JobDetailsObject {
    query: string;
    id: string;
    user: string;
    location: string;
    created: string;
    started: string;
    ended: string;
    duration: number;
    bytesProcessed: number;
    priority: string;
    destination: string;
    useLegacySql: boolean;
    state: string;
    errors: ErrorResult[];
    errorResult?: ErrorResult;
    from_cache: boolean;
    project: string;
}
interface ErrorResult {
    location: string;
    message: string;
    reason: string;
}
export interface Job {
    query: string;
    id: string;
    created: string;
    errored: boolean;
    details?: JobDetailsObject;
}
export interface JobDetails {
    job: JobDetailsObject;
}
export interface TableDetailsObject {
    id: string;
    name: string;
    description: string;
    labels: string[];
    date_created: string;
    expires: string;
    location: string;
    last_modified: string;
    project: string;
    dataset: string;
    link: string;
    num_rows: number;
    num_bytes: number;
    schema: SchemaField[];
}
export interface SchemaField {
    name: string;
    type: string;
    mode: string;
    description: string;
}
export interface TableDetails {
    details: TableDetailsObject;
}
export interface TablePreview {
    rows: string[][];
    fields: string[];
    totalRows: number;
}
export interface SearchResults {
    searchResults: SearchResult[];
}
export interface SearchResult {
    type: string;
    parent: string;
    id: string;
    name: string;
}
export interface DataTree {
    projects: Record<string, Project>;
    projectIds: string[];
}
export interface Project {
    id: string;
    name: string;
    datasets?: Record<string, Dataset>;
    datasetIds?: string[];
    error?: string;
}
export interface Dataset {
    id: string;
    name: string;
    tables?: Record<string, Table>;
    tableIds?: string[];
    models?: Record<string, Model>;
    modelIds?: string[];
    projectId: string;
    parent?: string;
    type?: string;
}
export interface Table {
    id: string;
    name: string;
    type: string;
    datasetId: string;
    parent: string;
    partitioned: boolean;
    legacySql?: boolean;
}
export interface Model {
    id: string;
    name: string;
    datasetId: string;
    parent: string;
    type: string;
}
export {};
