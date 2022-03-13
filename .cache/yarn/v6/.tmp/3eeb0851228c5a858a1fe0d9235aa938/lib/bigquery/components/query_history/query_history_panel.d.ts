import * as React from 'react';
import { JobsObject } from '../../service/bigquery_service_types';
interface State {
    openJob?: string;
    hasLoaded: boolean;
    detailLoaded: boolean;
    page: number;
    rowsPerPage: number;
    lastFetchTime: number;
}
export declare class QueryHistoryPanel extends React.Component<Record<string, never>, State> {
    private static queryHistory;
    constructor(props: Record<string, never>);
    componentDidMount(): Promise<void>;
    getQueryDetails(jobId: string): Promise<void>;
    processHistory(jobIds: string[], jobs: JobsObject): Map<string, string[]>;
    private getHistory;
    displayDate(date: string): string;
    handlePageChange(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void;
    handleRowsPerPageChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void;
    handleRefreshHistory(): Promise<void>;
    render(): JSX.Element;
}
export {};
