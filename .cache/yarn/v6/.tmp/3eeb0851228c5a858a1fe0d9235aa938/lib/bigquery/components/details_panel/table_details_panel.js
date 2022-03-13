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
exports.TableDetailsPanel = void 0;
const React = __importStar(require("react"));
const utils_1 = require("../../../utils");
const loading_panel_1 = __importDefault(require("../loading_panel"));
const details_panel_1 = require("./details_panel");
const service_provider_1 = require("../../../service/service_provider");
const EMPTY_DETAILS = {
    id: '',
    name: '',
    description: '',
    labels: [],
    date_created: '',
    expires: '',
    location: '',
    last_modified: '',
    project: '',
    dataset: '',
    link: '',
    num_rows: 0,
    num_bytes: 0,
    schema: [],
};
class TableDetailsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLoaded: false,
            isLoading: false,
            details: { details: EMPTY_DETAILS },
            rows: [],
        };
    }
    componentDidUpdate(prevProps) {
        const isFirstLoad = !(this.state.hasLoaded || prevProps.isVisible) && this.props.isVisible;
        if (isFirstLoad) {
            this.getDetails();
        }
    }
    getDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setState({ isLoading: true });
            try {
                const details = yield service_provider_1.ServiceProvider.bigQueryService.listTableDetails(this.props.tableId);
                const detailsObj = details.details;
                const rows = [
                    { name: 'Table ID', value: detailsObj.id },
                    {
                        name: 'Table size',
                        value: utils_1.formatBytes(detailsObj.num_bytes),
                    },
                    {
                        name: 'Number of rows',
                        value: detailsObj.num_rows.toLocaleString(),
                    },
                    { name: 'Created', value: utils_1.formatDate(detailsObj.date_created) },
                    {
                        name: 'Table expiration',
                        value: detailsObj.expires ? utils_1.formatDate(detailsObj.expires) : 'Never',
                    },
                    {
                        name: 'Last modified',
                        value: utils_1.formatDate(detailsObj.last_modified),
                    },
                    {
                        name: 'Data location',
                        value: detailsObj.location ? detailsObj.location : 'None',
                    },
                ];
                this.setState({ hasLoaded: true, details, rows });
            }
            catch (err) {
                utils_1.appLog.warn('Error retrieving table details', err);
            }
            this.setState({ isLoading: false });
        });
    }
    render() {
        if (this.state.isLoading) {
            return React.createElement(loading_panel_1.default, null);
        }
        else {
            return (React.createElement(details_panel_1.DetailsPanel, { details: this.state.details.details, rows: this.state.rows, detailsType: "TABLE" }));
        }
    }
}
exports.TableDetailsPanel = TableDetailsPanel;
