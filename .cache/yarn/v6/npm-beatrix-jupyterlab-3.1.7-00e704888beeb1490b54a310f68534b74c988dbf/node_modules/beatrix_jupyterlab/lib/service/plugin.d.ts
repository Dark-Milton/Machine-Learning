import { JupyterFrontEndPlugin } from '@jupyterlab/application';
import { Token } from '@lumino/coreutils';
/** DI token for the ServiceProviderPlugin class. */
export declare const IServiceProvider: Token<void>;
export declare const ServiceProviderPlugin: JupyterFrontEndPlugin<void>;
