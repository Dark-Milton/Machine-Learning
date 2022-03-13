import * as React from 'react';
import { GcpSettings } from './drawer';
interface Props {
    gcpSettings: GcpSettings;
    onChange: (value: string) => void;
}
interface State {
    useDefault: boolean;
    value: string;
    emailError: boolean;
}
export declare class ServiceAccountSelector extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    private setDefaults;
    onUseDefaultValueChange(useDefault: boolean): void;
    onServiceAccountValueChange(value: string): void;
    render(): JSX.Element;
}
export {};
