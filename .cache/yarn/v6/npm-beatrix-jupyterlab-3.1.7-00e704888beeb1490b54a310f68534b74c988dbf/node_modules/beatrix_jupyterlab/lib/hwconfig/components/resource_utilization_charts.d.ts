import * as React from 'react';
import { Utilization } from '../data/data';
interface GpuUtilization {
    gpu: number;
    memory: number;
}
interface State {
    data: Utilization[];
    gpuData: GpuUtilization[];
    receivedError: boolean;
    showGpu: boolean;
}
export declare class ResourceUtilizationCharts extends React.Component<Record<string, never>, State> {
    private refreshInterval?;
    private readonly NUM_DATA_POINTS;
    private readonly REFRESH_INTERVAL;
    constructor(props: Record<string, never>);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private pollUtilizationData;
}
export {};
