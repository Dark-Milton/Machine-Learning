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
exports.LearnMoreLink = void 0;
const core_1 = require("@material-ui/core");
const csstips = __importStar(require("csstips"));
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const styles_1 = require("../../styles");
const icons_1 = require("./icons");
const localStyles = typestyle_1.stylesheet({
    link: Object.assign(Object.assign({ color: styles_1.COLORS.focus, alignItems: 'center', display: 'inline-flex', flexDirection: 'row' }, csstips.padding(0, '2px')), { wordBreak: 'break-all' }),
    secondary: {
        color: styles_1.COLORS.base,
    },
    noUnderline: {
        textDecoration: 'none',
    },
    disabled: {
        color: styles_1.COLORS.base,
        pointerEvents: 'none',
        cursor: 'default',
        opacity: '0.6',
    },
});
/** Functional Component for an external link */
function LearnMoreLink(props) {
    return (React.createElement("a", { className: typestyle_1.classes(styles_1.CSS.link, localStyles.link, props.noUnderline ? localStyles.noUnderline : null, props.secondary ? localStyles.secondary : null, props.disabled ? localStyles.disabled : null), href: props.href, target: "_blank", rel: "noopener" },
        React.createElement(core_1.Box, { component: "span", sx: {
                display: 'flex',
                maxWidth: props.maxWidth,
            } },
            React.createElement(core_1.Typography, { variant: "inherit", noWrap: props.noWrap }, props.text || 'Learn More'),
            React.createElement(icons_1.SmallLaunchIcon, null))));
}
exports.LearnMoreLink = LearnMoreLink;
