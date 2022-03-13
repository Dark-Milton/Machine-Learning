import * as React from 'react';
import { Model, DeployData, Endpoint } from '../interfaces';
export interface State {
    isLoading: boolean;
    region: string;
    endpoints: Endpoint[];
    openDrawer: boolean;
    createEndpoint: boolean;
    pendingSubmission: boolean;
    isFormValid: boolean;
    submissionError: string;
    progressMessage: string;
    deployModelData?: DeployData;
}
export interface Props {
    model: Model;
}
export declare class DeployToEndpointDrawer extends React.Component<Props, State> {
    constructor(props: Props);
    handleCreateAndDeploy(): Promise<void>;
    handleOpen(): Promise<void>;
    handleClose(): void;
    handleUpdateDeployData(deployData: DeployData): void;
    handleChecked: (prev: boolean) => void;
    handleDeploy(): Promise<void>;
    render(): JSX.Element;
}
