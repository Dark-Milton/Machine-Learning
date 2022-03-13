"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeploymentStatusWidget = exports.DeploymentStatus = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const signaling_1 = require("@lumino/signaling");
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const react_1 = __importDefault(require("react"));
const styles_1 = require("../../styles");
const snackbarAnchor = {
    vertical: 'bottom',
    horizontal: 'right',
};
/** Component to show the deployment status */
function DeploymentStatus({ url, onDismiss, completion }) {
    var _a;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("span", { className: styles_1.CSS.statusContainer },
            "Loading ",
            url,
            "..."),
        react_1.default.createElement(core_1.Snackbar, { anchorOrigin: snackbarAnchor, open: !!completion, message: (_a = completion === null || completion === void 0 ? void 0 : completion.message) !== null && _a !== void 0 ? _a : '', action: react_1.default.createElement(core_1.IconButton, { size: "small", "aria-label": "close", color: "inherit", onClick: () => onDismiss() },
                react_1.default.createElement(icons_1.Close, { fontSize: "small" })) })));
}
exports.DeploymentStatus = DeploymentStatus;
/** ReactWidget class to display status of a Deployment */
class DeploymentStatusWidget extends apputils_1.ReactWidget {
    constructor(url, statusBar) {
        super();
        this.url = url;
        this.statusBar = statusBar;
        this.completionSignal = new signaling_1.Signal(this);
    }
    /** Registers and shows the widget in the StatusBar */
    showStatus() {
        this.disposable = this.statusBar.registerStatusItem('jp-Beatrix-Deploy-DeploymentStatus', {
            item: this,
            align: 'left',
        });
    }
    /** Shows the completion snackbar message */
    showCompletionMessage(message, isSuccessful = true) {
        this.completionSignal.emit({ message, isSuccessful });
    }
    render() {
        return (react_1.default.createElement(apputils_1.UseSignal, { signal: this.completionSignal }, (_, completion) => (react_1.default.createElement(DeploymentStatus, { url: this.url, onDismiss: () => this._onDismiss(), completion: completion }))));
    }
    _onDismiss() {
        if (this.disposable)
            this.disposable.dispose();
    }
}
/** Function to return a DeployStatusWidget */
function createDeploymentStatusWidget(url, statusBar) {
    return new DeploymentStatusWidget(url, statusBar);
}
exports.createDeploymentStatusWidget = createDeploymentStatusWidget;
