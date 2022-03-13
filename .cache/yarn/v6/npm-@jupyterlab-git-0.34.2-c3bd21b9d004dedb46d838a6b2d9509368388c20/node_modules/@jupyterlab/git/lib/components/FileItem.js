import * as React from 'react';
import { classes } from 'typestyle';
import { fileChangedLabelBrandStyle, fileChangedLabelInfoStyle, fileChangedLabelStyle, fileChangedLabelWarnStyle, fileStyle, gitMarkBoxStyle, selectedFileChangedLabelStyle, selectedFileStyle } from '../style/FileItemStyle';
import { FilePath } from './FilePath';
// Git status codes https://git-scm.com/docs/git-status
export const STATUS_CODES = {
    M: 'Modified',
    A: 'Added',
    D: 'Deleted',
    R: 'Renamed',
    C: 'Copied',
    U: 'Updated',
    B: 'Behind',
    '?': 'Untracked',
    '!': 'Ignored'
};
/**
 * Render the selection box in simple mode
 */
class GitMarkBox extends React.PureComponent {
    constructor() {
        super(...arguments);
        this._onClick = () => {
            // toggle will emit a markChanged signal
            this.props.model.toggleMark(this.props.fname);
            // needed if markChanged doesn't force an update of a parent
            this.forceUpdate();
        };
        this._onDoubleClick = (event) => {
            event.stopPropagation();
        };
    }
    render() {
        // idempotent, will only run once per file
        this.props.model.addMark(this.props.fname, this.props.stage !== 'untracked');
        return (React.createElement("input", { name: "gitMark", className: gitMarkBoxStyle, type: "checkbox", checked: this.props.model.getMark(this.props.fname), onChange: this._onClick, onDoubleClick: this._onDoubleClick }));
    }
}
export class FileItem extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    _getFileChangedLabel(change) {
        return STATUS_CODES[change] || 'Unmodified';
    }
    _getFileChangedLabelClass(change) {
        if (change === 'M') {
            return this.props.selected
                ? classes(fileChangedLabelStyle, fileChangedLabelBrandStyle, selectedFileChangedLabelStyle)
                : classes(fileChangedLabelStyle, fileChangedLabelBrandStyle);
        }
        else if (change === '!') {
            return this.props.selected
                ? classes(fileChangedLabelStyle, fileChangedLabelWarnStyle, selectedFileChangedLabelStyle)
                : classes(fileChangedLabelStyle, fileChangedLabelWarnStyle);
        }
        else {
            return this.props.selected
                ? classes(fileChangedLabelStyle, fileChangedLabelInfoStyle, selectedFileChangedLabelStyle)
                : classes(fileChangedLabelStyle, fileChangedLabelInfoStyle);
        }
    }
    _getFileClass() {
        const baseClass = this.props.selected
            ? classes(fileStyle, selectedFileStyle)
            : fileStyle;
        return this.props.className
            ? `${baseClass} ${this.props.className}`
            : baseClass;
    }
    render() {
        const { file } = this.props;
        const status_code = file.status === 'staged' ? file.x : file.y;
        const status = file.status === 'unmerged'
            ? 'Conflicted'
            : this._getFileChangedLabel(status_code);
        return (React.createElement("div", { className: this._getFileClass(), onClick: this.props.selectFile &&
                (() => this.props.selectFile(this.props.file)), onContextMenu: this.props.contextMenu &&
                (event => {
                    this.props.contextMenu(this.props.file, event);
                }), onDoubleClick: this.props.onDoubleClick, style: this.props.style, title: this.props.trans.__(`%1 • ${status}`, this.props.file.to) },
            this.props.markBox && (React.createElement(GitMarkBox, { fname: this.props.file.to, stage: this.props.file.status, model: this.props.model })),
            React.createElement(FilePath, { filepath: this.props.file.to, filetype: this.props.file.type }),
            this.props.actions,
            React.createElement("span", { className: this._getFileChangedLabelClass(this.props.file.status === 'unmerged' ? '!' : this.props.file.y) }, this.props.file.status === 'unmerged'
                ? '!'
                : this.props.file.y === '?'
                    ? 'U'
                    : status_code)));
    }
}
//# sourceMappingURL=FileItem.js.map