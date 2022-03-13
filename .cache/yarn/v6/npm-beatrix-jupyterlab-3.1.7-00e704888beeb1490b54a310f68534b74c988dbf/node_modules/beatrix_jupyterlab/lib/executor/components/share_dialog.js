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
exports.ShareDialog = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const learn_more_link_1 = require("../../components/shared/learn_more_link");
const styles_1 = require("../../styles");
const core_1 = require("@material-ui/core");
const localStyles = typestyle_1.stylesheet({
    text: {
        fontSize: '13px !important',
        color: styles_1.COLORS.base + ' !important',
    },
    fullWidth: {
        width: '100%',
    },
    inlineStart: {
        paddingInlineStart: '16px',
    },
    actionButtons: {
        margin: '-16px 24px 8px 24px',
    },
    primaryButton: {
        color: styles_1.COLORS.focus + '!important',
    },
    spacingAbove: {
        marginTop: '16px',
    },
    spacingBelow: {
        marginBottom: '16px',
    },
    dialogContent: {
        marginTop: '-8px',
    },
});
class ShareDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { openDialog: false, openSnackbar: false };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleCopy = this.handleCopy.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    }
    handleClickOpen() {
        this.setState({ openDialog: true });
    }
    handleCopy() {
        navigator.clipboard.writeText(this.props.shareLink);
        this.setState({ openSnackbar: true });
    }
    handleClose() {
        this.setState({ openDialog: false, openSnackbar: false });
        if (this.props.handleClose) {
            this.props.handleClose();
        }
    }
    handleSnackbarClose() {
        this.setState({ openSnackbar: false });
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("p", { onClick: this.handleClickOpen, className: localStyles.fullWidth }, "Share execution result"),
            React.createElement(core_1.Dialog, { open: this.state.openDialog, onClose: this.handleClose, "aria-labelledby": "share-dialog-title", "aria-describedby": "share-dialog-description", maxWidth: "sm", fullWidth: true },
                React.createElement(core_1.DialogTitle, { id: "share-dialog-title" }, "Share execution results in this project"),
                React.createElement(core_1.DialogContent, { className: localStyles.dialogContent },
                    React.createElement(core_1.DialogContentText, { className: localStyles.text, id: "share-dialog-description" }, "To share this execution result with people or groups, grant view permissions to the Cloud Storage bucket containing this result. If this has been done before, skip steps 2 through 4."),
                    React.createElement("ol", { className: typestyle_1.classes(localStyles.inlineStart, localStyles.spacingAbove, localStyles.spacingBelow, localStyles.text) },
                        React.createElement("li", null, "Click the \"COPY LINK\" button below"),
                        React.createElement("li", null,
                            "Go to the",
                            ' ',
                            React.createElement(learn_more_link_1.LearnMoreLink, { href: this.props.cloudBucket, text: "results bucket" }),
                            "."),
                        React.createElement("li", null, "Click \"Add\""),
                        React.createElement("li", null, "Enter one or more emails then select the \"Storage Object Viewer\" role")),
                    React.createElement(core_1.DialogContentText, { className: localStyles.text, id: "share-dialog-description" }, "You can now share links to all execution results stored in this bucket, including the one you copied, with the people or groups granted the view permission.")),
                React.createElement(core_1.DialogActions, { className: localStyles.actionButtons },
                    React.createElement(core_1.Button, { className: localStyles.primaryButton, onClick: this.handleClose, color: "primary" }, "Cancel"),
                    React.createElement(core_1.Button, { className: localStyles.primaryButton, onClick: this.handleCopy, color: "primary", autoFocus: true }, "Copy Link"))),
            React.createElement(core_1.Snackbar, { open: this.state.openSnackbar, onClose: this.handleSnackbarClose, message: "Copied to clipboard" })));
    }
}
exports.ShareDialog = ShareDialog;
