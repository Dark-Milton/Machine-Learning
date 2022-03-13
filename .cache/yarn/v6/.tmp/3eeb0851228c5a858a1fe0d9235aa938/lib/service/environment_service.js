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
exports.EnvironmentService = void 0;
/**
 * Stores and retrieves environment (kernelspec) details.
 */
class EnvironmentService {
    constructor(kernelSpecManager) {
        this.kernelSpecManager = kernelSpecManager;
        /* Map from kernelspec name to KernelDetails as well as container name */
        this.kernelSpecs = new Map();
    }
    getKernelDetails(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.kernelSpecs.size) {
                yield this.populateKernelSpecs();
            }
            return this.kernelSpecs.get(name);
        });
    }
    /** Refreshes kernelspecs from the server and repopulates the local map. */
    refreshKernelSpecs() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                this.kernelSpecManager.refreshSpecs(),
                this.populateKernelSpecs(),
            ]);
        });
    }
    populateKernelSpecs() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.kernelSpecManager.ready;
            const kernelSpecs = (_a = this.kernelSpecManager.specs) === null || _a === void 0 ? void 0 : _a.kernelspecs;
            if (!kernelSpecs)
                return;
            for (const [name, spec] of Object.entries(kernelSpecs)) {
                if (!spec)
                    continue;
                const kernelDetails = {
                    name,
                    displayName: spec.display_name,
                };
                if (spec === null || spec === void 0 ? void 0 : spec.metadata) {
                    const metadata = spec.metadata;
                    if (metadata['google.kernel_container']) {
                        kernelDetails.container = String(metadata['google.kernel_container']);
                    }
                    if (metadata['google.kernel_name']) {
                        kernelDetails.googleKernelName = String(metadata['google.kernel_name']);
                    }
                }
                this.kernelSpecs.set(name, kernelDetails);
                if (kernelDetails.container) {
                    this.kernelSpecs.set(kernelDetails.container, kernelDetails);
                }
            }
        });
    }
}
exports.EnvironmentService = EnvironmentService;
