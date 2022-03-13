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
const React = __importStar(require("react"));
const core_1 = require("@material-ui/core");
const typestyle_1 = require("typestyle");
const localStyles = typestyle_1.stylesheet({
    container: {
        root: {
            backgroundColor: 'var(--jp-layout-color0)',
        },
        display: 'flex',
        alignItems: 'stretch',
        marginBottom: '12px',
        justifyContent: 'space-between',
        paddingRight: '12px',
    },
    leftSide: {
        display: 'flex',
    },
    icon: {
        marginRight: '12px',
    },
    messageSpace: {
        padding: '4px 8px',
        display: 'flex',
        alignItems: 'center',
    },
});
const StyledPaper = core_1.withStyles({
    root: {
        backgroundColor: 'var(--jp-layout-color0)',
        border: '1px solid var(--jp-border-color2)',
        color: 'var(--jp-ui-font-color1)',
        display: 'flex',
        alignItems: 'stretch',
        marginBottom: '12px',
        justifyContent: 'space-between',
        paddingRight: '12px',
    },
})(core_1.Paper);
// Card with matching colored strip and icon, and info message
const InfoCard = (props) => {
    const { message, color, icon, button } = props;
    return (React.createElement(StyledPaper, { className: localStyles.container, variant: "outlined" },
        React.createElement("div", { className: localStyles.leftSide },
            React.createElement("div", { style: { width: '6px', backgroundColor: color } }),
            React.createElement("div", { className: localStyles.messageSpace },
                React.createElement(icon.type, Object.assign({}, icon.props, { className: localStyles.icon, style: { color: color }, fontSize: "medium" })),
                message)),
        button));
};
exports.default = InfoCard;
