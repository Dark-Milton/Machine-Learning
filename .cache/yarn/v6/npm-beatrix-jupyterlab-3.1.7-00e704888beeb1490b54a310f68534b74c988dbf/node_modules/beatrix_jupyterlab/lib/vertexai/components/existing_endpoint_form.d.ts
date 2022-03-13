import * as React from 'react';
import { Endpoint, Model, DeployData, Option } from '../interfaces';
export interface State {
    minNodes: number;
    maxNodes?: number;
    endpointNames: Option[];
    selectedEndpoint: Endpoint;
    newModelTrafficSplit: number;
}
export interface Props {
    region: string;
    machineType: string;
    endpoints: Endpoint[];
    model: Model;
    uploadUserInputs: (object: DeployData) => void;
}
export declare class ExistingEndpointForm extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    onFormValuesChange(): void;
    handleMaxNodeValueChange(event: React.ChangeEvent<HTMLInputElement>): void;
    handleMinNodeValueChange(event: React.ChangeEvent<HTMLInputElement>): void;
    handleSelectedEndpoint(e: React.ChangeEvent<HTMLInputElement>): void;
    handleTrafficSplitChange(modelIndex: number, event: React.ChangeEvent<HTMLInputElement>): void;
    checkTrafficSplit(): boolean;
    render(): JSX.Element;
    private _removeModelsNotInTrafficSplit;
}
