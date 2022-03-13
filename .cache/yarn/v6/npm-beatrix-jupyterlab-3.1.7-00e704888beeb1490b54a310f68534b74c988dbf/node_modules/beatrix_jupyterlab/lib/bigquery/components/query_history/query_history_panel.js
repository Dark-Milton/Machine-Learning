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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryHistoryPanel = void 0;
const icons_1 = require("@material-ui/icons");
const luxon_1 = require("luxon");
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const styles_1 = require("../../../styles");
const loading_panel_1 = __importDefault(require("../loading_panel"));
const bq_table_1 = require("../shared/bq_table");
const header_1 = require("../shared/header");
const query_bar_1 = require("./query_bar");
const query_details_1 = require("./query_details");
const query_status_bar_1 = require("./query_status_bar");
const core_1 = require("@material-ui/core");
const service_provider_1 = require("../../../service/service_provider");
const utils_1 = require("../../../utils");
const localStyles = typestyle_1.stylesheet({
    queryHistoryRoot: Object.assign({ height: '100%', display: 'flex', flexDirection: 'column' }, styles_1.BASE_FONT),
    body: {
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        backgroundColor: 'var(--jp-layout-color2)',
    },
    refreshIcon: {
        color: 'var(--jp-ui-font-color1)',
    },
    dateGroup: {
        marginBottom: '12px',
    },
    openDetails: {
        marginBottom: '10px',
        padding: '14px',
    },
});
const HeadingPaper = core_1.withStyles({
    root: {
        fontSize: '18px',
        padding: '10px 0px 10px 10px',
        backgroundColor: 'var(--jp-layout-color0)',
        color: 'var(--jp-ui-font-color1)',
    },
})(core_1.Paper);
const StyledPaper = core_1.withStyles({
    root: {
        fontSize: '13px',
        padding: '10px 0px 10px 10px',
        backgroundColor: 'var(--jp-layout-color0)',
        color: 'var(--jp-ui-font-color1)',
    },
})(core_1.Paper);
class QueryHistoryPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLoaded: QueryHistoryPanel.queryHistory !== undefined,
            detailLoaded: false,
            page: 0,
            rowsPerPage: 30,
            lastFetchTime: 0,
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state.hasLoaded === false) {
                yield this.getHistory();
            }
        });
    }
    getQueryDetails(jobId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = QueryHistoryPanel.queryHistory) === null || _a === void 0 ? void 0 : _a.jobs[jobId].details)
                return;
            try {
                yield service_provider_1.ServiceProvider.bigQueryService
                    .getQueryDetails(service_provider_1.ServiceProvider.bigQueryService.projectId, jobId)
                    .then(queryDetails => {
                    if (QueryHistoryPanel.queryHistory) {
                        QueryHistoryPanel.queryHistory.jobs[jobId].details =
                            queryDetails.job;
                    }
                });
            }
            catch (err) {
                utils_1.appLog.warn(`Error retrieving query details for query ID ${jobId}`, err);
            }
        });
    }
    processHistory(jobIds, jobs) {
        const queriesByDate = new Map();
        jobIds.map(jobId => {
            const date = luxon_1.DateTime.fromMillis(Number.parseInt(jobs[jobId].created));
            const day = date.toLocaleString(luxon_1.DateTime.DATE_SHORT);
            const jobIds = queriesByDate.get(day);
            if (jobIds) {
                jobIds.push(jobId);
            }
            else {
                queriesByDate.set(day, [jobId]);
            }
        });
        return queriesByDate;
    }
    getHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield service_provider_1.ServiceProvider.bigQueryService
                    .getQueryHistory(service_provider_1.ServiceProvider.bigQueryService.projectId)
                    .then(queryHistory => {
                    const { jobIds, jobs, lastFetchTime } = queryHistory;
                    QueryHistoryPanel.queryHistory = {
                        jobIds: jobIds,
                        jobs: jobs,
                        lastFetchTime: lastFetchTime,
                    };
                });
                this.setState({ hasLoaded: true });
            }
            catch (err) {
                utils_1.appLog.error('Error retrieving query history', err);
            }
        });
    }
    displayDate(date) {
        const today = luxon_1.DateTime.local().toLocaleString(luxon_1.DateTime.DATE_SHORT);
        const yesterday = luxon_1.DateTime.local()
            .minus({ days: 1 })
            .toLocaleString(luxon_1.DateTime.DATE_SHORT);
        if (date === today) {
            return 'Today';
        }
        else if (date === yesterday) {
            return 'Yesterday';
        }
        else {
            return date;
        }
    }
    handlePageChange(event, newPage) {
        this.setState({ page: newPage });
    }
    handleRowsPerPageChange(event) {
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10),
        });
        this.setState({ page: 0 });
    }
    handleRefreshHistory() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield service_provider_1.ServiceProvider.bigQueryService
                    .getQueryHistory(service_provider_1.ServiceProvider.bigQueryService.projectId, (_a = QueryHistoryPanel.queryHistory) === null || _a === void 0 ? void 0 : _a.lastFetchTime)
                    .then(queryHistory => {
                    const { jobIds, jobs, lastFetchTime } = queryHistory;
                    if (QueryHistoryPanel.queryHistory) {
                        QueryHistoryPanel.queryHistory.jobs = Object.assign(QueryHistoryPanel.queryHistory.jobs, jobs);
                        // pre-pend since query ids are ordered by time, ascending
                        QueryHistoryPanel.queryHistory.jobIds = jobIds.concat(QueryHistoryPanel.queryHistory.jobIds);
                        QueryHistoryPanel.queryHistory.lastFetchTime = lastFetchTime;
                    }
                    this.setState({ lastFetchTime });
                });
            }
            catch (err) {
                utils_1.appLog.warn('Error retrieving query history', err);
            }
        });
    }
    render() {
        const { hasLoaded, rowsPerPage, page, openJob } = this.state;
        if (!hasLoaded || !QueryHistoryPanel.queryHistory) {
            return (React.createElement("div", { className: localStyles.queryHistoryRoot },
                React.createElement(header_1.Header, null, "Query history"),
                " ",
                React.createElement(loading_panel_1.default, null)));
        }
        const { jobIds, jobs } = QueryHistoryPanel.queryHistory;
        const queriesByDate = this.processHistory(jobIds.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), jobs);
        return (React.createElement("div", { className: localStyles.queryHistoryRoot },
            React.createElement(header_1.Header, null,
                "Query history",
                React.createElement(core_1.IconButton, { onClick: this.handleRefreshHistory.bind(this), size: "small" },
                    React.createElement(icons_1.Refresh, { className: localStyles.refreshIcon }))),
            React.createElement("div", { className: localStyles.body }, Array.from(queriesByDate.keys()).map(date => {
                var _a;
                return (React.createElement("div", { className: localStyles.dateGroup, key: `query_history_date_${date}` },
                    React.createElement(HeadingPaper, { variant: "outlined", square: true }, this.displayDate(date)),
                    ((_a = queriesByDate.get(date)) !== null && _a !== void 0 ? _a : []).map((jobId) => {
                        return (React.createElement("div", { key: `query_details_${jobId}` },
                            React.createElement("div", { onClick: () => __awaiter(this, void 0, void 0, function* () {
                                    const shouldOpen = openJob !== jobId;
                                    this.setState({
                                        openJob: openJob === jobId ? undefined : jobId,
                                    });
                                    if (shouldOpen) {
                                        this.setState({
                                            detailLoaded: false,
                                        });
                                        yield this.getQueryDetails(jobId);
                                        this.setState({
                                            detailLoaded: true,
                                        });
                                    }
                                }) }, openJob === jobId ? (React.createElement(query_status_bar_1.QueryStatusBar, { failed: jobs[jobId].errored })) : (React.createElement(query_bar_1.QueryBar, { jobId: jobId, jobs: jobs }))),
                            React.createElement(core_1.Collapse, { in: openJob === jobId }, jobs[jobId].details ? (React.createElement(StyledPaper, { square: true, className: localStyles.openDetails },
                                React.createElement(query_details_1.QueryDetails, { job: jobs[jobId] }))) : (React.createElement(core_1.LinearProgress, null)))));
                    })));
            })),
            React.createElement(bq_table_1.StyledPagination, { rowsPerPageOptions: [10, 30, 50, 100, 200], count: jobIds.length, rowsPerPage: rowsPerPage, page: page, onPageChange: this.handlePageChange.bind(this), onRowsPerPageChange: this.handleRowsPerPageChange.bind(this), ActionsComponent: bq_table_1.TablePaginationActions, labelRowsPerPage: "Queries per page:", component: "div" })));
    }
}
exports.QueryHistoryPanel = QueryHistoryPanel;
QueryHistoryPanel.queryHistory = undefined;
