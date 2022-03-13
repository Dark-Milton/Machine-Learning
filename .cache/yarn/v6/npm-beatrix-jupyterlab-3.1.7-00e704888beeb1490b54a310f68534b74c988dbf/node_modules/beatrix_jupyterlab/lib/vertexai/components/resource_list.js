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
exports.ResourceList = void 0;
const signaling_1 = require("@lumino/signaling");
const core_1 = require("@material-ui/core");
const React = __importStar(require("react"));
const icons_1 = require("../../components/shared/icons");
const paginated_list_1 = require("../../components/shared/paginated_list");
/** Component for display a list of Vertex resources with a refresh. */
function ResourceList(props) {
    const refreshSignal = new signaling_1.Signal({});
    const handleRefresh = () => {
        refreshSignal.emit();
    };
    React.useEffect(() => {
        handleRefresh();
    });
    return (React.createElement(paginated_list_1.PaginatedList, { listItems: props.listResources, displayItem: props.displayItem, checkMatch: props.checkMatch, refreshSignal: refreshSignal, toolBarIcons: React.createElement(React.Fragment, null,
            React.createElement(core_1.IconButton, { title: "Refresh", onClick: handleRefresh },
                React.createElement(icons_1.RefreshIcon, null)),
            props.additionalActions) }));
}
exports.ResourceList = ResourceList;
