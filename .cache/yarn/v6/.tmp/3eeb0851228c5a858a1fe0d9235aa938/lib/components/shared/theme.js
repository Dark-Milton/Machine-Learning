"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonTheme = void 0;
const core_1 = require("@material-ui/core");
//TODO: Remove commmon theme and usage in executor widget and executor panel widget if a better solution is found.
exports.commonTheme = core_1.createTheme({
    overrides: {
        MuiSvgIcon: {
            root: {
                fontSize: '16px !important',
            },
        },
        MuiIconButton: {
            root: {
                fontSize: '16px !important',
            },
        },
        MuiTypography: {
            body2: {
                fontSize: '12px !important',
            },
            body1: {
                fontSize: 'var(--jp-ui-font-size1, 13px) !important',
            },
        },
    },
});
