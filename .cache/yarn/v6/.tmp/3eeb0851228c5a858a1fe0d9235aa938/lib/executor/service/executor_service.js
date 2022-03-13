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
exports.ExecutorService = void 0;
const transport_1 = require("../../service/transport");
const data_1 = require("../data");
const utils_1 = require("../../utils");
const GCS_PREFIX_LENGTH = 5; // Uses to slice gs:// from GCS paths
const SORT_BY_NAME = 'name';
const SORT_BY_CREATE_TIME = 'create_time';
/**
 * Class to interact with GCP services that support Executor behaviors.
 */
class ExecutorService {
    constructor(_notebookProvider, _projectStateService, _gcsService, _operationService, _apiService) {
        this._notebookProvider = _notebookProvider;
        this._projectStateService = _projectStateService;
        this._gcsService = _gcsService;
        this._operationService = _operationService;
        this._apiService = _apiService;
        this._transportService = this._notebookProvider.serverTransportService;
        this.apiEndpoint = this._notebookProvider.apiEndpoint;
    }
    get projectId() {
        return this._projectStateService.projectId;
    }
    get locationId() {
        // TODO(b/193017404) - Remove when other regions are live
        return 'us-central1';
    }
    /**
     * Uploads the specified Notebook JSON representation to the specified path.
     */
    uploadNotebook(notebookContents, gcsPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const { bucket, object } = this._getGcsPathParts(gcsPath);
            yield this._gcsService.insertObject(bucket, object, notebookContents);
        });
    }
    /**
     * Downloads the notebook located at the gcsPath provided and retrieves the file name from the
     * JSON. Creates a new import directory and attempts to rename it, if it fails then creates
     * the notebook in the already-existing directory and deletes the new directory.
     *
     * @param gcsPath Path to the notebook we want to create.
     */
    importNotebook(gcsPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const { bucket, object } = this._getGcsPathParts(gcsPath);
            yield this._gcsService.importNotebook(bucket, object, data_1.IMPORT_DIRECTORY);
        });
    }
    /**
     * Submits a Notebook for recurring scheduled execution on Vertex AI via a
     * new Cloud Scheduler job.
     * @param request
     * @param zone
     * @param schedule
     */
    scheduleNotebook(request, schedule) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestPath = `projects/${this.projectId}/locations/${request.location}/schedules?schedule_id=${request.name}`;
                const response = yield this._transportService.submit({
                    path: `${this.apiEndpoint}/${requestPath}`,
                    method: transport_1.POST,
                    body: this._buildCreateScheduleRequest(request, schedule),
                });
                return yield this._operationService.pollAndParseOperation(response);
            }
            catch (err) {
                utils_1.appLog.error('Unable to schedule Notebook');
                transport_1.handleApiError(err);
            }
        });
    }
    /**
     * Submits a Notebook for immediate execution on Vertex AI.
     * @param cloudFunctionUrl
     * @param request
     */
    executeNotebook(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestPath = `projects/${this.projectId}/locations/${request.location}/executions?execution_id=${request.name}`;
                const response = yield this._transportService.submit({
                    path: `${this.apiEndpoint}/${requestPath}`,
                    method: transport_1.POST,
                    body: this._buildCreateExecutionRequest(request),
                });
                return yield this._operationService.pollAndParseOperation(response);
            }
            catch (err) {
                utils_1.appLog.error('Unable to execute Notebook');
                transport_1.handleApiError(err);
            }
        });
    }
    /**
     * Gets list of AiPlatform Executions
     * @param cloudFunctionUrl
     * @param request
     */
    listExecutions(filter, pageSize, pageToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = { orderBy: SORT_BY_CREATE_TIME };
                if (filter) {
                    params['filter'] = filter;
                }
                if (pageSize) {
                    params['pageSize'] = String(pageSize);
                }
                if (pageToken) {
                    params['pageToken'] = pageToken;
                }
                const response = yield this._transportService.submit({
                    path: `${this.apiEndpoint}/projects/${this.projectId}/locations/${this.locationId}/executions`,
                    params,
                });
                if (response.result &&
                    response.result.unreachable &&
                    !response.result.executions) {
                    this.throwUnreachableError(response.result.unreachable);
                }
                return {
                    executions: (response.result.executions || []).map(execution => this.createExecution(execution)),
                    pageToken: response.result.nextPageToken || '',
                };
            }
            catch (err) {
                utils_1.appLog.error('Unable to list Notebook Executions');
                transport_1.handleApiError(err);
            }
        });
    }
    /**
     * Gets list of AiPlatformSchedules
     * @param cloudFunctionUrl
     * @param request
     */
    listSchedules(pageSize, pageToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = { orderBy: SORT_BY_NAME };
                if (pageSize) {
                    params['pageSize'] = String(pageSize);
                }
                if (pageToken) {
                    params['pageToken'] = pageToken;
                }
                const response = yield this._transportService.submit({
                    path: `${this.apiEndpoint}/projects/${this.projectId}/locations/${this.locationId}/schedules`,
                    params,
                });
                if (response.result &&
                    response.result.unreachable &&
                    !response.result.schedules) {
                    this.throwUnreachableError(response.result.unreachable);
                }
                return {
                    schedules: (response.result.schedules || []).map(schedule => this.createSchedule(schedule, this.projectId)),
                    pageToken: response.result.nextPageToken || '',
                };
            }
            catch (err) {
                utils_1.appLog.error('Unable to list Notebook Schedules');
                transport_1.handleApiError(err);
            }
        });
    }
    /**
     * List the available locations for the Notebook service caching the response
     * if it is non-empty to be replayed later.
     */
    listLocations() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._locationsPromise)
                return this._locationsPromise;
            try {
                const response = yield this._transportService.submit({
                    path: `${this.apiEndpoint}/projects/${this.projectId}/locations/`,
                });
                if (response.result.locations) {
                    this._locationsPromise = Promise.resolve(response.result.locations);
                    return this._locationsPromise;
                }
                return [];
            }
            catch (err) {
                utils_1.appLog.error('Unable to list Notebook locations');
                transport_1.handleApiError(err);
            }
        });
    }
    createUniformAccessBucket(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._gcsService.createBucket(this.projectId, name, this.locationId, true);
            return this.createBucket(response);
        });
    }
    listBuckets() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._gcsService.listBuckets(this.projectId);
            return {
                buckets: (response.items || []).map(item => this.createBucket(item)),
            };
        });
    }
    isTrainingAPIEnabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._apiService.isVertexAPIEnabled();
        });
    }
    enableTrainingAPI() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._apiService.enableVertexAPI();
        });
    }
    _buildCreateExecutionRequest(request) {
        return {
            description: 'Execution for ' + request.name,
            executionTemplate: this.buildExecutionTemplate(request),
        };
    }
    _buildCreateScheduleRequest(request, cronSchedule) {
        let timeZone = 'America/New_York';
        try {
            timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        }
        catch (err) {
            utils_1.appLog.warn('Unable to determine timezone');
        }
        return {
            description: 'Schedule for ' + request.name,
            cronSchedule,
            timeZone,
            state: 'STATE_UNSPECIFIED',
            executionTemplate: this.buildExecutionTemplate(request),
        };
    }
    buildExecutionTemplate(request) {
        const executionTemplate = {
            scaleTier: request.scaleTier,
            masterType: request.masterType || undefined,
            inputNotebookFile: request.inputNotebookGcsPath,
            outputNotebookFolder: request.outputNotebookFolder,
            containerImageUri: request.imageUri,
            serviceAccount: request.serviceAccount,
            parameters: request.parameters,
            kernelSpec: request.kernelSpec,
        };
        if (executionTemplate.scaleTier === 'CUSTOM' && request.acceleratorType) {
            executionTemplate.acceleratorConfig = {
                type: request.acceleratorType,
                coreCount: request.acceleratorCount,
            };
        }
        if (request.network) {
            executionTemplate.vertexAiParameters = { network: request.network };
        }
        return executionTemplate;
    }
    _getGcsPathParts(gcsPath) {
        if (gcsPath.startsWith('gs://')) {
            gcsPath = gcsPath.slice(GCS_PREFIX_LENGTH);
        }
        const pathParts = gcsPath.split('/');
        return {
            bucket: pathParts[0],
            object: pathParts.slice(1).join('/'),
        };
    }
    createExecution(notebooksApiExecution) {
        var _a, _b, _c, _d;
        const gcsFile = (_a = notebooksApiExecution.outputNotebookFile) === null || _a === void 0 ? void 0 : _a.slice(GCS_PREFIX_LENGTH);
        const [bucket, ...object] = (gcsFile === null || gcsFile === void 0 ? void 0 : gcsFile.split('/')) || [];
        const encodedObjectPath = this.encodeUri(object);
        const viewerLink = data_1.FINISHED_STATES.has(notebooksApiExecution.state || '')
            ? `${data_1.VIEWER_LINK_BASE}/${bucket}/${encodedObjectPath}`
            : undefined;
        const bucketLink = `${data_1.BUCKET_LINK_BASE}/${bucket};tab=permissions`;
        const name = notebooksApiExecution.displayName ||
            ((_b = notebooksApiExecution.name) === null || _b === void 0 ? void 0 : _b.split('/').pop());
        const type = ((_c = notebooksApiExecution.executionTemplate) === null || _c === void 0 ? void 0 : _c.labels) &&
            ((_d = notebooksApiExecution.executionTemplate) === null || _d === void 0 ? void 0 : _d.labels['schedule_id'])
            ? 'Scheduled Execution'
            : 'Execution';
        return {
            id: notebooksApiExecution.name || '',
            name: name || '',
            updateTime: notebooksApiExecution.updateTime,
            createTime: notebooksApiExecution.createTime,
            gcsFile: gcsFile || '',
            state: notebooksApiExecution.state || '',
            link: this.getVertexAiLink(notebooksApiExecution),
            viewerLink,
            type,
            bucketLink,
        };
    }
    createSchedule(notebooksApiSchedule, projectId) {
        var _a, _b, _c, _d, _e;
        const gcsFile = (_b = (_a = notebooksApiSchedule.executionTemplate) === null || _a === void 0 ? void 0 : _a.inputNotebookFile) === null || _b === void 0 ? void 0 : _b.slice(GCS_PREFIX_LENGTH);
        const name = notebooksApiSchedule.displayName ||
            ((_c = notebooksApiSchedule.name) === null || _c === void 0 ? void 0 : _c.split('/').pop());
        const link = `${data_1.SCHEDULES_DETAILS_LINK}/${name}?project=${projectId}`;
        const latestExecution = (notebooksApiSchedule.recentExecutions || []).shift();
        let viewerLink = undefined;
        if (latestExecution && data_1.FINISHED_STATES.has(latestExecution.state || '')) {
            if (latestExecution.outputNotebookFile) {
                const execution = this.createExecution(latestExecution);
                viewerLink = execution.viewerLink;
            }
            else {
                const timeSeparator = '_at_';
                const [inputBasename, extension] = ((_d = gcsFile === null || gcsFile === void 0 ? void 0 : gcsFile.split('/').pop()) === null || _d === void 0 ? void 0 : _d.split('.')) || ['', ''];
                const latestExecutionName = latestExecution.name || '';
                const executionTimestamp = latestExecutionName.slice(latestExecutionName.indexOf(timeSeparator));
                const objectName = `${inputBasename}${executionTimestamp}`.toLowerCase();
                const pathParts = ((_e = notebooksApiSchedule.executionTemplate) === null || _e === void 0 ? void 0 : _e.outputNotebookFolder.slice(GCS_PREFIX_LENGTH).split('/')) || [];
                const encodedObjectPath = this.encodeUri([
                    ...pathParts,
                    `${objectName}.${extension}`,
                ]);
                viewerLink = `${data_1.VIEWER_LINK_BASE}/${encodedObjectPath}`;
            }
        }
        return {
            id: notebooksApiSchedule.name || '',
            name: name || '',
            updateTime: notebooksApiSchedule.updateTime,
            createTime: notebooksApiSchedule.createTime,
            gcsFile: gcsFile || '',
            state: notebooksApiSchedule.state || '',
            link,
            viewerLink,
            schedule: notebooksApiSchedule.cronSchedule || '',
            hasExecutions: latestExecution !== undefined,
        };
    }
    encodeUri(path) {
        return path
            .filter(Boolean)
            .map(p => encodeURIComponent(p))
            .join('/');
    }
    createBucket(bucket) {
        var _a, _b;
        return {
            name: bucket.id || '',
            accessLevel: ((_b = (_a = bucket.iamConfiguration) === null || _a === void 0 ? void 0 : _a.uniformBucketLevelAccess) === null || _b === void 0 ? void 0 : _b.enabled)
                ? 'uniform'
                : 'fine',
        };
    }
    /**
     *  Throws an error if the list response contains unreachable resources
     *  without any valid resources.
     */
    throwUnreachableError(unreachableIds) {
        throw {
            result: {
                error: {
                    status: 'UNREACHABLE',
                    message: unreachableIds.join(', '),
                },
            },
        };
    }
    /**
     * Builds the link to the Vertex AI custom jobs page. If the jobUri is set,
     * it will build the link to the details page
     * (vertex-ai/locations/<locationId>/training/<jobId>?project=<projectId>),
     * otherwise it will link to the custom jobs list page.
     */
    getVertexAiLink(execution) {
        let link = `${data_1.VERTEX_AI_JOBS_LINK}/training/custom-jobs?project=${this.projectId}`;
        if (execution.jobUri) {
            // jobUri format: projects/<projectNumber>/locations/<locationId>/customJobs/<jobId>
            const [, , , locationId, , jobId] = execution.jobUri.split('/');
            link = `${data_1.VERTEX_AI_JOBS_LINK}/locations/${locationId}/training/${jobId}?project=${this.projectId}`;
        }
        return link;
    }
}
exports.ExecutorService = ExecutorService;
