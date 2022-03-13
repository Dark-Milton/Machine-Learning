import { ReactWidget } from '@jupyterlab/apputils';
import { Notebook } from '@jupyterlab/notebook';
import { QueryStates } from '../../../bigquery/components/query_editor/query_text_editor/query_text_editor';
import { ErrorProto, JobReference } from '../../../bigquery/service/bigquery_api_types';
import { CustomMarkdownCell } from '../custom_markdown_cell';
import { CellIntegration } from './cell_integration';
export declare const BIGQUERY_HEADER_WIDGET_CLASS = "bigquery-integration-header-widget";
export declare const BIGQUERY_FOOTER_WIDGET_CLASS = "bigquery-integration-footer-widget";
export declare type BigQueryIntegrationState = {
    query: string;
    queryState: QueryStates;
    expectedBytesProcessed?: number;
    errorMessage?: string;
    renderResults: boolean;
    jobReference?: JobReference;
    actualBytesProcessed: number | null;
};
export declare class BigQueryIntegration extends CellIntegration<Record<string, unknown>, BigQueryIntegrationState> {
    static readonly REGEX: RegExp;
    static test(cellText: string): boolean;
    static extractQueryFromCellText(cellText: string): string | undefined;
    static triggerIntegration(notebook: Notebook): void;
    initialize(): void;
    activate(): void;
    newHeaderWidget(): ReactWidget;
    newFooterWidget(): ReactWidget;
    handleErrors(errors: ErrorProto[]): void;
    contentChangeListener(_: CustomMarkdownCell, cellContents: string): Promise<void>;
    submitQuery(): Promise<void>;
    cancelQuery(): Promise<void>;
    run(): void;
}
