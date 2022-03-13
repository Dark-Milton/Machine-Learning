import * as React from 'react';
import { CustomModel } from '../interfaces';
export interface State {
    openDrawer: boolean;
    customModel: CustomModel;
    submissionError: string;
    pendingSubmission: boolean;
    formError: boolean;
}
export interface Props {
    filePath?: string;
    openFromFile?: boolean;
}
export declare class UploadCustomModelsDrawer extends React.Component<Props, State> {
    constructor(props: Props);
    handleOpen(): Promise<void>;
    handleClose(): void;
    handleUpload(): Promise<void>;
    handleFormError(): void;
    handlePopulateModel(modelAttribute: string, value: string): void;
    componentWillReceiveProps(nextProps: Readonly<Props>): void;
    render(): JSX.Element;
    private checkValidSubmit;
}
