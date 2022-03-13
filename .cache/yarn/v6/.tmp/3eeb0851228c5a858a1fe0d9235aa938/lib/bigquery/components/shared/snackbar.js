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
exports.COPIED_AUTOHIDE_DURATION = void 0;
const React = __importStar(require("react"));
const Close_1 = __importDefault(require("@material-ui/icons/Close"));
const core_1 = require("@material-ui/core");
const react_redux_1 = require("react-redux");
const snackbarSlice_1 = require("../../reducers/snackbarSlice");
exports.COPIED_AUTOHIDE_DURATION = 2000;
function CustomSnackbar(props) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.closeSnackbar();
    };
    return (React.createElement(core_1.Snackbar, { anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }, autoHideDuration: props.autoHideDuration, open: props.open, onClose: handleClose, message: props.message, action: React.createElement(React.Fragment, null,
            props.children,
            React.createElement(core_1.IconButton, { size: "small", "aria-label": "close", color: "inherit", onClick: handleClose },
                React.createElement(Close_1.default, { fontSize: "small" }))) }));
}
const mapDispatchToProps = {
    closeSnackbar: snackbarSlice_1.closeSnackbar,
};
exports.default = react_redux_1.connect(null, mapDispatchToProps)(CustomSnackbar);
