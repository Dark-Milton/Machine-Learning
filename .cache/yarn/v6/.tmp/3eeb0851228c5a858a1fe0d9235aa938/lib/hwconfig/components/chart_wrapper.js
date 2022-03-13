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
exports.AreaChartWrapper = void 0;
const React = __importStar(require("react"));
const recharts_1 = require("recharts");
const typestyle_1 = require("typestyle");
const STYLES = typestyle_1.stylesheet({
    chartContainer: {
        paddingBottom: '5px',
        paddingTop: '5px',
    },
});
function AreaChartWrapper(props) {
    const { data, dataKey, title, titleClass, chartColor, areaChartProps, areaProps, cartesianGridProps, yAxisProps, } = props;
    return (React.createElement("div", { className: STYLES.chartContainer },
        React.createElement("h1", { className: titleClass }, `${title} - ${data[data.length - 1][dataKey]}%`),
        React.createElement(recharts_1.AreaChart, Object.assign({}, areaChartProps, { data: data }),
            React.createElement(recharts_1.Area, Object.assign({}, areaProps, chartColor, { dataKey: dataKey })),
            React.createElement(recharts_1.Tooltip, null),
            React.createElement(recharts_1.CartesianGrid, Object.assign({}, cartesianGridProps)),
            React.createElement(recharts_1.YAxis, Object.assign({}, yAxisProps)))));
}
exports.AreaChartWrapper = AreaChartWrapper;
