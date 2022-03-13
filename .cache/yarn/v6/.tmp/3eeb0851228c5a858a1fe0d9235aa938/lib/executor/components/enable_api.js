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
exports.EnableApi = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const learn_more_link_1 = require("../../components/shared/learn_more_link");
const message_1 = require("../../components/shared/message");
const submit_button_1 = require("../../components/shared/submit_button");
const service_provider_1 = require("../../service/service_provider");
const action_bar_1 = require("./action_bar");
const LEARN_MORE_API = 'https://cloud.google.com/vertex-ai/docs';
const localStyles = typestyle_1.stylesheet({
    spacing: {
        margin: '24px',
    },
});
class EnableApi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            isEnabling: false,
        };
        this._enableAPI = this._enableAPI.bind(this);
        this._tryAgain = this._tryAgain.bind(this);
    }
    render() {
        return (React.createElement("div", { className: localStyles.spacing },
            React.createElement("p", null,
                "In order to use Notebook Executor, the",
                ' ',
                React.createElement(learn_more_link_1.LearnMoreLink, { href: LEARN_MORE_API, text: 'Vertex AI API' }),
                " must be enabled. This may incur additional charges. By clicking",
                ' ',
                React.createElement("i", null, "continue"),
                ", you are agreeing to the terms of service for this API."),
            React.createElement(action_bar_1.ActionBar, { onClose: this.props.onClose, error: this.state.error ? (React.createElement(message_1.Message, { asActivity: false, asError: true, text: this.state.error })) : null }, this.state.error ? (React.createElement(submit_button_1.SubmitButton, { actionPending: this.state.isEnabling, onClick: this._tryAgain, text: "Try Again" })) : (React.createElement(submit_button_1.SubmitButton, { actionPending: this.state.isEnabling, onClick: this._enableAPI, text: "Continue" })))));
    }
    _tryAgain() {
        return __awaiter(this, void 0, void 0, function* () {
            this._enableAPI();
        });
    }
    _enableAPI() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setState({ isEnabling: true });
            const response = yield service_provider_1.ServiceProvider.executorService.enableTrainingAPI();
            if (response.error) {
                this.setState({ error: response.error });
            }
            else {
                this.props.onSetupRequiredChanged(false);
            }
            this.setState({ isEnabling: false });
        });
    }
}
exports.EnableApi = EnableApi;
