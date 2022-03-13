import { fileIcon } from '@jupyterlab/ui-components';
import * as React from 'react';
import { FixedSizeList } from 'react-window';
import { classes } from 'typestyle';
import { LoggerContext } from '../logger';
import { getDiffProvider } from '../model';
import { deletionsMadeIcon, diffIcon, discardIcon, insertionsMadeIcon, rewindIcon } from '../style/icons';
import { actionButtonClass, commitClass, commitDetailClass, commitDetailFileClass, commitDetailHeaderClass, commitOverviewNumbersClass, deletionsIconClass, fileListClass, iconClass, insertionsIconClass } from '../style/SinglePastCommitInfo';
import { ActionButton } from './ActionButton';
import { FilePath } from './FilePath';
import { ResetRevertDialog } from './ResetRevertDialog';
const ITEM_HEIGHT = 24; // File list item height
const MAX_VISIBLE_FILES = 20; // Maximal number of file display at once
/**
 * React component for rendering information about an individual commit.
 */
export class SinglePastCommitInfo extends React.Component {
    /**
     * Returns a React component for information about an individual commit.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Renders a modified file.
         *
         * @param props Row properties
         * @returns React element
         */
        this._renderFile = (props) => {
            const { data, index, style } = props;
            const file = data[index];
            const path = file.modified_file_path;
            const previous = file.previous_file_path;
            const flg = !!getDiffProvider(path) || !file.is_binary;
            return (React.createElement("li", { className: commitDetailFileClass, onClick: this.props.onOpenDiff(path, flg, previous), style: style, title: path },
                React.createElement(FilePath, { filepath: path, filetype: file.type }),
                flg ? (React.createElement(ActionButton, { icon: diffIcon, title: this.props.trans.__('View file changes') })) : null));
        };
        /**
         * Callback invoked upon a clicking a button to revert changes.
         *
         * @param event - event object
         */
        this._onRevertClick = (event) => {
            event.stopPropagation();
            this.setState({
                resetRevertDialog: true,
                resetRevertAction: 'revert'
            });
        };
        /**
         * Callback invoked upon a clicking a button to reset changes.
         *
         * @param event - event object
         */
        this._onResetClick = (event) => {
            event.stopPropagation();
            this.setState({
                resetRevertDialog: true,
                resetRevertAction: 'reset'
            });
        };
        /**
         * Callback invoked upon closing a dialog to reset or revert changes.
         */
        this._onResetRevertDialogClose = () => {
            this.setState({
                resetRevertDialog: false
            });
        };
        this.state = {
            info: '',
            numFiles: '',
            insertions: '',
            deletions: '',
            modifiedFiles: [],
            loadingState: 'loading',
            resetRevertDialog: false,
            resetRevertAction: 'reset'
        };
    }
    /**
     * Callback invoked immediately after mounting a component (i.e., inserting into a tree).
     */
    async componentDidMount() {
        try {
            const log = await this.props.model.detailedLog(this.props.commit.commit);
            this.setState({
                info: log.modified_file_note,
                numFiles: log.modified_files_count,
                insertions: log.number_of_insertions,
                deletions: log.number_of_deletions,
                modifiedFiles: log.modified_files,
                loadingState: 'success'
            });
        }
        catch (err) {
            console.error(`Error while getting detailed log for commit ${this.props.commit.commit} and path ${this.props.model.pathRepository}`, err);
            this.setState({ loadingState: 'error' });
            return;
        }
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        if (this.state.loadingState === 'loading') {
            return React.createElement("div", null, "\u2026");
        }
        if (this.state.loadingState === 'error') {
            return React.createElement("div", null, this.props.trans.__('Error loading commit data'));
        }
        return (React.createElement("div", null,
            React.createElement("div", { className: commitClass },
                React.createElement("div", { className: commitOverviewNumbersClass },
                    React.createElement("span", { title: this.props.trans.__('# Files Changed') },
                        React.createElement(fileIcon.react, { className: iconClass, tag: "span" }),
                        this.state.numFiles),
                    React.createElement("span", { title: this.props.trans.__('# Insertions') },
                        React.createElement(insertionsMadeIcon.react, { className: classes(iconClass, insertionsIconClass), tag: "span" }),
                        this.state.insertions),
                    React.createElement("span", { title: this.props.trans.__('# Deletions') },
                        React.createElement(deletionsMadeIcon.react, { className: classes(iconClass, deletionsIconClass), tag: "span" }),
                        this.state.deletions))),
            React.createElement("div", { className: commitDetailClass },
                React.createElement("div", { className: commitDetailHeaderClass },
                    this.props.trans.__('Changed'),
                    React.createElement(ActionButton, { className: actionButtonClass, icon: discardIcon, title: this.props.trans.__('Revert changes introduced by this commit'), onClick: this._onRevertClick }),
                    React.createElement(ActionButton, { className: actionButtonClass, icon: rewindIcon, title: this.props.trans.__('Discard changes introduced *after* this commit (hard reset)'), onClick: this._onResetClick }),
                    React.createElement(LoggerContext.Consumer, null, logger => (React.createElement(ResetRevertDialog, { open: this.state.resetRevertDialog, action: this.state.resetRevertAction, model: this.props.model, logger: logger, commit: this.props.commit, onClose: this._onResetRevertDialogClose, trans: this.props.trans })))),
                this.state.modifiedFiles.length > 0 && (React.createElement(FixedSizeList, { className: fileListClass, height: Math.min(MAX_VISIBLE_FILES, this.state.modifiedFiles.length) *
                        ITEM_HEIGHT, innerElementType: "ul", itemCount: this.state.modifiedFiles.length, itemData: this.state.modifiedFiles, itemKey: (index, data) => data[index].modified_file_path, itemSize: ITEM_HEIGHT, style: { overflowX: 'hidden' }, width: 'auto' }, this._renderFile)))));
    }
}
//# sourceMappingURL=SinglePastCommitInfo.js.map