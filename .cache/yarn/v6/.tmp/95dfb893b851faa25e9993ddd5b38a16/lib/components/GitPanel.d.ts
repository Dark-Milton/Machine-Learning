import { FileBrowserModel } from '@jupyterlab/filebrowser';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { TranslationBundle } from '@jupyterlab/translation';
import { CommandRegistry } from '@lumino/commands';
import * as React from 'react';
import { Logger } from '../logger';
import { GitExtension } from '../model';
import { Git } from '../tokens';
/**
 * Interface describing component properties.
 */
export interface IGitPanelProps {
    /**
     * Jupyter App commands registry
     */
    commands: CommandRegistry;
    /**
     * File browser model.
     */
    filebrowser: FileBrowserModel;
    /**
     * Extension logger
     */
    logger: Logger;
    /**
     * Git extension data model.
     */
    model: GitExtension;
    /**
     * Git extension settings.
     */
    settings: ISettingRegistry.ISettings;
    /**
     * The application language translator.
     */
    trans: TranslationBundle;
}
/**
 * Interface describing component state.
 */
export interface IGitPanelState {
    /**
     * Git path repository
     */
    repository: string | null;
    /**
     * List of branches.
     */
    branches: Git.IBranch[];
    /**
     * Current branch.
     */
    currentBranch: string;
    /**
     * List of changed files.
     */
    files: Git.IStatusFile[];
    /**
     * List of files changed on remote branch
     */
    remoteChangedFiles: Git.IStatusFile[];
    /**
     * Number of commits ahead
     */
    nCommitsAhead: number;
    /**
     * Number of commits behind
     */
    nCommitsBehind: number;
    /**
     * List of prior commits.
     */
    pastCommits: Git.ISingleCommitInfo[];
    /**
     * Panel tab identifier.
     */
    tab: number;
    /**
     * Commit message summary.
     */
    commitSummary: string;
    /**
     * Commit message description.
     */
    commitDescription: string;
    /**
     * Amend option toggle
     */
    commitAmend: boolean;
}
/**
 * React component for rendering a panel for performing Git operations.
 */
export declare class GitPanel extends React.Component<IGitPanelProps, IGitPanelState> {
    /**
     * Returns a React component for rendering a panel for performing Git operations.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props: IGitPanelProps);
    /**
     * Callback invoked immediately after mounting a component (i.e., inserting into a tree).
     */
    componentDidMount(): void;
    componentWillUnmount(): void;
    refreshBranch: () => Promise<void>;
    refreshHistory: () => Promise<void>;
    /**
     * Refresh widget, update all content
     */
    refreshView: () => Promise<void>;
    /**
     * Commits files.
     *
     * @returns a promise which commits changes
     */
    commitFiles: () => Promise<void>;
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render(): React.ReactElement;
    /**
     * Renders a toolbar.
     *
     * @returns React element
     */
    private _renderToolbar;
    /**
     * Renders the main panel.
     *
     * @returns React element
     */
    private _renderMain;
    /**
     * Renders panel tabs.
     *
     * @returns React element
     */
    private _renderTabs;
    /**
     * Renders a panel for viewing and committing file changes.
     *
     * @returns React element
     */
    private _renderChanges;
    /**
     * Renders a panel for viewing commit history.
     *
     * @returns React element
     */
    private _renderHistory;
    /**
     * Renders a panel for prompting a user to find a Git repository.
     *
     * @returns React element
     */
    private _renderWarning;
    /**
     * Callback invoked upon changing the active panel tab.
     *
     * @param event - event object
     * @param tab - tab number
     */
    private _onTabChange;
    /**
     * Updates the commit message description.
     *
     * @param description - commit message description
     */
    private _setCommitDescription;
    /**
     * Updates the commit message summary.
     *
     * @param summary - commit message summary
     */
    private _setCommitSummary;
    /**
     * Updates the amend option
     *
     * @param amend - whether the amend is checked
     */
    private _setCommitAmend;
    /**
     * Commits all marked files.
     *
     * @param message - commit message
     * @returns a promise which commits the files
     */
    private _commitMarkedFiles;
    /**
     * Commits all staged files.
     *
     * @param message - commit message
     * @returns a promise which commits the files
     */
    private _commitStagedFiles;
    /**
     * Determines whether a user has a known Git identity.
     *
     * @param path - repository path
     */
    private _hasIdentity;
    private _hasStagedFile;
    private _hasUnStagedFile;
    /**
     * List of marked files.
     */
    private get _markedFiles();
    /**
     * List of sorted modified files.
     */
    private get _sortedFiles();
    private _previousRepoPath;
    /**
     * Show a dialog when a notifyRemoteChanges signal is emitted from the model.
     */
    private warningDialog;
    /**
     * renders the body to be used in the remote changes warning dialog
     */
    private _renderBody;
}
