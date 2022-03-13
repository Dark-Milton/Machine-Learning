"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectStateService = void 0;
const transport_1 = require("../../service/transport");
const utils_1 = require("../../utils");
const data_1 = require("../data");
const RESOURCE_MANAGER = 'https://cloudresourcemanager.googleapis.com/v1';
const BUCKET_CREATE_PERMISSION = 'storage.buckets.create';
const OBJECT_CREATE_PERMISSION = 'storage.objects.create';
const INITIALIZE_PERMISSIONS = new Set([
    'serviceusage.services.enable',
    BUCKET_CREATE_PERMISSION,
]);
const EXECUTE_PERMISSIONS = new Set([
    BUCKET_CREATE_PERMISSION,
    OBJECT_CREATE_PERMISSION,
    'notebooks.executions.create',
]);
const SCHEDULE_PERMISSIONS = new Set([
    BUCKET_CREATE_PERMISSION,
    OBJECT_CREATE_PERMISSION,
    'notebooks.schedules.create',
]);
const BYPASS_PERMISSION_CHECK = false;
/**
 * Legacy service that maintains support for holding the project ID being
 * used by Executor as well as determining IAM permission state.
 *
 * TODO(b/184930031): Consider moving the IAM support to a top-level support
 * and eliminating the projectId behavior.
 */
class ProjectStateService {
    constructor(_transportService, projectId) {
        this._transportService = _transportService;
        this.projectId = projectId;
    }
    /**
     * Determines the credential's ability to execute the Scheduler functions
     * based on the IAM permissions granted to it.
     */
    getPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            const permissionsToCheck = new Set();
            const getPermissionsResponse = {
                toInitialize: [],
                toExecute: [],
                toSchedule: [],
            };
            const returnedPermissions = [];
            INITIALIZE_PERMISSIONS.forEach(p => {
                getPermissionsResponse.toInitialize.push(p);
                permissionsToCheck.add(p);
            });
            EXECUTE_PERMISSIONS.forEach(p => {
                getPermissionsResponse.toExecute.push(p);
                permissionsToCheck.add(p);
            });
            SCHEDULE_PERMISSIONS.forEach(p => {
                getPermissionsResponse.toSchedule.push(p);
                permissionsToCheck.add(p);
            });
            const checked = Array.from(permissionsToCheck.values());
            if (!BYPASS_PERMISSION_CHECK) {
                try {
                    const response = yield this._transportService.submit({
                        path: `${RESOURCE_MANAGER}/projects/${this.projectId}:testIamPermissions`,
                        method: transport_1.POST,
                        body: {
                            permissions: checked,
                        },
                    });
                    returnedPermissions.push(...(response.result.permissions || []));
                }
                catch (err) {
                    utils_1.appLog.warn('Could not determine IAM permissions for credential');
                    returnedPermissions.push(...checked);
                }
            }
            else {
                returnedPermissions.push(...checked);
            }
            this._populateGetPermissionsResponse(returnedPermissions, getPermissionsResponse);
            return getPermissionsResponse;
        });
    }
    _populateGetPermissionsResponse(permissions, response) {
        let hasBucketsCreate = false;
        // Prune any returned permission from the response object's lists
        permissions.forEach(p => {
            if (p === BUCKET_CREATE_PERMISSION) {
                hasBucketsCreate = true;
            }
            const lists = [
                response.toInitialize,
                response.toExecute,
                response.toSchedule,
            ];
            lists.forEach(l => {
                data_1.removeFromList(l, p);
            });
        });
        // Project Editor role gives storage.buckets.create and OWNER on all
        // buckets, so if it was returned, clear storage.objects.create from schedule/execute
        if (hasBucketsCreate) {
            data_1.removeFromList(response.toExecute, OBJECT_CREATE_PERMISSION);
            data_1.removeFromList(response.toSchedule, OBJECT_CREATE_PERMISSION);
        }
        else {
            data_1.removeFromList(response.toExecute, BUCKET_CREATE_PERMISSION);
            data_1.removeFromList(response.toSchedule, BUCKET_CREATE_PERMISSION);
        }
    }
}
exports.ProjectStateService = ProjectStateService;
