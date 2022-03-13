"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MountStatus = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const react_1 = __importDefault(require("react"));
const styles_1 = require("../../styles");
class MountStatus extends apputils_1.ReactWidget {
    constructor(bucketName, mounting) {
        super();
        this.bucketName = bucketName;
        this.actionText = mounting ? 'Mounting' : 'Unmounting';
    }
    render() {
        return (react_1.default.createElement("span", { className: styles_1.CSS.statusContainer },
            this.actionText,
            " ",
            this.bucketName,
            "..."));
    }
}
exports.MountStatus = MountStatus;
