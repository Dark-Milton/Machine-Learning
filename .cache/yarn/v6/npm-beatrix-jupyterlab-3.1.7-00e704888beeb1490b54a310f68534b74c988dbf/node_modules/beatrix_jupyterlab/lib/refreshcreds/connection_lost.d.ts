import { IConnectionLost } from '@jupyterlab/application';
import { ServerConnection, ServiceManager } from '@jupyterlab/services';
import { ITranslator } from '@jupyterlab/translation';
export declare class RefreshCredConnectionLost {
    isCredentialExpired(): Promise<boolean>;
    reloadWindow(): void;
    refreshToken(): void;
    connectionLost(manager: ServiceManager.IManager, err: ServerConnection.NetworkError, translator?: ITranslator | undefined): Promise<void>;
}
export declare function getRefreshCredConnectionLost(refreshCred: RefreshCredConnectionLost): IConnectionLost;
