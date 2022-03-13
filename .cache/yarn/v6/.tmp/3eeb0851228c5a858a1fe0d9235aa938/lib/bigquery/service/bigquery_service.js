"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigQueryService = void 0;
const utils_1 = require("../../utils");
const transport_1 = require("../../service/transport");
const BIGQUERY = 'https://content-bigquery.googleapis.com/bigquery/v2';
const DATACATALOG = 'https://datacatalog.googleapis.com/v1beta1';
const TABLE_PREVIEW_MAX = 100;
const BIGQUERY_HEADERS = { 'Content-Type': 'application/json' };
const MAX_RESULTS_PARAM = { maxResults: 1000 };
const QUERY_RESULTS_WAIT = 250; // 250ms
const MAX_QUERY_RESULTS_TIME = 60000; // 60s
const POLL_RETRIES = 5;
/**
 * Class to interact with BigQuery services.
 */
class BigQueryService {
    constructor(transportService, projectId, _documentManager) {
        this.transportService = transportService;
        this.projectId = projectId;
        this._documentManager = _documentManager;
    }
    createNotebookBigQueryTableStatsCountMagics(table_id) {
        this._documentManager
            .newUntitled({
            type: 'notebook',
        })
            .then((model) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const widget = this._documentManager.createNew(model.path, 'Notebook');
            const notebook = widget.content;
            const newCell = (_a = notebook.model) === null || _a === void 0 ? void 0 : _a.contentFactory.createCodeCell({});
            if (!newCell)
                throw new Error('Failed to create new cell.');
            newCell.value.text = `%bigquery_stats ${table_id}`;
            (_b = notebook.model) === null || _b === void 0 ? void 0 : _b.cells.push(newCell);
            return widget;
        }));
    }
    listDatasets(project) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.transportService.submit({
                path: `${BIGQUERY}/projects/${project.id}/datasets`,
                method: transport_1.GET,
                params: MAX_RESULTS_PARAM,
                headers: BIGQUERY_HEADERS,
            });
            const datasetListResult = response.result;
            const datasetIds = [];
            const datasets = {};
            for (const dataset of datasetListResult.datasets || []) {
                const datasetReference = dataset.datasetReference;
                const datasetId = `${datasetReference.projectId}.${datasetReference.datasetId}`;
                datasetIds.push(datasetId);
                datasets[datasetId] = {
                    id: datasetId,
                    name: datasetReference.datasetId,
                    projectId: datasetReference.projectId,
                };
            }
            return Object.assign(Object.assign({}, project), { datasetIds: datasetIds, datasets: datasets });
        });
    }
    listTables(projectId, datasetId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.transportService.submit({
                path: `${BIGQUERY}/projects/${projectId}/datasets/${datasetId}/tables`,
                method: transport_1.GET,
                params: MAX_RESULTS_PARAM,
                headers: BIGQUERY_HEADERS,
            });
            const tableListResult = response.result;
            const tableIds = [];
            const tables = {};
            if (tableListResult.totalItems) {
                for (const table of tableListResult.tables) {
                    const tableReference = table.tableReference;
                    const tableId = `${tableReference.projectId}.${tableReference.datasetId}.${tableReference.tableId}`;
                    tableIds.push(tableId);
                    let legacySql = undefined;
                    if ('view' in table) {
                        legacySql = table['view'].useLegacySql;
                    }
                    tables[tableId] = {
                        id: tableId,
                        name: tableReference.tableId,
                        datasetId: tableReference.datasetId,
                        type: table.type,
                        legacySql: legacySql,
                        partitioned: 'timePartitioning' in table,
                        parent: tableReference.datasetId,
                    };
                }
            }
            return {
                tables: tables,
                tableIds: tableIds,
            };
        });
    }
    listModels(projectId, datasetId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.transportService.submit({
                path: `${BIGQUERY}/projects/${projectId}/datasets/${datasetId}/models`,
                method: transport_1.GET,
                params: MAX_RESULTS_PARAM,
                headers: BIGQUERY_HEADERS,
            });
            const modelListResult = response.result;
            const modelIds = [];
            const models = {};
            if (modelListResult.models) {
                for (const model of modelListResult.models) {
                    const modelReference = model.modelReference;
                    const modelId = `${modelReference.projectId}.${modelReference.datasetId}.${modelReference.modelId}`;
                    modelIds.push(modelId);
                    models[modelId] = {
                        id: modelId,
                        name: modelReference.modelId,
                        datasetId: modelReference.datasetId,
                        parent: modelReference.datasetId,
                        type: model.modelType,
                    };
                }
            }
            return {
                models: models,
                modelIds: modelIds,
            };
        });
    }
    listProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = {};
            const projectId = this.projectId;
            projects[projectId] = { id: projectId, name: projectId };
            return { projects, projectIds: [projectId] };
        });
    }
    getProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return { id: projectId, name: projectId };
        });
    }
    searchProjects(searchKey, searchProjectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = {
                scope: {
                    includeProjectIds: [searchProjectId],
                    includeGcpPublicDatasets: false,
                    includeOrgIds: [],
                    restrictedLocations: [],
                },
                query: `name:${searchKey} projectid:${searchProjectId}`,
            };
            const response = yield this.transportService.submit({
                path: `${DATACATALOG}/catalog:search`,
                method: transport_1.POST,
                body: JSON.stringify(request),
                headers: Object.assign(Object.assign({}, BIGQUERY_HEADERS), { 'x-goog-user-project': this.projectId }),
            });
            const searchResults = [];
            if (!response.result.results)
                return {
                    searchResults,
                };
            for (const result of response.result.results) {
                const resource = result.linkedResource;
                let match;
                let projectId, dataset, table, model, view;
                switch (result.searchResultSubtype) {
                    case 'entry.dataset':
                        match = resource.match('projects/(.*)/datasets/(.*)');
                        if (match) {
                            projectId = match[1];
                            dataset = match[2];
                            searchResults.push({
                                type: 'dataset',
                                parent: projectId,
                                name: dataset,
                                id: `${projectId}.${dataset}`,
                            });
                        }
                        break;
                    case 'entry.table':
                        match = resource.match('projects/(.*)/datasets/(.*)/tables/(.*)');
                        if (match) {
                            projectId = match[1];
                            dataset = match[2];
                            table = match[3];
                            searchResults.push({
                                type: 'table',
                                parent: dataset,
                                name: table,
                                id: `${projectId}.${dataset}.${table}`,
                            });
                        }
                        break;
                    case 'entry.table.view':
                        match = resource.match('projects/(.*)/datasets/(.*)/tables/(.*)');
                        if (match) {
                            projectId = match[1];
                            dataset = match[2];
                            view = match[3];
                            searchResults.push({
                                type: 'view',
                                parent: dataset,
                                name: view,
                                id: `${projectId}.${dataset}.${view}`,
                            });
                        }
                        break;
                    case 'entry.model':
                        match = resource.match('projects/(.*)/datasets/(.*)/models/(.*)');
                        if (match) {
                            projectId = match[1];
                            dataset = match[2];
                            model = match[3];
                            searchResults.push({
                                type: 'model',
                                parent: dataset,
                                name: model,
                                id: `${projectId}.${dataset}.${model}`,
                            });
                        }
                        break;
                }
            }
            return {
                searchResults,
            };
        });
    }
    getQueryHistory(projectId, lastFetchTime) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                allUsers: 'true',
                projection: 'FULL',
            };
            if (lastFetchTime) {
                params['min_creation_time'] = lastFetchTime.toString();
            }
            const response = yield this.transportService.submit({
                path: `${BIGQUERY}/projects/${projectId}/jobs`,
                method: transport_1.GET,
                headers: BIGQUERY_HEADERS,
                params,
            });
            const jobs_list = {};
            const job_ids = [];
            for (const job of response.result.jobs) {
                if (!job.jobReference ||
                    !job.jobReference.jobId ||
                    !job.configuration ||
                    ((_a = job.configuration.jobType) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== 'QUERY')
                    continue;
                jobs_list[job.jobReference.jobId] = {
                    query: ((_b = job.configuration.query) === null || _b === void 0 ? void 0 : _b.query) || '',
                    id: job.jobReference.jobId,
                    created: ((_c = job.statistics) === null || _c === void 0 ? void 0 : _c.creationTime) || '0',
                    errored: (job.status.errors && job.status.errors.length !== 0) || false,
                };
                job_ids.push(job.jobReference.jobId);
            }
            return {
                jobs: jobs_list,
                jobIds: job_ids,
                lastFetchTime: new Date().getTime(),
            };
        });
    }
    getQueryDetails(projectId, jobId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.transportService.submit({
                path: `${BIGQUERY}/projects/${projectId}/jobs/${jobId}`,
                method: transport_1.GET,
                headers: BIGQUERY_HEADERS,
            });
            const job = response.result;
            let destination = '';
            if (job.configuration &&
                job.configuration.query &&
                job.configuration.query.destinationTable) {
                const tableRef = job.configuration.query.destinationTable;
                destination = `${tableRef.projectId}:${tableRef.datasetId}.${tableRef.tableId}`;
            }
            return {
                job: {
                    query: ((_b = (_a = job.configuration) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.query) || '',
                    id: jobId,
                    user: job.user_email || '',
                    location: ((_c = job.jobReference) === null || _c === void 0 ? void 0 : _c.location) || '',
                    created: ((_d = job.statistics) === null || _d === void 0 ? void 0 : _d.creationTime) || '0',
                    started: ((_e = job.statistics) === null || _e === void 0 ? void 0 : _e.startTime) || '0',
                    ended: ((_f = job.statistics) === null || _f === void 0 ? void 0 : _f.endTime) || '0',
                    duration: parseInt(((_g = job.statistics) === null || _g === void 0 ? void 0 : _g.endTime) || '0') -
                        parseInt(((_h = job.statistics) === null || _h === void 0 ? void 0 : _h.startTime) || '0'),
                    bytesProcessed: parseInt(((_j = job.statistics) === null || _j === void 0 ? void 0 : _j.totalBytesProcessed) || '0'),
                    priority: ((_l = (_k = job.configuration) === null || _k === void 0 ? void 0 : _k.query) === null || _l === void 0 ? void 0 : _l.priority) || '',
                    destination,
                    useLegacySql: ((_o = (_m = job.configuration) === null || _m === void 0 ? void 0 : _m.query) === null || _o === void 0 ? void 0 : _o.useLegacySql) || false,
                    state: job.status.state,
                    errors: job.status.errors || [],
                    errorResult: job.status.errorResult,
                    from_cache: ((_q = (_p = job.statistics) === null || _p === void 0 ? void 0 : _p.query) === null || _q === void 0 ? void 0 : _q.cacheHit) || false,
                    project: ((_r = job.jobReference) === null || _r === void 0 ? void 0 : _r.projectId) || projectId,
                },
            };
        });
    }
    /** Returns basic metadata for a dataset. */
    listDatasetDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ids = id.split('.', 2);
            const projectId = ids[0];
            const datasetId = ids[1];
            try {
                const response = yield this.transportService.submit({
                    path: `${BIGQUERY}/projects/${projectId}/datasets/${datasetId}`,
                    method: transport_1.GET,
                    headers: BIGQUERY_HEADERS,
                });
                const dataset = response.result;
                const labels = [];
                if (dataset.labels) {
                    for (const [k, v] of Object.entries(dataset.labels)) {
                        labels.push(`${k}: ${v}`);
                    }
                }
                return {
                    details: {
                        id: `${projectId}.${datasetId}`,
                        name: dataset.id,
                        description: dataset.description,
                        labels: labels,
                        date_created: this.formatDate(dataset.creationTime),
                        default_expiration: Number.parseInt(dataset.defaultPartitionExpirationMs, 10),
                        location: dataset.location,
                        last_modified: this.formatDate(dataset.lastModifiedTime),
                        project: projectId,
                        link: dataset.selfLink,
                    },
                };
            }
            catch (err) {
                utils_1.appLog.error(`List dataset details failed for datasetId: ${datasetId}`);
                transport_1.handleApiError(err);
            }
        });
    }
    /** Returns query job. */
    queryJob(projectId, query, dryRun = false) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    useLegacySql: false,
                    query,
                    maxResults: 100,
                    dryRun,
                    timeoutMs: 0,
                };
                const response = yield this.transportService.submit({
                    path: `${BIGQUERY}/projects/${projectId}/queries`,
                    method: transport_1.POST,
                    body: JSON.stringify(request),
                    headers: BIGQUERY_HEADERS,
                });
                return response.result;
            }
            catch (err) {
                if (transport_1.isGoogleAPIError(err)) {
                    const errors = (_b = (_a = err.result) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.errors;
                    if (errors) {
                        return {
                            errors,
                        };
                    }
                }
                utils_1.appLog.error('Query request failed');
                transport_1.handleApiError(err);
            }
        });
    }
    /** Returns query results. */
    queryJobQueryResults(jobReference, startIndex, maxResults = 100) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!jobReference.projectId || !jobReference.jobId) {
                    throw new Error('projectId and the jobId must be specified');
                }
                let response;
                let waitTime = 0;
                let failures = 0;
                while (waitTime < MAX_QUERY_RESULTS_TIME) {
                    try {
                        response =
                            yield this.transportService.submit({
                                path: `${BIGQUERY}/projects/${jobReference.projectId}/queries/${jobReference.jobId}`,
                                method: transport_1.GET,
                                headers: BIGQUERY_HEADERS,
                                params: {
                                    projectId: jobReference.projectId,
                                    jobId: jobReference.jobId,
                                    startIndex,
                                    maxResults,
                                    timeoutMs: 2500,
                                    location: jobReference.location,
                                },
                            });
                        if (response.result.jobComplete) {
                            break;
                        }
                    }
                    catch (err) {
                        if (++failures === POLL_RETRIES) {
                            throw err;
                        }
                    }
                    waitTime += QUERY_RESULTS_WAIT;
                    yield utils_1.sleep(QUERY_RESULTS_WAIT);
                }
                if (!((_a = response === null || response === void 0 ? void 0 : response.result) === null || _a === void 0 ? void 0 : _a.jobComplete)) {
                    throw new Error(`Unable to obtain query results after ${MAX_QUERY_RESULTS_TIME / 1000}s`);
                }
                const { result } = response;
                if (!result.schema) {
                    result.schema = { fields: [] };
                }
                return {
                    fields: this.formatPreviewFields(result.schema),
                    rows: this.formatPreviewRows(result.rows || [], result.schema),
                    totalRows: Number.parseInt(result.totalRows || '0'),
                };
            }
            catch (err) {
                utils_1.appLog.error('Query request failed:', err);
                transport_1.handleApiError(err);
            }
        });
    }
    /** Cancels query job. */
    queryJobCancel(jobReference) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.transportService.submit({
                    path: `${BIGQUERY}/projects/${jobReference.projectId}/jobs/${jobReference.jobId}/cancel`,
                    method: transport_1.POST,
                    headers: BIGQUERY_HEADERS,
                    params: {
                        location: jobReference.location,
                    },
                });
                return response.result;
            }
            catch (err) {
                utils_1.appLog.error(`Query cancel failed: `, err);
                transport_1.handleApiError(err);
            }
        });
    }
    /** Returns basic metadata for a table. */
    listTableDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ids = id.split('.', 3);
            const projectId = ids[0];
            const datasetId = ids[1];
            const tableId = ids[2];
            try {
                const response = yield this.transportService.submit({
                    path: `${BIGQUERY}/projects/${projectId}/datasets/${datasetId}/tables/${tableId}`,
                    method: transport_1.GET,
                    headers: BIGQUERY_HEADERS,
                });
                const table = response.result;
                const labels = [];
                if (table.labels) {
                    for (const [k, v] of Object.entries(table.labels)) {
                        labels.push(`${k}: ${v}`);
                    }
                }
                return {
                    details: {
                        id: `${projectId}.${datasetId}.${tableId}`,
                        name: table.id,
                        description: table.description,
                        labels: labels,
                        date_created: this.formatDate(table.creationTime),
                        expires: this.formatDate(table.expirationTime),
                        location: table.location,
                        last_modified: this.formatDate(table.lastModifiedTime),
                        project: projectId,
                        dataset: datasetId,
                        link: table.selfLink,
                        num_rows: Number(table.numRows),
                        num_bytes: Number(table.numBytes),
                        schema: this.formatDetailSchema(table.schema),
                    },
                };
            }
            catch (err) {
                utils_1.appLog.error(`List table details failed for tableId: ${tableId}`);
                transport_1.handleApiError(err);
            }
        });
    }
    /** Returns basic metadata for a view. */
    listViewDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ids = id.split('.', 3);
            const projectId = ids[0];
            const datasetId = ids[1];
            const tableId = ids[2];
            try {
                const response = yield this.transportService.submit({
                    path: `${BIGQUERY}/projects/${projectId}/datasets/${datasetId}/tables/${tableId}`,
                    method: transport_1.GET,
                    headers: BIGQUERY_HEADERS,
                });
                const table = response.result;
                const labels = [];
                if (table.labels) {
                    for (const [k, v] of Object.entries(table.labels)) {
                        labels.push(`${k}: ${v}`);
                    }
                }
                let query = '';
                let legacy_sql = false;
                if ('view' in table) {
                    query = table['view'].query;
                    legacy_sql = table['view'].useLegacySql;
                }
                return {
                    details: {
                        id: `${projectId}.${datasetId}.${tableId}`,
                        query,
                        name: table.id,
                        description: table.description,
                        labels,
                        date_created: this.formatDate(table.creationTime),
                        expires: this.formatDate(table.expirationTime),
                        last_modified: this.formatDate(table.lastModifiedTime),
                        project: projectId,
                        link: table.selfLink,
                        legacy_sql,
                    },
                };
            }
            catch (err) {
                utils_1.appLog.error(`List view details failed for tableId: ${tableId}`);
                transport_1.handleApiError(err);
            }
        });
    }
    /** Returns basic metadata for a model. */
    listModelDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const ids = id.split('.', 3);
            const projectId = ids[0];
            const datasetId = ids[1];
            const modelId = ids[2];
            try {
                const response = yield this.transportService.submit({
                    path: `${BIGQUERY}/projects/${projectId}/datasets/${datasetId}/models/${modelId}`,
                    method: transport_1.GET,
                    headers: BIGQUERY_HEADERS,
                });
                const model = response.result;
                const labels = [];
                if (model.labels) {
                    for (const [k, v] of Object.entries(model.labels)) {
                        labels.push(`${k}: ${v}`);
                    }
                }
                return {
                    details: {
                        id: `${projectId}.${datasetId}.${modelId}`,
                        name: model.modelReference.modelId,
                        description: model.description,
                        labels,
                        date_created: this.formatDate(model.creationTime),
                        expires: this.formatDate(model.expirationTime),
                        location: model.location,
                        last_modified: this.formatDate(model.lastModifiedTime),
                        model_type: model.modelType,
                        schema_labels: model.labelColumns.map(sqlField => {
                            return {
                                name: sqlField.name,
                                type: sqlField.type.typeKind,
                            };
                        }),
                        feature_columns: model.featureColumns.map(sqlField => {
                            return {
                                name: sqlField.name,
                                type: sqlField.type.typeKind,
                            };
                        }),
                        training_runs: model.trainingRuns.map(run => {
                            return this.formatDate(run.startTime);
                        }),
                    },
                };
            }
            catch (err) {
                utils_1.appLog.error(`List model details failed for modelId: ${modelId}`);
                transport_1.handleApiError(err);
            }
        });
    }
    /** Returns basic metadata for a training run. */
    getTrainingRunDetails(id, runIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const ids = id.split('.', 3);
            const projectId = ids[0];
            const datasetId = ids[1];
            const modelId = ids[2];
            try {
                const response = yield this.transportService.submit({
                    path: `${BIGQUERY}/projects/${projectId}/datasets/${datasetId}/models/${modelId}`,
                    method: transport_1.GET,
                    headers: BIGQUERY_HEADERS,
                });
                const model = response.result;
                const trainingRun = model.trainingRuns[runIndex];
                const options = trainingRun.trainingOptions;
                return {
                    details: Object.assign({ actualIterations: trainingRun.results.length }, options),
                };
            }
            catch (err) {
                utils_1.appLog.error(`Get training run details failed for run ${runIndex} on modelId:` +
                    ` ${id}`);
                transport_1.handleApiError(err);
            }
        });
    }
    /**
     * Returns 100 preview rows for a table, with records flattened unless they are repeated.
     */
    getTablePreview(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const ids = id.split('.', 3);
            const projectId = ids[0];
            const datasetId = ids[1];
            const tableId = ids[2];
            try {
                const tableResponse = yield this.transportService.submit({
                    path: `${BIGQUERY}/projects/${projectId}/datasets/${datasetId}/tables/${tableId}`,
                    method: transport_1.GET,
                    headers: BIGQUERY_HEADERS,
                });
                const listResponse = yield this.transportService.submit({
                    path: `${BIGQUERY}/projects/${projectId}/datasets/${datasetId}/tables/${tableId}/data`,
                    method: transport_1.GET,
                    headers: BIGQUERY_HEADERS,
                    params: {
                        maxResults: TABLE_PREVIEW_MAX,
                    },
                });
                const table = tableResponse.result;
                const list = listResponse.result;
                return {
                    fields: this.formatPreviewFields(table.schema),
                    rows: this.formatPreviewRows(list.rows || [], table.schema),
                    totalRows: ((_a = listResponse.result.rows) === null || _a === void 0 ? void 0 : _a.length) || 0,
                };
            }
            catch (err) {
                utils_1.appLog.error(`Get table preview failed for tableId: ${tableId}`);
                transport_1.handleApiError(err);
            }
        });
    }
    /**
     * Converts date time in milliseconds into ISO string.
     */
    formatDate(time) {
        if (!time) {
            return '';
        }
        const date = new Date(Number.parseInt(time));
        return date.toISOString();
    }
    /**
     * Formats all schema field names for display in details panel schema table.
     */
    formatDetailSchema(schema) {
        const formattedSchema = [];
        const fields = schema.fields || [];
        for (const field of fields) {
            this.formatDetailField(formattedSchema, field, '');
        }
        return formattedSchema;
    }
    /**
     * Recursively appends names of child fields if field is a record, adding period delimiters.
     */
    formatDetailField(formattedSchema, field, fieldName) {
        if (field.type === 'RECORD' || field.type === 'STRUCT') {
            formattedSchema.push({
                name: `${fieldName}${field.name}`,
                type: 'RECORD',
                description: field.description || '',
                mode: field.mode,
            });
            if (field === null || field === void 0 ? void 0 : field.fields) {
                for (const subField of field === null || field === void 0 ? void 0 : field.fields) {
                    this.formatDetailField(formattedSchema, subField, '.');
                }
            }
        }
        else {
            formattedSchema.push({
                name: `${fieldName}${field.name}`,
                type: field.type,
                description: field.description || '',
                mode: field.mode,
            });
        }
    }
    /**
     * Formats table preview header cells.
     */
    formatPreviewFields(schema) {
        const formattedFields = [];
        for (const field of schema.fields || []) {
            this.formatPreviewField(formattedFields, field, '');
        }
        return formattedFields;
    }
    /**
     * Formats field header by recursively listing child fields,
     * or just listing the field name if it is a repeated field.
     */
    formatPreviewField(formattedFields, field, fieldName) {
        if (field.type === 'RECORD' || field.type === 'STRUCT') {
            if (field.mode === 'REPEATED') {
                formattedFields.push(field.name);
            }
            else {
                for (const recordEntry of field.fields || []) {
                    this.formatPreviewField(formattedFields, recordEntry, `${fieldName}${field.name}.`);
                }
            }
        }
        else {
            formattedFields.push(`${fieldName}${field.name}`);
        }
    }
    /**
     * Formats the list of TableRows into a 2-D list of values aligned with
     * the schema fields.
     */
    formatPreviewRows(rows, schema) {
        return rows.map(r => this.getFlattenedRow(r, schema.fields || []));
    }
    /**
     * Flattens a table row into an array of string values accounting for both
     * repeated and nested field structures.   *
     */
    getFlattenedRow(row, fields) {
        const flattenedRow = [];
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            const value = (row === null || row === void 0 ? void 0 : row.f) ? row === null || row === void 0 ? void 0 : row.f[i].v : undefined;
            if (field.mode === 'REPEATED') {
                flattenedRow.push(JSON.stringify(value, null, 2));
            }
            else if (field.type === 'RECORD' || field.type === 'STRUCT') {
                // Recursively process the nested field/value pairs
                flattenedRow.push(...this.getFlattenedRow(value, field.fields || []));
            }
            else {
                flattenedRow.push(this.formatPreviewValue(value));
            }
        }
        return flattenedRow;
    }
    /* Formats a table preview cell value based off the field type. */
    formatPreviewValue(value) {
        if (!value) {
            return '';
        }
        // Nested struct.
        if (typeof value === 'object') {
            return this.formatPreviewValue(value.value);
        }
        return String(value);
    }
}
exports.BigQueryService = BigQueryService;
