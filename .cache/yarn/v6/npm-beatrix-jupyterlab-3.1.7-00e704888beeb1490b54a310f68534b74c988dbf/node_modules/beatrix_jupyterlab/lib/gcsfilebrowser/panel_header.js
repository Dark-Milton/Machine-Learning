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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PanelHeader = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const progress_1 = require("../components/shared/progress");
const styles_1 = require("../styles");
const STYLES = typestyle_1.stylesheet({
    widget: {
        overflow: 'visible',
    },
    progress: {
        margin: 'auto',
    },
});
class PanelHeader extends apputils_1.ReactWidget {
    constructor(activitySignal) {
        super();
        this.activitySignal = activitySignal;
        this.addClass(STYLES.widget);
    }
    render() {
        return (React.createElement(apputils_1.UseSignal, { signal: this.activitySignal }, (_, isActive) => (React.createElement("div", { className: styles_1.CSS.headerContainer },
            React.createElement("div", { className: styles_1.CSS.headerTitle }, "Google Cloud Storage"),
            React.createElement("div", { className: typestyle_1.classes(STYLES.progress, styles_1.CSS.buttonContainer) }, isActive && (React.createElement("span", { title: "Pending GCS activity" },
                React.createElement(progress_1.Progress, null))))))));
    }
}
exports.PanelHeader = PanelHeader;
