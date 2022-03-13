import { AuthService } from './service/auth_service';
import { NotebookProvider } from './service/notebook_provider';
import { ServerProxyTransportService } from './service/transport';
/**
 * Handles the authentication procedures needed to activate on a Runtime.
 * This function will remain in a loop that continually tries to authenticate
 * the user and access the specified Runtime. If either step fails, a sign
 * out will occur and the process will be repeated.
 */
export declare function getNotebookProviderForRuntime(transportService: ServerProxyTransportService, authService: AuthService, notebookName: string, apiEndpoint: string): Promise<NotebookProvider>;
