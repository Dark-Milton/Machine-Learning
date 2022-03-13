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
exports.ViewSearchResult = exports.TableSearchResult = exports.ModelSearchResult = exports.DatasetSearchResult = exports.BuildSearchResult = void 0;
const csstips = __importStar(require("csstips"));
const react_1 = __importDefault(require("react"));
const typestyle_1 = require("typestyle");
const context_menu_1 = require("../../../components/shared/context_menu");
const list_tree_item_1 = require("./list_tree_item");
const localStyles = typestyle_1.stylesheet({
    item: Object.assign({ alignItems: 'center', listStyle: 'none', height: '40px', paddingRight: '8px' }, csstips.horizontal),
    childItem: Object.assign({ alignItems: 'center', borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)', listStyle: 'none', height: '40px', paddingRight: '8px', paddingLeft: '30px' }, csstips.horizontal),
    root: {
        flexGrow: 1,
    },
    searchResultItem: {
        flexGrow: 1,
        borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'rgba(0,0,0,0.05)',
        },
    },
    searchResultTitle: {
        fontFamily: 'var(--jp-ui-font-family)',
        fontSize: 'var(--jp-ui-font-size1)',
    },
    searchResultSubtitle: {
        fontFamily: 'var(--jp-ui-font-family)',
        fontSize: 'var(--jp-ui-font-size0)',
        color: 'gray',
    },
});
function BuildSearchResult(result, context) {
    return (react_1.default.createElement("div", null, result.type === 'dataset' ? (react_1.default.createElement(DatasetSearchResult, { context: context, dataset: result })) : result.type === 'model' ? (react_1.default.createElement(ModelSearchResult, { context: context, model: result })) : result.type === 'table' ? (react_1.default.createElement(TableSearchResult, { context: context, table: result })) : (react_1.default.createElement(ViewSearchResult, { context: context, table: result }))));
}
exports.BuildSearchResult = BuildSearchResult;
class DatasetSearchResult extends list_tree_item_1.DatasetResource {
    constructor() {
        super(...arguments);
        this.contextMenuItems = [
            {
                label: 'Copy dataset ID',
                handler: dataTreeItem => this.copyID(dataTreeItem),
            },
        ];
    }
    render() {
        const { dataset } = this.props;
        return (react_1.default.createElement(context_menu_1.ContextMenu, { items: this.contextMenuItems.map(item => ({
                label: item.label,
                onClick: () => item.handler(dataset),
            })) },
            react_1.default.createElement("div", { onDoubleClick: event => this.openDatasetDetails(event, dataset), className: localStyles.searchResultItem },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("div", { className: localStyles.searchResultTitle }, dataset.name),
                    react_1.default.createElement("div", { className: localStyles.searchResultSubtitle },
                        "Type: ",
                        dataset.type)))));
    }
}
exports.DatasetSearchResult = DatasetSearchResult;
class ModelSearchResult extends list_tree_item_1.ModelResource {
    render() {
        const { model } = this.props;
        return (react_1.default.createElement(context_menu_1.ContextMenu, { items: this.contextMenuItems.map(item => ({
                label: item.label,
                onClick: () => item.handler(model),
            })) },
            react_1.default.createElement("div", { onDoubleClick: event => this.openModelDetails(event, model), className: localStyles.searchResultItem },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("div", { className: localStyles.searchResultTitle }, model.name),
                    react_1.default.createElement("div", { className: localStyles.searchResultSubtitle },
                        "Dataset: ",
                        model.parent),
                    react_1.default.createElement("div", { className: localStyles.searchResultSubtitle },
                        "Type: ",
                        model.type)))));
    }
}
exports.ModelSearchResult = ModelSearchResult;
class TableSearchResult extends list_tree_item_1.TableResource {
    render() {
        const { table } = this.props;
        return (react_1.default.createElement(context_menu_1.ContextMenu, { items: this.tableContextMenuItems.map(item => ({
                label: item.label,
                onClick: () => item.handler(table),
            })) },
            react_1.default.createElement("div", { onDoubleClick: event => this.openTableDetails(event, table), className: localStyles.searchResultItem },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("div", { className: localStyles.searchResultTitle }, table.name),
                    react_1.default.createElement("div", { className: localStyles.searchResultSubtitle },
                        "Dataset: ",
                        table.parent),
                    react_1.default.createElement("div", { className: localStyles.searchResultSubtitle },
                        "Type: ",
                        table.type)))));
    }
}
exports.TableSearchResult = TableSearchResult;
class ViewSearchResult extends list_tree_item_1.TableResource {
    render() {
        const { table } = this.props;
        return (react_1.default.createElement(context_menu_1.ContextMenu, { items: this.viewContextMenuItems.map(item => ({
                label: item.label,
                onClick: () => item.handler(table),
            })) },
            react_1.default.createElement("div", { onDoubleClick: event => this.openViewDetails(event, table), className: localStyles.searchResultItem },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("div", { className: localStyles.searchResultTitle }, table.name),
                    react_1.default.createElement("div", { className: localStyles.searchResultSubtitle },
                        "Dataset: ",
                        table.parent),
                    react_1.default.createElement("div", { className: localStyles.searchResultSubtitle },
                        "Type: ",
                        table.type)))));
    }
}
exports.ViewSearchResult = ViewSearchResult;
class ListSearchResults extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { context, searchResults } = this.props;
        if (searchResults.length > 0) {
            return searchResults.map(result => (react_1.default.createElement("div", { key: result.id, className: localStyles.root }, BuildSearchResult(result, context))));
        }
        else {
            return react_1.default.createElement("div", null, "No items match your search.");
        }
    }
}
exports.default = ListSearchResults;
