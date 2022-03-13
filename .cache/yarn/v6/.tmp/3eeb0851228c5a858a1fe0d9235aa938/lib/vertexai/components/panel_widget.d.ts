import { ReactWidget } from '@jupyterlab/apputils';
import * as React from 'react';
import { Option } from '../../utils';
interface Props {
    isVisible: boolean;
}
interface State {
    isLoading: boolean;
    navigation: Option;
    isAPIEnabled: boolean;
}
/** Panel component for displaying Vertex AI integration */
export declare class VertexAIPanel extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidUpdate(prevProps: Props): void;
    onVisible(): Promise<void>;
    onNavigation(e: React.ChangeEvent<HTMLInputElement>): void;
    onAPIEnabled(): void;
    render(): JSX.Element;
    private getModelsList;
    private getEndpointsList;
}
/** Widget to be registered in the left-side panel. */
export declare class VertexAIPanelWidget extends ReactWidget {
    private visibleSignal;
    constructor();
    onAfterHide(): void;
    onAfterShow(): void;
    render(): JSX.Element;
}
export {};
