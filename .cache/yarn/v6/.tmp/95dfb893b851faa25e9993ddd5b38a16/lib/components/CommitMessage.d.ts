/// <reference types="react" />
import { TranslationBundle } from '@jupyterlab/translation';
/**
 * CommitMessage properties
 */
export interface ICommitMessageProps {
    /**
     * Commit message description.
     */
    description: string;
    /**
     * Commit message description placeholder.
     */
    descriptionPlaceholder?: string;
    /**
     * Whether the commit message can be edited or not.
     */
    disabled?: boolean;
    /**
     * Updates the commit message summary.
     *
     * @param summary - commit message summary
     */
    setSummary: (summary: string) => void;
    /**
     * Updates the commit message description.
     *
     * @param description - commit message description
     */
    setDescription: (description: string) => void;
    /**
     * Commit message summary.
     */
    summary: string;
    /**
     * Commit message summary placeholder.
     */
    summaryPlaceholder?: string;
    /**
     * The application language translator.
     */
    trans: TranslationBundle;
}
/**
 * Commit message component
 */
export declare function CommitMessage(props: ICommitMessageProps): JSX.Element;
