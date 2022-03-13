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
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const loading_panel_1 = __importDefault(require("../loading_panel"));
const bq_table_1 = require("../shared/bq_table");
const service_provider_1 = require("../../../service/service_provider");
const utils_1 = require("../../../utils");
const localStyles = typestyle_1.stylesheet({
    previewBody: {
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '12px',
    },
});
class TablePreviewPanel extends React.Component {
    constructor(props) {
        super(props);
        this.mounted = false;
        this.state = {
            isLoading: false,
            preview: { fields: [], rows: [], totalRows: 0 },
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.mounted = true;
            try {
                this.getPreview();
            }
            catch (err) {
                utils_1.appLog.warn('Unexpected error', err);
            }
        });
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    getPreviewQuery(tableId) {
        return 'SELECT * FROM `' + tableId + '` LIMIT 1000';
    }
    getPreview() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.mounted) {
                    this.setState({ isLoading: true });
                }
                const projectId = service_provider_1.ServiceProvider.bigQueryService.projectId;
                const query = this.getPreviewQuery(this.props.tableId);
                const queryJob = yield service_provider_1.ServiceProvider.bigQueryService.queryJob(projectId, query);
                this.setState({ jobReference: queryJob.jobReference });
            }
            catch (err) {
                utils_1.appLog.warn('Error retrieving table preview', err);
            }
            finally {
                if (this.mounted) {
                    this.setState({ isLoading: false });
                }
            }
        });
    }
    render() {
        if (this.state.isLoading) {
            return React.createElement(loading_panel_1.default, null);
        }
        else {
            return (React.createElement("div", { className: localStyles.previewBody },
                React.createElement("div", { className: localStyles.previewBody },
                    React.createElement("br", null),
                    React.createElement(bq_table_1.BQTable, { jobReference: this.state.jobReference }))));
        }
    }
}
exports.default = TablePreviewPanel;
