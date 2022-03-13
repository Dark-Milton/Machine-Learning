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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderWidget = exports.Header = exports.DetailsMenuItem = exports.BeatrixHeaderToken = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const coreutils_1 = require("@lumino/coreutils");
const signaling_1 = require("@lumino/signaling");
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const csstips = __importStar(require("csstips"));
const react_1 = __importDefault(require("react"));
const typestyle_1 = require("typestyle");
const badge_1 = require("./shared/badge");
const STYLES = typestyle_1.stylesheet({
    container: Object.assign(Object.assign(Object.assign({ color: 'var(--jp-ui-font-color0)', backgroundColor: 'var(--jp-layout-color1, white)', fontSize: 'var(--jp-ui-font-size2, "16px")', lineHeight: '24px' }, csstips.horizontal), csstips.center), csstips.horizontallySpaced('8px')),
    widget: {
        left: '64px',
        position: 'absolute',
        top: '4px',
    },
});
/** Token for the HeaderWidget */
exports.BeatrixHeaderToken = new coreutils_1.Token('beatrix:Header');
/** Custom styled menu item (exported for tests) */
exports.DetailsMenuItem = core_1.withStyles({
    root: {
        fontFamily: 'var(--jp-ui-font-family)',
        fontSize: 'var(--jp-ui-font-size1)',
    },
})(core_1.MenuItem);
const MANAGED_DOCS = 'https://cloud.google.com/vertex-ai/docs/workbench/managed/quickstarts';
const USER_MANAGED_DOCS = 'https://cloud.google.com/vertex-ai/docs/workbench/user-managed/introduction';
/** Displays Notebook resource information and details button. */
class Header extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showMenu = this.showMenu.bind(this);
        this.showDetailsAndClose = this.showDetailsAndClose.bind(this);
        this.onMenuClose = this.onMenuClose.bind(this);
    }
    render() {
        const { name, isManaged } = this.props;
        const { anchorEl } = this.state;
        const docsLink = isManaged ? MANAGED_DOCS : USER_MANAGED_DOCS;
        return (react_1.default.createElement("div", { className: STYLES.container },
            react_1.default.createElement("span", null, name),
            react_1.default.createElement(badge_1.Badge, { value: "preview" }),
            react_1.default.createElement(core_1.IconButton, { size: "small", "aria-controls": "dropdown-menu", "aria-haspopup": "true", onClick: this.showMenu },
                react_1.default.createElement(icons_1.Settings, { style: { fontSize: '16px' } })),
            react_1.default.createElement(core_1.Menu, { id: "dropdown-menu", anchorEl: anchorEl, keepMounted: true, getContentAnchorEl: null, anchorOrigin: { vertical: 'bottom', horizontal: 'left' }, transformOrigin: { vertical: 'top', horizontal: 'left' }, open: Boolean(anchorEl), onClose: this.onMenuClose },
                react_1.default.createElement(exports.DetailsMenuItem, { onClick: this.showDetailsAndClose }, "Notebook details"),
                react_1.default.createElement("a", { href: "https://issuetracker.google.com/issues/new?component=958003", target: "_blank", rel: "noopener" },
                    react_1.default.createElement(exports.DetailsMenuItem, { onClick: this.onMenuClose }, "Send feedback")),
                react_1.default.createElement("a", { href: docsLink, target: "_blank", rel: "noopener" },
                    react_1.default.createElement(exports.DetailsMenuItem, { onClick: this.onMenuClose }, "Documentation")))));
    }
    showMenu(event) {
        this.setState({ anchorEl: event.currentTarget });
    }
    onMenuClose() {
        this.setState({ anchorEl: undefined });
    }
    showDetailsAndClose() {
        this.props.onShowDetails();
        this.onMenuClose();
    }
}
exports.Header = Header;
/** Widget to receive Notebook and signal when details should be shown. */
class HeaderWidget extends apputils_1.ReactWidget {
    constructor(notebookName, isManaged) {
        super();
        this.notebookName = notebookName;
        this.isManaged = isManaged;
        this.showDetailsSignal = new signaling_1.Signal(this);
        this.addClass(STYLES.widget);
    }
    render() {
        return (react_1.default.createElement(Header, { name: this.notebookName, isManaged: this.isManaged, onShowDetails: () => this.showDetailsSignal.emit() }));
    }
}
exports.HeaderWidget = HeaderWidget;
