import * as React from 'react';
interface Props {
    cloudBucket: string;
    shareLink: string;
    handleClose?: () => void;
}
interface State {
    openDialog: boolean;
    openSnackbar: boolean;
}
export declare class ShareDialog extends React.Component<Props, State> {
    constructor(props: Props);
    handleClickOpen(): void;
    handleCopy(): void;
    handleClose(): void;
    handleSnackbarClose(): void;
    render(): JSX.Element;
}
export {};
