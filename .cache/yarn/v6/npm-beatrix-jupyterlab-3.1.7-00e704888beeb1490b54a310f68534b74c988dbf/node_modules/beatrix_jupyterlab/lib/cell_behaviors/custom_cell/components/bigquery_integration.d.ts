/// <reference types="react" />
import { QueryStates } from '../../../bigquery/components/query_editor/query_text_editor/query_text_editor';
import { JobReference } from '../../../bigquery/service/bigquery_api_types';
export declare const BIGQUERY_INTEGRATION_HEADER_CLASS = "bigquery-integration-header";
export declare const BIGQUERY_INTEGRATION_FOOTER_CLASS = "bigquery-integration-footer";
export interface HeaderProps {
    query: string;
    queryState: QueryStates;
    expectedBytesProcessed: number | null;
    errorMessage: string | null;
    submitQuery: () => Promise<void>;
    cancelQuery: () => Promise<void>;
}
export declare function BigQueryIntegrationHeader({ query, queryState, expectedBytesProcessed, errorMessage, submitQuery, cancelQuery, }: HeaderProps): JSX.Element;
export interface FooterProps {
    renderResults: boolean;
    jobReference: JobReference;
    query: string;
    actualBytesProcessed: number;
}
export declare function BigQueryIntegrationFooter({ renderResults, jobReference, query, actualBytesProcessed, }: FooterProps): JSX.Element;
