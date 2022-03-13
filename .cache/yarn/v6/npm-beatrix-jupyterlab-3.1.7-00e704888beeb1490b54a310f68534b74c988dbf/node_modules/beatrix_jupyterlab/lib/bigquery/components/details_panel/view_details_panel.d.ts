import * as React from 'react';
import { ViewDetails } from '../../service/bigquery_service_types';
interface Props {
    isVisible: boolean;
    view_id: string;
    view_name: string;
}
interface State {
    hasLoaded: boolean;
    isLoading: boolean;
    details: ViewDetails;
    rows: DetailRow[];
}
interface DetailRow {
    name: string;
    value: string;
}
export default class ViewDetailsPanel extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidUpdate(prevProps: Props): void;
    private getDetails;
    render(): JSX.Element;
}
export {};
