export interface SnackbarState {
    open: boolean;
    message: string;
    autoHideDuration: number | null;
}
export declare const openSnackbar: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<{
    message: string;
    autoHideDuration: number;
}, string>, closeSnackbar: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
declare const _default: import("redux").Reducer<SnackbarState, import("redux").AnyAction>;
export default _default;
