"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReduxReactWidget = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
class ReduxReactWidget extends apputils_1.ReactWidget {
    constructor() {
        super(...arguments);
        this.providerProps = { store: null };
    }
    setProviderProps(props) {
        this.providerProps = props;
    }
    render() {
        return react_1.default.createElement(react_redux_1.Provider, Object.assign({}, this.providerProps), this.renderReact());
    }
}
exports.ReduxReactWidget = ReduxReactWidget;
