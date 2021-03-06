import { TranslationBundle } from '@jupyterlab/translation';
import { CommandRegistry } from '@lumino/commands';
import * as React from 'react';
import { GitExtension } from '../model';
import { Git } from '../tokens';
/**
 * Interface describing component properties.
 */
export interface ISinglePastCommitInfoProps {
    /**
     * Commit data.
     */
    commit: Git.ISingleCommitInfo;
    /**
     * Extension data model.
     */
    model: GitExtension;
    /**
     * Jupyter App commands registry
     */
    commands: CommandRegistry;
    /**
     * The application language translator.
     */
    trans: TranslationBundle;
    /**
     * Returns a callback to be invoked on click to display a file diff.
     *
     * @param filePath file path
     * @param isText indicates whether the file supports displaying a diff
     * @param previousFilePath when file has been relocated
     * @returns callback
     */
    onOpenDiff: (filePath: string, isText: boolean, previousFilePath?: string) => (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}
/**
 * Interface describing component state.
 */
export interface ISinglePastCommitInfoState {
    /**
     * Commit information.
     */
    info: string;
    /**
     * Number of modified files.
     */
    numFiles: string;
    /**
     * Number of insertions.
     */
    insertions: string;
    /**
     * Number of deletions.
     */
    deletions: string;
    /**
     * A list of modified files.
     */
    modifiedFiles: Git.ICommitModifiedFile[];
    /**
     * Current loading state for loading individual commit information.
     */
    loadingState: 'loading' | 'error' | 'success';
    /**
     * Boolean indicating whether to display a dialog for reseting or reverting a commit.
     */
    resetRevertDialog: boolean;
    /**
     * Reset/revert dialog mode (i.e., whether the dialog should be for reseting to or reverting an individual commit).
     */
    resetRevertAction: 'reset' | 'revert';
}
/**
 * React component for rendering information about an individual commit.
 */
export declare class SinglePastCommitInfo extends React.Component<ISinglePastCommitInfoProps, ISinglePastCommitInfoState> {
    /**
     * Returns a React component for information about an individual commit.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props: ISinglePastCommitInfoProps);
    /**
     * Callback invoked immediately after mounting a component (i.e., inserting into a tree).
     */
    componentDidMount(): Promise<void>;
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render(): React.ReactElement;
    /**
     * Renders a modified file.
     *
     * @param props Row properties
     * @returns React element
     */
    private _renderFile;
    /**
     * Callback invoked upon a clicking a button to revert changes.
     *
     * @param event - event object
     */
    private _onRevertClick;
    /**
     * Callback invoked upon a clicking a button to reset changes.
     *
     * @param event - event object
     */
    private _onResetClick;
    /**
     * Callback invoked upon closing a dialog to reset or revert changes.
     */
    private _onResetRevertDialogClose;
}
