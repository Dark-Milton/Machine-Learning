"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmationDialogBody = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const core_1 = require("@material-ui/core");
const react_1 = __importDefault(require("react"));
const learn_more_link_1 = require("../../components/shared/learn_more_link");
/** Widget for displaying the deployment confirmation dialog body. */
class ConfirmationDialogBody extends apputils_1.ReactWidget {
    constructor(downloadUrl) {
        super();
        this.downloadUrl = downloadUrl;
    }
    render() {
        return (react_1.default.createElement("div", null,
            "Are you sure you want to download the content from:",
            react_1.default.createElement(core_1.Box, { sx: { marginTop: '16px' } },
                react_1.default.createElement(learn_more_link_1.LearnMoreLink, { href: this.downloadUrl, text: this.downloadUrl, noWrap: true, maxWidth: "500px" }))));
    }
}
exports.ConfirmationDialogBody = ConfirmationDialogBody;
