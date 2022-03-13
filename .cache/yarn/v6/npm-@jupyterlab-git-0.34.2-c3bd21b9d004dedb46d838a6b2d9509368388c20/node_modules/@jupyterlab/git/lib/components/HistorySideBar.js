import { closeIcon } from '@jupyterlab/ui-components';
import * as React from 'react';
import { hiddenButtonStyle } from '../style/ActionButtonStyle';
import { historySideBarStyle, noHistoryFoundStyle, selectedHistoryFileStyle } from '../style/HistorySideBarStyle';
import { ContextCommandIDs, Git } from '../tokens';
import { ActionButton } from './ActionButton';
import { FileItem } from './FileItem';
import { PastCommitNode } from './PastCommitNode';
import { SinglePastCommitInfo } from './SinglePastCommitInfo';
/**
 * Returns a React component for displaying commit history.
 *
 * @param props - component properties
 * @returns React element
 */
export const HistorySideBar = (props) => {
    var _a;
    /**
     * Discards the selected file and shows the full history.
     */
    const removeSelectedFile = () => {
        props.model.selectedHistoryFile = null;
    };
    /**
     * Curried callback function to display a file diff.
     *
     * @param commit Commit data.
     */
    const openDiff = (commit) => 
    /**
     * Returns a callback to be invoked on click to display a file diff.
     *
     * @param filePath file path
     * @param isText indicates whether the file supports displaying a diff
     * @param previousFilePath when file has been relocated
     * @returns callback
     */
    (filePath, isText, previousFilePath) => 
    /**
     * Callback invoked upon clicking to display a file diff.
     *
     * @param event - event object
     */
    async (event) => {
        // Prevent the commit component from being collapsed:
        event.stopPropagation();
        if (isText) {
            try {
                props.commands.execute(ContextCommandIDs.gitFileDiff, {
                    files: [
                        {
                            filePath,
                            previousFilePath,
                            isText,
                            context: {
                                previousRef: commit.pre_commit,
                                currentRef: commit.commit
                            }
                        }
                    ]
                });
            }
            catch (err) {
                console.error(`Failed to open diff view for ${filePath}.\n${err}`);
            }
        }
    };
    /**
     * Commit info for 'Uncommitted Changes' history.
     */
    const uncommitted = React.useMemo(() => {
        var _a, _b, _c;
        return {
            author: props.trans.__('You'),
            commit: `${((_a = props.model.selectedHistoryFile) === null || _a === void 0 ? void 0 : _a.status) === 'staged'
                ? Git.Diff.SpecialRef.INDEX
                : Git.Diff.SpecialRef.WORKING}`,
            pre_commit: 'HEAD',
            is_binary: (_c = (_b = props.commits[0]) === null || _b === void 0 ? void 0 : _b.is_binary) !== null && _c !== void 0 ? _c : false,
            commit_msg: props.trans.__('Uncommitted Changes'),
            date: props.trans.__('now')
        };
    }, [props.model.selectedHistoryFile]);
    const commits = props.model.selectedHistoryFile &&
        ((_a = props.model.selectedHistoryFile) === null || _a === void 0 ? void 0 : _a.status) !== 'unmodified'
        ? [uncommitted, ...props.commits]
        : props.commits;
    return (React.createElement("ol", { className: historySideBarStyle },
        !!props.model.selectedHistoryFile && (React.createElement(FileItem, { className: selectedHistoryFileStyle, model: props.model, trans: props.trans, actions: React.createElement(ActionButton, { className: hiddenButtonStyle, icon: closeIcon, title: props.trans.__('Discard file history'), onClick: removeSelectedFile }), file: props.model.selectedHistoryFile, onDoubleClick: removeSelectedFile })),
        commits.length ? (commits.map((commit) => {
            var _a;
            const commonProps = {
                commit,
                branches: props.branches,
                model: props.model,
                commands: props.commands,
                trans: props.trans
            };
            // Only pass down callback when single file history is open
            // and its diff is viewable
            const onOpenDiff = props.model.selectedHistoryFile && !commit.is_binary
                ? openDiff(commit)((_a = commit.file_path) !== null && _a !== void 0 ? _a : props.model.selectedHistoryFile.to, !commit.is_binary, commit.previous_file_path)
                : undefined;
            return (React.createElement(PastCommitNode, Object.assign({ key: commit.commit }, commonProps, { onOpenDiff: onOpenDiff }), !props.model.selectedHistoryFile && (React.createElement(SinglePastCommitInfo, Object.assign({}, commonProps, { onOpenDiff: openDiff(commit) })))));
        })) : (React.createElement("li", { className: noHistoryFoundStyle }, props.trans.__('No history found.')))));
};
//# sourceMappingURL=HistorySideBar.js.map