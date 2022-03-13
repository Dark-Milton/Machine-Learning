import { Component } from 'react';
export interface QueryEditorInCellProps {
    query?: string;
    queryFlags?: string;
}
export declare class QueryEditorInCell extends Component<QueryEditorInCellProps, never> {
    queryFlags: {
        [keys: string]: string;
    };
    constructor(props: QueryEditorInCellProps);
    render(): JSX.Element;
}
