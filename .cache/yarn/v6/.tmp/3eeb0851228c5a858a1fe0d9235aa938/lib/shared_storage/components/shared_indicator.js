"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedIndicator = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const react_1 = __importDefault(require("react"));
const typestyle_1 = require("typestyle");
const text = typestyle_1.style({
    fontWeight: 'bold',
    marginLeft: '12px',
});
class SharedIndicator extends apputils_1.ReactWidget {
    render() {
        return react_1.default.createElement("span", { className: text }, "Shared");
    }
}
exports.SharedIndicator = SharedIndicator;
