import * as React from 'react';
import { Endpoint } from '../interfaces';
export interface Props {
    endpoint: Endpoint;
    handleClose?: () => void;
}
export interface State {
    openDialog: boolean;
    openSnackbar: boolean;
    dataType: string;
    selectedDataType: string;
    generateCode: string;
}
export declare class EndpointCodeDialog extends React.Component<Props, State> {
    constructor(props: Props);
    handleClickOpen(): Promise<void>;
    handleSnackbarClose(): void;
    handleCopy(): void;
    handleClose(): void;
    handleDataTypeSelectChange(event: React.ChangeEvent<HTMLInputElement>): void;
    handleGenerateCodeSelectChange(event: React.ChangeEvent<HTMLInputElement>): void;
    handleResetDataTypeSelections(): void;
    render(): JSX.Element;
}
