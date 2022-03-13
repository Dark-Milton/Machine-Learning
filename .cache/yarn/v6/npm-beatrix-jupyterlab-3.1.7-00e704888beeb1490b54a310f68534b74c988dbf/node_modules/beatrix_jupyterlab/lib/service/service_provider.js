"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProvider = exports.SERVICE_NOT_SET_ERROR_MSG = void 0;
exports.SERVICE_NOT_SET_ERROR_MSG = 'Service not set in provider';
class ServiceProvider {
    static get activityLogService() {
        if (!ServiceProvider._activityLogService)
            throw exports.SERVICE_NOT_SET_ERROR_MSG;
        return ServiceProvider._activityLogService;
    }
    static set activityLogService(value) {
        ServiceProvider._activityLogService = value;
    }
    static get apiService() {
        if (!ServiceProvider._apiService)
            throw exports.SERVICE_NOT_SET_ERROR_MSG;
        return ServiceProvider._apiService;
    }
    static set apiService(value) {
        ServiceProvider._apiService = value;
    }
    static get bigQueryService() {
        if (!ServiceProvider._bigQueryService)
            throw exports.SERVICE_NOT_SET_ERROR_MSG;
        return ServiceProvider._bigQueryService;
    }
    static set bigQueryService(value) {
        ServiceProvider._bigQueryService = value;
    }
    static get executorService() {
        if (!ServiceProvider._executorService)
            throw exports.SERVICE_NOT_SET_ERROR_MSG;
        return ServiceProvider._executorService;
    }
    static set executorService(value) {
        ServiceProvider._executorService = value;
    }
    static get gcsHandlerService() {
        if (!ServiceProvider._gcsHandlerService)
            throw exports.SERVICE_NOT_SET_ERROR_MSG;
        return ServiceProvider._gcsHandlerService;
    }
    static set gcsHandlerService(value) {
        ServiceProvider._gcsHandlerService = value;
    }
    static get gcsService() {
        if (!ServiceProvider._gcsService)
            throw exports.SERVICE_NOT_SET_ERROR_MSG;
        return ServiceProvider._gcsService;
    }
    static set gcsService(value) {
        ServiceProvider._gcsService = value;
    }
    static get hardwareService() {
        if (!ServiceProvider._hardwareService)
            throw exports.SERVICE_NOT_SET_ERROR_MSG;
        return ServiceProvider._hardwareService;
    }
    static set hardwareService(value) {
        ServiceProvider._hardwareService = value;
    }
    static get operationService() {
        if (!ServiceProvider._operationService)
            throw exports.SERVICE_NOT_SET_ERROR_MSG;
        return ServiceProvider._operationService;
    }
    static set operationService(value) {
        ServiceProvider._operationService = value;
    }
    static get publishedService() {
        if (!ServiceProvider._publishedService)
            throw exports.SERVICE_NOT_SET_ERROR_MSG;
        return ServiceProvider._publishedService;
    }
    static set publishedService(value) {
        ServiceProvider._publishedService = value;
    }
    static get vertexAIService() {
        if (!ServiceProvider._vertexAIService)
            throw exports.SERVICE_NOT_SET_ERROR_MSG;
        return ServiceProvider._vertexAIService;
    }
    static set vertexAIService(value) {
        ServiceProvider._vertexAIService = value;
    }
    static get environmentService() {
        if (!ServiceProvider._environmentService)
            throw exports.SERVICE_NOT_SET_ERROR_MSG;
        return ServiceProvider._environmentService;
    }
    static set environmentService(value) {
        ServiceProvider._environmentService = value;
    }
}
exports.ServiceProvider = ServiceProvider;
