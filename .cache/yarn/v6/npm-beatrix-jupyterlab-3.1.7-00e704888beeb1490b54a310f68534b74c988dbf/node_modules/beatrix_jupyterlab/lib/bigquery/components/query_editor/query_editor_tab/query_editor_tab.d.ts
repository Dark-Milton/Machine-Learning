import React from 'react';
export interface QueryEditorTabProps {
    isVisible: boolean;
    iniQuery?: string;
    useLegacySql?: boolean;
}
export interface QueryEditorTabState {
    isVisible: boolean;
}
export declare class QueryEditorTab extends React.Component<QueryEditorTabProps, QueryEditorTabState> {
    constructor(props: any);
    render(): JSX.Element;
}
