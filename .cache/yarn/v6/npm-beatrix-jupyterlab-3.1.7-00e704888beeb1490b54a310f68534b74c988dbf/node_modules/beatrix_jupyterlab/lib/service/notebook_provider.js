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
exports.NotebookProvider = exports.NotebookProviderToken = void 0;
const coreutils_1 = require("@lumino/coreutils");
const signaling_1 = require("@lumino/signaling");
/** DI token for the NotebookProvider class. */
exports.NotebookProviderToken = new coreutils_1.Token('beatrix:NotebookProvider');
/** Factory for services consumed by other extensions. */
class NotebookProvider {
    constructor(serverTransportService, notebook, apiEndpoint) {
        this.serverTransportService = serverTransportService;
        this.apiEndpoint = apiEndpoint;
        this.notebookSignal = new signaling_1.Signal(this);
        this.notebook = notebook;
        const namePieces = notebook.name.split('/');
        this.projectId = namePieces[1];
        this.locationId = namePieces[3];
        this.notebookName = namePieces[namePieces.length - 1];
        this.machineType = notebook.machineType;
        this.acceleratorConfig = notebook.acceleratorConfig;
        this.owner = notebook.owner;
    }
    get notebookSnapshot() {
        return this.notebook;
    }
    get region() {
        const locationPieces = this.locationId.split('-');
        // location is zone (ie. us-central1-a)
        if (locationPieces.length === 3) {
            return locationPieces.slice(0, 2).join('-');
        }
        return this.locationId;
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.notebook = yield NotebookProvider.get(this.serverTransportService, this.notebook.name, this.apiEndpoint);
            this.notebookSignal.emit(this.notebook);
        });
    }
    /** Factory method to build a NotebookProvider instance. */
    static build(serverTransportService, notebookName, apiEndpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            const notebook = yield NotebookProvider.get(serverTransportService, notebookName, apiEndpoint);
            return new NotebookProvider(serverTransportService, notebook, apiEndpoint);
        });
    }
    /** Returns a Notebook. */
    static get(serverTransportService, notebookName, apiEndpoint) {
        return notebookName.includes('/runtimes/')
            ? NotebookProvider.getForRuntime(notebookName, apiEndpoint, serverTransportService)
            : NotebookProvider.getForInstance(notebookName, apiEndpoint, serverTransportService);
    }
    /** Returns a Notebook from a Managed Runtime. */
    static getForRuntime(runtimeName, apiEndpoint, serverTransportService) {
        return __awaiter(this, void 0, void 0, function* () {
            const runtime = (yield serverTransportService.submit({
                path: `${apiEndpoint}/${runtimeName}`,
            })).result;
            const machine = runtime.virtualMachine.virtualMachineConfig;
            const customKernelImages = machine.containerImages
                ? {
                    customKernelImages: machine.containerImages
                        .filter(ci => !!ci.repository)
                        .map(ci => String(ci.repository)),
                }
                : {};
            return Object.assign({ name: runtime.name, zone: machine.zone, state: runtime.state, isManaged: true, owner: runtime.accessConfig.runtimeOwner, proxyUri: runtime.accessConfig.proxyUri, machineType: machine.machineType, diskType: machine.dataDisk.initializeParams.diskType, diskSizeGb: machine.dataDisk.initializeParams.diskSizeGb, acceleratorConfig: machine.acceleratorConfig }, customKernelImages);
        });
    }
    /** Returns a Notebook from a semi-Managed Instance. */
    static getForInstance(instanceName, apiEndpoint, serverTransportService) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const instance = (yield serverTransportService.submit({
                path: `${apiEndpoint}/${instanceName}`,
            })).result;
            const dataDisk = (_a = instance.disks) === null || _a === void 0 ? void 0 : _a.find(d => !d.boot);
            return {
                name: instance.name,
                zone: instanceName.split('/')[3],
                state: instance.state,
                isManaged: false,
                owner: instance.metadata['proxy-user-mail'] || '',
                proxyUri: instance.proxyUri,
                machineType: instance.machineType.split('/').pop() || '',
                diskType: 'DISK_TYPE_UNSPECIFIED',
                diskSizeGb: (dataDisk === null || dataDisk === void 0 ? void 0 : dataDisk.diskSizeGb) || '100',
                acceleratorConfig: instance.acceleratorConfig,
            };
        });
    }
}
exports.NotebookProvider = NotebookProvider;
