"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadCustomModelsWidget = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const signaling_1 = require("@lumino/signaling");
const React = __importStar(require("react"));
const upload_custom_drawer_1 = require("./upload_custom_drawer");
class UploadCustomModelsWidget extends apputils_1.ReactWidget {
    constructor() {
        super();
        this._isOpenSignal = new signaling_1.Signal(this);
        this._isOpen = false;
        this._filePath = '';
    }
    get isOpen() {
        return this._isOpen;
    }
    set isOpen(isOpen) {
        this._isOpen = isOpen;
        this._isOpenSignal.emit(isOpen);
    }
    get isOpenSignal() {
        return this._isOpenSignal;
    }
    set filePath(path) {
        this._filePath = path;
    }
    render() {
        return (React.createElement(apputils_1.UseSignal, { signal: this._isOpenSignal }, (_, isOpen) => (React.createElement(upload_custom_drawer_1.UploadCustomModelsDrawer, { filePath: this._filePath, openFromFile: isOpen }))));
    }
}
exports.UploadCustomModelsWidget = UploadCustomModelsWidget;
