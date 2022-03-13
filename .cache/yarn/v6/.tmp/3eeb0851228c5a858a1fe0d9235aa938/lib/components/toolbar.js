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
exports.ToolbarWidget = exports.BeatrixToolbarToken = exports.Toolbar = exports.HardwareButton = exports.HARDWARE_BUTTON_ID = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const coreutils_1 = require("@lumino/coreutils");
const signaling_1 = require("@lumino/signaling");
const csstips = __importStar(require("csstips"));
const react_1 = __importDefault(require("react"));
const typestyle_1 = require("typestyle");
const avatar_1 = require("./avatar");
/** ID of the button to view hardware details */
exports.HARDWARE_BUTTON_ID = 'jp-beatrixToolbar-hardwareButton';
const STYLES = typestyle_1.stylesheet({
    container: Object.assign(Object.assign(Object.assign({ height: '56px' }, csstips.horizontal), csstips.center), csstips.horizontallySpaced('12px')),
    widget: {
        height: '56px',
        position: 'absolute',
        right: '18px',
    },
});
const ISSUE_TRACKER_URL = 'https://issuetracker.google.com/issues/new?component=958003';
/** Button that can be clicked to view hardware details */
exports.HardwareButton = core_1.withStyles({
    root: {
        textTransform: 'none',
    },
})(core_1.Button);
/** Displays toolbar */
function Toolbar(props) {
    const { email, machineType, onShowPopover } = props;
    return (react_1.default.createElement("div", { className: STYLES.container },
        machineType && (react_1.default.createElement(exports.HardwareButton, { id: exports.HARDWARE_BUTTON_ID, variant: "outlined", endIcon: react_1.default.createElement(icons_1.ArrowDropDown, null), onClick: onShowPopover }, machineType)),
        react_1.default.createElement("a", { href: ISSUE_TRACKER_URL, target: "_blank", rel: "noopener" },
            react_1.default.createElement(core_1.IconButton, { "aria-label": "send feedback", title: "Send feedback" },
                react_1.default.createElement(icons_1.FeedbackOutlined, null))),
        react_1.default.createElement(avatar_1.Avatar, { email: email })));
}
exports.Toolbar = Toolbar;
/** Token for the ToolbarWidget */
exports.BeatrixToolbarToken = new coreutils_1.Token('beatrix:Toolbar');
/** Widget to display top-right toolbar. */
class ToolbarWidget extends apputils_1.ReactWidget {
    constructor(notebookProvider) {
        super();
        this.notebookProvider = notebookProvider;
        this.showPopoverSignal = new signaling_1.Signal(this);
        this.addClass(STYLES.widget);
    }
    render() {
        return (react_1.default.createElement(apputils_1.UseSignal, { signal: this.notebookProvider.notebookSignal, initialArgs: this.notebookProvider.notebookSnapshot }, (_, notebook) => notebook && (react_1.default.createElement(Toolbar, { email: notebook.owner, machineType: notebook.machineType, onShowPopover: () => this.showPopoverSignal.emit() }))));
    }
}
exports.ToolbarWidget = ToolbarWidget;
