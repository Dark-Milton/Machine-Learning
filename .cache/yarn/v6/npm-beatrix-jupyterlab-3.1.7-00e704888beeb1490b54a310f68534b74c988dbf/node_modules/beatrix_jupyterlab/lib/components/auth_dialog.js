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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDialogWidget = exports.AuthForm = exports.showAuthDialog = exports.MANAGED_NOTEBOOKS_LINK = exports.EXIT_MESSAGE = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const apputils_2 = require("@jupyterlab/apputils");
const signaling_1 = require("@lumino/signaling");
const react_1 = __importDefault(require("react"));
const typestyle_1 = require("typestyle");
const styles_1 = require("../styles");
const icons_1 = require("./shared/icons");
const learn_more_link_1 = require("./shared/learn_more_link");
const submit_button_1 = require("./shared/submit_button");
const text_input_1 = require("./shared/text_input");
const splash_screen_1 = require("./splash_screen");
const localStyles = typestyle_1.stylesheet({
    div: { width: '450px', overflow: 'hidden' },
});
const ERROR = 'Authentication failed, please check your code and try again.';
exports.EXIT_MESSAGE = 'Are you sure you want to leave this notebook and return to the Managed Notebooks console?';
exports.MANAGED_NOTEBOOKS_LINK = 'https://console.cloud.google.com/vertex-ai/notebooks/list/managed';
/** Shows a native JupyterLab dialog with the Auth component */
function showAuthDialog(authService, error) {
    return __awaiter(this, void 0, void 0, function* () {
        const authDialogWidget = new AuthDialogWidget(authService, error);
        let isAuthenticated = false;
        while (!isAuthenticated) {
            apputils_1.Dialog.flush(); // closes any other dialogs (ie. keep waiting indicator)
            const dialogResult = yield apputils_1.showDialog({
                title: 'Authenticate your managed notebook',
                body: authDialogWidget,
                buttons: [
                    {
                        label: 'Exit',
                        iconClass: '',
                        iconLabel: '',
                        caption: '',
                        className: styles_1.CSS.dialogButton,
                        accept: false,
                        displayType: 'default',
                        actions: [],
                    },
                    {
                        label: 'Authenticate',
                        iconClass: '',
                        iconLabel: '',
                        caption: '',
                        className: styles_1.CSS.dialogButton,
                        accept: true,
                        displayType: 'default',
                        actions: [],
                    },
                ],
            });
            isAuthenticated = yield dialogResult.value;
            if (isAuthenticated === null) {
                // Exit was clicked
                if (window.confirm(exports.EXIT_MESSAGE)) {
                    window.location.assign(exports.MANAGED_NOTEBOOKS_LINK);
                    return;
                }
            }
        }
    });
}
exports.showAuthDialog = showAuthDialog;
/** Component to display authentication form. */
class AuthForm extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { isPending: !!props.error };
    }
    render() {
        const { url, authCode, onAuthCodeChanged, error } = this.props;
        const { isPending } = this.state;
        return (react_1.default.createElement("div", { className: localStyles.div },
            react_1.default.createElement("p", null, "To use managed notebooks with your Google Cloud Platform data, you need to grant the Google Cloud SDK permission to access your data and authenticate your managed notebook."),
            react_1.default.createElement("div", { className: styles_1.CSS.marginTop }, isPending ? (react_1.default.createElement("div", null,
                react_1.default.createElement("p", null,
                    "Paste the authentication code into the field below or click",
                    react_1.default.createElement(learn_more_link_1.LearnMoreLink, { href: url, text: "here" }),
                    " to get a new code."),
                react_1.default.createElement(text_input_1.TextInput, { placeholder: "Paste your code here", id: "authCode", value: authCode, onChange: e => onAuthCodeChanged(e.target.value), name: "authCode", hasError: !!error, error: error, autoComplete: "off" }))) : (react_1.default.createElement("div", null,
                react_1.default.createElement("p", null, "Click the button below to get your authentication code."),
                react_1.default.createElement("div", { className: styles_1.CSS.marginTop },
                    react_1.default.createElement("a", { href: url, target: "_blank" },
                        react_1.default.createElement(submit_button_1.PrimaryButton, { onClick: () => void this.setState({ isPending: true }), endIcon: react_1.default.createElement(icons_1.SmallLaunchIcon, null) }, "Get authentication code"))))))));
    }
}
exports.AuthForm = AuthForm;
/**
 * ReactWidget implementing the Dialog.IBodyWidget interface to expose
 * the AuthForm component and encapsulate all authentication operations.
 */
class AuthDialogWidget extends apputils_1.ReactWidget {
    constructor(authService, error) {
        super();
        this.authService = authService;
        this.error = error;
        this.authProps = {
            authCode: '',
            error: this.error,
            url: '',
            onAuthCodeChanged: (authCode) => void this.onAuthCodeChanged(authCode),
        };
        this.authSignal = new signaling_1.Signal(this);
        this.initialize();
    }
    getValue() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.authProps.authCode) {
                this.authProps.error = 'Auth code cannot be empty';
                return false;
            }
            try {
                splash_screen_1.SPLASH_SCREEN.show();
                yield this.authService.provideAuthCode(this.authProps.authCode);
                return true;
            }
            catch (err) {
                // Set error and re-initialize with a new sign on URL
                this.authProps.error = ERROR;
                this.initialize();
                return false;
            }
        });
    }
    render() {
        return (react_1.default.createElement(apputils_2.UseSignal, { signal: this.authSignal, initialArgs: this.authProps }, (_, authProps) => authProps && react_1.default.createElement(AuthForm, Object.assign({}, authProps))));
    }
    onAuthCodeChanged(authCode) {
        this.authProps.authCode = authCode;
        this.authSignal.emit(this.authProps);
    }
    /** Gets the OAuth URL and emits value to authSignal. */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            splash_screen_1.SPLASH_SCREEN.show();
            this.authProps.url = yield this.authService.initiateSignIn();
            this.authSignal.emit(this.authProps);
            splash_screen_1.SPLASH_SCREEN.hide();
        });
    }
}
exports.AuthDialogWidget = AuthDialogWidget;
