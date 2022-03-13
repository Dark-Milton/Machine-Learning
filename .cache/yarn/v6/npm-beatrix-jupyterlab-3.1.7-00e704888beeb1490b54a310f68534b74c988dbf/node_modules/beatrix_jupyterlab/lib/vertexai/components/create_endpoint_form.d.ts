import * as React from 'react';
import { DeployData, Model } from '../interfaces';
export interface State {
    endpointName: string;
    minNodes: number;
    maxNodes?: number;
}
export interface Props {
    region: string;
    machineType: string;
    model: Model;
    uploadUserInputs: (deployData: DeployData) => void;
}
export declare class CreateEndpointForm extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    onFormValuesChange(): void;
    handleMaxNodeValueChange(event: React.ChangeEvent<HTMLInputElement>): void;
    handleMinNodeValueChange(event: React.ChangeEvent<HTMLInputElement>): void;
    handleTextChange(event: React.ChangeEvent<HTMLInputElement>): void;
    render(): JSX.Element;
}
