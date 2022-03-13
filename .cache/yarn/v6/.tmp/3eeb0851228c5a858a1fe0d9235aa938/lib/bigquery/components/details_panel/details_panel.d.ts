import * as React from 'react';
import { ModelSchema, SchemaField } from '../../service/bigquery_service_types';
export declare const localStyles: {
    title: string;
    panel: string;
    detailsBody: string;
    labelContainer: string;
    rowTitle: string;
    row: string;
    bold: string;
};
interface SharedDetails {
    id: string;
    description: string;
    labels: string[];
    name: string;
    schema?: SchemaField[];
    query?: string;
    schema_labels?: ModelSchema[];
    feature_columns?: ModelSchema[];
}
interface Props {
    details: SharedDetails;
    rows: any[];
    detailsType: 'DATASET' | 'TABLE' | 'VIEW' | 'MODEL';
    trainingRows?: any[];
}
export declare const DetailsPanel: React.SFC<Props>;
export {};
