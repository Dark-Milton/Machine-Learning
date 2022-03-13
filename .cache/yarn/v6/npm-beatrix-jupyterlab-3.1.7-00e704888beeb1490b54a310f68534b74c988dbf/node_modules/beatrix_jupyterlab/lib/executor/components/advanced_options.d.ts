import * as React from 'react';
import { GcpSettings } from './drawer';
export interface AdvancedOptionValues {
    gcsBucket: string;
    serviceAccount: string;
    network: string;
    parameters: string;
}
interface Props {
    expandByDefault: boolean;
    gcpSettings: GcpSettings;
    onAdvancedOptionsChanged: (newValues: AdvancedOptionValues) => void;
}
export declare class AdvancedOptions extends React.Component<Props, AdvancedOptionValues> {
    constructor(props: Props);
    onGcsBucketChange(gcsBucket: string): void;
    onParametersChange(parameters: string): void;
    onServiceAccountChange(serviceAccount: string): void;
    onNetworkChange(network: string): void;
    render(): JSX.Element;
}
export {};
