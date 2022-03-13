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
exports.ActionBar = exports.STYLES = void 0;
const core_1 = require("@material-ui/core");
const csstips = __importStar(require("csstips"));
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const styles_1 = require("../../styles");
exports.STYLES = typestyle_1.stylesheet({
    actionBar: Object.assign({ $nest: {
            '&>*': {
                marginLeft: '16px',
            },
        } }, csstips.horizontal),
    endJustify: Object.assign({}, csstips.endJustified),
    actionBarContainer: {
        paddingTop: '16px',
    },
    actionBarDisplayMessage: Object.assign(Object.assign({ marginLeft: '5px' }, csstips.horizontal), { color: styles_1.COLORS.caption, fontSize: '12px' }),
    errorSpacing: {
        overflow: 'truncated',
        marginTop: '16px !important',
        marginBottom: '16px !important',
    },
});
/** Funtional Component for defining an action bar with buttons. */
function ActionBar(props) {
    return (React.createElement(core_1.Grid, { container: true, spacing: 1, className: exports.STYLES.actionBarContainer },
        props.displayMessage && (React.createElement(core_1.Grid, { item: true, sm: 12 },
            React.createElement("span", { className: exports.STYLES.actionBarDisplayMessage }, props.displayMessage))),
        props.error && (React.createElement(core_1.Grid, { item: true, sm: 12, className: exports.STYLES.errorSpacing }, props.error)),
        React.createElement(core_1.Grid, { item: true, sm: 12 },
            React.createElement("div", { className: typestyle_1.classes(exports.STYLES.actionBar, !props.alignLeft ? exports.STYLES.endJustify : '') },
                props.closeOnRight && props.children,
                React.createElement(core_1.Button, { onClick: props.onClose }, props.closeLabel || 'Close'),
                !props.closeOnRight && props.children))));
}
exports.ActionBar = ActionBar;
