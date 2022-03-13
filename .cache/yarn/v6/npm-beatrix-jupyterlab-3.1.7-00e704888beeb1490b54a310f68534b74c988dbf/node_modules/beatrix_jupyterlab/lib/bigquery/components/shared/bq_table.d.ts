import React from 'react';
import { JobReference } from '../../service/bigquery_api_types';
export declare const StyledPagination: React.ComponentType<any>;
interface Props {
    jobReference: JobReference;
}
interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}
export declare function TablePaginationActions({ count, page, rowsPerPage, onPageChange, }: TablePaginationActionsProps): JSX.Element;
export declare function BQTable({ jobReference }: Props): JSX.Element;
export {};
