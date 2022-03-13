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
exports.getNotebookProviderForRuntime = void 0;
const auth_dialog_1 = require("./components/auth_dialog");
const notebook_provider_1 = require("./service/notebook_provider");
const transport_1 = require("./service/transport");
/**
 * Handles the authentication procedures needed to activate on a Runtime.
 * This function will remain in a loop that continually tries to authenticate
 * the user and access the specified Runtime. If either step fails, a sign
 * out will occur and the process will be repeated.
 */
function getNotebookProviderForRuntime(transportService, authService, notebookName, apiEndpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        let notebookProvider;
        let errorMessage;
        while (!notebookProvider) {
            if (!(yield authService.checkSignInStatus())) {
                yield auth_dialog_1.showAuthDialog(authService, errorMessage);
            }
            try {
                notebookProvider = yield notebook_provider_1.NotebookProvider.build(transportService, notebookName, apiEndpoint);
            }
            catch (e) {
                // Sign out so that the process can be attempted again
                yield authService.signOut();
                errorMessage =
                    transport_1.getMessageFromApiError(e) || 'Unknown error during sign-in';
            }
        }
        return notebookProvider;
    });
}
exports.getNotebookProviderForRuntime = getNotebookProviderForRuntime;
