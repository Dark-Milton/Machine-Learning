import * as React from 'react';
import { Model, DeployedModelInfo } from '../interfaces';
interface State {
    openDrawer: boolean;
    deployedModels: DeployedModelInfo[];
    loadingError: string;
    isLoading: boolean;
}
interface Props {
    model: Model;
    handleClose?: () => void;
}
export declare class DeployedModelsForModelDrawer extends React.Component<Props, State> {
    constructor(props: Props);
    handleOpen(): Promise<void>;
    handleClose(): void;
    viewEndpointLink(endpointID: string): string;
    render(): JSX.Element;
}
export {};
