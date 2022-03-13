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
exports.styleSheet = void 0;
const csstips = __importStar(require("csstips"));
const typestyle_1 = require("typestyle");
const styles_1 = require("../../styles");
/** Stylesheet for published notebooks items */
exports.styleSheet = typestyle_1.stylesheet({
    link: Object.assign(Object.assign({ color: styles_1.COLORS.focus, alignItems: 'center', display: 'inline-flex', flexDirection: 'row' }, csstips.padding(0, '2px')), { wordBreak: 'break-all' }),
    menuLink: {
        display: 'block',
        height: '100%',
        width: '100%',
    },
    notebook: {
        paddingTop: '16px',
        paddingBottom: '16px',
        paddingLeft: '20px',
        paddingRight: '20px',
        width: '100%',
        borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)',
    },
    notebookName: {
        display: 'inline-block',
        fontSize: '15px',
        fontWeight: 'bold',
        lineHeight: '16px',
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        whiteSpace: 'nowrap',
        $nest: {
            '&>*': {
                verticalAlign: 'middle',
            },
        },
    },
    notebookCaption: {
        fontSize: '12px',
        paddingTop: '4px',
        color: 'var(--jp-content-font-color2)',
    },
    descriptionLong: {
        color: styles_1.COLORS.base,
        display: 'inline-block',
        fontSize: '12px',
        maxWidth: '100%',
        paddingTop: '4px',
        overflow: 'hidden',
        overflowWrap: 'break-word',
    },
    descriptionShort: {
        color: styles_1.COLORS.base,
        display: 'inline-block',
        fontSize: '12px',
        maxWidth: '100%',
        paddingTop: '4px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    noUnderline: {
        textDecoration: 'none',
    },
    align: {
        marginTop: '-12px !important',
    },
    topAlign: {
        marginTop: '4px',
    },
    spacing: {
        marginTop: '6px',
        marginLeft: '-2px',
    },
});
