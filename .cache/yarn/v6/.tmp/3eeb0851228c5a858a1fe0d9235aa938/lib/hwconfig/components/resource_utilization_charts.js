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
exports.ResourceUtilizationCharts = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const service_provider_1 = require("../../service/service_provider");
const styles_1 = require("../data/styles");
const chart_wrapper_1 = require("./chart_wrapper");
const utils_1 = require("../../utils");
const AREA_CHART_BLUE = {
    stroke: '#15B2D3',
    fill: '#15B2D3',
};
const AREA_CHART_ORANGE = {
    stroke: '#ff7f01',
    fill: '#ff7f01',
};
const UTILIZATION_CHART_PROPERTIES = {
    areaChartProps: {
        height: 75,
        width: 350,
    },
    areaProps: {
        isAnimationActive: false,
    },
    yAxisProps: {
        domain: [0, 100],
    },
    cartesianGridProps: {
        horizontalPoints: [25, 50, 75],
        vertical: false,
    },
};
const LOCAL_STYLES = typestyle_1.stylesheet({
    chartTitleSmall: {
        fontSize: '15px',
        marginLeft: '20px',
        color: 'var(--jp-ui-font-color1)',
    },
    utilizationChartsContainer: {
        padding: '0 20px 20px 0',
        backgroundColor: 'var(--jp-layout-color1)',
    },
    flexspan: {
        display: 'flex',
    },
});
class ResourceUtilizationCharts extends React.Component {
    constructor(props) {
        super(props);
        this.NUM_DATA_POINTS = 20;
        this.REFRESH_INTERVAL = 1000;
        const data = [];
        const gpuData = [];
        for (let i = 0; i < this.NUM_DATA_POINTS; i++) {
            data.push({ cpu: 0, memory: 0 });
            gpuData.push({ gpu: 0, memory: 0 });
        }
        this.state = {
            data,
            gpuData,
            receivedError: false,
            showGpu: false,
        };
    }
    componentDidMount() {
        this.refreshInterval = window.setInterval(() => {
            this.pollUtilizationData();
        }, this.REFRESH_INTERVAL);
    }
    componentWillUnmount() {
        if (this.refreshInterval !== undefined) {
            window.clearInterval(this.refreshInterval);
            this.refreshInterval = undefined;
        }
    }
    render() {
        const { data, receivedError, showGpu, gpuData } = this.state;
        return (React.createElement("div", { className: LOCAL_STYLES.utilizationChartsContainer }, receivedError ? ('Unable to retrieve GCE VM details, please check your server logs') : (React.createElement("div", { className: LOCAL_STYLES.flexspan },
            React.createElement("span", null,
                React.createElement("header", { className: styles_1.STYLES.dialogHeader }, "Resource Utilization"),
                React.createElement(chart_wrapper_1.AreaChartWrapper, Object.assign({ title: "CPU Usage", titleClass: LOCAL_STYLES.chartTitleSmall, dataKey: "cpu", data: data, chartColor: AREA_CHART_ORANGE }, UTILIZATION_CHART_PROPERTIES)),
                React.createElement(chart_wrapper_1.AreaChartWrapper, Object.assign({ title: "Memory Usage", titleClass: LOCAL_STYLES.chartTitleSmall, dataKey: "memory", data: data, chartColor: AREA_CHART_BLUE }, UTILIZATION_CHART_PROPERTIES))),
            showGpu && (React.createElement("span", null,
                React.createElement(chart_wrapper_1.AreaChartWrapper, Object.assign({ title: "GPU Usage", titleClass: LOCAL_STYLES.chartTitleSmall, dataKey: "gpu", data: gpuData, chartColor: AREA_CHART_ORANGE }, UTILIZATION_CHART_PROPERTIES)),
                React.createElement(chart_wrapper_1.AreaChartWrapper, Object.assign({ title: "GPU Memory Usage", titleClass: LOCAL_STYLES.chartTitleSmall, dataKey: "memory", data: gpuData, chartColor: AREA_CHART_BLUE }, UTILIZATION_CHART_PROPERTIES))))))));
    }
    pollUtilizationData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const details = yield service_provider_1.ServiceProvider.hardwareService.getVmDetails();
                if (!this.refreshInterval) {
                    // return if interval was cleared when component was unmounted
                    return;
                }
                const data = this.state.data.slice(1);
                data.push(details.utilization);
                if (details.gpu.name) {
                    const gpuData = this.state.gpuData.slice(1);
                    gpuData.push({ gpu: details.gpu.gpu, memory: details.gpu.memory });
                    this.setState({ data, gpuData, showGpu: true });
                }
                else {
                    this.setState({ data, showGpu: false });
                }
            }
            catch (e) {
                utils_1.appLog.warn('Unable to retrieve GCE VM details');
                this.setState({ receivedError: true });
            }
        });
    }
}
exports.ResourceUtilizationCharts = ResourceUtilizationCharts;
