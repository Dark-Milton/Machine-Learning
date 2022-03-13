"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconButtonMenu = exports.SmallMenuItem = exports.SmallButton = void 0;
const React = __importStar(require("react"));
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
/** Button with no padding. */
exports.SmallButton = core_1.withStyles({
    root: { padding: 0 },
})(core_1.IconButton);
/** Menu item with smaller padding and fontSize */
exports.SmallMenuItem = core_1.withStyles({
    root: {
        fontSize: '13px',
        padding: '4px',
    },
})(core_1.MenuItem);
/** Component for rendering a menu triggered by an icon button. */
class IconButtonMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { anchorEl: null };
        this._onMenuClose = this._onMenuClose.bind(this);
    }
    render() {
        const { icon, menuItems } = this.props;
        const { anchorEl } = this.state;
        const iconElement = icon || React.createElement(icons_1.MoreVert, null);
        const menuItemElements = menuItems(this._onMenuClose);
        return menuItemElements && menuItemElements.length > 0 ? (React.createElement("span", null,
            React.createElement(core_1.IconButton, { onClick: e => this._onOpenMenu(e) }, iconElement),
            React.createElement(core_1.Menu, { anchorEl: anchorEl, open: Boolean(anchorEl), keepMounted: true, onClose: this._onMenuClose }, menuItemElements))) : null;
    }
    _onOpenMenu(event) {
        this.setState({ anchorEl: event.currentTarget });
    }
    _onMenuClose() {
        this.setState({ anchorEl: null });
    }
}
exports.IconButtonMenu = IconButtonMenu;
