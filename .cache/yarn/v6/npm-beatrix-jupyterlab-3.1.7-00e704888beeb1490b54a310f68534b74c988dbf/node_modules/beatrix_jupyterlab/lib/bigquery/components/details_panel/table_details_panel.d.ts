import * as React from 'react';
import { TableDetails } from '../../service/bigquery_service_types';
interface Props {
    isVisible: boolean;
    tableId: string;
}
interface State {
    hasLoaded: boolean;
    isLoading: boolean;
    details: TableDetails;
    rows: DetailRow[];
}
interface DetailRow {
    name: string;
    value: string | number;
}
export declare class TableDetailsPanel extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidUpdate(prevProps: Props): void;
    private getDetails;
    render(): JSX.Element;
}
export {};
