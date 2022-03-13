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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelDetailsWidget = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const React = __importStar(require("react"));
const constants_1 = require("../../constants");
const model_details_panel_1 = __importDefault(require("./model_details_panel"));
/** Widget to be registered in the main panel. */
class ModelDetailsWidget extends apputils_1.ReactWidget {
    constructor(model_id, name) {
        super();
        this.model_id = model_id;
        this.name = name;
        this.title.iconClass = `jp-Icon jp-Icon-20 ${constants_1.ICONS.model}`;
        this.title.caption = `Model Details for ${this.model_id}`;
        this.title.label = this.name;
        this.title.closable = true;
    }
    render() {
        return (React.createElement(model_details_panel_1.default, { isVisible: this.isVisible, modelId: this.model_id, modelName: this.name }));
    }
}
exports.ModelDetailsWidget = ModelDetailsWidget;
