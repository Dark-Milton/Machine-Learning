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
const core_1 = require("@material-ui/core");
const csstips = __importStar(require("csstips"));
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const styles_1 = require("../../styles");
const STYLES = typestyle_1.stylesheet({
    actionBar: Object.assign(Object.assign({ marginTop: '25px', display: 'block' }, csstips.horizontal), csstips.endJustified),
});
const SecondaryButton = core_1.withStyles(() => core_1.createStyles({
    root: {
        marginRight: '10px',
        textTransform: 'capitalize',
        fontFamily: 'var(--jp-ui-font-family)',
    },
}))(core_1.Button);
const PrimaryButton = core_1.withStyles(() => core_1.createStyles({
    root: {
        textTransform: 'none',
        fontFamily: 'var(--jp-ui-font-family)',
        backgroundColor: styles_1.COLORS.blue,
        '&:hover': {
            backgroundColor: '#1a62e8',
        },
    },
}))(core_1.Button);
/** Funtional Component for defining an action bar with buttons. */
function ActionBar(props) {
    return (React.createElement("div", { className: STYLES.actionBar },
        props.secondaryLabel && (React.createElement(SecondaryButton, { variant: "contained", size: "small", disableRipple: true, disableElevation: true, onClick: props.onSecondaryClick }, props.secondaryLabel)),
        React.createElement(PrimaryButton, { variant: "contained", color: "primary", size: "small", disableRipple: true, disableElevation: true, onClick: props.onPrimaryClick, disabled: props.primaryDisabled }, props.primaryLabel)));
}
exports.ActionBar = ActionBar;
