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
exports.getRefreshCredConnectionLost = exports.RefreshCredConnectionLost = void 0;
const application_1 = require("@jupyterlab/application");
const apputils_1 = require("@jupyterlab/apputils");
const services_1 = require("@jupyterlab/services");
const coreutils_1 = require("@jupyterlab/coreutils");
class RefreshCredConnectionLost {
    isCredentialExpired() {
        return __awaiter(this, void 0, void 0, function* () {
            const serverSettings = services_1.ServerConnection.makeSettings();
            const requestUrl = coreutils_1.URLExt.join(serverSettings.baseUrl, '/api/status');
            try {
                const response = yield fetch(requestUrl, {
                    redirect: 'manual',
                });
                return response.type === 'opaqueredirect';
            }
            catch (err) {
                console.log('Error while refreshing credentials:', err);
            }
            return false;
        });
    }
    reloadWindow() {
        window.location.reload();
    }
    refreshToken() {
        const serverSettings = services_1.ServerConnection.makeSettings();
        const endpoint = '/api/status';
        const requestUrl = coreutils_1.URLExt.join(serverSettings.baseUrl, endpoint);
        const newWindow = window.open(requestUrl, 'refresh', 'width=475,height=500,left=375,top=330');
        if (newWindow) {
            newWindow.addEventListener('load', event => {
                if (event.target.URL.includes(endpoint)) {
                    newWindow.close();
                }
            });
            newWindow.focus();
        }
        else {
            this.reloadWindow();
        }
    }
    connectionLost(manager, err, translator) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isCredentialExpired()) {
                const title = 'Refresh Credentials';
                const networkMsg = 'A connection to the Jupyter server could not be established.\n' +
                    'Reload the page to refresh credentials.\n';
                const result = yield apputils_1.showDialog({
                    title: title,
                    body: networkMsg,
                    buttons: [
                        apputils_1.Dialog.cancelButton({ label: 'Dismiss' }),
                        apputils_1.Dialog.okButton({ label: 'Reload' }),
                    ],
                });
                if (result.button.accept) {
                    this.refreshToken();
                }
            }
            else {
                return application_1.ConnectionLost(manager, err, translator);
            }
        });
    }
}
exports.RefreshCredConnectionLost = RefreshCredConnectionLost;
/* Return closure to override the ConnectLost behavior */
function getRefreshCredConnectionLost(refreshCred) {
    let checkCredentials = false;
    return function (manager, err, translator) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!checkCredentials) {
                checkCredentials = true;
                yield refreshCred.connectionLost(manager, err, translator);
                checkCredentials = false;
            }
        });
    };
}
exports.getRefreshCredConnectionLost = getRefreshCredConnectionLost;
