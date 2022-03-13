import * as React from 'react';
export declare const COPIED_AUTOHIDE_DURATION = 2000;
interface Props {
    open: boolean;
    message: string;
    closeSnackbar: any;
    autoHideDuration: number;
}
declare function CustomSnackbar(props: React.PropsWithChildren<Props>): JSX.Element;
declare const _default: import("react-redux").ConnectedComponent<typeof CustomSnackbar, import("react-redux").Omit<Props, "closeSnackbar">>;
export default _default;
