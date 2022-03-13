"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("@jupyter-widgets/base");
const widgetExports = __importStar(require("./widget"));
const version_1 = require("./version");
const EXTENSION_ID = 'xai_tabular_widget:plugin';
/**
 * The TabularWidget plugin.
 */
const tabularWidgetPlugin = {
    id: EXTENSION_ID,
    requires: [base_1.IJupyterWidgetRegistry],
    activate: activateWidgetExtension,
    autoStart: true,
};
// the "as unknown as ..." typecast above is solely to support JupyterLab 1
// and 2 in the same codebase and should be removed when we migrate to Lumino.
// This is how Jupyter widget works
// tslint:disable-next-line:no-default-export
exports.default = tabularWidgetPlugin;
/**
 * Activate the widget extension.
 */
function activateWidgetExtension(app, registry) {
    registry.registerWidget({
        name: version_1.MODULE_NAME,
        version: version_1.MODULE_VERSION,
        // For the widget to work, widgetExports must be exported as an object.
        // tslint:disable-next-line:ban-module-namespace-object-escape
        exports: widgetExports,
    });
}
//# sourceMappingURL=plugin.js.map