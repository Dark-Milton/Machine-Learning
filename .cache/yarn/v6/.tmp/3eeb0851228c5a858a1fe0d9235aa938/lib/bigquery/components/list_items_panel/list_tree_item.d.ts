import React from 'react';
import { QueryType } from '../../utils/starter_queries';
import { Context } from './list_tree_panel';
import { Dataset, Model, Project, Table } from '../../service/bigquery_service_types';
interface ResourceProps {
    context: Context;
    updateProject?: any;
    updateDataset?: any;
    openSnackbar?: any;
}
export interface ModelProps extends ResourceProps {
    model: Model;
}
export interface TableProps extends ResourceProps {
    table: Table;
}
export interface DatasetProps extends ResourceProps {
    dataset: Dataset;
    updateDataset?: any;
}
export interface ProjectProps extends ResourceProps {
    project: Project;
    updateProject: any;
    updateDataset: any;
    removeProject: any;
    collapseAll?: boolean;
    updateCollapseAll?: any;
}
interface ResourceState {
    expanded: string[];
    loading: boolean;
}
interface DataTreeItem {
    id: string;
    datasetId: string;
    name: string;
    type: QueryType;
    legacySql?: boolean;
}
export declare class Resource<T extends ResourceProps> extends React.Component<T, ResourceState> {
    constructor(props: any);
    copyID: (dataTreeItem: any) => void;
    copyBoilerplateQuery: (dataTreeItem: any) => void;
    createTableStatsMagicsNotebook: (dataTreeItem: any) => void;
    queryResource: (dataTreeItem: DataTreeItem) => void;
    getIcon: (iconType: any) => JSX.Element;
}
export declare class ModelResource extends Resource<ModelProps> {
    constructor(props: ModelProps);
    openModelDetails: (event: any, model: any) => void;
    contextMenuItems: {
        label: string;
        handler: (dataTreeItem: any) => void;
    }[];
    render(): JSX.Element;
}
export declare class TableResource extends Resource<TableProps> {
    constructor(props: TableProps);
    openTableDetails: (event: any, table: Table) => void;
    openViewDetails: (event: any, view: any) => void;
    getTableIcon: (table: any) => JSX.Element;
    tableContextMenuItems: {
        label: string;
        handler: (dataTreeItem: any) => void;
    }[];
    viewContextMenuItems: {
        label: string;
        handler: (dataTreeItem: any) => void;
    }[];
    render(): JSX.Element;
}
export declare class DatasetResource extends Resource<DatasetProps> {
    constructor(props: DatasetProps);
    expandDataset: (dataset: any) => void;
    private getDatasetChildren;
    handleExpandDataset: (dataset: any) => void;
    private handleRefreshDataset;
    openDatasetDetails: (event: any, dataset: any) => void;
    contextMenuItems: {
        label: string;
        handler: (dataTreeItem: any) => void;
    }[];
    render(): JSX.Element;
}
export declare class ProjectResource extends Resource<ProjectProps> {
    constructor(props: ProjectProps);
    handleOpenSnackbar: (error: any) => void;
    expandProject: (project: any) => void;
    getDatasets(project: Project): Promise<void>;
    handleExpandProject: (project: any) => void;
    private handleRefreshProject;
    handleUnpinProject(project: any): Promise<void>;
    handleToggle: (event: any, nodeIds: any) => void;
    contextMenuItems: {
        label: string;
        handler: (dataTreeItem: any) => void;
    }[];
    componentDidUpdate(): void;
    render(): JSX.Element;
}
export {};
