import { TranslationBundle } from '@jupyterlab/translation';
import * as React from 'react';
import { Logger } from '../logger';
import { Git, IGitExtension } from '../tokens';
/**
 * Interface describing component properties.
 */
export interface INewBranchDialogProps {
    /**
     * Current branch name.
     */
    currentBranch: string;
    /**
     * Current list of branches.
     */
    branches: Git.IBranch[];
    /**
     * Extension logger
     */
    logger: Logger;
    /**
     * Git extension data model.
     */
    model: IGitExtension;
    /**
     * Boolean indicating whether to show the dialog.
     */
    open: boolean;
    /**
     * Callback to invoke upon closing the dialog.
     */
    onClose: () => void;
    /**
     * The application language translator.
     */
    trans: TranslationBundle;
}
/**
 * Interface describing component state.
 */
export interface INewBranchDialogState {
    /**
     * Branch name.
     */
    name: string;
    /**
     * Base branch.
     */
    base: string;
    /**
     * Menu filter.
     */
    filter: string;
    /**
     * Error message.
     */
    error: string;
}
/**
 * React component for rendering a dialog to create a new branch.
 */
export declare class NewBranchDialog extends React.Component<INewBranchDialogProps, INewBranchDialogState> {
    /**
     * Returns a React component for rendering a branch menu.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props: INewBranchDialogProps);
    /**
     * Renders a dialog for creating a new branch.
     *
     * @returns React element
     */
    render(): React.ReactElement;
    /**
     * Renders branch menu items.
     *
     * @returns array of React elements
     */
    private _renderItems;
    /**
     * Renders a branch menu item.
     *
     * @param props Row properties
     * @returns React element
     */
    private _renderItem;
    /**
     * Callback invoked upon closing the dialog.
     *
     * @param event - event object
     */
    private _onClose;
    /**
     * Callback invoked upon a change to the menu filter.
     *
     * @param event - event object
     */
    private _onFilterChange;
    /**
     * Callback invoked to reset the menu filter.
     */
    private _resetFilter;
    /**
     * Returns a callback which is invoked upon clicking a branch name.
     *
     * @param branch - branch name
     * @returns callback
     */
    private _onBranchClickFactory;
    /**
     * Callback invoked upon a change to the branch name input element.
     *
     * @param event - event object
     */
    private _onNameChange;
    /**
     * Callback invoked upon clicking a button to create a new branch.
     *
     * @param event - event object
     */
    private _onCreate;
    /**
     * Creates a new branch.
     *
     * @param branch - branch name
     * @returns promise which resolves upon attempting to create a new branch
     */
    private _createBranch;
    private _branchList;
}
