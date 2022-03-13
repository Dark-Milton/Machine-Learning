"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedError = exports.BlueInfo = exports.GrayPending = exports.RedClose = exports.GreenCheck = void 0;
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
/** Red 'X' icon */
exports.RedClose = core_1.withStyles({
    root: {
        color: styles_1.COLORS.red,
        fontSize: '16px',
    },
})(icons_1.Close);
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
})(icons_1.Info);
