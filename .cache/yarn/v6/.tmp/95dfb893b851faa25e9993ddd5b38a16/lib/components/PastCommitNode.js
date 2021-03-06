import { caretDownIcon, caretUpIcon } from '@jupyterlab/ui-components';
import * as React from 'react';
import { classes } from 'typestyle';
import { diffIcon } from '../style/icons';
import { branchClass, branchWrapperClass, commitBodyClass, commitExpandedClass, commitHeaderClass, commitHeaderItemClass, commitWrapperClass, iconButtonClass, localBranchClass, remoteBranchClass, singleFileCommitClass, workingBranchClass } from '../style/PastCommitNode';
import { Git } from '../tokens';
/**
 * React component for rendering an individual commit.
 */
export class PastCommitNode extends React.Component {
    /**
     * Returns a React component for rendering an individual commit.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Callback invoked upon clicking on an individual commit.
         *
         * @param event - event object
         */
        this._onCommitClick = (event) => {
            var _a;
            if (this.props.children) {
                this.setState({
                    expanded: !this.state.expanded
                });
            }
            else {
                (_a = this.props.onOpenDiff) === null || _a === void 0 ? void 0 : _a.call(this, event);
            }
        };
        this.state = {
            expanded: false
        };
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        return (React.createElement("li", { className: classes(commitWrapperClass, !this.props.children && !!this.props.onOpenDiff
                ? singleFileCommitClass
                : this.state.expanded
                    ? commitExpandedClass
                    : null), title: this.props.children
                ? this.props.trans.__('View commit details')
                : this.props.trans.__('View file changes'), onClick: this._onCommitClick },
            React.createElement("div", { className: commitHeaderClass },
                React.createElement("span", { className: commitHeaderItemClass }, this.props.commit.author),
                React.createElement("span", { className: commitHeaderItemClass }, +this.props.commit.commit in Git.Diff.SpecialRef
                    ? Git.Diff.SpecialRef[+this.props.commit.commit]
                    : this.props.commit.commit.slice(0, 7)),
                React.createElement("span", { className: commitHeaderItemClass }, this.props.commit.date),
                this.props.children ? (this.state.expanded ? (React.createElement(caretUpIcon.react, { className: iconButtonClass, tag: "span" })) : (React.createElement(caretDownIcon.react, { className: iconButtonClass, tag: "span" }))) : (React.createElement(diffIcon.react, { className: iconButtonClass, tag: "span" }))),
            React.createElement("div", { className: branchWrapperClass }, this._renderBranches()),
            React.createElement("div", { className: commitBodyClass },
                this.props.commit.commit_msg,
                this.state.expanded && this.props.children)));
    }
    /**
     * Renders branch information.
     *
     * @returns array of React elements
     */
    _renderBranches() {
        const curr = this.props.commit.commit;
        const branches = [];
        for (let i = 0; i < this.props.branches.length; i++) {
            const branch = this.props.branches[i];
            if (branch.top_commit && branch.top_commit === curr) {
                branches.push(branch);
            }
        }
        return branches.map(this._renderBranch, this);
    }
    /**
     * Renders individual branch data.
     *
     * @param branch - branch data
     * @returns React element
     */
    _renderBranch(branch) {
        return (React.createElement(React.Fragment, { key: branch.name },
            branch.is_current_branch && (React.createElement("span", { className: classes(branchClass, workingBranchClass) }, "working")),
            React.createElement("span", { className: classes(branchClass, branch.is_remote_branch ? remoteBranchClass : localBranchClass) }, branch.name)));
    }
}
//# sourceMappingURL=PastCommitNode.js.map