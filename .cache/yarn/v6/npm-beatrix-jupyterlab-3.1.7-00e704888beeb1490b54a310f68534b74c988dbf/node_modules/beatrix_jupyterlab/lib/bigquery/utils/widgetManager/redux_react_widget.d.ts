import { ReactWidget } from '@jupyterlab/apputils';
import React from 'react';
import { ProviderProps } from 'react-redux';
declare type ReactRenderElement = Array<React.ReactElement<any>> | React.ReactElement<any>;
export declare abstract class ReduxReactWidget extends ReactWidget {
    private providerProps;
    protected abstract renderReact(): ReactRenderElement;
    setProviderProps(props: ProviderProps): void;
    render(): JSX.Element;
}
export {};
