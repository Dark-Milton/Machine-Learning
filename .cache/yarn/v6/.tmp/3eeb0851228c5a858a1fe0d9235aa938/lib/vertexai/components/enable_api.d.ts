import * as React from 'react';
interface Props {
    onAPIEnabled: () => void;
}
interface State {
    error?: string;
    isEnabling: boolean;
}
export declare class EnableApi extends React.Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element;
    private _tryAgain;
    private _enableAPI;
}
export {};
