import { checkIcon } from '@jupyterlab/ui-components';
import { CommandRegistry } from '@lumino/commands';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import * as React from 'react';
import { classes } from 'typestyle';
import { listItemIconClass } from '../style/BranchMenu';
import { commitButtonClass, commitFormClass, commitPaperClass, commitRoot, commitVariantSelector, disabledStyle } from '../style/CommitBox';
import { verticalMoreIcon } from '../style/icons';
import { listItemBoldTitleClass, listItemContentClass, listItemDescClass } from '../style/NewBranchDialog';
import { CommandIDs } from '../tokens';
import { CommitMessage } from './CommitMessage';
/**
 * React component for entering a commit message.
 */
export class CommitBox extends React.Component {
    /**
     * Returns a React component for entering a commit message.
     *
     * @param props - component properties
     * @returns React component
     */
    constructor(props) {
        super(props);
        /**
         * Get keystroke configured to act as a submit action.
         */
        this._getSubmitKeystroke = () => {
            const binding = this.props.commands.keyBindings.find(binding => binding.command === CommandIDs.gitSubmitCommand);
            return binding.keys.join(' ');
        };
        /**
         * Close the commit variant menu if needed.
         */
        this._handleClose = (event) => {
            if (this._anchorRef.current &&
                this._anchorRef.current.contains(event.target)) {
                return;
            }
            this.setState({ open: false });
        };
        /**
         * Handle commit variant menu item click
         */
        this._handleMenuItemClick = (event, index) => {
            this.setState({
                open: false
            });
            this.props.setAmend(index === 1);
        };
        /**
         * Toggle state of the commit variant menu visibility
         */
        this._handleToggle = () => {
            this.setState({ open: !this.state.open });
        };
        /**
         * Callback invoked upon command execution activated when entering a commit message description.
         *
         * ## Notes
         *
         * -   Triggers the `'submit'` action on appropriate command (and if commit is possible)
         *
         */
        this._handleCommand = (_, commandArgs) => {
            if (commandArgs.id === CommandIDs.gitSubmitCommand && this._canCommit()) {
                this.props.onCommit();
            }
        };
        this._options = [];
        this._options.push({
            title: this.props.trans.__('Create a new commit'),
            description: this.props.trans.__('New commit will be created and show up as a next one after the previous commit (default).')
        }, {
            title: this.props.trans.__('Amend previous commit'),
            description: this.props.trans.__('Staged changes will be added to the previous commit and its date will be updated.')
        });
        this._anchorRef = React.createRef();
        this.state = {
            open: false
        };
    }
    componentDidMount() {
        this.props.commands.commandExecuted.connect(this._handleCommand);
    }
    componentWillUnmount() {
        this.props.commands.commandExecuted.disconnect(this._handleCommand);
    }
    /**
     * Renders the component.
     *
     * @returns React element
     */
    render() {
        const disabled = !this._canCommit();
        const title = !this.props.hasFiles
            ? this.props.trans.__('Disabled: No files are staged for commit')
            : !this.props.summary
                ? this.props.trans.__('Disabled: No commit message summary')
                : this.props.label;
        const shortcutHint = CommandRegistry.formatKeystroke(this._getSubmitKeystroke());
        const summaryPlaceholder = this.props.trans.__('Summary (%1 to commit)', shortcutHint);
        return (React.createElement("div", { className: classes(commitFormClass, 'jp-git-CommitBox') },
            React.createElement(CommitMessage, { trans: this.props.trans, summary: this.props.summary, summaryPlaceholder: summaryPlaceholder, description: this.props.description, disabled: this.props.amend, setSummary: this.props.setSummary, setDescription: this.props.setDescription }),
            React.createElement(ButtonGroup, { ref: this._anchorRef, fullWidth: true, size: "small" },
                React.createElement(Button, { classes: {
                        root: commitButtonClass,
                        disabled: disabledStyle
                    }, title: title, disabled: disabled, onClick: this.props.onCommit }, this.props.label),
                React.createElement(Button, { classes: {
                        root: commitButtonClass
                    }, className: commitVariantSelector, size: "small", "aria-controls": this.state.open ? 'split-button-menu' : undefined, "aria-expanded": this.state.open ? 'true' : undefined, "aria-label": "select commit variant", "aria-haspopup": "menu", onClick: this._handleToggle },
                    React.createElement(verticalMoreIcon.react, { tag: "span" }))),
            React.createElement(Popper, { open: this.state.open, anchorEl: this._anchorRef.current, role: undefined, transition: true, disablePortal: true }, ({ TransitionProps }) => (React.createElement(Grow, Object.assign({}, TransitionProps),
                React.createElement(Paper, { classes: { root: commitRoot }, className: commitPaperClass },
                    React.createElement(ClickAwayListener, { onClickAway: this._handleClose },
                        React.createElement(MenuList, { id: "split-button-menu" }, this._options.map((option, index) => (React.createElement(MenuItem, { key: option.title, classes: { root: commitRoot }, selected: this.props.amend ? index === 1 : index === 0, onClick: event => this._handleMenuItemClick(event, index) },
                            (this.props.amend ? index === 1 : index === 0) ? (React.createElement(checkIcon.react, { className: listItemIconClass, tag: "span" })) : (React.createElement("span", { className: listItemIconClass })),
                            React.createElement("div", { className: listItemContentClass },
                                React.createElement("p", { className: listItemBoldTitleClass }, option.title),
                                React.createElement("p", { className: listItemDescClass }, option.description)))))))))))));
    }
    /**
     * Whether a commit can be performed (files are staged and summary is not empty).
     */
    _canCommit() {
        if (this.props.amend) {
            return this.props.hasFiles;
        }
        return !!(this.props.hasFiles && this.props.summary);
    }
}
//# sourceMappingURL=CommitBox.js.map