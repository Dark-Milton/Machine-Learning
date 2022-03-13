/// <reference types="react" />
interface ChartProps {
    data: any[];
    dataKey: string;
    title: string;
    titleClass: string;
    chartColor: {
        stroke: string;
        fill: string;
    };
    areaChartProps: Record<string, unknown>;
    areaProps: Record<string, unknown>;
    cartesianGridProps: Record<string, unknown>;
    yAxisProps: Record<string, unknown>;
}
export declare function AreaChartWrapper(props: ChartProps): JSX.Element;
export {};
