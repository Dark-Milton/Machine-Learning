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
exports.ServerProxyTransportService = exports.handleApiError = exports.getMessageFromApiError = exports.isGoogleAPIError = exports.DELETE = exports.PATCH = exports.POST = exports.GET = void 0;
/** Transport layer for API requests to GCP. */
const services_1 = require("@jupyterlab/services");
/** Constant for GET requests */
exports.GET = 'GET';
/** Constant for POST requests */
exports.POST = 'POST';
/** Constant for PATCH requests */
exports.PATCH = 'PATCH';
/** Constant for DELETE requests */
exports.DELETE = 'DELETE';
function isGoogleAPIError(candidate) {
    return !!getMessageFromApiError(candidate);
}
exports.isGoogleAPIError = isGoogleAPIError;
/**
 * Extracts the message from a Google API Error if present.
 * https://cloud.google.com/apis/design/errors#error_codes
 */
function getMessageFromApiError(err) {
    if (err.result && err.result.error) {
        const status = err.result.error.status || err.result.error.code;
        return `${status}: ${err.result.error.message}`;
    }
    return null;
}
exports.getMessageFromApiError = getMessageFromApiError;
/**
 * Handles any error, and if it's a Google API error, returns a friendlier
 * string.
 * @param err
 */
function handleApiError(err) {
    const apiErrorMessage = getMessageFromApiError(err);
    if (apiErrorMessage) {
        throw apiErrorMessage;
    }
    throw err;
}
exports.handleApiError = handleApiError;
const HTTPS = 'https://';
/**
 * TransportService implementation that proxies all requests to the JupyterLab
 * server.
 */
class ServerProxyTransportService {
    constructor() {
        this.serverSettings = services_1.ServerConnection.makeSettings();
        this.proxyUrl = `${this.serverSettings.baseUrl}aipn/v2/proxy/`;
    }
    submit(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = request.path.startsWith(HTTPS)
                ? request.path.slice(HTTPS.length)
                : request.path;
            if (request.params) {
                const params = Object.entries(request.params).map(([k, v]) => `${k}=${encodeURIComponent(v)}`);
                url += `?${params.join('&')}`;
            }
            // Encode the entire GCP URL when issuing the request to JupyterLab
            const body = typeof request.body === 'string'
                ? request.body
                : JSON.stringify(request.body);
            const response = yield services_1.ServerConnection.makeRequest(`${this.proxyUrl}${encodeURIComponent(url)}`, {
                body,
                headers: request.headers,
                method: request.method || exports.GET,
            }, this.serverSettings);
            const { status } = response;
            const result = yield response.json().catch(() => undefined);
            if (!response.ok) {
                throw { result, status };
            }
            return { result: result, status };
        });
    }
}
exports.ServerProxyTransportService = ServerProxyTransportService;
