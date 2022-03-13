"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MountForm = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const core_1 = require("@material-ui/core");
const react_1 = __importDefault(require("react"));
const typestyle_1 = require("typestyle");
const bodyContainer = typestyle_1.style({
    marginTop: '8px',
});
class MountForm extends apputils_1.ReactWidget {
    constructor() {
        super(...arguments);
        this.bucketName = '';
    }
    getValue() {
        return this.bucketName;
    }
    render() {
        return (react_1.default.createElement("div", { className: bodyContainer },
            react_1.default.createElement(core_1.TextField, { id: "jp-beatrixSharedStorage-mountBucketName", label: "Bucket Name", onChange: e => (this.bucketName = e.target.value), variant: "outlined" })));
    }
}
exports.MountForm = MountForm;
