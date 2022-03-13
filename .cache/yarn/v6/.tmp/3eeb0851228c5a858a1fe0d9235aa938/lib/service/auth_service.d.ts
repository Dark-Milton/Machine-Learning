import { ServerConnection } from '@jupyterlab/services';
export declare class AuthService {
    private readonly serverSettings;
    private readonly serverUrl;
    private readonly projectId;
    constructor(projectId: string, serverSettings?: ServerConnection.ISettings);
    checkSignInStatus(): Promise<boolean>;
    initiateSignIn(): Promise<string>;
    provideAuthCode(authCode: string): Promise<string>;
    signOut(): Promise<boolean>;
}
