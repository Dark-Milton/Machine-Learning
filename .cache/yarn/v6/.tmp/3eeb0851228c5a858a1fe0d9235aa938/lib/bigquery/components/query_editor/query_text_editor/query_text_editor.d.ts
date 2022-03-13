/// <reference types="node" />
import React from 'react';
import { QueryEditorType } from './query_results';
import { CodeEditorWrapper } from '@jupyterlab/codeeditor';
import { CodeMirrorEditor } from '@jupyterlab/codemirror';
import { JobReference } from '../../../service/bigquery_api_types';
export interface QueryTextEditorState {
    queryState: QueryStates;
    bytesProcessed: number | null;
    message: string | null;
    ifMsgErr: boolean;
    height: number;
    renderQueryResults: boolean;
    jobReference?: JobReference;
    query: string;
}
export declare type QueryFlags = Record<string, string | boolean | number>;
export interface QueryTextEditorProps {
    iniQuery?: string;
    editorType?: QueryEditorType;
    queryFlags?: QueryFlags;
    showResult?: boolean;
}
export interface QueryResult {
    contentLen: number;
    labels: Array<string>;
    bytesProcessed: number;
    project: string;
    query: string;
    duration: number;
    queryFlags?: QueryFlags;
}
export declare type QueryContent = Array<Array<unknown>>;
export declare const styleSheet: {
    statusBarText: string;
    queryTextEditor: string;
    queryTextEditorInCell: string;
    wholeEditor: string;
    wholeEditorInCell: string;
    pendingStatus: string;
};
export declare enum QueryStates {
    READY = 0,
    PENDING = 1,
    ERROR = 2,
    CANCELLED = 3
}
export declare const QUERY_DATA_TYPE = "query_content";
export declare class QueryTextEditor extends React.Component<QueryTextEditorProps, QueryTextEditorState> {
    editor: CodeMirrorEditor;
    timeoutAlarm: NodeJS.Timeout | undefined;
    queryFlags: QueryFlags;
    codeEditorWrapper: CodeEditorWrapper;
    private editorRef;
    constructor(props: QueryTextEditorProps);
    get query(): string;
    componentDidMount(): void;
    cancelQuery(): Promise<void>;
    submitQuery(): Promise<Error>;
    checkSQL(): Promise<void>;
    handleKeyPress(evt: React.KeyboardEvent): void;
    render(): JSX.Element;
}
