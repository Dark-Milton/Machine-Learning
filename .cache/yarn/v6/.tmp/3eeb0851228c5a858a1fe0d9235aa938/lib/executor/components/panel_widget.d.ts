import { ReactWidget } from '@jupyterlab/apputils';
import * as React from 'react';
declare type Props = Record<string, never>;
interface State {
    error?: string;
    projectId?: string;
    tab: number;
}
/** Panel component for displaying Vertex AI executions */
export declare class ExecutorPanel extends React.Component<Props, State> {
    private readonly refreshExecutionsSignal;
    private readonly refreshSchedulesSignal;
    constructor(props: Props);
    componentDidMount(): void;
    handleChangeTab(event: React.ChangeEvent<unknown>, newValue: number): void;
    handleRefresh(): void;
    render(): JSX.Element;
    private displayItem;
    private checkMatch;
    private listExecutions;
    private listSchedules;
}
/** Widget to be registered in the left-side panel. */
export declare class ExecutorPanelWidget extends ReactWidget {
    private visibleSignal;
    constructor();
    onAfterHide(): void;
    onAfterShow(): void;
    render(): JSX.Element;
}
export {};
