import React from 'react';
import { DatasetResource, ModelResource, TableResource } from './list_tree_item';
import { Context } from './list_tree_panel';
import { SearchResult } from '../../service/bigquery_service_types';
interface SearchProps {
    context: Context;
    searchResults: SearchResult[];
}
interface State {
    expanded: boolean;
}
export declare function BuildSearchResult(result: any, context: any): JSX.Element;
export declare class DatasetSearchResult extends DatasetResource {
    contextMenuItems: {
        label: string;
        handler: (dataTreeItem: any) => void;
    }[];
    render(): JSX.Element;
}
export declare class ModelSearchResult extends ModelResource {
    render(): JSX.Element;
}
export declare class TableSearchResult extends TableResource {
    render(): JSX.Element;
}
export declare class ViewSearchResult extends TableResource {
    render(): JSX.Element;
}
export default class ListSearchResults extends React.Component<SearchProps, State> {
    constructor(props: SearchProps);
    render(): JSX.Element | JSX.Element[];
}
export {};
