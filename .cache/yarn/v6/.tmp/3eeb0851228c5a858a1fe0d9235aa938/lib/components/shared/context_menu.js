"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenu = void 0;
const core_1 = require("@material-ui/core");
const react_1 = __importDefault(require("react"));
const ContextMenuItem = core_1.withStyles({
    root: {
        fontSize: 'var(--jp-ui-font-size1)',
    },
})(core_1.MenuItem);
const ContextMenuContainer = core_1.withStyles({
    paper: {
        border: '1px solid var(--jp-border-color0)',
        borderRadius: 0,
    },
    list: {
        padding: 0,
    },
})(core_1.Menu);
class ContextMenu extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.menuItemsRef = react_1.default.createRef();
        this.openContextMenu = this.openContextMenu.bind(this);
        this.closeContextMenu = this.closeContextMenu.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
            isOpen: false,
            mouseX: 0,
            mouseY: 0,
        };
    }
    componentDidMount() {
        document.addEventListener('contextmenu', this.onContextMenu);
        document.addEventListener('click', this.onClick);
    }
    componentWillUnmount() {
        document.removeEventListener('contextmenu', this.onContextMenu);
        document.removeEventListener('click', this.onClick);
    }
    openContextMenu(event) {
        event.stopPropagation();
        event.preventDefault();
        this.setState({
            isOpen: true,
            mouseX: event.clientX,
            mouseY: event.clientY,
        });
    }
    closeContextMenu() {
        this.setState({ isOpen: false });
    }
    render() {
        const children = react_1.default.Children.map(this.props.children, child => {
            if (react_1.default.isValidElement(child)) {
                return react_1.default.cloneElement(child, {
                    onContextMenu: this.openContextMenu,
                });
            }
        });
        return (react_1.default.createElement(react_1.default.Fragment, null,
            children,
            react_1.default.createElement(core_1.Portal, null,
                react_1.default.createElement(ContextMenuContainer, { transitionDuration: 0, open: this.state.isOpen, anchorReference: "anchorPosition", anchorPosition: { top: this.state.mouseY, left: this.state.mouseX } },
                    react_1.default.createElement("div", { ref: this.menuItemsRef }, this.props.items.map(option => (react_1.default.createElement(ContextMenuItem, { key: option.label, onClick: option.onClick }, option.label))))))));
    }
    onContextMenu(event) {
        if (!(this.state.isOpen && this.menuItemsRef.current))
            return;
        if (!(event.clientX === this.state.mouseX &&
            event.clientY === this.state.mouseY) &&
            !this.menuItemsRef.current.contains(event.target)) {
            this.closeContextMenu();
        }
        event.preventDefault();
    }
    onClick(event) {
        if (this.state.isOpen) {
            event.preventDefault();
            this.closeContextMenu();
        }
    }
}
exports.ContextMenu = ContextMenu;
