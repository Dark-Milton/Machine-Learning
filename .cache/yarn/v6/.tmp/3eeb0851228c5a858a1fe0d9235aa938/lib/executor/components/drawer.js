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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutorDrawer = void 0;
const core_1 = require("@material-ui/core");
const MenuItem_1 = __importDefault(require("@material-ui/core/MenuItem"));
const csstips = __importStar(require("csstips"));
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const badge_1 = require("../../components/shared/badge");
const icons_1 = require("../../components/shared/icons");
const message_1 = require("../../components/shared/message");
const service_provider_1 = require("../../service/service_provider");
const styles_1 = require("../../styles");
const action_bar_1 = require("./action_bar");
const enable_api_1 = require("./enable_api");
const form_1 = require("./form");
const submitted_job_1 = require("./submitted_job");
const icon_button_menu_1 = require("../../components/shared/icon_button_menu");
const localStyles = typestyle_1.stylesheet({
    header: Object.assign(Object.assign(Object.assign(Object.assign({}, styles_1.BASE_FONT), { fontWeight: 400, fontSize: '20px', margin: '18px 24px 18px 24px' }), csstips.horizontal), csstips.center),
    title: Object.assign({}, csstips.flex),
    main: Object.assign(Object.assign(Object.assign({ backgroundColor: styles_1.COLORS.white, width: '512px', height: '100%' }, styles_1.BASE_FONT), csstips.vertical), { overflow: 'hidden' }),
    spacing: {
        padding: '24px',
    },
});
const PYTHON2 = 'python2';
const PYTHON2_WARNING = 'Python 2 Notebooks are not supported. Please upgrade your Notebook to use Python 3';
/**
 * Drawer wrapping the Executor UI.
 */
class ExecutorDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClosedByUser: false,
            creatingExecution: true,
            setupRequired: false,
        };
        this._settingsChanged = this._settingsChanged.bind(this);
        this._onClose = this._onClose.bind(this);
        this._onScheduleTypeChange = this._onScheduleTypeChange.bind(this);
        this._onSetupRequiredChange = this._onSetupRequiredChange.bind(this);
        this._onShowFormChange = this._onShowFormChange.bind(this);
        this._onReset = this._onReset.bind(this);
    }
    /** Establishes the binding for Settings Signal and invokes the handler. */
    componentDidMount() {
        this.props.settings.changed.connect(this._settingsChanged);
        this._settingsChanged(this.props.settings);
    }
    componentWillUnmount() {
        this.props.settings.changed.disconnect(this._settingsChanged);
    }
    /**
     * Set the drawer to be open since for any new request with a valid Notebook.
     */
    componentDidUpdate(prevProps) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (prevProps.request !== this.props.request &&
                !!((_a = this.props.request) === null || _a === void 0 ? void 0 : _a.notebook)) {
                this.setState({ isClosedByUser: false });
            }
            if (this._isOpen() &&
                !this.state.permissions &&
                !this.getPermissionsPromise) {
                this.getPermissionsPromise = this._checkPermissions();
                this.setState({
                    setupRequired: !(yield service_provider_1.ServiceProvider.executorService.isTrainingAPIEnabled()),
                });
            }
        });
    }
    render() {
        const { gcpSettings, permissions, setupRequired, status } = this.state;
        const { request } = this.props;
        const hasNotebook = !!(request && request.notebook);
        if (hasNotebook &&
            (request === null || request === void 0 ? void 0 : request.notebook.defaultKernelName.toLowerCase().replace(' ', '')) ===
                PYTHON2) {
            // For now, only exclude Python 2 kernels
            return this._showInDrawer(React.createElement("div", { className: typestyle_1.classes(styles_1.CSS.column, localStyles.spacing) },
                React.createElement(message_1.Message, { asError: true, text: PYTHON2_WARNING }),
                React.createElement(action_bar_1.ActionBar, { onClose: this._onClose })));
        }
        else if (setupRequired) {
            return this._showInDrawer(React.createElement(enable_api_1.EnableApi, { onSetupRequiredChanged: this._onSetupRequiredChange, onClose: this._onClose }));
        }
        else if (status && !!status.lastSubmitted) {
            return this._showInDialog(React.createElement(submitted_job_1.SubmittedJob, { projectId: (gcpSettings === null || gcpSettings === void 0 ? void 0 : gcpSettings.projectId) || '', schedule: status.lastSubmitted.schedule, onClose: this._onClose, onFormReset: this._onReset }));
        }
        else {
            return this._showInDrawer(permissions && gcpSettings && (request === null || request === void 0 ? void 0 : request.notebook) ? (React.createElement(form_1.ExecutorForm, { gcpSettings: gcpSettings, notebookName: (request === null || request === void 0 ? void 0 : request.notebookName) || '', notebook: request === null || request === void 0 ? void 0 : request.notebook, permissions: permissions, onClose: this._onClose, settings: this.props.settings, onScheduleTypeChange: this._onScheduleTypeChange, onShowFormChange: this._onShowFormChange })) : (React.createElement("div", { className: typestyle_1.classes(styles_1.CSS.column, localStyles.spacing) },
                React.createElement(message_1.Message, { asActivity: true, text: "Checking IAM Permissions" }),
                React.createElement(action_bar_1.ActionBar, { onClose: this._onClose }))));
        }
    }
    _showInDrawer(children) {
        return (React.createElement(core_1.Drawer, { open: this._isOpen(), anchor: "right" },
            React.createElement("header", { className: localStyles.header },
                React.createElement("span", { className: localStyles.title },
                    "Submit notebooks to Executor",
                    React.createElement(badge_1.Badge, { value: "preview" })),
                React.createElement(icon_button_menu_1.IconButtonMenu, { icon: React.createElement(icons_1.MenuIcon, null), menuItems: menuCloseHandler => [
                        React.createElement(MenuItem_1.default, { key: "reset", dense: true, onClick: () => this._onResetSettings(menuCloseHandler) }, "Reset configuration"),
                    ] })),
            React.createElement("main", { className: localStyles.main }, children)));
    }
    _showInDialog(children) {
        return (React.createElement(core_1.Dialog, { open: this._isOpen(), scroll: "body" },
            React.createElement("main", { className: localStyles.main }, children)));
    }
    _onResetSettings(closeHandler) {
        this.props.settings.save('{}');
        closeHandler();
    }
    _onReset() {
        this.setState({ status: undefined });
    }
    // Casts to GcpSettings shape from JSONObject
    _settingsChanged(newSettings) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = newSettings.composite;
            if (settings.projectId) {
                this.props.projectStateService.projectId = settings.projectId;
            }
            else {
                const projectId = yield service_provider_1.ServiceProvider.executorService.projectId;
                this.props.projectStateService.projectId = projectId;
                settings.projectId = projectId;
                newSettings.set('projectId', projectId);
            }
            this.setState({ gcpSettings: settings });
        });
    }
    _onScheduleTypeChange(creatingExecution) {
        this.setState({ creatingExecution });
    }
    _onSetupRequiredChange(setupRequired) {
        this.setState({ setupRequired });
    }
    _onShowFormChange(status) {
        this.setState({ status });
    }
    _onClose() {
        this.setState({
            isClosedByUser: true,
            creatingExecution: true,
            setupRequired: false,
            status: undefined,
        });
    }
    _isOpen() {
        const hasNotebook = !!(this.props.request && this.props.request.notebook);
        return hasNotebook && !this.state.isClosedByUser;
    }
    _checkPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            const permissions = yield this.props.projectStateService.getPermissions();
            this.setState({ permissions });
        });
    }
}
exports.ExecutorDrawer = ExecutorDrawer;
