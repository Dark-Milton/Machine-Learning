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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceGraphs = void 0;
const react_1 = __importDefault(require("react"));
const apputils_1 = require("@jupyterlab/apputils");
const typestyle_1 = require("typestyle");
const csstips = __importStar(require("csstips"));
const resource_chart_popper_1 = require("./components/resource_chart_popper");
const resourceGraphClass = typestyle_1.style(Object.assign(Object.assign({}, csstips.horizontal), csstips.center));
/** ReactWidget for resource utilization status item and popper. */
class ResourceGraphs extends apputils_1.ReactWidget {
    constructor() {
        super();
        this.addClass(resourceGraphClass);
    }
    render() {
        return react_1.default.createElement(resource_chart_popper_1.ResourceChartPopper, null);
    }
}
exports.ResourceGraphs = ResourceGraphs;
