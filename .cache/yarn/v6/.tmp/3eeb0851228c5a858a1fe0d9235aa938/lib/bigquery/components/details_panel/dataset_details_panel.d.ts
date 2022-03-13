import * as React from 'react';
import { DatasetDetails } from '../../service/bigquery_service_types';
export declare const localStyles: {
    body: string;
    container: string;
};
interface Props {
    isVisible: boolean;
    dataset_id: string;
}
interface State {
    hasLoaded: boolean;
    isLoading: boolean;
    details: DatasetDetails;
    rows: DetailRow[];
}
interface DetailRow {
    name: string;
    value: string;
}
export default class DatasetDetailsPanel extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidUpdate(prevProps: Props): void;
    private getDetails;
    render(): JSX.Element;
}
export {};
