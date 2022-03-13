import { JupyterFrontEnd } from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook';
import * as React from 'react';
import { DataTree, SearchResult } from '../../service/bigquery_service_types';
import { SnackbarState } from '../../reducers/snackbarSlice';
import { WidgetManager } from '../../utils/widgetManager/widget_manager';
interface Props {
    isVisible: boolean;
    context: Context;
    updateDataTree: any;
    currentProject: string;
    projectIds: string[];
    addProject: any;
    snackbar: SnackbarState;
    openSnackbar: any;
    dataTree: DataTree;
    updateProject: any;
    updateDataset: any;
    removeProject: any;
}
export interface Context {
    app: JupyterFrontEnd;
    manager: WidgetManager;
    notebookTrack: INotebookTracker;
}
interface State {
    hasLoaded: boolean;
    isLoading: boolean;
    isLoadingSearch: boolean;
    searchToggled: boolean;
    searchEnabled: boolean;
    dialogOpen: boolean;
    isSearching: boolean;
    searchResults: SearchResult[];
    pinProjectDialogOpen: boolean;
    pinnedProject: string;
    loadingPinnedProject: boolean;
    collapseAll: boolean;
}
declare class ListItemsPanel extends React.Component<Props, State> {
    constructor(props: Props);
    handleOpenSearchDialog: () => void;
    handleEnableSearch: () => void;
    handleCancelDialog: () => void;
    search(searchKey: any, project: any): Promise<void>;
    handleKeyPress: (event: any) => Promise<void>;
    handleClear: () => void;
    addNewProject: (newProjectId: any) => Promise<void>;
    handleOpenPinProject: () => void;
    handlePinnedProjectChange: (event: any) => void;
    handleClosePinProject: () => void;
    openQueryHistory: () => Promise<void>;
    componentDidUpdate(prevProps: Props): void;
    render(): JSX.Element;
    private getProjects;
    private handleRefreshAll;
    private updateAll;
    private updateCollapseAll;
}
declare const _default: import("react-redux").ConnectedComponent<typeof ListItemsPanel, import("react-redux").Omit<React.ClassAttributes<ListItemsPanel> & Props, "snackbar" | "openSnackbar" | "dataTree" | "updateDataTree" | "updateProject" | "addProject" | "removeProject" | "updateDataset" | "projectIds" | "currentProject">>;
export default _default;
