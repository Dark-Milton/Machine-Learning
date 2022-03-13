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
exports.ListItemsWidget = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const signaling_1 = require("@lumino/signaling");
const React = __importStar(require("react"));
const constants_1 = require("../../constants");
const redux_react_widget_1 = require("../../utils/widgetManager/redux_react_widget");
const list_tree_panel_1 = __importDefault(require("./list_tree_panel"));
/** Widget to be registered in the left-side panel. */
class ListItemsWidget extends redux_react_widget_1.ReduxReactWidget {
    constructor(context) {
        super();
        this.context = context;
        this.visibleSignal = new signaling_1.Signal(this);
        this.title.iconClass = `jp-Icon jp-Icon-20 ${constants_1.ICONS.bigQuery}`;
        this.title.caption = 'BigQuery In Notebooks';
    }
    onAfterHide() {
        this.visibleSignal.emit(false);
    }
    onAfterShow() {
        this.visibleSignal.emit(true);
    }
    renderReact() {
        return (React.createElement(apputils_1.UseSignal, { signal: this.visibleSignal }, (_, isVisible) => (React.createElement(list_tree_panel_1.default, { isVisible: isVisible, context: this.context }))));
    }
}
exports.ListItemsWidget = ListItemsWidget;
