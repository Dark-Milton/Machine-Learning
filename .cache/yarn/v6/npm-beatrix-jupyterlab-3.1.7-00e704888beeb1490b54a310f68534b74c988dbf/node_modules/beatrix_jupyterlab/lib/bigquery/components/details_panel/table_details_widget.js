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
exports.TableDetailsWidget = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const React = __importStar(require("react"));
const constants_1 = require("../../constants");
const table_details_tabs_1 = __importDefault(require("./table_details_tabs"));
/** Widget to be registered in the main panel. */
class TableDetailsWidget extends apputils_1.ReactWidget {
    constructor(table_id, name, partitioned) {
        super();
        this.table_id = table_id;
        this.name = name;
        this.partitioned = partitioned;
        this.title.iconClass = this.partitioned
            ? `jp-Icon jp-Icon-20 ${constants_1.ICONS.partitionedTable}`
            : `jp-Icon jp-Icon-20 ${constants_1.ICONS.table}`;
        this.title.caption = `Table Details for ${this.table_id}`;
        this.title.label = this.name;
        this.title.closable = true;
    }
    render() {
        return (React.createElement(table_details_tabs_1.default, { isVisible: this.isVisible, table_id: this.table_id, table_name: this.name, partitioned: this.partitioned }));
    }
}
exports.TableDetailsWidget = TableDetailsWidget;
