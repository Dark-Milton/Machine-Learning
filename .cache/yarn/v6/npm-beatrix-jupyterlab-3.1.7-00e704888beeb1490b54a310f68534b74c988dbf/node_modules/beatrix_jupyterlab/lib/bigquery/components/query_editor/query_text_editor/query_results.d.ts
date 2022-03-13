/// <reference types="react" />
import { openSnackbar as openSnackbarAction } from '../../../reducers/snackbarSlice';
import { JobReference } from '../../../service/bigquery_api_types';
import { QueryFlags } from './query_text_editor';
export declare const localStyles: {
    resultsContainer: string;
    inCell: string;
    header: string;
    headerTitleBox: string;
    queryStatusMessage: string;
    headerButton: string;
};
export declare type QueryEditorType = 'FULL_WINDOW' | 'IN_CELL';
export interface QueryResultsProps {
    queryFlags: QueryFlags;
    duration: number;
    bytesProcessed: number;
    editorType?: QueryEditorType;
    openSnackbar: typeof openSnackbarAction | (() => void);
    jobReference: JobReference;
    query: string;
    clearResults?: () => void;
}
export declare function QueryResults({ editorType, queryFlags, query, openSnackbar, jobReference, duration, bytesProcessed, }: QueryResultsProps): JSX.Element;
export declare const ConnectedQueryResults: import("react-redux").ConnectedComponent<typeof QueryResults, import("react-redux").Omit<QueryResultsProps, "openSnackbar">>;
