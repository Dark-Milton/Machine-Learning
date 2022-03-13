import * as React from 'react';
import { TablePreview } from '../../service/bigquery_service_types';
import { JobReference } from '../../service/bigquery_api_types';
interface Props {
    tableId: string;
    isVisible: boolean;
}
interface State {
    isLoading: boolean;
    preview: TablePreview;
    jobReference?: JobReference;
}
export default class TablePreviewPanel extends React.Component<Props, State> {
    private mounted;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): void;
    private getPreviewQuery;
    private getPreview;
    render(): JSX.Element;
}
export {};
