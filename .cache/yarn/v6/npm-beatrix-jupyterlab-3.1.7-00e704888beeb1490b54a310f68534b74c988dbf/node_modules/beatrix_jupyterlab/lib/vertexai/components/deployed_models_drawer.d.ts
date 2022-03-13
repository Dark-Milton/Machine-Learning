import * as React from 'react';
import { DeployedModel, TrafficSplit } from '../interfaces';
interface State {
    openDrawer: boolean;
}
interface Props {
    endpointDisplayName: string;
    endpointConsoleLink: string;
    projectId: string;
    deployedModels: DeployedModel[];
    trafficSplit: TrafficSplit;
    handleClose?: () => void;
}
export declare class DeployedModelsDrawer extends React.Component<Props, State> {
    constructor(props: Props);
    handleOpen(): void;
    handleClose(): void;
    render(): JSX.Element;
    private getModelConsoleLink;
}
export {};
