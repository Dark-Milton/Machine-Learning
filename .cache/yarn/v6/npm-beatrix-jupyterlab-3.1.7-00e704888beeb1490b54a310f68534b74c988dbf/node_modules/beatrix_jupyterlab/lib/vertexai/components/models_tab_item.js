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
exports.ModelItem = void 0;
const core_1 = require("@material-ui/core");
const React = __importStar(require("react"));
const model_drawer_1 = require("./model_drawer");
const cron_1 = require("../../executor/cron");
const deploy_endpoint_drawer_1 = require("./deploy_endpoint_drawer");
const utils_1 = require("../utils");
const list_item_1 = require("../../components/shared/list_item");
const service_provider_1 = require("../../service/service_provider");
/** Notebook Models list item */
function ModelItem(props) {
    /** Parses model ID from model name property */
    function parseModelId(modelName) {
        const components = modelName.split('/');
        return components[components.length - 1];
    }
    return (React.createElement(list_item_1.ListItem, { title: props.model.displayName || utils_1.parseIdFromName(props.model.name || ''), titleLink: utils_1.getConsoleLinkForModel(service_provider_1.ServiceProvider.vertexAIService.region, parseModelId(props.model.name || ''), service_provider_1.ServiceProvider.vertexAIService.projectId), captions: [cron_1.customShortDateFormat(new Date(props.model.updateTime || ''))], subMenuItems: closeHandler => [
            React.createElement(core_1.MenuItem, { key: "deployToEndPoint", dense: true, onClick: () => closeHandler() },
                React.createElement(deploy_endpoint_drawer_1.DeployToEndpointDrawer, { model: props.model })),
            React.createElement(core_1.MenuItem, { key: "viewDeployedModels", dense: true, onClick: () => closeHandler() },
                React.createElement(model_drawer_1.DeployedModelsForModelDrawer, { model: props.model, handleClose: closeHandler })),
        ] }));
}
exports.ModelItem = ModelItem;
