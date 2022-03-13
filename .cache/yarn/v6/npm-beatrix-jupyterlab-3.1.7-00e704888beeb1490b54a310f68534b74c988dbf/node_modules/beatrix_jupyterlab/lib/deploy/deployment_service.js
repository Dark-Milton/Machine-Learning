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
exports.DeploymentService = void 0;
const services_1 = require("@jupyterlab/services");
const transport_1 = require("../service/transport");
const DEPLOYMENT_DIRECTORY = 'imported_files';
/** Class to manage Deployment HTTP methods. */
class DeploymentService {
    constructor() {
        this.serverSettings = services_1.ServerConnection.makeSettings();
        this.serverUrl = `${this.serverSettings.baseUrl}aipn/v2/deploy2`;
    }
    /** Initiates a deployment process on the server. */
    startDeployment(url, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filename) {
                const baseName = new URL(url).pathname.split('/').pop();
                filename = `${DEPLOYMENT_DIRECTORY}/${baseName}`;
            }
            const response = yield services_1.ServerConnection.makeRequest(this.serverUrl, {
                body: JSON.stringify({ url, filename }),
                method: transport_1.POST,
            }, this.serverSettings);
            if (!response.ok) {
                const error = yield this._getErrorMessage(response);
                throw new Error(`Unable to start Deployment from ${url}: ${error}`);
            }
            return this._convertBodyToDeployment(yield response.json());
        });
    }
    /** Retrives the status of an existing deployment process. */
    getDeployment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.ServerConnection.makeRequest(`${this.serverUrl}/${id}`, {}, this.serverSettings);
            if (!response.ok) {
                const error = yield this._getErrorMessage(response);
                throw new Error(`Unable to get Deployment ${id}: ${error}`);
            }
            return this._convertBodyToDeployment(yield response.json());
        });
    }
    _convertBodyToDeployment(body) {
        return {
            id: body.id,
            startTimeMs: body.start_time_ms,
            endTimeMs: body.end_time_ms,
            url: body.url,
            filename: body.filename,
            inProgress: body.in_progress,
            bytesWritten: body.bytes_written,
            status: body.status,
        };
    }
    /** Tries to retrieve the "error" JSON property from the response. */
    _getErrorMessage(response) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const errorBody = yield response.json().catch(() => ({}));
            return (_a = errorBody.error) !== null && _a !== void 0 ? _a : 'UNKNOWN';
        });
    }
}
exports.DeploymentService = DeploymentService;
