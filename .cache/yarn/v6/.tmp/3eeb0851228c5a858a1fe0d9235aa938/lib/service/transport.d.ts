/** Constant for GET requests */
export declare const GET = "GET";
/** Constant for POST requests */
export declare const POST = "POST";
/** Constant for PATCH requests */
export declare const PATCH = "PATCH";
/** Constant for DELETE requests */
export declare const DELETE = "DELETE";
/** Request object. */
export interface ApiRequest {
    path: string;
    method?: 'DELETE' | 'GET' | 'POST' | 'PUT' | 'PATCH';
    params?: {
        [k: string]: any;
    };
    headers?: {
        [k: string]: any;
    };
    body?: any;
}
/** Response object. */
export interface ApiResponse<T> {
    status: number;
    result: T;
}
/** TransportService interface definition defining a submit method. */
export interface TransportService {
    /** Submit the Google API request and resolve its response. */
    submit<T>(request: ApiRequest): Promise<ApiResponse<T>>;
}
/**
 * Google API Error
 * https://cloud.google.com/apis/design/errors#error_codes
 */
export interface GoogleAPIError {
    result: {
        error: {
            status: string;
            message: string;
            code: number;
            errors: [];
        };
    };
}
export declare function isGoogleAPIError(candidate: any): candidate is GoogleAPIError;
/**
 * Extracts the message from a Google API Error if present.
 * https://cloud.google.com/apis/design/errors#error_codes
 */
export declare function getMessageFromApiError(err: any): string | null;
/**
 * Handles any error, and if it's a Google API error, returns a friendlier
 * string.
 * @param err
 */
export declare function handleApiError(err: any): never;
/**
 * TransportService implementation that proxies all requests to the JupyterLab
 * server.
 */
export declare class ServerProxyTransportService implements TransportService {
    private readonly serverSettings;
    private readonly proxyUrl;
    submit<T>(request: ApiRequest): Promise<ApiResponse<T>>;
}
