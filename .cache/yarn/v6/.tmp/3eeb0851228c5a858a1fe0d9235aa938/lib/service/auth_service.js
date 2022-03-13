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
exports.AuthService = void 0;
const services_1 = require("@jupyterlab/services");
class AuthService {
    constructor(projectId, serverSettings = services_1.ServerConnection.makeSettings()) {
        this.serverSettings = serverSettings;
        this.projectId = projectId;
        this.serverUrl = `${this.serverSettings.baseUrl}aipn/v2/auth/`;
    }
    checkSignInStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            const signInUrl = `${this.serverUrl}check/${this.projectId}`;
            const response = yield services_1.ServerConnection.makeRequest(signInUrl, {}, this.serverSettings);
            if (!response.ok) {
                throw new Error(`Unable to check sign in status from ${signInUrl}`);
            }
            const result = (yield response.json());
            return result.isSignedIn;
        });
    }
    initiateSignIn() {
        return __awaiter(this, void 0, void 0, function* () {
            const initiateSignIn = `${this.serverUrl}login`;
            const response = yield services_1.ServerConnection.makeRequest(initiateSignIn, {}, this.serverSettings);
            if (!response.ok) {
                throw new Error(`Unable to initiate sign in from ${initiateSignIn}`);
            }
            const result = (yield response.json());
            return result.signInUrl;
        });
    }
    provideAuthCode(authCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const signInUrl = `${this.serverUrl}login`;
            const requestInit = {
                body: JSON.stringify({ authCode, projectId: this.projectId }),
                method: 'POST',
            };
            const response = yield services_1.ServerConnection.makeRequest(signInUrl, requestInit, this.serverSettings);
            if (!response.ok) {
                throw new Error(`Unable to provide auth code and project to ${signInUrl}`);
            }
            const result = (yield response.json());
            return result.projectId;
        });
    }
    signOut() {
        return __awaiter(this, void 0, void 0, function* () {
            const signOutUrl = `${this.serverUrl}logout`;
            const requestInit = {
                body: '',
                method: 'POST',
            };
            const response = yield services_1.ServerConnection.makeRequest(signOutUrl, requestInit, this.serverSettings);
            if (!response.ok) {
                throw new Error(`Unable to sign out from ${signOutUrl}`);
            }
            const result = (yield response.json());
            return result.isSignedIn;
        });
    }
}
exports.AuthService = AuthService;
