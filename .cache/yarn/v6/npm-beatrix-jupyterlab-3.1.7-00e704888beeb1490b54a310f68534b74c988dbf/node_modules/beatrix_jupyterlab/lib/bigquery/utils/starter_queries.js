"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStarterQuery = void 0;
function getStarterQuery(type, resourceId, legacySql) {
    if (type === 'MODEL') {
        return `SELECT * FROM ML.PREDICT(MODEL \`${resourceId}\`, )`;
    }
    else {
        if (legacySql) {
            return `SELECT * FROM [${resourceId}] LIMIT 1000`;
        }
        else {
            return `SELECT * FROM \`${resourceId}\` LIMIT 1000`;
        }
    }
}
exports.getStarterQuery = getStarterQuery;
