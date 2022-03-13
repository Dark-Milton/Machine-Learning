"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.ExecutorWidget = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const signaling_1 = require("@lumino/signaling");
const core_1 = require("@material-ui/core");
const React = __importStar(require("react"));
const theme_1 = require("../../components/shared/theme");
const service_provider_1 = require("../../service/service_provider");
const utils_1 = require("../../utils");
const drawer_1 = require("./drawer");
/** Widget responsive to changes in the NotebookContext */
class ExecutorWidget extends apputils_1.ReactWidget {
    constructor(projectStateService, settings) {
        super();
        this.projectStateService = projectStateService;
        this.settings = settings;
        /** Signal containing the currently active Notebook context */
        this._executorContextSignal = new signaling_1.Signal(this);
    }
    /** Opens the ExecutorDrawer */
    open(notebookContext) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._validateBucket();
            this._executorContextSignal.emit(notebookContext);
        });
    }
    render() {
        return (React.createElement(core_1.ThemeProvider, { theme: theme_1.commonTheme },
            React.createElement(apputils_1.UseSignal, { signal: this._executorContextSignal }, (_, request) => (React.createElement(drawer_1.ExecutorDrawer, { projectStateService: this.projectStateService, request: request, settings: this.settings })))));
    }
    /**
     * Validates the state of the default Notebooks bucket. If it is present
     * or can be created, this is used as the gcsBucket setting for new
     * Executions. Failures are disregarded as buckets can be created from the
     * form.
     */
    _validateBucket() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const defaultBucket = `gs://${service_provider_1.ServiceProvider.gcsService.defaultBucketName}`;
                yield service_provider_1.ServiceProvider.gcsService.getOrCreateDefaultBucket();
                if (this.settings.get('gcsBucket').composite !== defaultBucket) {
                    yield this.settings.set('gcsBucket', defaultBucket);
                }
            }
            catch (err) {
                utils_1.appLog.warn('Unable to provision GCS Bucket for Executor', err);
            }
        });
    }
}
exports.ExecutorWidget = ExecutorWidget;
