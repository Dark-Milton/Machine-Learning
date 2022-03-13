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
exports.ApiService = exports.SERVICE_MANAGER = void 0;
const utils_1 = require("../utils");
const transport_1 = require("./transport");
exports.SERVICE_MANAGER = 'https://servicemanagement.googleapis.com/v1';
/**
 * A service for common actions and calls involving APIs.
 */
class ApiService {
    constructor(_notebookProvider, _operationService) {
        this._notebookProvider = _notebookProvider;
        this._operationService = _operationService;
        this._transportService = this._notebookProvider.serverTransportService;
        this._isApiEnabledCache = new Map();
    }
    get projectId() {
        return this._notebookProvider.projectId;
    }
    get region() {
        return this._parseLocation(this._notebookProvider.locationId);
    }
    isAPIEnabled(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._isApiEnabledCache.has(path)) {
                let result = false;
                try {
                    yield this._transportService.submit({ path });
                    result = true;
                }
                catch (err) {
                    utils_1.appLog.warn(`API with path ${path} is not available `, err);
                }
                this._isApiEnabledCache.set(path, result);
            }
            return !!this._isApiEnabledCache.get(path);
        });
    }
    enableAPI(service) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pendingOperation = yield this._transportService.submit({
                    path: `${exports.SERVICE_MANAGER}/services/${service}:enable`,
                    method: transport_1.POST,
                    body: { consumerId: `project:${this.projectId}` },
                });
                return yield this._operationService.pollAndParseOperation(pendingOperation, `${exports.SERVICE_MANAGER}/${pendingOperation.result.name}`);
            }
            catch (err) {
                utils_1.appLog.error(`Unable to enable necessary API ${service}`, err);
                transport_1.handleApiError(err);
            }
        });
    }
    isVertexAPIEnabled() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.isAPIEnabled(`https://${this.region}-aiplatform.googleapis.com/v1/projects/${this.projectId}/locations/${this.region}/customJobs`);
        });
    }
    enableVertexAPI() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.enableAPI('aiplatform.googleapis.com');
        });
    }
    _parseLocation(location) {
        if (!location) {
            return '';
        }
        const stringComponents = location.split('-');
        return stringComponents[0] + '-' + stringComponents[1];
    }
}
exports.ApiService = ApiService;
