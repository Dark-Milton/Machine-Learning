"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastRewindIcon = exports.FastForwardIcon = exports.ChevronRightIcon = exports.ChevronLeftIcon = exports.MenuIcon = exports.AddIcon = exports.RefreshIcon = exports.SmallLaunchIcon = exports.RedError = exports.BlueInfo = exports.GrayPending = exports.RedCloseCircle = exports.RedClose = exports.GrayDisabled = exports.UnknownCircle = exports.PausedCircle = exports.GreenCheckCircle = exports.GreenCheck = void 0;
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const styles_1 = require("../../styles");
/** Green check icon */
exports.GreenCheck = core_1.withStyles({
    root: {
        color: styles_1.COLORS.green,
        fontSize: '16px',
    },
})(icons_1.Check);
/** Green check circle icon */
exports.GreenCheckCircle = core_1.withStyles({
    root: {
        color: styles_1.COLORS.green,
        fontSize: '16px',
    },
})(icons_1.CheckCircle);
/** Pause circle icon */
exports.PausedCircle = core_1.withStyles({
    root: {
        color: styles_1.COLORS.base,
        fontSize: '16px',
    },
})(icons_1.PauseCircleFilled);
/** Unknown circle icon */
exports.UnknownCircle = core_1.withStyles({
    root: {
        color: styles_1.COLORS.base,
        fontSize: '16px',
    },
})(icons_1.Help);
/** Disable icon */
exports.GrayDisabled = core_1.withStyles({
    root: {
        color: styles_1.COLORS.base,
        fontSize: '16px',
    },
})(icons_1.Block);
/** Red 'X' icon */
exports.RedClose = core_1.withStyles({
    root: {
        color: styles_1.COLORS.red,
        fontSize: '16px',
    },
})(icons_1.Close);
/** Red 'X' Circle icon */
exports.RedCloseCircle = core_1.withStyles({
    root: {
        color: styles_1.COLORS.red,
        fontSize: '16px',
    },
})(icons_1.CancelRounded);
/** Gray pending icon */
exports.GrayPending = core_1.withStyles({
    root: {
        color: styles_1.COLORS.base,
        fontSize: '16px',
    },
})(icons_1.Refresh);
/** Blue information icon */
exports.BlueInfo = core_1.withStyles({
    root: {
        color: styles_1.COLORS.link,
        fontSize: '16px',
    },
})(icons_1.Info);
/** Red information icon */
exports.RedError = core_1.withStyles({
    root: {
        color: styles_1.COLORS.red,
        fontSize: '16px',
    },
})(icons_1.Error);
// tslint:disable-next-line:enforce-name-casing
/** External link Launch icon */
exports.SmallLaunchIcon = core_1.withStyles({
    root: {
        fontSize: '16px',
        paddingLeft: '2px',
    },
})(icons_1.Launch);
exports.RefreshIcon = core_1.withStyles({
    root: {
        fontSize: '16px',
    },
})(icons_1.Refresh);
exports.AddIcon = core_1.withStyles({
    root: {
        fontSize: '16px',
    },
})(icons_1.Add);
exports.MenuIcon = core_1.withStyles({
    root: {
        fontSize: '20px',
    },
})(icons_1.MoreVert);
exports.ChevronLeftIcon = core_1.withStyles({
    root: {
        fontSize: '20px',
    },
})(icons_1.ChevronLeft);
exports.ChevronRightIcon = core_1.withStyles({
    root: {
        fontSize: '20px',
    },
})(icons_1.ChevronRight);
exports.FastForwardIcon = core_1.withStyles({
    root: {
        fontSize: '20px',
    },
})(icons_1.FastForward);
exports.FastRewindIcon = core_1.withStyles({
    root: {
        fontSize: '20px',
    },
})(icons_1.FastRewind);
