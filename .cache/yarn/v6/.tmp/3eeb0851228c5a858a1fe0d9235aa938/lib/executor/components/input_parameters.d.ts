import * as React from 'react';
interface Props {
    onChange: (value: string) => void;
}
interface State {
    value: string;
}
export declare class InputParametersTextArea extends React.Component<Props, State> {
    constructor(props: Props);
    onChange(value: string): void;
    render(): JSX.Element;
}
export {};
