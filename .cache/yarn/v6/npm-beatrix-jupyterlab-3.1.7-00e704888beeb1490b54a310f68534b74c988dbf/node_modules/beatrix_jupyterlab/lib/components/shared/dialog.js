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
exports.DialogComponent = void 0;
const core_1 = require("@material-ui/core");
const csstips = __importStar(require("csstips"));
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const styles_1 = require("../../styles");
const action_bar_1 = require("./action_bar");
const submit_button_1 = require("./submit_button");
const dialogStyle = typestyle_1.stylesheet({
    header: Object.assign(Object.assign(Object.assign(Object.assign({}, styles_1.BASE_FONT), { backgroundColor: 'var(--jp-layout-color1)', fontWeight: 'bold', fontSize: '15px', margin: '16px 16px 0 16px' }), csstips.horizontal), csstips.center),
    main: Object.assign(Object.assign(Object.assign({}, styles_1.BASE_FONT), { backgroundColor: 'var(--jp-layout-color1)', padding: '16px', paddingBottom: '0px', width: '480px' }), csstips.vertical),
});
const StyledDialog = core_1.withStyles({
    paper: {
        minHeight: (props) => { var _a; return (_a = props.height) !== null && _a !== void 0 ? _a : 0; },
        backgroundColor: 'var(--jp-layout-color1)',
        color: 'var(--jp-ui-font-color1)',
    },
})((props) => {
    return React.createElement(core_1.Dialog, Object.assign({}, props));
});
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noOpFunction = () => { };
/** Funtional Component for a common dialog interface with cancel and submit buttons. */
function DialogComponent(props) {
    var _a, _b;
    const onCancel = (_a = props.onCancel) !== null && _a !== void 0 ? _a : noOpFunction;
    const onSubmit = (_b = props.onSubmit) !== null && _b !== void 0 ? _b : noOpFunction;
    return (React.createElement(StyledDialog, { keepMounted: !!props.keepMounted, open: props.open, height: props.height },
        props.header && (React.createElement("header", { className: dialogStyle.header }, props.header)),
        props.children && (React.createElement("main", { className: dialogStyle.main }, props.children)),
        React.createElement(action_bar_1.ActionBar, { onClick: onCancel, closeLabel: props.cancelLabel || 'Cancel' }, !(props.hideSubmit || false) && (React.createElement(submit_button_1.SubmitButton, { actionPending: props.submitDisabled || false, onClick: onSubmit, text: props.submitLabel || 'Submit' })))));
}
exports.DialogComponent = DialogComponent;
