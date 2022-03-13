import * as React from 'react';
import { ModelSchema, SchemaField } from '../../service/bigquery_service_types';
export declare const localStyles: {
    bold: string;
};
export declare const TableHeadCell: React.ComponentType<any>;
export declare const StyledTableRow: React.ComponentType<any>;
export declare const SchemaTable: (props: {
    schema: SchemaField[];
}) => JSX.Element;
export declare const ModelSchemaTable: (props: {
    schema: ModelSchema[];
}) => JSX.Element;
