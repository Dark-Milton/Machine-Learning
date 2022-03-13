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
exports.TabPanel = exports.StyledTab = exports.StyledTabs = void 0;
const React = __importStar(require("react"));
const core_1 = require("@material-ui/core");
exports.StyledTabs = core_1.withStyles({
    root: {
        borderBottom: '1px solid var(--jp-border-color2)',
        minHeight: 'auto',
        padding: 0,
    },
    indicator: {
        height: '2.5px',
        backgroundColor: (props) => props.color,
    },
})((props) => React.createElement(core_1.Tabs, Object.assign({}, props)));
exports.StyledTab = core_1.withStyles({
    root: {
        textTransform: 'none',
        minWidth: 'auto',
        minHeight: 'auto',
        fontSize: '13px',
        '&:hover': {
            color: (props) => props.color,
            opacity: 1,
        },
        '&selected': {
            color: (props) => props.color,
            opacity: 1,
        },
        '&:focus': {
            color: (props) => props.color,
            opacity: 1,
        },
    },
    selected: {},
})((props) => React.createElement(core_1.Tab, Object.assign({ disableRipple: true }, props)));
function TabPanel(props) {
    const { children, value, index, TabInds } = props;
    return (React.createElement("div", { id: `tabpanel-${index}`, style: {
            flex: 1,
            minHeight: 0,
            flexDirection: 'column',
            display: value !== index ? 'none' : 'flex',
            overflowX: value === TabInds.preview ? 'auto' : 'hidden',
            overflowY: 'auto',
        } }, children));
}
exports.TabPanel = TabPanel;
