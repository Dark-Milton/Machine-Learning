import * as React from 'react';
import { OnClose, OnSetupRequiredChanged } from './drawer';
interface Props {
    onClose: OnClose;
    onSetupRequiredChanged: OnSetupRequiredChanged;
}
interface State {
    error: string;
    isEnabling: boolean;
}
export declare class EnableApi extends React.Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element;
    private _tryAgain;
    private _enableAPI;
}
export {};
