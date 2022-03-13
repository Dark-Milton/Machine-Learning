"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnErrorPlugin = void 0;
const utils_1 = require("../utils");
exports.OnErrorPlugin = {
    id: `${utils_1.PLUGIN_PREFIX}:onerror_plugin`,
    requires: [],
    activate: () => {
        window.addEventListener('error', utils_1.logError);
        window.addEventListener('unhandledrejection', utils_1.logUnhandledRejection);
    },
    autoStart: true,
};
