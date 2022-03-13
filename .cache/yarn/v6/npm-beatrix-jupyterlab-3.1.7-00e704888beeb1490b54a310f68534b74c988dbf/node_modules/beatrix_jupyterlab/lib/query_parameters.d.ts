import { IRouter, JupyterFrontEndPlugin } from '@jupyterlab/application';
import { Token } from '@lumino/coreutils';
declare type QueryParam = 'downloadUrl' | 'experiments' | 'fakeData';
/** Service that accepts requests for the value of a certain query parameter. */
export declare class QueryParametersService {
    private readonly searchParams;
    constructor(router: IRouter);
    /**
     * Accepts a string only from the set of supported query parameters and
     * returns a string.
     */
    getStringParameter(param: QueryParam): string | null;
    /**
     * Accepts a string only from the set of supported query parameters and
     * returns a boolean.
     */
    getBooleanParameter(param: QueryParam): boolean;
}
/** Token for the `QueryParametersService`. */
export declare const IQueryParametersService: Token<QueryParametersService>;
/** Plugin that ingests URL query parameters. */
export declare const QueryParametersPlugin: JupyterFrontEndPlugin<QueryParametersService>;
export {};
