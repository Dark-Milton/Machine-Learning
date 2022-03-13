import { Dialog, showDialog, showErrorMessage } from '@jupyterlab/apputils';
import { Menu } from '@lumino/widgets';
import * as React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { addMenuItems } from '../commandsAndMenu';
import { getDiffProvider } from '../model';
import { hiddenButtonStyle } from '../style/ActionButtonStyle';
import { fileListWrapperClass } from '../style/FileListStyle';
import { addIcon, diffIcon, discardIcon, openIcon, removeIcon } from '../style/icons';
import { ContextCommandIDs, CommandIDs } from '../tokens';
import { ActionButton } from './ActionButton';
import { FileItem } from './FileItem';
import { GitStage } from './GitStage';
import { discardAllChanges } from '../widgets/discardAllChanges';
export const CONTEXT_COMMANDS = {
    'partially-staged': [
        ContextCommandIDs.gitFileOpen,
        ContextCommandIDs.gitFileUnstage,
        ContextCommandIDs.gitFileDiff,
        ContextCommandIDs.gitFileHistory
    ],
    'remote-changed': [ContextCommandIDs.gitFileOpen],
    unstaged: [
        ContextCommandIDs.gitFileOpen,
        ContextCommandIDs.gitFileStage,
        ContextCommandIDs.gitFileDiscard,
        ContextCommandIDs.gitFileDiff,
        ContextCommandIDs.gitFileHistory
    ],
    untracked: [
        ContextCommandIDs.gitFileOpen,
        ContextCommandIDs.gitFileTrack,
        ContextCommandIDs.gitIgnore,
        ContextCommandIDs.gitIgnoreExtension,
        ContextCommandIDs.gitFileDelete
    ],
    staged: [
        ContextCommandIDs.gitFileOpen,
        ContextCommandIDs.gitFileUnstage,
        ContextCommandIDs.gitFileDiff,
        ContextCommandIDs.gitCommitAmendStaged,
        ContextCommandIDs.gitFileHistory
    ],
    unmodified: [ContextCommandIDs.gitFileHistory],
    unmerged: [ContextCommandIDs.gitFileDiff]
};
const SIMPLE_CONTEXT_COMMANDS = {
    'partially-staged': [
        ContextCommandIDs.gitFileOpen,
        ContextCommandIDs.gitFileDiscard,
        ContextCommandIDs.gitFileDiff,
        ContextCommandIDs.gitFileHistory
    ],
    'remote-changed': [ContextCommandIDs.gitFileOpen],
    staged: [
        ContextCommandIDs.gitFileOpen,
        ContextCommandIDs.gitFileDiscard,
        ContextCommandIDs.gitFileDiff,
        ContextCommandIDs.gitFileHistory
    ],
    unstaged: [
        ContextCommandIDs.gitFileOpen,
        ContextCommandIDs.gitFileDiscard,
        ContextCommandIDs.gitFileDiff,
        ContextCommandIDs.gitFileHistory
    ],
    untracked: [
        ContextCommandIDs.gitFileOpen,
        ContextCommandIDs.gitIgnore,
        ContextCommandIDs.gitIgnoreExtension,
        ContextCommandIDs.gitFileDelete
    ],
    unmodified: [ContextCommandIDs.gitFileHistory],
    unmerged: [ContextCommandIDs.gitFileDiff]
};
export class FileList extends React.Component {
    constructor(props) {
        super(props);
        /**
         * Open the context menu on the advanced view
         *
         * @param selectedFile The file on which the context menu is opened
         * @param event The click event
         */
        this.openContextMenu = (selectedFile, event) => {
            event.preventDefault();
            this.setState({
                selectedFile
            });
            const contextMenu = new Menu({ commands: this.props.commands });
            const commands = CONTEXT_COMMANDS[selectedFile.status];
            addMenuItems(commands, contextMenu, [selectedFile]);
            contextMenu.open(event.clientX, event.clientY);
        };
        /**
         * Open the context menu on the simple view
         *
         * @param selectedFile The file on which the context menu is opened
         * @param event The click event
         */
        this.openSimpleContextMenu = (selectedFile, event) => {
            event.preventDefault();
            const contextMenu = new Menu({ commands: this.props.commands });
            const commands = SIMPLE_CONTEXT_COMMANDS[selectedFile.status];
            addMenuItems(commands, contextMenu, [selectedFile]);
            contextMenu.open(event.clientX, event.clientY);
        };
        /** Reset all staged files */
        this.resetAllStagedFiles = async (event) => {
            event.stopPropagation();
            await this.props.model.reset();
        };
        /** Reset a specific staged file */
        this.resetStagedFile = async (file) => {
            await this.props.model.reset(file);
        };
        /** Add all unstaged files */
        this.addAllUnstagedFiles = async (event) => {
            event.stopPropagation();
            await this.props.model.addAllUnstaged();
        };
        /** Discard changes in all unstaged files */
        this.discardAllUnstagedFiles = async (event) => {
            event.stopPropagation();
            const result = await showDialog({
                title: this.props.trans.__('Discard all changes'),
                body: this.props.trans.__('Are you sure you want to permanently discard changes to all unstaged files? This action cannot be undone.'),
                buttons: [
                    Dialog.cancelButton({ label: this.props.trans.__('Cancel') }),
                    Dialog.warnButton({ label: this.props.trans.__('Discard') })
                ]
            });
            if (result.button.accept) {
                try {
                    await this.props.model.checkout();
                }
                catch (reason) {
                    showErrorMessage(this.props.trans.__('Discard all unstaged changes failed.'), reason);
                }
            }
        };
        /** Discard changes in all unstaged and staged files */
        this.discardAllChanges = async (event) => {
            event.stopPropagation();
            await discardAllChanges(this.props.model, this.props.trans);
        };
        /** Add a specific unstaged file */
        this.addFile = async (...file) => {
            await this.props.model.add(...file);
        };
        /** Discard changes in a specific unstaged or staged file */
        this.discardChanges = async (file) => {
            await this.props.commands.execute(ContextCommandIDs.gitFileDiscard, {
                files: [file]
            });
        };
        /** Add all untracked files */
        this.addAllUntrackedFiles = async (event) => {
            event.stopPropagation();
            await this.props.model.addAllUntracked();
        };
        this.addAllMarkedFiles = async () => {
            await this.addFile(...this.markedFiles.map(file => file.to));
        };
        this.updateSelectedFile = (file) => {
            this.setState({ selectedFile: file });
        };
        this.pullFromRemote = async (event) => {
            await this.props.commands.execute(CommandIDs.gitPull, {});
        };
        /**
         * Render an unmerged file
         *
         * Note: This is actually a React.FunctionComponent but defined as
         * a private method as it needs access to FileList properties.
         *
         * @param rowProps Row properties
         */
        this._renderUnmergedRow = (rowProps) => {
            const { data, index, style } = rowProps;
            const file = data[index];
            const diffButton = this._createDiffButton(file);
            return (React.createElement(FileItem, { trans: this.props.trans, actions: !file.is_binary && diffButton, contextMenu: this.openContextMenu, file: file, model: this.props.model, selected: this._isSelectedFile(file), selectFile: this.updateSelectedFile, onDoubleClick: () => this._openDiffView(file), style: Object.assign({}, style) }));
        };
        /**
         * Render a staged file
         *
         * Note: This is actually a React.FunctionComponent but defined as
         * a private method as it needs access to FileList properties.
         *
         * @param rowProps Row properties
         */
        this._renderStagedRow = (rowProps) => {
            const doubleClickDiff = this.props.settings.get('doubleClickDiff')
                .composite;
            const { data, index, style } = rowProps;
            const file = data[index];
            const openFile = () => {
                this.props.commands.execute(ContextCommandIDs.gitFileOpen, {
                    files: [file]
                });
            };
            const diffButton = this._createDiffButton(file);
            return (React.createElement(FileItem, { trans: this.props.trans, actions: React.createElement(React.Fragment, null,
                    React.createElement(ActionButton, { className: hiddenButtonStyle, icon: openIcon, title: this.props.trans.__('Open this file'), onClick: openFile }),
                    diffButton,
                    React.createElement(ActionButton, { className: hiddenButtonStyle, icon: removeIcon, title: this.props.trans.__('Unstage this change'), onClick: () => {
                            this.resetStagedFile(file.to);
                        } })), file: file, contextMenu: this.openContextMenu, model: this.props.model, selected: this._isSelectedFile(file), selectFile: this.updateSelectedFile, onDoubleClick: doubleClickDiff
                    ? diffButton
                        ? () => this._openDiffView(file)
                        : () => undefined
                    : openFile, style: style }));
        };
        /**
         * Render a changed file
         *
         * Note: This is actually a React.FunctionComponent but defined as
         * a private method as it needs access to FileList properties.
         *
         * @param rowProps Row properties
         */
        this._renderChangedRow = (rowProps) => {
            const doubleClickDiff = this.props.settings.get('doubleClickDiff')
                .composite;
            const { data, index, style } = rowProps;
            const file = data[index];
            const openFile = () => {
                this.props.commands.execute(ContextCommandIDs.gitFileOpen, {
                    files: [file]
                });
            };
            const diffButton = this._createDiffButton(file);
            return (React.createElement(FileItem, { trans: this.props.trans, actions: React.createElement(React.Fragment, null,
                    React.createElement(ActionButton, { className: hiddenButtonStyle, icon: openIcon, title: this.props.trans.__('Open this file'), onClick: openFile }),
                    diffButton,
                    React.createElement(ActionButton, { className: hiddenButtonStyle, icon: discardIcon, title: this.props.trans.__('Discard changes'), onClick: () => {
                            this.discardChanges(file);
                        } }),
                    React.createElement(ActionButton, { className: hiddenButtonStyle, icon: addIcon, title: this.props.trans.__('Stage this change'), onClick: () => {
                            this.addFile(file.to);
                        } })), file: file, contextMenu: this.openContextMenu, model: this.props.model, selected: this._isSelectedFile(file), selectFile: this.updateSelectedFile, onDoubleClick: doubleClickDiff
                    ? diffButton
                        ? () => this._openDiffView(file)
                        : () => undefined
                    : openFile, style: style }));
        };
        /**
         * Render a untracked file.
         *
         * Note: This is actually a React.FunctionComponent but defined as
         * a private method as it needs access to FileList properties.
         *
         * @param rowProps Row properties
         */
        this._renderUntrackedRow = (rowProps) => {
            const doubleClickDiff = this.props.settings.get('doubleClickDiff')
                .composite;
            const { data, index, style } = rowProps;
            const file = data[index];
            return (React.createElement(FileItem, { trans: this.props.trans, actions: React.createElement(React.Fragment, null,
                    React.createElement(ActionButton, { className: hiddenButtonStyle, icon: openIcon, title: this.props.trans.__('Open this file'), onClick: () => {
                            this.props.commands.execute(ContextCommandIDs.gitFileOpen, {
                                files: [file]
                            });
                        } }),
                    React.createElement(ActionButton, { className: hiddenButtonStyle, icon: addIcon, title: this.props.trans.__('Track this file'), onClick: () => {
                            this.addFile(file.to);
                        } })), file: file, contextMenu: this.openContextMenu, model: this.props.model, onDoubleClick: () => {
                    if (!doubleClickDiff) {
                        this.props.commands.execute(ContextCommandIDs.gitFileOpen, {
                            files: [file]
                        });
                    }
                }, selected: this._isSelectedFile(file), selectFile: this.updateSelectedFile, style: style }));
        };
        /**
         * Render the remote changed list.
         *
         * Note: This is actually a React.FunctionComponent but defined as
         * a private method as it needs access to FileList properties.
         *
         * @param rowProps Row properties
         */
        this._renderRemoteChangedRow = (rowProps) => {
            const doubleClickDiff = this.props.settings.get('doubleClickDiff')
                .composite;
            const { data, index, style } = rowProps;
            const file = data[index];
            return (React.createElement(FileItem, { trans: this.props.trans, actions: React.createElement(React.Fragment, null,
                    React.createElement(ActionButton, { className: hiddenButtonStyle, icon: openIcon, title: this.props.trans.__('Open this file'), onClick: () => {
                            this.props.commands.execute(ContextCommandIDs.gitFileOpen, {
                                files: [file]
                            });
                        } })), file: file, contextMenu: this.openContextMenu, model: this.props.model, onDoubleClick: () => {
                    if (!doubleClickDiff) {
                        this.props.commands.execute(ContextCommandIDs.gitFileOpen, {
                            files: [file]
                        });
                    }
                }, selected: this._isSelectedFile(file), selectFile: this.updateSelectedFile, style: style }));
        };
        /**
         * Render a modified file in simple mode.
         *
         * Note: This is actually a React.FunctionComponent but defined as
         * a private method as it needs access to FileList properties.
         *
         * @param rowProps Row properties
         */
        this._renderSimpleStageRow = (rowProps) => {
            const { data, index, style } = rowProps;
            const file = data[index];
            const doubleClickDiff = this.props.settings.get('doubleClickDiff')
                .composite;
            const openFile = () => {
                this.props.commands.execute(ContextCommandIDs.gitFileOpen, {
                    files: [file]
                });
            };
            // Default value for actions and double click
            let actions = (React.createElement(ActionButton, { className: hiddenButtonStyle, icon: openIcon, title: this.props.trans.__('Open this file'), onClick: openFile }));
            let onDoubleClick = doubleClickDiff ? () => undefined : openFile;
            if (file.status === 'unstaged' || file.status === 'partially-staged') {
                const diffButton = this._createDiffButton(file);
                actions = (React.createElement(React.Fragment, null,
                    React.createElement(ActionButton, { className: hiddenButtonStyle, icon: openIcon, title: this.props.trans.__('Open this file'), onClick: openFile }),
                    diffButton,
                    React.createElement(ActionButton, { className: hiddenButtonStyle, icon: discardIcon, title: this.props.trans.__('Discard changes'), onClick: () => {
                            this.discardChanges(file);
                        } })));
                onDoubleClick = doubleClickDiff
                    ? diffButton
                        ? () => this._openDiffView(file)
                        : () => undefined
                    : openFile;
            }
            else if (file.status === 'staged') {
                const diffButton = this._createDiffButton(file);
                actions = (React.createElement(React.Fragment, null,
                    React.createElement(ActionButton, { className: hiddenButtonStyle, icon: openIcon, title: this.props.trans.__('Open this file'), onClick: openFile }),
                    diffButton,
                    React.createElement(ActionButton, { className: hiddenButtonStyle, icon: discardIcon, title: this.props.trans.__('Discard changes'), onClick: () => {
                            this.discardChanges(file);
                        } })));
                onDoubleClick = doubleClickDiff
                    ? diffButton
                        ? () => this._openDiffView(file)
                        : () => undefined
                    : openFile;
            }
            return (React.createElement(FileItem, { trans: this.props.trans, actions: actions, file: file, markBox: true, model: this.props.model, onDoubleClick: onDoubleClick, contextMenu: this.openSimpleContextMenu, selectFile: this.updateSelectedFile, style: style }));
        };
        this.state = {
            selectedFile: null
        };
    }
    get markedFiles() {
        return this.props.files.filter(file => this.props.model.getMark(file.to));
    }
    /**
     * Render the modified files
     */
    render() {
        const remoteChangedFiles = [];
        const unmergedFiles = [];
        if (this.props.settings.composite['simpleStaging']) {
            const otherFiles = [];
            this.props.files.forEach(file => {
                switch (file.status) {
                    case 'remote-changed':
                        remoteChangedFiles.push(file);
                        break;
                    case 'unmerged':
                        unmergedFiles.push(file);
                        break;
                    default:
                        otherFiles.push(file);
                        break;
                }
            });
            return (React.createElement("div", { className: fileListWrapperClass },
                React.createElement(AutoSizer, { disableWidth: true }, ({ height }) => (React.createElement(React.Fragment, null,
                    this._renderUnmerged(unmergedFiles, height, false),
                    this._renderRemoteChanged(remoteChangedFiles, height),
                    this._renderSimpleStage(otherFiles, height))))));
        }
        else {
            const stagedFiles = [];
            const unstagedFiles = [];
            const untrackedFiles = [];
            this.props.files.forEach(file => {
                switch (file.status) {
                    case 'staged':
                        stagedFiles.push(file);
                        break;
                    case 'unstaged':
                        unstagedFiles.push(file);
                        break;
                    case 'untracked':
                        untrackedFiles.push(file);
                        break;
                    case 'partially-staged':
                        stagedFiles.push(Object.assign(Object.assign({}, file), { status: 'staged' }));
                        unstagedFiles.push(Object.assign(Object.assign({}, file), { status: 'unstaged' }));
                        break;
                    case 'unmerged':
                        unmergedFiles.push(file);
                        break;
                    case 'remote-changed':
                        remoteChangedFiles.push(file);
                        break;
                    default:
                        break;
                }
            });
            return (React.createElement("div", { className: fileListWrapperClass, onContextMenu: event => event.preventDefault() },
                React.createElement(AutoSizer, { disableWidth: true }, ({ height }) => (React.createElement(React.Fragment, null,
                    this._renderUnmerged(unmergedFiles, height),
                    this._renderRemoteChanged(remoteChangedFiles, height),
                    this._renderStaged(stagedFiles, height),
                    this._renderChanged(unstagedFiles, height),
                    this._renderUntracked(untrackedFiles, height))))));
        }
    }
    /**
     * Test if a file is selected
     * @param candidate file to test
     */
    _isSelectedFile(candidate) {
        if (this.state.selectedFile === null) {
            return false;
        }
        return (this.state.selectedFile.x === candidate.x &&
            this.state.selectedFile.y === candidate.y &&
            this.state.selectedFile.from === candidate.from &&
            this.state.selectedFile.to === candidate.to &&
            this.state.selectedFile.status === candidate.status);
    }
    _renderUnmerged(files, height, collapsible = true) {
        // Hide section if no merge conflicts are present
        return files.length > 0 ? (React.createElement(GitStage, { collapsible: collapsible, files: files, heading: this.props.trans.__('Conflicted'), height: height, rowRenderer: this._renderUnmergedRow })) : null;
    }
    /**
     * Render the staged files list.
     *
     * @param files The staged files
     * @param height The height of the HTML element
     */
    _renderStaged(files, height) {
        return (React.createElement(GitStage, { actions: React.createElement(ActionButton, { className: hiddenButtonStyle, disabled: files.length === 0, icon: removeIcon, title: this.props.trans.__('Unstage all changes'), onClick: this.resetAllStagedFiles }), collapsible: true, files: files, heading: this.props.trans.__('Staged'), height: height, rowRenderer: this._renderStagedRow }));
    }
    /**
     * Render the changed files list
     *
     * @param files Changed files
     * @param height Height of the HTML element
     */
    _renderChanged(files, height) {
        const disabled = files.length === 0;
        return (React.createElement(GitStage, { actions: React.createElement(React.Fragment, null,
                React.createElement(ActionButton, { className: hiddenButtonStyle, disabled: disabled, icon: discardIcon, title: this.props.trans.__('Discard All Changes'), onClick: this.discardAllUnstagedFiles }),
                React.createElement(ActionButton, { className: hiddenButtonStyle, disabled: disabled, icon: addIcon, title: this.props.trans.__('Stage all changes'), onClick: this.addAllUnstagedFiles })), collapsible: true, heading: this.props.trans.__('Changed'), height: height, files: files, rowRenderer: this._renderChangedRow }));
    }
    /**
     * Render the untracked files list.
     *
     * @param files Untracked files
     * @param height Height of the HTML element
     */
    _renderUntracked(files, height) {
        return (React.createElement(GitStage, { actions: React.createElement(ActionButton, { className: hiddenButtonStyle, disabled: files.length === 0, icon: addIcon, title: this.props.trans.__('Track all untracked files'), onClick: this.addAllUntrackedFiles }), collapsible: true, heading: this.props.trans.__('Untracked'), height: height, files: files, rowRenderer: this._renderUntrackedRow }));
    }
    /**
     * Render the a file that has changed on remote to files list.
     *
     * @param files Untracked files
     * @param height Height of the HTML element
     */
    _renderRemoteChanged(files, height) {
        return (files.length > 0 && (React.createElement(GitStage, { actions: React.createElement(ActionButton, { className: hiddenButtonStyle, disabled: files.length === 0, icon: addIcon, title: this.props.trans.__('Pull from remote branch'), onClick: this.pullFromRemote }), collapsible: true, heading: this.props.trans.__('Remote Changes'), height: height, files: files, rowRenderer: this._renderRemoteChangedRow })));
    }
    /**
     * Render the modified files in simple mode.
     *
     * @param files Modified files
     * @param height Height of the HTML element
     */
    _renderSimpleStage(files, height) {
        return (React.createElement(GitStage, { actions: React.createElement(ActionButton, { className: hiddenButtonStyle, disabled: files.length === 0, icon: discardIcon, title: this.props.trans.__('Discard All Changes'), onClick: this.discardAllChanges }), heading: this.props.trans.__('Changed'), height: height, files: files, rowRenderer: this._renderSimpleStageRow }));
    }
    /**
     * Creates a button element which, depending on the settings, is used
     * to either request a diff of the file, or open the file
     *
     * @param path File path of interest
     * @param currentRef the ref to diff against the git 'HEAD' ref
     */
    _createDiffButton(file) {
        return ((getDiffProvider(file.to) || !file.is_binary) && (React.createElement(ActionButton, { className: hiddenButtonStyle, icon: diffIcon, title: this.props.trans.__('Diff this file'), onClick: () => this._openDiffView(file) })));
    }
    /**
     * Returns a callback which opens a diff of the file
     *
     * @param file File to open diff for
     * @param currentRef the ref to diff against the git 'HEAD' ref
     */
    async _openDiffView(file) {
        try {
            await this.props.commands.execute(ContextCommandIDs.gitFileDiff, {
                files: [
                    {
                        filePath: file.to,
                        isText: !file.is_binary,
                        status: file.status
                    }
                ]
            });
        }
        catch (reason) {
            console.error(`Failed to open diff view for ${file.to}.\n${reason}`);
        }
    }
}
//# sourceMappingURL=FileList.js.map