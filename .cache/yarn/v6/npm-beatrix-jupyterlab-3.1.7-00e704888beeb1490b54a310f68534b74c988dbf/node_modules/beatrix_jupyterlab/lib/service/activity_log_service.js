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
exports.ActivityLogService = exports.ActivityType = void 0;
var ActivityType;
(function (ActivityType) {
    ActivityType[ActivityType["OPERATION"] = 0] = "OPERATION";
    ActivityType[ActivityType["DEPLOYMENT"] = 1] = "DEPLOYMENT";
    ActivityType[ActivityType["CUSTOM_KERNEL_LOAD"] = 2] = "CUSTOM_KERNEL_LOAD";
})(ActivityType = exports.ActivityType || (exports.ActivityType = {}));
/**
 * Class to interact with GCP services that support long operations behaviors.
 */
class ActivityLogService {
    constructor(_notebookProvider, _openActivityLogSignal, _environmentService) {
        this._notebookProvider = _notebookProvider;
        this._openActivityLogSignal = _openActivityLogSignal;
        this._environmentService = _environmentService;
        this.activities = [];
        this._transportService = this._notebookProvider.serverTransportService;
    }
    addNew(activity) {
        this.activities.push(activity);
    }
    getSignal() {
        return this._openActivityLogSignal;
    }
    openPanel() {
        this._openActivityLogSignal.emit();
    }
    updateAndGetActivites() {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            for (const activity of this.activities) {
                promises.push(this._getLatestActivity(activity));
            }
            return yield Promise.all(promises);
        });
    }
    _getLatestActivity(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (activity.type) {
                case ActivityType.OPERATION:
                    return this._getLatestOperation(activity);
                case ActivityType.CUSTOM_KERNEL_LOAD:
                    return this._getCustomKernelStatus(activity);
                default:
                    return activity;
            }
        });
    }
    _getLatestOperation(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(activity.operation && activity.pollUrl) || activity.operation.done) {
                return activity;
            }
            activity.operation = yield this._updateOperationIfPending(activity.pollUrl, activity.operation);
            return activity;
        });
    }
    _getCustomKernelStatus(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (activity.isKernelReady || !activity.customKernelImage) {
                return activity;
            }
            yield this._environmentService.refreshKernelSpecs();
            const kernelDetails = yield this._environmentService.getKernelDetails(activity.customKernelImage);
            if (kernelDetails) {
                activity.isKernelReady = true;
                activity.description = `Custom kernel ${kernelDetails.displayName} is ready to use`;
            }
            return activity;
        });
    }
    _updateOperationIfPending(path, operation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this._transportService.submit({
                    path,
                });
                return response.result;
            }
            catch (err) {
                return Object.assign({ error: {
                        code: 500,
                        message: `Checking activity status failed. It will be tried again ${err}`,
                    } }, operation);
            }
        });
    }
}
exports.ActivityLogService = ActivityLogService;
