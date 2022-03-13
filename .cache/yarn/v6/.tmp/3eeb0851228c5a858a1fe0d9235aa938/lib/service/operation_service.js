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
exports.OperationService = void 0;
const utils_1 = require("../utils");
const utils_2 = require("../utils");
const MAX_POLL_TIME_MS = 60 * 1000 * 15; // 15m
const POLL_INTERVAL = 2000;
const POLL_RETRIES = 5;
/**
 * A service for common actions and calls involving operations.
 */
class OperationService {
    constructor(_notebookProvider) {
        this._notebookProvider = _notebookProvider;
        this._transportService = this._notebookProvider.serverTransportService;
        this.apiEndpoint = this._notebookProvider.apiEndpoint;
    }
    pollAndParseOperation(response, operationUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            if (response.result.error) {
                return {
                    error: `${response.result.error.code}: ${response.result.error.message}`,
                };
            }
            if (!response.result.done) {
                const operationName = response.result.name;
                const pollUrl = operationUrl
                    ? operationUrl
                    : `${this.apiEndpoint}/${operationName}`;
                const pollOperationsResponse = yield this._pollOperation(pollUrl);
                if (pollOperationsResponse.error) {
                    return {
                        error: `${pollOperationsResponse.error.code}: ${pollOperationsResponse.error.message}`,
                    };
                }
            }
            return {};
        });
    }
    /**
     * Polls the provided Operation at 1s intervals until it has completed.
     * This method will always resolve an Operation object even if polling fails
     * repeatedly.
     */
    _pollOperation(path) {
        return __awaiter(this, void 0, void 0, function* () {
            let failures = 0;
            let waitTime = 0;
            while (failures < POLL_RETRIES && waitTime < MAX_POLL_TIME_MS) {
                try {
                    const response = yield this._transportService.submit({
                        path,
                    });
                    const { result } = response;
                    if (result.done) {
                        return result;
                    }
                }
                catch (err) {
                    if (++failures === POLL_RETRIES) {
                        utils_2.appLog.error(`Unable to retrieve Operation status from ${path} after ${failures} attempts`);
                        // Return a response mimicking an Operation failure
                        return { error: { code: 500, message: String(err) } };
                    }
                }
                yield utils_1.sleep(POLL_INTERVAL);
                waitTime += POLL_INTERVAL;
            }
            throw new Error(`Operation ${path} failed to complete after  ${MAX_POLL_TIME_MS / 1000}s`);
        });
    }
}
exports.OperationService = OperationService;
