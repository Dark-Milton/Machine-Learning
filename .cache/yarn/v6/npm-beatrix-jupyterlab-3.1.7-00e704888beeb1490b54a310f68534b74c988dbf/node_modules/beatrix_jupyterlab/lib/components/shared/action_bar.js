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
exports.ActionBar = void 0;
const csstips = __importStar(require("csstips"));
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const core_1 = require("@material-ui/core");
const actionBar = typestyle_1.style(Object.assign(Object.assign({ padding: '16px', $nest: {
        '&>*': {
            marginLeft: '16px',
        },
    } }, csstips.horizontal), csstips.endJustified));
/** Funtional Component for defining an action bar with buttons. */
function ActionBar(props) {
    return (React.createElement("div", { className: actionBar },
        React.createElement(core_1.Button, { onClick: props.onClick }, props.closeLabel || 'Close'),
        props.children));
}
exports.ActionBar = ActionBar;
