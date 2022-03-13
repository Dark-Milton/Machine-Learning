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
exports.appLog = exports.isError = exports.logUnhandledRejection = exports.logError = exports.sleep = exports.getApiEndpointForEnvironment = exports.formatMs = exports.formatBytes = exports.formatTimestamp = exports.formatTime = exports.formatDate = exports.getMetadata = exports.PLUGIN_PREFIX = exports.CLOUD_CONSOLE = exports.removeFromList = exports.findOptionByValue = void 0;
const services_1 = require("@jupyterlab/services");
const luxon_1 = require("luxon");
const coreutils_1 = require("@jupyterlab/coreutils");
const AIPN_PREFIX = 'aipn/v2/';
const PROD_NOTEBOOKS_HOST = 'notebooks.googleapis.com';
const API_ENVIRONMENT_MAP = new Map([
    ['AUTOPUSH', 'autopush-notebooks-googleapis.sandbox.google.com'],
    ['STAGING', 'staging-notebooks-googleapis.sandbox.google.com'],
    ['PROD', PROD_NOTEBOOKS_HOST],
]);
/** Returns an option whose value matches the given value. */
function findOptionByValue(options, value) {
    if (value === undefined)
        return undefined;
    return options.find(option => option.value === value);
}
exports.findOptionByValue = findOptionByValue;
/** Removes the item from the list if found */
function removeFromList(list, value) {
    const index = list.indexOf(value);
    if (index >= 0) {
        list.splice(index, 1);
    }
}
exports.removeFromList = removeFromList;
/** Link to Cloud Console */
exports.CLOUD_CONSOLE = 'https://console.cloud.google.com';
/** Prefix for all plugin IDs that allows the entire extension to be disabled */
exports.PLUGIN_PREFIX = 'beatrix_jupyterlab';
/**
 * Retrieves Metadata from the VM. By default, will use the /aipn/v2/metadata
 * route which was updated in
 * https://dlvm-review.googlesource.com/c/binaries-build/+/15200. If that route
 * does not return the expected VmMetadata structure, the /aipn/v2/details route
 * will be used.
 */
function getMetadata(useDetailsRoute = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const defaultSettings = services_1.ServerConnection.makeSettings();
        const path = useDetailsRoute ? 'details' : 'metadata';
        const response = yield services_1.ServerConnection.makeRequest(`${defaultSettings.baseUrl}aipn/v2/${path}`, {}, defaultSettings);
        if (!response.ok) {
            throw { result: yield response.text() };
        }
        const jsonResult = yield response.json();
        if (!(useDetailsRoute || jsonResult.instance)) {
            return getMetadata(true);
        }
        return jsonResult;
    });
}
exports.getMetadata = getMetadata;
function formatDate(dateString) {
    const date = luxon_1.DateTime.fromISO(dateString);
    return date.toLocaleString(luxon_1.DateTime.DATETIME_MED_WITH_SECONDS);
}
exports.formatDate = formatDate;
function formatTime(dateString) {
    const date = luxon_1.DateTime.fromISO(dateString);
    return date.toLocaleString(luxon_1.DateTime.TIME_SIMPLE);
}
exports.formatTime = formatTime;
function formatTimestamp(timestamp) {
    const date = luxon_1.DateTime.fromMillis(timestamp);
    return date.toLocaleString(luxon_1.DateTime.TIME_SIMPLE);
}
exports.formatTimestamp = formatTimestamp;
function formatBytes(numBytes, numDecimals = 2) {
    if (numBytes === 0)
        return '0 Bytes';
    const d = Math.floor(Math.log(numBytes) / Math.log(1024));
    return (parseFloat((numBytes / Math.pow(1024, d)).toFixed(numDecimals)) +
        ' ' +
        ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]);
}
exports.formatBytes = formatBytes;
function formatMs(ms) {
    const days = ms / 86400000;
    return `${days} day${days > 1 ? 's' : ''} 0 hr`;
}
exports.formatMs = formatMs;
/** Returns the appropriate API endpoint for the environment. */
function getApiEndpointForEnvironment(apiEnvironment) {
    const host = API_ENVIRONMENT_MAP.get(apiEnvironment) || PROD_NOTEBOOKS_HOST;
    return `https://${host}/v1`;
}
exports.getApiEndpointForEnvironment = getApiEndpointForEnvironment;
/** Returns a Promise that will resolve in a fixed amount of time. */
function sleep(timeInMs = 1000) {
    return new Promise(r => setTimeout(r, timeInMs));
}
exports.sleep = sleep;
function logError(errorEvent) {
    return __awaiter(this, void 0, void 0, function* () {
        const serverSettings = services_1.ServerConnection.makeSettings();
        const requestUrl = coreutils_1.URLExt.join(serverSettings.baseUrl, AIPN_PREFIX, 'log');
        services_1.ServerConnection.makeRequest(requestUrl, {
            body: JSON.stringify({
                level: 'error',
                message: errorEvent.message,
                filename: errorEvent.filename,
                lineno: errorEvent.lineno,
                colno: errorEvent.colno,
                error: errorEvent.error,
                stack: errorEvent.error.stack,
            }),
            method: 'POST',
        }, serverSettings);
    });
}
exports.logError = logError;
function logUnhandledRejection(event) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof event.reason === 'object' && event.reason.name === 'Error') {
            exports.appLog.error(`Unhandled promise rejection: ${event.reason.message}`);
        }
        else {
            exports.appLog.error(`Unhandled promise rejection: ${JSON.stringify(event.reason)}`);
        }
        event.preventDefault();
    });
}
exports.logUnhandledRejection = logUnhandledRejection;
const SEND_APPLOG_LEVEL_TO_BACKEND = new Set([
    'warning',
    'error',
]);
class AppLog {
    constructor() {
        this._sendToBackendEnabled = true;
    }
    set sendToBackendEnabled(value) {
        this._sendToBackendEnabled = value;
    }
    sendLogMessage(message, level) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._sendToBackendEnabled || !SEND_APPLOG_LEVEL_TO_BACKEND.has(level))
                return;
            const serverSettings = services_1.ServerConnection.makeSettings();
            const requestUrl = coreutils_1.URLExt.join(serverSettings.baseUrl, AIPN_PREFIX, 'log');
            services_1.ServerConnection.makeRequest(requestUrl, {
                body: JSON.stringify({
                    level,
                    message,
                }),
                method: 'POST',
            }, serverSettings);
        });
    }
    messageToString(message, ...optionalParams) {
        return [message, ...optionalParams]
            .map(arg => {
            return typeof arg === 'object' && (JSON || {}).stringify
                ? JSON.stringify(arg)
                : arg;
        })
            .join(' ');
    }
    debug(message, ...optionalParams) {
        console.debug(message, ...optionalParams);
        this.sendLogMessage(this.messageToString(message, ...optionalParams), 'debug');
    }
    info(message, ...optionalParams) {
        console.info(message, ...optionalParams);
        this.sendLogMessage(this.messageToString(message, ...optionalParams), 'info');
    }
    log(message, ...optionalParams) {
        console.log(message, ...optionalParams);
        this.sendLogMessage(this.messageToString(message, ...optionalParams), 'info');
    }
    error(message, ...optionalParams) {
        console.error(message, ...optionalParams);
        this.sendLogMessage(this.messageToString(message, ...optionalParams), 'error');
    }
    warn(message, ...optionalParams) {
        console.warn(message, ...optionalParams);
        this.sendLogMessage(this.messageToString(message, ...optionalParams), 'warning');
    }
}
function isError(candidate) {
    return candidate.isError === true;
}
exports.isError = isError;
exports.appLog = new AppLog();
