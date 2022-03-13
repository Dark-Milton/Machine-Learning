import { IDocumentManager } from '@jupyterlab/docmanager';
import * as BigQueryApiTypes from './bigquery_api_types';
import { TransportService } from '../../service/transport';
import { Dataset, DataTree, Project, JobDetails, QueryHistory, DatasetDetails, ModelDetails, TrainingRunDetails, ViewDetails, SearchResults, TableDetails, TablePreview } from './bigquery_service_types';
interface QueryJobCancel {
    kind: string;
    job: BigQueryApiTypes.Job;
}
/**
 * Class to interact with BigQuery services.
 */
export declare class BigQueryService {
    private transportService;
    readonly projectId: string;
    readonly _documentManager: IDocumentManager;
    constructor(transportService: TransportService, projectId: string, _documentManager: IDocumentManager);
    createNotebookBigQueryTableStatsCountMagics(table_id: string): void;
    listDatasets(project: Project): Promise<Project>;
    listTables(projectId: string, datasetId: string): Promise<Partial<Dataset>>;
    listModels(projectId: string, datasetId: string): Promise<Partial<Dataset>>;
    listProjects(): Promise<DataTree>;
    getProject(projectId: string): Promise<Project>;
    searchProjects(searchKey: string, searchProjectId: string): Promise<SearchResults>;
    getQueryHistory(projectId: string, lastFetchTime?: number): Promise<QueryHistory>;
    getQueryDetails(projectId: string, jobId: string): Promise<JobDetails>;
    /** Returns basic metadata for a dataset. */
    listDatasetDetails(id: string): Promise<DatasetDetails>;
    /** Returns query job. */
    queryJob(projectId: string, query: string, dryRun?: boolean): Promise<BigQueryApiTypes.QueryResponse>;
    /** Returns query results. */
    queryJobQueryResults(jobReference: BigQueryApiTypes.JobReference, startIndex: number, maxResults?: number): Promise<TablePreview>;
    /** Cancels query job. */
    queryJobCancel(jobReference: BigQueryApiTypes.JobReference): Promise<QueryJobCancel>;
    /** Returns basic metadata for a table. */
    listTableDetails(id: string): Promise<TableDetails>;
    /** Returns basic metadata for a view. */
    listViewDetails(id: string): Promise<ViewDetails>;
    /** Returns basic metadata for a model. */
    listModelDetails(id: string): Promise<ModelDetails>;
    /** Returns basic metadata for a training run. */
    getTrainingRunDetails(id: string, runIndex: number): Promise<TrainingRunDetails>;
    /**
     * Returns 100 preview rows for a table, with records flattened unless they are repeated.
     */
    getTablePreview(id: string): Promise<TablePreview>;
    /**
     * Converts date time in milliseconds into ISO string.
     */
    private formatDate;
    /**
     * Formats all schema field names for display in details panel schema table.
     */
    private formatDetailSchema;
    /**
     * Recursively appends names of child fields if field is a record, adding period delimiters.
     */
    private formatDetailField;
    /**
     * Formats table preview header cells.
     */
    private formatPreviewFields;
    /**
     * Formats field header by recursively listing child fields,
     * or just listing the field name if it is a repeated field.
     */
    private formatPreviewField;
    /**
     * Formats the list of TableRows into a 2-D list of values aligned with
     * the schema fields.
     */
    private formatPreviewRows;
    /**
     * Flattens a table row into an array of string values accounting for both
     * repeated and nested field structures.   *
     */
    private getFlattenedRow;
    private formatPreviewValue;
}
export {};
