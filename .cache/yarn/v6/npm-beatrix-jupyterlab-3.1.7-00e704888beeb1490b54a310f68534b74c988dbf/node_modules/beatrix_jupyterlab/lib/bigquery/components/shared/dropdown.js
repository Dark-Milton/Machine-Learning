"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
class DropDown extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.anchorRef = react_1.default.createRef();
        this.handleToggle = () => {
            this.setState({ open: !this.state.open });
        };
        this.handleClose = (event) => {
            if (this.anchorRef.current &&
                this.anchorRef.current.contains(event.target)) {
                return;
            }
            this.setState({ open: false });
        };
        this.state = { open: false };
    }
    render() {
        const { buttonArgs } = this.props;
        return (react_1.default.createElement("div", { style: { display: 'flex' } },
            react_1.default.createElement("div", null,
                react_1.default.createElement(core_1.Button, Object.assign({ ref: this.anchorRef, "aria-controls": this.state.open ? 'menu-list-grow' : undefined, "aria-haspopup": "true", onClick: this.handleToggle.bind(this) }, buttonArgs), this.props.label),
                react_1.default.createElement(core_1.Popper, { open: this.state.open, anchorEl: this.anchorRef.current, role: undefined, transition: true, disablePortal: true }, ({ TransitionProps, placement }) => (react_1.default.createElement(core_1.Grow, Object.assign({}, TransitionProps, { style: {
                        transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                    } }),
                    react_1.default.createElement(core_1.Paper, null,
                        react_1.default.createElement(core_1.ClickAwayListener, { onClickAway: this.handleClose.bind(this) },
                            react_1.default.createElement(core_1.MenuList, { autoFocusItem: this.state.open, id: "menu-list-grow" }, this.props.items.map((item, index) => (react_1.default.createElement(core_1.MenuItem, { onClick: evt => {
                                    this.handleClose(evt);
                                    item.onClick();
                                }, key: `dropdown-${index}` }, item.label))))))))))));
    }
}
exports.default = DropDown;
