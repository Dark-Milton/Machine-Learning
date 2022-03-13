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
exports.HardwareService = exports.COMPUTE_ENGINE_API_PATH = void 0;
const services_1 = require("@jupyterlab/services");
const accelerator_types_1 = require("../data/accelerator_types");
const transport_1 = require("../../service/transport");
const utils_1 = require("../../utils");
exports.COMPUTE_ENGINE_API_PATH = 'https://compute.googleapis.com/compute/v1';
/**
 * Returns information about the underlying Notebook as well as helper
 * methods for other hardware resource types.
 */
class HardwareService {
    constructor(notebookProvider) {
        this.notebookProvider = notebookProvider;
        this.serverSettings = services_1.ServerConnection.makeSettings();
        this._transportService = this.notebookProvider.serverTransportService;
        this.projectId = this.notebookProvider.projectId;
        this.locationId = this.notebookProvider.locationId;
        this.name = this.notebookProvider.notebookName;
        this.zone = this.notebookProvider.notebookSnapshot.zone;
        this.detailsUrl = `${this.serverSettings.baseUrl}aipn/v2/details`;
        this.zoneName = `projects/${this.projectId}/zones/${this.zone}`;
        this.runtimeName = `projects/${this.projectId}/locations/${this.locationId}/runtimes/${this.name}`;
    }
    getVmDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield services_1.ServerConnection.makeRequest(this.detailsUrl, {}, this.serverSettings);
            if (!response.ok) {
                throw new Error(`Unable to retrieve details from ${this.detailsUrl}`);
            }
            const details = (yield response.json());
            // Replace project and name since they reflect the tenant VM
            details.project = {
                numericProjectId: -1,
                projectId: this.projectId,
            };
            details.instance.name = this.name;
            if (!details.instance.attributes.framework) {
                details.instance.attributes.framework = 'Managed Runtime';
            }
            return details;
        });
    }
    /**
     * Retrieves a list of machine types available for the specified project in the specified region.
     */
    getMachineTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.machineTypesPromise) {
                return this.machineTypesPromise;
            }
            try {
                const response = yield this._transportService.submit({
                    path: `${exports.COMPUTE_ENGINE_API_PATH}/${this.zoneName}/machineTypes`,
                    params: {
                        filter: 'isSharedCpu = false',
                    },
                });
                this.machineTypesPromise = Promise.resolve(response.result.items || []);
                return this.machineTypesPromise;
            }
            catch (err) {
                utils_1.appLog.error(`Unable to retrieve machine types.`);
                return [];
            }
        });
    }
    /**
     * Retrieves a list of accelerators available for the specified project in the specified region.
     */
    getAcceleratorTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.acceleratorTypesPromise) {
                return this.acceleratorTypesPromise;
            }
            try {
                const response = yield this._transportService.submit({
                    path: `${exports.COMPUTE_ENGINE_API_PATH}/${this.zoneName}/acceleratorTypes`,
                });
                this.acceleratorTypesPromise = Promise.resolve((response.result.items || []));
                return this.acceleratorTypesPromise;
            }
            catch (err) {
                utils_1.appLog.error(`Unable to retrieve accelerator types.`);
                return [];
            }
        });
    }
    /** Switches the hardware configuration of the Runtime. */
    switchRuntime(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const switchRuntimeRequest = Object.assign(Object.assign({}, (options.machineType ? { machineType: options.machineType } : {})), (options.gpuType && options.coreCount
                ? {
                    acceleratorConfig: {
                        type: accelerator_types_1.acceleratorNameToEnum(options.gpuType),
                        coreCount: options.coreCount,
                    },
                }
                : {}));
            const request = {
                path: `${this.notebookProvider.apiEndpoint}/${this.runtimeName}:switch`,
                method: 'POST',
                body: switchRuntimeRequest,
            };
            try {
                return (yield this._transportService.submit(request)).result;
            }
            catch (err) {
                transport_1.handleApiError(err);
            }
        });
    }
    /** Gets an operation. */
    getOperation(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this._transportService.submit({
                    path: `${this.notebookProvider.apiEndpoint}/${name}`,
                })).result;
            }
            catch (err) {
                transport_1.handleApiError(err);
            }
        });
    }
}
exports.HardwareService = HardwareService;
