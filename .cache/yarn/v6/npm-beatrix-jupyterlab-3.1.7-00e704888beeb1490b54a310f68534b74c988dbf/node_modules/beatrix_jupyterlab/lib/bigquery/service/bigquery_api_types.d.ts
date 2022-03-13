export interface DatasetList {
    kind: string;
    etag: string;
    nextPageToken: string;
    datasets: Dataset[];
}
export interface RoutineReference {
    projectId: string;
    datasetId: string;
    routineId: string;
}
export interface DatasetAccess {
    role: string;
    userByEmail: string;
    groupByEmail: string;
    domain: string;
    specialGroup: string;
    iamMember: string;
    view: TableReference;
    routine: RoutineReference;
}
declare type Labels = Record<string, string>;
export interface Dataset {
    kind: string;
    id: string;
    selfLink: string;
    datasetReference: DatasetReference;
    friendlyName: string;
    description: string;
    defaultTableExpirationMs: string;
    defaultPartitionExpirationMs: string;
    labels: Labels;
    creationTime: string;
    lastModifiedTime: string;
    access: DatasetAccess;
    location: string;
    defaultEncryptionConfiguration: EncryptionConfiguration;
    satisfiesPzs: boolean;
}
export interface DatasetReference {
    datasetId: string;
    projectId: string;
}
export interface TableList {
    kind: string;
    etag: string;
    nextPageToken: string;
    tables: Table[];
    totalItems: number;
}
export interface Table {
    kind: string;
    etag: string;
    id: string;
    selfLink: string;
    tableReference: TableReference;
    friendlyName: string;
    description: string;
    labels: Labels;
    schema: TableSchema;
    timePartitioning: TimePartitioning;
    rangePartitioning: RangePartitioning;
    clustering: Clustering;
    requirePartitionFilter: boolean;
    numBytes: string;
    numLongTermBytes: string;
    numRows: string;
    creationTime: string;
    expirationTime: string;
    lastModifiedTime: string;
    type: string;
    view: ViewDefinition;
    externalDataConfiguration: ExternalDataConfiguration;
    location: string;
    streamingBuffer: Streamingbuffer;
    encryptionConfiguration: EncryptionConfiguration;
    snapshotDefinition: SnapshotDefinition;
}
export interface TableReference {
    projectId: string;
    datasetId: string;
    tableId: string;
}
export interface TableSchema {
    fields: TableFieldSchema[];
}
export interface TableFieldSchema {
    name: string;
    type: TableFieldSchemaType;
    mode: string;
    fields?: TableFieldSchema[];
    description?: string;
    policyTags?: {
        names?: string[];
    };
}
export interface TableDataList {
    rows?: TableRow[];
}
export interface TimePartitioning {
    type: string;
    expirationMs: string;
    field: string;
    requirePartitionFilter: boolean;
}
export interface RangePartitioning {
    field: string;
    range: {
        start: string;
        end: string;
        interval: string;
    };
}
export interface Clustering {
    fields: [string];
}
export interface ViewDefinition {
    query: string;
    userDefinedFunctionResources: UserDefinedFunctionResource[];
    useLegacySql: boolean;
}
export interface UserDefinedFunctionResource {
    resourceUri: string;
    inlineCode: string;
}
export interface ExternalDataConfiguration {
    sourceUris: [string];
    schema: TableSchema;
    sourceFormat: string;
    maxBadRecords: number;
    autodetect: boolean;
    ignoreUnknownValues: boolean;
    compression: string;
    csvOptions: CsvOptions;
    bigtableOptions: BigtableOptions;
    googleSheetsOptions: GoogleSheetsOptions;
    hivePartitioningOptions: HivePartitioningOptions;
    connectionId: string;
    decimalTargetTypes: [DecimalTargetType];
}
export interface CsvOptions {
    fieldDelimiter: string;
    skipLeadingRows: string;
    quote: string;
    allowQuotedNewlines: boolean;
    allowJaggedRows: boolean;
    encoding: string;
}
export interface BigtableOptions {
    columnFamilies: [BigtableColumnFamily];
    ignoreUnspecifiedColumnFamilies: boolean;
    readRowkeyAsString: boolean;
}
export interface BigtableColumnFamily {
    familyId: string;
    type: string;
    encoding: string;
    columns: [BigtableColumn];
    onlyReadLatest: boolean;
}
export interface BigtableColumn {
    qualifierEncoded: string;
    qualifierString: string;
    fieldName: string;
    type: string;
    encoding: string;
    onlyReadLatest: boolean;
}
export interface GoogleSheetsOptions {
    skipLeadingRows: string;
    range: string;
}
export interface HivePartitioningOptions {
    mode: string;
    sourceUriPrefix: string;
    requirePartitionFilter: boolean;
    fields: [string];
}
export interface DecimalTargetType {
    estimatedBytes: string;
    estimatedRows: string;
    oldestEntryTime: string;
}
export interface Streamingbuffer {
    estimatedBytes: string;
    estimatedRows: string;
    oldestEntryTime: string;
}
export interface EncryptionConfiguration {
    kmsKeyName: string;
}
export interface SnapshotDefinition {
    baseTableReference: TableReference;
    snapshotTime: string;
}
export interface ModelList {
    models: [Model];
    nextPageToken: string;
}
declare type ModelType = string;
export interface Model {
    etag: string;
    modelReference: ModelReference;
    creationTime: string;
    lastModifiedTime: string;
    description: string;
    friendlyName: string;
    labels: Labels;
    expirationTime: string;
    location: string;
    encryptionConfiguration: EncryptionConfiguration;
    modelType: ModelType;
    trainingRuns: [TrainingRun];
    featureColumns: [StandardSqlField];
    labelColumns: [StandardSqlField];
}
export interface ModelReference {
    projectId: string;
    datasetId: string;
    modelId: string;
}
export interface TrainingRun {
    trainingOptions: TrainingOptions;
    startTime: string;
    results: [
        any
    ];
    evaluationMetrics: any;
    dataSplitResult: any;
    globalExplanations: [
        any
    ];
}
export interface TrainingOptions {
    maxIterations: string;
    lossType: string;
    learnRate: number;
    l1Regularization: number;
    l2Regularization: number;
    minRelativeProgress: number;
    warmStart: boolean;
    earlyStop: boolean;
    inputLabelColumns: string[];
    dataSplitMethod: string;
    dataSplitEvalFraction: number;
    dataSplitColumn: string;
    learnRateStrategy: string;
    initialLearnRate: number;
    labelClassWeights: {
        [key: string]: number;
    };
    userColumn: string;
    itemColumn: string;
    distanceType: string;
    numClusters: string;
    modelUri: string;
    optimizationStrategy: string;
    hiddenUnits: string[];
    batchSize: string;
    dropout: number;
    maxTreeDepth: string;
    subsample: number;
    minSplitLoss: number;
    numFactors: string;
    feedbackType: string;
    walsAlpha: number;
    kmeansInitializationMethod: string;
    kmeansInitializationColumn: string;
    timeSeriesTimestampColumn: string;
    timeSeriesDataColumn: string;
    autoArima: boolean;
    nonSeasonalOrder: string;
    dataFrequency: string;
    includeDrift: boolean;
    holidayRegion: string;
    timeSeriesIdColumn: string;
    horizon: string;
    preserveInputStructs: boolean;
    autoArimaMaxOrder: string;
}
export interface StandardSqlField {
    name: string;
    type: StandardSqlDataType;
}
declare type TypeKind = string;
/**
 * See type description:
 * https://cloud.google.com/bigquery/docs/reference/rest/v2/tables#tablefieldschema
 */
declare type TableFieldSchemaType = 'STRING' | 'BYTES' | 'INTEGER' | 'INT64' | 'FLOAT' | 'FLOAT64' | 'BOOLEAN' | 'BOOL' | 'TIMESTAMP' | 'DATE' | 'TIME' | 'DATETIME' | 'GEOGRAPHY' | 'NUMERIC' | 'BIGNUMERIC' | 'RECORD' | 'STRUCT';
export interface StandardSqlDataType {
    typeKind: TypeKind;
    arrayElementType: StandardSqlDataType;
    structType: StandardSqlStructType;
}
export interface StandardSqlStructType {
    fields: [StandardSqlField];
}
export interface SearchCatalogRequest {
    scope: SearchCatalogRequestScope;
    query: string;
    pageSize?: number;
    pageToken?: string;
    orderBy?: string;
}
export interface SearchCatalogRequestScope {
    includeOrgIds: string[];
    includeProjectIds: string[];
    includeGcpPublicDatasets: boolean;
    restrictedLocations: string[];
}
export interface SearchCatalogResponse {
    results: SearchCatalogResponseResult[];
    nextPageToken?: string;
    unreachable?: string[];
}
export interface SearchCatalogResponseResult {
    searchResultSubtype: string;
    linkedResource: string;
}
export interface ListJobsResponse {
    jobs: Job[];
}
export interface Job {
    user_email?: string;
    configuration?: JobConfiguration;
    jobReference?: JobReference;
    statistics?: JobStatistics;
    status: JobStatus;
}
export interface JobReference {
    projectId?: string;
    jobId?: string;
    location?: string;
}
interface JobConfiguration {
    jobType?: string;
    query?: JobConfigurationQuery;
    dryRun?: boolean;
    jobTimeoutMs?: string;
    labels: string[];
}
interface JobStatistics {
    creationTime?: string;
    endTime?: string;
    startTime?: string;
    totalBytesProcessed?: string;
    query?: JobStatistics2;
}
interface JobStatistics2 {
    cacheHit?: boolean;
}
interface JobConfigurationQuery {
    priority?: string;
    query?: string;
    useLegacySql?: boolean;
    destinationTable: TableReference;
}
interface JobStatus {
    errorResult?: ErrorProto;
    errors?: ErrorProto[];
    state: string;
}
export interface ErrorProto {
    location: string;
    message: string;
    reason: string;
}
interface TableCell {
    v?: any;
}
export interface TableRow {
    f?: TableCell[];
}
export interface QueryRequest {
    defaultDataset?: DatasetReference;
    dryRun?: boolean;
    kind?: string;
    location?: string;
    maxResults?: number;
    parameterMode?: string;
    preserveNulls?: boolean;
    query?: string;
    queryParameters?: QueryParameter[];
    timeoutMs?: number;
    useLegacySql?: boolean;
    useQueryCache?: boolean;
}
export interface QueryParameter {
    name?: string;
    parameterType?: QueryParameterType;
    parameterValue?: QueryParameterValue;
}
export interface QueryParameterType {
    arrayType?: QueryParameterType;
    structTypes?: QueryParameterTypeStructTypes[];
    type?: string;
}
export interface QueryParameterTypeStructTypes {
    description?: string;
    name?: string;
    type?: QueryParameterType;
}
export interface QueryParameterValue {
    arrayValues?: QueryParameterValue[];
    structValues?: Record<string, QueryParameterValue>;
    value?: string;
}
export interface QueryResponse {
    cacheHit?: boolean;
    errors?: ErrorProto[];
    jobComplete?: boolean;
    jobReference?: JobReference;
    kind?: string;
    numDmlAffectedRows?: string;
    pageToken?: string;
    rows?: Array<TableRow>;
    schema?: TableSchema;
    totalBytesProcessed?: string;
    totalRows?: string;
}
export {};
