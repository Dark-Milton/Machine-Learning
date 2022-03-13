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
exports.EndpointItem = void 0;
const core_1 = require("@material-ui/core");
const React = __importStar(require("react"));
const cron_1 = require("../../executor/cron");
const endpoint_code_dialog_1 = require("./endpoint_code_dialog");
const deployed_models_drawer_1 = require("./deployed_models_drawer");
const utils_1 = require("../utils");
const list_item_1 = require("../../components/shared/list_item");
const service_provider_1 = require("../../service/service_provider");
/** Notebook endpoint list item */
function EndpointItem(props) {
    const { endpoint } = props;
    const endpointObscureName = utils_1.parseIdFromName(endpoint.name || '');
    return (React.createElement(list_item_1.ListItem, { title: endpoint.displayName || endpointObscureName, titleLink: utils_1.getConsoleLinkForEndpoint(service_provider_1.ServiceProvider.vertexAIService.region, endpointObscureName, service_provider_1.ServiceProvider.vertexAIService.projectId), captions: [cron_1.customShortDateFormat(new Date(endpoint.updateTime || ''))], subMenuItems: closeHandler => [
            React.createElement(core_1.MenuItem, { key: "useInCode", dense: true, onClick: () => closeHandler() },
                React.createElement(endpoint_code_dialog_1.EndpointCodeDialog, { endpoint: endpoint, handleClose: closeHandler })),
            React.createElement(core_1.MenuItem, { key: "viewDeployedModels", dense: true, onClick: () => closeHandler() },
                React.createElement(deployed_models_drawer_1.DeployedModelsDrawer, { endpointDisplayName: endpoint.displayName || endpointObscureName, endpointConsoleLink: utils_1.getConsoleLinkForEndpoint(service_provider_1.ServiceProvider.vertexAIService.region, endpointObscureName, service_provider_1.ServiceProvider.vertexAIService.projectId), projectId: service_provider_1.ServiceProvider.vertexAIService.projectId, deployedModels: endpoint.deployedModels || [], trafficSplit: endpoint.trafficSplit || {}, handleClose: closeHandler })),
        ] }));
}
exports.EndpointItem = EndpointItem;
