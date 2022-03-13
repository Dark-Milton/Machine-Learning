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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishedNotebooksWidget = exports.PublishedNotebooksComponent = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const signaling_1 = require("@lumino/signaling");
const core_1 = require("@material-ui/core");
const react_1 = __importStar(require("react"));
const badge_1 = require("../../components/shared/badge");
const icons_1 = require("../../components/shared/icons");
const service_provider_1 = require("../../service/service_provider");
const styles_1 = require("../../styles");
const published_list_item_1 = require("./published_list_item");
const paginated_list_1 = require("../../components/shared/paginated_list");
const TITLE_TEXT = 'Shared Notebooks';
function PublishedNotebooksComponent() {
    // Refreshes the sidebar when an item is deleted.
    react_1.useEffect(() => {
        if (doDelete) {
            handleRefresh();
            setDoDelete(false);
        }
    });
    const refreshSignal = react_1.useMemo(() => new signaling_1.Signal({}), [PublishedNotebooksComponent]);
    const [doDelete, setDoDelete] = react_1.useState(false);
    const listPublishedNotebooks = (pageSize, pageToken) => __awaiter(this, void 0, void 0, function* () {
        const response = yield service_provider_1.ServiceProvider.publishedService.fetchPublishedNotebooks(pageSize, pageToken);
        return {
            items: response.notebooks,
            pageToken: response.pageToken,
        };
    });
    const checkMatch = (item, filter) => {
        var _a;
        const searchQuery = filter.toLowerCase();
        const notebook = item;
        const nameMatches = notebook.name.toLowerCase().includes(searchQuery);
        const metadataMatches = notebook.description
            ? (_a = notebook.metadata) === null || _a === void 0 ? void 0 : _a.description.toLowerCase().includes(searchQuery)
            : false;
        return nameMatches || !!metadataMatches;
    };
    const handleDoDelete = () => {
        setDoDelete(true);
    };
    const displayItem = (item) => {
        const notebook = item;
        return (react_1.default.createElement(published_list_item_1.PublishedListItem, { key: `published-notebook-${notebook.name}`, publishedNotebook: notebook, handleDoDelete: handleDoDelete }));
    };
    const handleRefresh = () => {
        refreshSignal.emit();
    };
    return (react_1.default.createElement("div", { className: styles_1.CSS.panel },
        react_1.default.createElement("div", { className: styles_1.CSS.headerContainer },
            react_1.default.createElement("header", { className: styles_1.CSS.headerTitle },
                TITLE_TEXT,
                " ",
                react_1.default.createElement(badge_1.Badge, { value: "experimental" })),
            react_1.default.createElement("div", { className: styles_1.CSS.buttonContainer },
                react_1.default.createElement(core_1.IconButton, { title: "Refresh", onClick: handleRefresh },
                    react_1.default.createElement(icons_1.RefreshIcon, null)))),
        react_1.default.createElement("div", { className: styles_1.CSS.paginatedListContainer, role: "tabpanel" },
            react_1.default.createElement(paginated_list_1.PaginatedList, { listItems: listPublishedNotebooks, displayItem: displayItem, checkMatch: checkMatch, refreshSignal: refreshSignal }))));
}
exports.PublishedNotebooksComponent = PublishedNotebooksComponent;
class PublishedNotebooksWidget extends apputils_1.ReactWidget {
    constructor() {
        super();
        this._visibleSignal = new signaling_1.Signal(this);
        this.title.iconClass = 'jp-Icon jp-Icon-20 jp-PublishIcon';
        this.title.caption = TITLE_TEXT;
    }
    onAfterHide() {
        this._visibleSignal.emit(false);
    }
    onAfterShow() {
        this._visibleSignal.emit(true);
    }
    render() {
        return (react_1.default.createElement(apputils_1.UseSignal, { signal: this._visibleSignal, initialArgs: false }, (_, isVisible) => isVisible && react_1.default.createElement(PublishedNotebooksComponent, null)));
    }
}
exports.PublishedNotebooksWidget = PublishedNotebooksWidget;
