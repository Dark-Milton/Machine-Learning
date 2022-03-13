"use strict";
/**
 * Utils for Vertex AI extension
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodeTemplates = exports.toTitleCase = exports.getConsoleLinkForEndpoint = exports.getConsoleLinkForModel = exports.parseIdFromName = exports.CONSOLE_LINK_MODELS_PAGE = exports.CONSOLE_LINK_PREFIX = exports.LEARN_MORE_API = void 0;
const code_templates_1 = require("./code_templates");
exports.LEARN_MORE_API = 'https://cloud.google.com/vertex-ai/docs';
exports.CONSOLE_LINK_PREFIX = 'https://console.cloud.google.com/vertex-ai';
exports.CONSOLE_LINK_MODELS_PAGE = `${exports.CONSOLE_LINK_PREFIX}/models`;
function parseIdFromName(fullName) {
    return fullName.split('/').pop() || '';
}
exports.parseIdFromName = parseIdFromName;
function getConsoleLinkForModel(location, modelsName, project) {
    return `${exports.CONSOLE_LINK_PREFIX}/locations/${location}/models/${modelsName}/properties?project=${project}`;
}
exports.getConsoleLinkForModel = getConsoleLinkForModel;
/** Generates cloud console link for endpoint */
function getConsoleLinkForEndpoint(location, endpointName, project) {
    return `${exports.CONSOLE_LINK_PREFIX}/locations/${location}/endpoints/${endpointName}?project=${project}`;
}
exports.getConsoleLinkForEndpoint = getConsoleLinkForEndpoint;
function toTitleCase(str) {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}
exports.toTitleCase = toTitleCase;
function getCodeTemplates(dataType, generateCode, endpointDisplayName, projectId, endpointId, locationId) {
    switch (dataType) {
        case 'image':
            if (generateCode === 'classification') {
                return code_templates_1.imageClassification(endpointDisplayName, projectId, endpointId, locationId);
            }
            else if (generateCode === 'object-detection') {
                return code_templates_1.imageObjectDetection(endpointDisplayName, projectId, endpointId, locationId);
            }
            else {
                return '';
            }
        case 'text':
            if (generateCode === 'classification') {
                return code_templates_1.textClassification(endpointDisplayName, projectId, endpointId, locationId);
            }
            else if (generateCode === 'text-entity-extraction') {
                return code_templates_1.textEntityExtraction(endpointDisplayName, projectId, endpointId, locationId);
            }
            else if (generateCode === 'sentiment-analysis') {
                return code_templates_1.textSentimentAnalysis(endpointDisplayName, projectId, endpointId, locationId);
            }
            else {
                return '';
            }
        case 'tabular':
            if (generateCode === 'classification') {
                return code_templates_1.tabularClassification(endpointDisplayName, projectId, endpointId, locationId);
            }
            else if (generateCode === 'tabular-regression') {
                return code_templates_1.tabularRegression(endpointDisplayName, projectId, endpointId, locationId);
            }
            else {
                return '';
            }
        default:
            break;
    }
    return '';
}
exports.getCodeTemplates = getCodeTemplates;
