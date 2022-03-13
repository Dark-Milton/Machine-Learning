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
exports.TEXT_STYLE = exports.STYLES = void 0;
const csstips = __importStar(require("csstips"));
const typestyle_1 = require("typestyle");
const styles_1 = require("../../styles");
/* Class names applied to the component. */
exports.STYLES = typestyle_1.stylesheet({
    container: Object.assign({ color: 'var(--jp-ui-font-color1)', fontFamily: 'var(--jp-ui-font-family)', fontSize: 'var(--jp-ui-font-size1, 13px)', lineHeight: '24px', alignItems: 'center' }, csstips.horizontal),
    containerPadding: {
        margin: '0px',
        padding: '24px',
        backgroundColor: 'var(--jp-layout-color1)',
    },
    containerSize: {
        width: 468,
    },
    dialogHeader: Object.assign(Object.assign(Object.assign(Object.assign({}, styles_1.BASE_FONT), { fontWeight: 'bold', fontSize: '15px', margin: '16px 16px 0 16px' }), csstips.horizontal), csstips.center),
    heading: {
        fontSize: '18px',
        marginBottom: '12px',
        fontWeight: 400,
        fontFamily: 'var(--jp-ui-font-family)',
        color: 'var(--jp-ui-font-color1)',
        display: 'block',
    },
    subheading: {
        fontFamily: 'var(--jp-ui-font-family)',
        color: 'var(--jp-ui-font-color1)',
        fontWeight: 700,
        fontSize: '15px',
        paddingTop: '20px',
        paddingBottom: '5px',
        display: 'block',
    },
    paragraph: {
        fontSize: '14px',
        paddingTop: '2px',
        display: 'block',
        fontWeight: 400,
        fontFamily: 'var(--jp-ui-font-family)',
        color: 'var(--jp-ui-font-color1)',
    },
    infoMessage: {
        marginTop: '20px',
    },
});
exports.TEXT_STYLE = {
    fontFamily: styles_1.BASE_FONT.fontFamily,
    fontSize: styles_1.BASE_FONT.fontSize,
    color: 'var(--jp-ui-font-color1)',
};
