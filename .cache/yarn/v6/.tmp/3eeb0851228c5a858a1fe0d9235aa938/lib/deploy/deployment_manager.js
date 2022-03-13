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
exports.DeploymentManager = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const styles_1 = require("../styles");
const utils_1 = require("../utils");
const confirmation_dialog_body_1 = require("./components/confirmation_dialog_body");
const deployment_status_1 = require("./components/deployment_status");
const MAX_POLL_TIME_MS = 60 * 1000 * 15; // 15m
const POLL_INTERVAL = 2000;
const POLL_RETRIES = 5;
/** Class to manage a deployment from a public URL */
class DeploymentManager {
    constructor(deploymentService, statusBar, documentManager, fileBrowserFactory) {
        this.deploymentService = deploymentService;
        this.statusBar = statusBar;
        this.documentManager = documentManager;
        this.fileBrowserFactory = fileBrowserFactory;
        this.browser = this.fileBrowserFactory.defaultBrowser;
    }
    /**
     * Prompts the user for confirmation and executes the deployment process,
     * which will poll through to completion.
     */
    confirmAndDeploy(url) {
        return __awaiter(this, void 0, void 0, function* () {
            apputils_1.Dialog.flush();
            const result = yield apputils_1.showDialog({
                title: 'Confirm deployment to notebook server',
                body: new confirmation_dialog_body_1.ConfirmationDialogBody(url),
                buttons: [
                    apputils_1.Dialog.cancelButton({
                        label: 'Return to JupyterLab',
                        className: styles_1.CSS.dialogButton,
                    }),
                    apputils_1.Dialog.okButton({
                        label: 'Confirm',
                        className: styles_1.CSS.dialogButton,
                    }),
                ],
            });
            if (!result.button.accept)
                return;
            const status = deployment_status_1.createDeploymentStatusWidget(url, this.statusBar);
            try {
                status.showStatus();
                let deployment = yield this.deploymentService.startDeployment(url);
                deployment = yield this._pollDeployment(deployment.id);
                if (deployment.status === 500) {
                    // TODO(b/213598682): Surface reason
                    status.showCompletionMessage(`Unable to deploy ${deployment.filename}`, false);
                }
                else {
                    if (deployment.filename.endsWith('.zip')) {
                        // Zip file contents are extracted to a directory with the same name.
                        this.browser.model.cd('/' + deployment.filename.slice(0, -4));
                    }
                    else {
                        this.documentManager.openOrReveal(deployment.filename);
                        // Navigate to the directory of the opened file.
                        this.browser.navigateToCurrentDirectory = true;
                    }
                    status.showCompletionMessage(`${deployment.filename} is ready to use`);
                }
            }
            catch (err) {
                status.showCompletionMessage(String(err), false);
            }
        });
    }
    _pollDeployment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let failures = 0;
            let waitTime = 0;
            while (failures < POLL_RETRIES && waitTime < MAX_POLL_TIME_MS) {
                try {
                    const deployment = yield this.deploymentService.getDeployment(id);
                    if (!deployment.inProgress)
                        return deployment;
                }
                catch (err) {
                    if (++failures === POLL_RETRIES) {
                        throw new Error(`Unable to retrieve Deployment ${id} after ${failures} attempts: ${err}`);
                    }
                }
                yield utils_1.sleep(POLL_INTERVAL);
                waitTime += POLL_INTERVAL;
            }
            throw new Error(`Deployment ${id} failed to complete after  ${MAX_POLL_TIME_MS / 1000}s`);
        });
    }
}
exports.DeploymentManager = DeploymentManager;
