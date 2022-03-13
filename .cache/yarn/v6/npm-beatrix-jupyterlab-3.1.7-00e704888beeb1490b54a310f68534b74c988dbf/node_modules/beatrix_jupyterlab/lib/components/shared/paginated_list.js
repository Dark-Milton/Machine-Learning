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
exports.PaginatedList = exports.StyledTablePagination = void 0;
const csstips = __importStar(require("csstips"));
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const message_1 = require("../../components/shared/message");
const styles_1 = require("../../styles");
const submit_button_1 = require("./submit_button");
const text_input_1 = require("./text_input");
const core_1 = require("@material-ui/core");
const DEFAULT_PAGE_SIZE = 10;
const localStyles = typestyle_1.stylesheet({
    container: Object.assign({ height: 'calc(100% - 55px)' }, csstips.vertical),
    list: Object.assign({ margin: 0, overflowY: 'scroll', padding: 0, height: '100%', overflowX: 'hidden' }, csstips.flex),
    pagination: {
        fontSize: '12px',
        borderTop: '2px solid #eeeeee',
        borderBottom: '2px solid #eeeeee',
    },
    content: {
        overflow: 'hidden',
        height: '100%',
    },
    searchBarTextField: {
        marginTop: '0px',
        marginBottom: '12px',
    },
    toolbarContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)',
        paddingBottom: '0px',
        height: '45px',
    },
    searchBar: {
        width: '100%',
        padding: '0px 16px',
        marginTop: '-12px',
    },
});
exports.StyledTablePagination = core_1.withStyles({
    root: {
        fontSize: '12px',
        borderBottom: 'none',
    },
    input: {
        fontSize: '12px !important',
    },
    caption: {
        fontSize: '12px',
    },
    selectRoot: {
        marginRight: '8px',
    },
    actions: {
        marginLeft: '0px',
    },
})(core_1.TablePagination);
/** Panel component for displaying a list of paginated items */
class PaginatedList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            visibleRows: [],
            response: { items: [], pageToken: '' },
            rowsPerPage: DEFAULT_PAGE_SIZE,
            currentPage: 0,
        };
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleRowsPerPageChange = this.handleRowsPerPageChange.bind(this);
        this.labelDisplayedRows = this.labelDisplayedRows.bind(this);
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
    }
    componentDidMount() {
        this.props.refreshSignal.connect(this.handleRefresh);
        this.handleRefresh();
    }
    componentWillUnmount() {
        this.props.refreshSignal.disconnect(this.handleRefresh);
    }
    render() {
        const { displayItem, toolBarIcons } = this.props;
        const { currentPage, error, isLoading, rowsPerPage, visibleRows, filter, filtered, } = this.state;
        let content;
        if (isLoading && !filter) {
            content = React.createElement(core_1.LinearProgress, null);
        }
        else if (error) {
            content = React.createElement(message_1.Message, { text: error, asError: true });
        }
        else if (filter && (filtered === null || filtered === void 0 ? void 0 : filtered.length) === 0) {
            content = React.createElement(message_1.Message, { text: 'No matched rows found' });
        }
        else if (filter && (filtered === null || filtered === void 0 ? void 0 : filtered.length)) {
            content = (React.createElement("ul", { className: localStyles.list }, filtered.map(displayItem)));
        }
        else if (visibleRows.length === 0) {
            content = React.createElement(message_1.Message, { text: "No rows to display" });
        }
        else {
            content = (React.createElement("ul", { className: localStyles.list }, visibleRows.map(displayItem)));
        }
        return (React.createElement("div", { className: styles_1.CSS.fullBleed },
            React.createElement("div", { className: localStyles.toolbarContainer },
                toolBarIcons,
                React.createElement("div", { className: localStyles.searchBar },
                    React.createElement(text_input_1.TextInput, { className: localStyles.searchBarTextField, type: "search", onChange: this.onSearchInputChange, placeholder: 'Search', name: "searchInput", value: filter }))),
            React.createElement("div", { className: localStyles.container },
                React.createElement("div", { className: localStyles.content }, content),
                filter && this.state.response.pageToken && (React.createElement(submit_button_1.SubmitButton, { onClick: () => {
                        this.getItems(rowsPerPage, /* getPageToken = */ true);
                    }, showWorkingIcon: true, actionPending: isLoading, text: "Load more results" })),
                this.shouldShowFooter() && !filter && (React.createElement("footer", { className: localStyles.pagination },
                    React.createElement(exports.StyledTablePagination, { count: -1, page: currentPage, onPageChange: this.handlePageChange, rowsPerPage: rowsPerPage, onRowsPerPageChange: this.handleRowsPerPageChange, labelDisplayedRows: this.labelDisplayedRows, labelRowsPerPage: "Items per page:", SelectProps: { variant: 'outlined' }, nextIconButtonProps: { disabled: !this.isNextPageEnabled() } }))))));
    }
    // Updates the visible rows based on input from the search bar.
    onSearchInputChange(event) {
        const { response } = this.state;
        const { checkMatch } = this.props;
        const filter = event.target.value;
        const filtered = filter
            ? response.items.filter(item => checkMatch(item, filter))
            : [];
        this.setState({
            filter: filter ? filter : undefined,
            filtered,
        }, () => {
            if (filter && filtered.length === 0) {
                this.getItems(this.state.rowsPerPage, true);
            }
        });
    }
    shouldShowFooter() {
        return !this.state.error;
    }
    handleRefresh() {
        this.getItems(this.state.rowsPerPage);
        this.setState({ currentPage: 0, filter: undefined });
    }
    handlePageChange(event, newPage) {
        const { currentPage, rowsPerPage } = this.state;
        if (newPage > currentPage) {
            if (!this.isNextPageEnabled())
                return;
            if (this.pageHasBeenSeen(newPage)) {
                this.setVisibleItems(newPage);
            }
            else {
                this.getItems(rowsPerPage, /* getPageToken = */ true);
            }
        }
        else {
            this.setVisibleItems(newPage);
        }
        this.setState({ currentPage: newPage });
    }
    handleRowsPerPageChange(event) {
        const newRowsPerPage = parseInt(event.target.value, DEFAULT_PAGE_SIZE);
        this.getItems(newRowsPerPage);
        this.setState({ rowsPerPage: newRowsPerPage, currentPage: 0 });
    }
    getItems(pageSize, getPageToken = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const { listItems, checkMatch } = this.props;
            const { response, filter } = this.state;
            const emptyResponse = { items: [], pageToken: '' };
            let pageToken = undefined;
            if (getPageToken) {
                pageToken = response.pageToken;
            }
            try {
                this.setState({
                    visibleRows: filter ? this.state.visibleRows : [],
                    isLoading: true,
                    error: undefined,
                });
                const prevItems = pageToken ? response.items : [];
                let newResponseItems = [];
                do {
                    const newResponse = yield listItems(pageSize, pageToken !== null && pageToken !== void 0 ? pageToken : '');
                    newResponseItems = newResponse.items || [];
                    prevItems.push(...newResponseItems);
                    pageToken = newResponse.pageToken;
                    // if the new page has any matching elements then we can stop loading
                    if (newResponseItems.find(item => checkMatch(item, filter !== null && filter !== void 0 ? filter : '')) ||
                        !pageToken) {
                        break;
                    }
                } while (filter);
                this.setState({
                    visibleRows: filter ? this.state.visibleRows : [...newResponseItems],
                    response: { items: prevItems, pageToken },
                    filtered: filter
                        ? prevItems.filter(item => checkMatch(item, filter))
                        : [],
                    isLoading: false,
                });
            }
            catch (err) {
                this.setState({
                    isLoading: false,
                    visibleRows: [],
                    error: `${err}: Unable to retrieve items`,
                    response: emptyResponse,
                });
            }
        });
    }
    labelDisplayedRows({ from, to }) {
        const { response } = this.state;
        let totalCount = 'many';
        if (!response.pageToken) {
            totalCount = response.items.length;
        }
        if (totalCount === 0)
            return '0 of 0';
        return `${from}-${totalCount !== 'many' ? Math.min(to, totalCount) : to} of ${totalCount}`;
    }
    isNextPageEnabled() {
        const { currentPage, isLoading, response } = this.state;
        return ((!isLoading && !!response.pageToken) ||
            this.pageHasBeenSeen(currentPage + 1));
    }
    pageHasBeenSeen(newPage) {
        const { response, rowsPerPage } = this.state;
        return response.items.length > newPage * rowsPerPage;
    }
    setVisibleItems(newPage) {
        const { response, rowsPerPage } = this.state;
        this.setState({
            visibleRows: response.items.slice(newPage * rowsPerPage, Math.min((newPage + 1) * rowsPerPage, response.items.length)),
        });
    }
}
exports.PaginatedList = PaginatedList;
