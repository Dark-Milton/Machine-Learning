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
exports.Avatar = void 0;
const csstips = __importStar(require("csstips"));
const react_1 = __importDefault(require("react"));
const typestyle_1 = require("typestyle");
const styles_1 = require("../styles");
const STYLES = typestyle_1.stylesheet({
    initialContainer: Object.assign(Object.assign({ color: `var(--jp-ui-inverse-font-color0, ${styles_1.COLORS.white})`, fontFamily: styles_1.BASE_FONT.fontFamily, fontSize: 18, backgroundColor: 'var(--jp-ui-font-color3)', borderRadius: '50%', borderColor: 'var(--jp-border-color0)', borderWidth: 'var(--jp-border-width)', height: '32px', lineHeight: 'initial', margin: 'auto', textAlign: 'center', width: '32px' }, csstips.vertical), csstips.centerJustified),
});
/** Displays profile information */
function Avatar(props) {
    const { email } = props;
    return email ? (react_1.default.createElement("div", { className: STYLES.initialContainer },
        react_1.default.createElement("span", { title: email }, email.slice(0, 1).toUpperCase()))) : null;
}
exports.Avatar = Avatar;
