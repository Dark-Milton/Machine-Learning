/**
 * Utils for Vertex AI extension
 */
export declare const LEARN_MORE_API = "https://cloud.google.com/vertex-ai/docs";
export declare const CONSOLE_LINK_PREFIX = "https://console.cloud.google.com/vertex-ai";
export declare const CONSOLE_LINK_MODELS_PAGE: string;
export declare function parseIdFromName(fullName: string): string;
export declare function getConsoleLinkForModel(location: string, modelsName: string, project: string): string;
/** Generates cloud console link for endpoint */
export declare function getConsoleLinkForEndpoint(location: string, endpointName: string, project: string): string;
export declare function toTitleCase(str: string): string;
export declare function getCodeTemplates(dataType: string, generateCode: string, endpointDisplayName: string, projectId: string, endpointId: string, locationId: string): string;
