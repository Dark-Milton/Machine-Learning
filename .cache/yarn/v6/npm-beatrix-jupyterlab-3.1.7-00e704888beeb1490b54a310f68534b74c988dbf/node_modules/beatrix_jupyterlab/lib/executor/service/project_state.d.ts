import { TransportService } from '../../service/transport';
interface Service {
    endpoint: string;
    name: string;
    documentation: string;
    isOptional: boolean;
}
/** API service status */
export interface ServiceStatus {
    service: Service;
    enabled: boolean;
}
export interface GetPermissionsResponse {
    toInitialize: string[];
    toExecute: string[];
    toSchedule: string[];
}
/**
 * Legacy service that maintains support for holding the project ID being
 * used by Executor as well as determining IAM permission state.
 *
 * TODO(b/184930031): Consider moving the IAM support to a top-level support
 * and eliminating the projectId behavior.
 */
export declare class ProjectStateService {
    private readonly _transportService;
    projectId: string;
    constructor(_transportService: TransportService, projectId: string);
    /**
     * Determines the credential's ability to execute the Scheduler functions
     * based on the IAM permissions granted to it.
     */
    getPermissions(): Promise<GetPermissionsResponse>;
    private _populateGetPermissionsResponse;
}
export {};
