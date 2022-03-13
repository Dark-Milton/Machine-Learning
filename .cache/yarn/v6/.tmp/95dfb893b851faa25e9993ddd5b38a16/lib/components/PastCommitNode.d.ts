import { TranslationBundle } from '@jupyterlab/translation';
import { CommandRegistry } from '@lumino/commands';
import * as React from 'react';
import { GitExtension } from '../model';
import { Git } from '../tokens';
/**
 * Interface describing component properties.
 */
export interface IPastCommitNodeProps {
    /**
     * Commit data.
     */
    commit: Git.ISingleCommitInfo;
    /**
     * List of branches.
     */
    branches: Git.IBranch[];
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
     * Callback invoked upon clicking to display a file diff.
     *
     * @param event - event object
     */
    onOpenDiff?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => Promise<void>;
}
/**
 * Interface describing component state.
 */
export interface IPastCommitNodeState {
    /**
     * Boolean indicating whether additional commit information should be displayed.
     */
    expanded: boolean;
}
/**
 * React component for rendering an individual commit.
 */
export declare class PastCommitNode extends React.Component<React.PropsWithChildren<IPastCommitNodeProps>, IPastCommitNodeState> {
    /**
     * Returns a React component for rendering an individual commit.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props: React.PropsWithChildren<IPastCommitNodeProps>);
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render(): React.ReactElement;
    /**
     * Renders branch information.
     *
     * @returns array of React elements
     */
    private _renderBranches;
    /**
     * Renders individual branch data.
     *
     * @param branch - branch data
     * @returns React element
     */
    private _renderBranch;
    /**
     * Callback invoked upon clicking on an individual commit.
     *
     * @param event - event object
     */
    private _onCommitClick;
}
