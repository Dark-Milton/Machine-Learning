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
exports.ResourceChartPopper = void 0;
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const React = __importStar(require("react"));
const resource_utilization_charts_1 = require("./resource_utilization_charts");
/** Wraps resource utilization charts with icon button popper. */
function ResourceChartPopper() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'widget-popper' : undefined;
    return (React.createElement("div", null,
        React.createElement(core_1.IconButton, { size: "small", "aria-controls": "dropdown-menu", "aria-haspopup": "true", onClick: handleClick, title: "View utilization charts" },
            React.createElement(icons_1.ShowChart, { style: { border: '2px solid', borderRadius: '2px', fontSize: '12px' } })),
        React.createElement(core_1.Popper, { id: id, open: open, anchorEl: anchorEl, placement: 'top-start', transition: true }, ({ TransitionProps }) => (React.createElement(core_1.Fade, Object.assign({}, TransitionProps, { timeout: 350 }),
            React.createElement(core_1.Paper, { elevation: 5 },
                React.createElement(resource_utilization_charts_1.ResourceUtilizationCharts, null)))))));
}
exports.ResourceChartPopper = ResourceChartPopper;
