"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This is how Jupyter widget works
// tslint:disable-next-line:no-require-imports
const data = require('../package.json');
/**
 * The _model_module_version/_view_module_version this package implements.
 *
 * The html widget manager assumes that this is the same as the npm package
 * version number.
 */
exports.MODULE_VERSION = data.version;
/**
 * The current package name.
 */
exports.MODULE_NAME = data.name;
//# sourceMappingURL=version.js.map