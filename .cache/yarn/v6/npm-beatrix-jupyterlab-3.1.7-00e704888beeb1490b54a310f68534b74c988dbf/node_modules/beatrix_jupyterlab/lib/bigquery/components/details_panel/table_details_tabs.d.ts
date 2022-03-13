import * as React from 'react';
import { TableDetails } from '../../service/bigquery_service_types';
export declare const localStyles: {
    body: string;
    tableDetailsRoot: string;
};
interface Props {
    isVisible: boolean;
    table_id: string;
    table_name: string;
    partitioned: boolean;
}
interface State {
    hasLoaded: boolean;
    isLoading: boolean;
    details: TableDetails;
    rows: DetailRow[];
    currentTab: number;
    showPartitionCard: boolean;
}
interface DetailRow {
    name: string;
    value: string | number;
}
export default class TableDetailsTabs extends React.Component<Props, State> {
    constructor(props: Props);
    handleChange(event: React.ChangeEvent<unknown>, newValue: number): void;
    render(): JSX.Element;
}
export {};
