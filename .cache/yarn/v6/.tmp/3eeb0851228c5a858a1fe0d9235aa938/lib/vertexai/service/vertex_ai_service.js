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
exports.VertexAIService = exports.BUCKET_NAME_SUFFIX = void 0;
const utils_1 = require("../../utils");
const activity_log_service_1 = require("../../service/activity_log_service");
const transport_1 = require("../../service/transport");
const utils_2 = require("../utils");
exports.BUCKET_NAME_SUFFIX = '-nbvertexai';
const GCS_PREFIX_LENGTH = 5; // Uses to slice gs:// from GCS paths
const GCS_PREFIX = 'gs://';
/**
 * Class to interact with GCP services that support Vertex AI behaviors.
 */
class VertexAIService {
    constructor(_notebookProvider, _projectStateService, _docManager, _gcsHandlerService, _activityLogService, _operationService, _apiService) {
        this._notebookProvider = _notebookProvider;
        this._projectStateService = _projectStateService;
        this._docManager = _docManager;
        this._gcsHandlerService = _gcsHandlerService;
        this._activityLogService = _activityLogService;
        this._operationService = _operationService;
        this._apiService = _apiService;
        this.apiUrl = `https://${this.region}-aiplatform.clients6.google.com/ui`;
        this._transportService = this._notebookProvider.serverTransportService;
    }
    get projectId() {
        return this._projectStateService.projectId;
    }
    get locationId() {
        return this._notebookProvider.locationId;
    }
    get region() {
        return this._parseLocation(this.locationId);
    }
    get serviceAccount() {
        return this._notebookProvider.owner;
    }
    get gpuConfig() {
        return this._notebookProvider.acceleratorConfig;
    }
    get machineValConfig() {
        return this._notebookProvider.machineType;
    }
    get bucketName() {
        return `${this.projectId}${exports.BUCKET_NAME_SUFFIX}`;
    }
    waitForActivityInPanel(activity) {
        this._activityLogService.addNew(activity);
        this._activityLogService.openPanel();
    }
    getAllDeployedModelsForModel(model) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!model.deployedModels) {
                return [];
            }
            const promises = yield model.deployedModels.map(deployedModelRef => {
                if (!deployedModelRef.endpoint)
                    return undefined;
                return this._getEndpoint(deployedModelRef.endpoint);
            });
            const result = yield Promise.all(promises);
            //filter all undefined out
            const endpointsWithGivenModelDeployed = result.filter(endpoint => !!endpoint);
            const allDeployedModelsForGivenModel = [];
            for (let i = 0; i < endpointsWithGivenModelDeployed.length; i++) {
                const endpoint = endpointsWithGivenModelDeployed[i];
                //skip deployedModels that don't match the given model name
                const deployedModels = (endpointsWithGivenModelDeployed[i].deployedModels || [])
                    .filter(deployedModel => deployedModel.model === model.name)
                    .map(deployedModel => this._mapToDeployedModelInfo(deployedModel, endpoint));
                allDeployedModelsForGivenModel.push(...deployedModels);
            }
            return allDeployedModelsForGivenModel;
        });
    }
    listEndpoints(pageSize, pageToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {};
                if (pageSize) {
                    params['pageSize'] = String(pageSize);
                }
                if (pageToken) {
                    params['pageToken'] = pageToken;
                }
                const location = this.region;
                const parent = `projects/${this.projectId}/locations/${location}`;
                const response = yield this._transportService.submit({
                    path: `${this.apiUrl}/${parent}/endpoints`,
                    params: params,
                });
                return response.result;
            }
            catch (err) {
                utils_1.appLog.error('Unable to list endpoints');
                transport_1.handleApiError(err);
            }
        });
    }
    listModels(pageSize, pageToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {};
                params['orderBy'] = 'create_time desc';
                if (pageSize) {
                    params['pageSize'] = String(pageSize);
                }
                if (pageToken) {
                    params['pageToken'] = pageToken;
                }
                const location = this.region;
                const parent = `projects/${this.projectId}/locations/${location}`;
                const response = yield this._transportService.submit({
                    path: `${this.apiUrl}/${parent}/models`,
                    params: params,
                });
                return {
                    models: (response.result.models || []).map(model => this._createModel(model)),
                    nextPageToken: response.result.nextPageToken,
                };
            }
            catch (err) {
                utils_1.appLog.error('Unable to list models');
                transport_1.handleApiError(err);
            }
        });
    }
    getDataType(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataTypeMap = {
                TABLE: 'tabular',
                TEXT: 'text',
                IMAGE: 'image',
            };
            try {
                // Get deployed model from given endpoint and use API to get origin model
                if (!endpoint.deployedModels ||
                    endpoint.deployedModels.length === 0 ||
                    !endpoint.deployedModels[0].model) {
                    return '';
                }
                const parsedModelId = utils_2.parseIdFromName(endpoint.deployedModels[0].model);
                const model = yield this._getModel(parsedModelId);
                if (!model || !model.trainingPipeline) {
                    return '';
                }
                // Get training pipeline from API using pipeline ID from model
                const parsedPipelineId = utils_2.parseIdFromName(model.trainingPipeline);
                const trainingPipeline = yield this._getTrainingPipeline(parsedPipelineId);
                if (!trainingPipeline ||
                    !trainingPipeline.inputDataConfig ||
                    !trainingPipeline.inputDataConfig.datasetId) {
                    return '';
                }
                // Get dataset from API using training pipeline
                const datasetId = trainingPipeline.inputDataConfig.datasetId;
                const dataset = yield this._getDataset(datasetId);
                if (!dataset ||
                    !dataset.labels ||
                    Object.values(dataset.labels).length === 0) {
                    return '';
                }
                // Determine data type of items in dataset
                const dataType = dataset.labels['aiplatform.googleapis.com/dataset_metadata_schema'];
                return dataTypeMap[dataType];
            }
            catch (err) {
                return '';
            }
        });
    }
    uploadModel(customModel) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!customModel.artifactUri) {
                throw new Error('artifactUri field must be populated before uploading Model');
            }
            try {
                if (customModel.artifactUri.substring(0, GCS_PREFIX_LENGTH) !== GCS_PREFIX) {
                    const gcsPath = [
                        `${GCS_PREFIX}${this.bucketName}`,
                        customModel.displayName || `custom_model_${Date.now()}`,
                        customModel.artifactUri,
                    ].join('/');
                    yield this.uploadLocalModel(customModel.artifactUri, gcsPath);
                    customModel.artifactUri = gcsPath;
                }
                const location = this.region;
                const parent = `projects/${this.projectId}/locations/${location}`;
                const response = yield this._transportService.submit({
                    path: `${this.apiUrl}/${parent}/models:upload`,
                    method: transport_1.POST,
                    body: this._buildUploadModelRequest(customModel),
                });
                if (!response.result) {
                    throw 'Unable to upload model';
                }
                const modelObscureName = (_a = response.result.name) === null || _a === void 0 ? void 0 : _a.split('/operations/')[1];
                if (!modelObscureName)
                    throw 'Unable to parse name from endpoint';
                this.waitForActivityInPanel({
                    type: activity_log_service_1.ActivityType.OPERATION,
                    operation: response.result,
                    description: `Upload model (${customModel.displayName || modelObscureName})`,
                    pollUrl: `${this.apiUrl}/${response.result.name}`,
                    link: utils_2.CONSOLE_LINK_MODELS_PAGE,
                });
            }
            catch (err) {
                transport_1.handleApiError(err);
            }
        });
    }
    createEndpoint(endpointName) {
        return __awaiter(this, void 0, void 0, function* () {
            const location = this.region;
            const parent = `projects/${this.projectId}/locations/${location}`;
            try {
                const response = yield this._transportService.submit({
                    path: `https://${location}-aiplatform.googleapis.com/v1/${parent}/endpoints`,
                    params: {},
                    method: transport_1.POST,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        displayName: endpointName,
                    }),
                });
                if (!response.result) {
                    throw 'Unable to create endpoint';
                }
                return response;
            }
            catch (err) {
                utils_1.appLog.error('Unable to create an endpoint');
                transport_1.handleApiError(err);
            }
        });
    }
    deployModel(model, deployData) {
        return __awaiter(this, void 0, void 0, function* () {
            const location = this.region;
            const parent = `${deployData.endpointName}:deployModel`;
            try {
                const deployedModel = {
                    model: model.name,
                };
                if (model.useDedicatedResources) {
                    deployedModel.dedicatedResources = {
                        machineSpec: { machineType: deployData.machineType },
                        minReplicaCount: deployData.minNodes,
                        maxReplicaCount: deployData.maxNodes,
                    };
                }
                else {
                    deployedModel.automaticResources = {
                        minReplicaCount: deployData.minNodes,
                        maxReplicaCount: deployData.maxNodes,
                    };
                }
                const response = yield this._transportService.submit({
                    path: `https://${location}-aiplatform.googleapis.com/v1/${parent}`,
                    params: {},
                    method: transport_1.POST,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        deployedModel,
                        trafficSplit: deployData.trafficSplits,
                    }),
                });
                if (!response.result) {
                    throw 'Unable to deploy to endpoint';
                }
                return response;
            }
            catch (err) {
                utils_1.appLog.log(err);
                transport_1.handleApiError(err);
            }
        });
    }
    createEndpointAndPollTillDone(endpointName) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.createEndpoint(endpointName);
            const endpointFullName = ((_a = response.result.name) === null || _a === void 0 ? void 0 : _a.split('/operations')[0]) || '';
            const endpointObscureName = utils_2.parseIdFromName(endpointFullName);
            this.waitForActivityInPanel({
                type: activity_log_service_1.ActivityType.OPERATION,
                operation: response.result,
                description: `Create endpoint (${endpointName || endpointObscureName})`,
                pollUrl: `${this.apiUrl}/${response.result.name}`,
                link: utils_2.getConsoleLinkForEndpoint(this.region, endpointObscureName, this.projectId),
            });
            const result = yield this._operationService.pollAndParseOperation(response, `${this.apiUrl}/${response.result.name}`);
            if (result.error) {
                return { isError: true, result: result.error };
            }
            return { result: endpointFullName };
        });
    }
    deployModelAndShowInPanel(model, deployData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.deployModel(model, deployData);
            const endpointObscureName = utils_2.parseIdFromName(deployData.endpointName);
            this.waitForActivityInPanel({
                type: activity_log_service_1.ActivityType.OPERATION,
                operation: response.result,
                description: `Deploy model (${model.displayName}) to endpoint (${deployData.endpointDisplayName || endpointObscureName})`,
                pollUrl: `${this.apiUrl}/${response.result.name}`,
                link: utils_2.getConsoleLinkForEndpoint(this.region, endpointObscureName, this.projectId),
            });
        });
    }
    isAPIEnabled() {
        return this._apiService.isVertexAPIEnabled();
    }
    enableAPI() {
        return this._apiService.enableVertexAPI();
    }
    //private methods
    _parseLocation(location) {
        if (!location) {
            return '';
        }
        const stringComponents = location.split('-');
        return stringComponents[0] + '-' + stringComponents[1];
    }
    //helper methods
    _getEndpoint(endpointId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this._transportService.submit({
                    path: `${this.apiUrl}/${endpointId}`,
                    params: {},
                });
                return response.result;
            }
            catch (err) {
                return undefined;
            }
        });
    }
    _getDataset(dataset) {
        return __awaiter(this, void 0, void 0, function* () {
            const location = this.region;
            const parent = `projects/${this.projectId}/locations/${location}/datasets/${dataset}`;
            const response = yield this._transportService.submit({
                path: `${this.apiUrl}/${parent}`,
                params: {},
            });
            return response.result;
        });
    }
    _getTrainingPipeline(trainingPipeline) {
        return __awaiter(this, void 0, void 0, function* () {
            const location = this.region;
            const parent = `projects/${this.projectId}/locations/${location}/trainingPipelines/${trainingPipeline}`;
            const response = yield this._transportService.submit({
                path: `${this.apiUrl}/${parent}`,
                params: {},
            });
            return response.result;
        });
    }
    _getModel(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const location = this.region;
            const parent = `projects/${this.projectId}/locations/${location}/models/${model}`;
            const response = yield this._transportService.submit({
                path: `https://${location}-aiplatform.googleapis.com/v1/${parent}`,
                params: {},
            });
            return response.result;
        });
    }
    uploadLocalModel(localPath, gcsPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = yield this._docManager.services.contents.get(localPath);
                const gcsModel = Object.assign(Object.assign({}, model), { path: gcsPath.replace(GCS_PREFIX, '') });
                yield this._gcsHandlerService.save(gcsModel.path, gcsModel);
                return true;
            }
            catch (err) {
                utils_1.appLog.error(`Unable to upload custom model to ${gcsPath}`);
                transport_1.handleApiError(err);
            }
        });
    }
    //helper object mapping methods
    _buildUploadModelRequest(customModel) {
        var _a;
        const folderPath = (_a = customModel.artifactUri) === null || _a === void 0 ? void 0 : _a.split('/');
        folderPath === null || folderPath === void 0 ? void 0 : folderPath.pop();
        return {
            model: {
                displayName: customModel.displayName,
                containerSpec: {
                    imageUri: customModel.imageUri,
                },
                artifactUri: (folderPath === null || folderPath === void 0 ? void 0 : folderPath.join('/')) || '',
            },
        };
    }
    _mapToDeployedModelInfo(deployedModel, endpoint) {
        return {
            createTime: deployedModel.createTime || '',
            endpointID: endpoint.name || '',
            endpointName: endpoint.displayName || '',
            modelID: deployedModel.model || '',
            modelName: deployedModel.displayName || '',
            trafficSplit: endpoint.trafficSplit && deployedModel.id
                ? endpoint.trafficSplit[deployedModel.id]
                : 'Not found. Check cloud console for more information',
        };
    }
    _createModel(model) {
        const supportedDeploymentResourcesTypes = model.supportedDeploymentResourcesTypes;
        let useDedicatedResources = false;
        if (supportedDeploymentResourcesTypes &&
            supportedDeploymentResourcesTypes.length === 1) {
            if (supportedDeploymentResourcesTypes[0] === 'DEDICATED_RESOURCES') {
                useDedicatedResources = true;
            }
        }
        return {
            id: utils_2.parseIdFromName(model.name || ''),
            name: model.name,
            displayName: model.displayName,
            useDedicatedResources,
            updateTime: model.updateTime || model.createTime,
            deployedModels: model.deployedModels,
            predictSchemata: model.predictSchemata,
        };
    }
}
exports.VertexAIService = VertexAIService;
