"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryParametersPlugin = exports.IQueryParametersService = exports.QueryParametersService = void 0;
const application_1 = require("@jupyterlab/application");
const coreutils_1 = require("@lumino/coreutils");
const utils_1 = require("./utils");
/** Service that accepts requests for the value of a certain query parameter. */
class QueryParametersService {
    constructor(router) {
        this.searchParams = new URLSearchParams(router.current.search);
    }
    /**
     * Accepts a string only from the set of supported query parameters and
     * returns a string.
     */
    getStringParameter(param) {
        return this.searchParams.get(param);
    }
    /**
     * Accepts a string only from the set of supported query parameters and
     * returns a boolean.
     */
    getBooleanParameter(param) {
        return this.searchParams.get(param) === 'true';
    }
}
exports.QueryParametersService = QueryParametersService;
/** Token for the `QueryParametersService`. */
exports.IQueryParametersService = new coreutils_1.Token('beatrix:QueryParametersService');
/** Plugin that ingests URL query parameters. */
exports.QueryParametersPlugin = {
    id: `${utils_1.PLUGIN_PREFIX}:query_parameters_plugin`,
    requires: [application_1.IRouter],
    activate: (app, router) => {
        return new QueryParametersService(router);
    },
    provides: exports.IQueryParametersService,
    autoStart: true,
};
