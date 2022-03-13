"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeSnackbar = exports.openSnackbar = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    open: false,
    message: '',
    autoHideDuration: null,
};
const snackbarSlice = toolkit_1.createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        openSnackbar(state, action) {
            const { message, autoHideDuration } = action.payload;
            state.open = true;
            state.message = message;
            state.autoHideDuration = autoHideDuration !== null && autoHideDuration !== void 0 ? autoHideDuration : null;
        },
        closeSnackbar(state) {
            state.open = false;
        },
    },
});
_a = snackbarSlice.actions, exports.openSnackbar = _a.openSnackbar, exports.closeSnackbar = _a.closeSnackbar;
exports.default = snackbarSlice.reducer;
