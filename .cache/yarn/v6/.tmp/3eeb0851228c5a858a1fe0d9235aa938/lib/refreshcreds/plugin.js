"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionLostPlugin = void 0;
const application_1 = require("@jupyterlab/application");
const utils_1 = require("../utils");
const connection_lost_1 = require("./connection_lost");
exports.ConnectionLostPlugin = {
    id: `${utils_1.PLUGIN_PREFIX}:connectionlost`,
    activate: () => {
        return connection_lost_1.getRefreshCredConnectionLost(new connection_lost_1.RefreshCredConnectionLost());
    },
    autoStart: true,
    provides: application_1.IConnectionLost,
};
