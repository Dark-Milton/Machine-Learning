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
exports.ScheduleBuilder = void 0;
const React = __importStar(require("react"));
const data_1 = require("../../data");
const cron_schedule_form_1 = require("./cron_schedule_form");
const day_schedule_form_1 = require("./day_schedule_form");
const hour_schedule_form_1 = require("./hour_schedule_form");
const month_schedule_form_1 = require("./month_schedule_form");
const week_schedule_form_1 = require("./week_schedule_form");
class ScheduleBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = { frequencyType: data_1.HOUR };
        this.onChangeFrequencyType = this.onChangeFrequencyType.bind(this);
    }
    onChangeFrequencyType(frequencyType) {
        this.setState({ frequencyType });
    }
    render() {
        const { onScheduleChange } = this.props;
        const builderProps = {
            frequencyType: this.state.frequencyType,
            onChangeFrequencyType: this.onChangeFrequencyType,
            onScheduleChange: onScheduleChange,
        };
        return this.props.useUnixCronFormat ? (React.createElement(cron_schedule_form_1.CronScheduleBuilder, { schedule: this.props.schedule, onScheduleChange: onScheduleChange })) : (React.createElement("div", null,
            this.state.frequencyType === data_1.HOUR && (React.createElement(hour_schedule_form_1.HourScheduleBuilder, Object.assign({}, builderProps))),
            this.state.frequencyType === data_1.WEEK && (React.createElement(week_schedule_form_1.WeekScheduleBuilder, Object.assign({}, builderProps))),
            this.state.frequencyType === data_1.DAY && (React.createElement(day_schedule_form_1.DayScheduleBuilder, Object.assign({}, builderProps))),
            this.state.frequencyType === data_1.MONTH && (React.createElement(month_schedule_form_1.MonthScheduleBuilder, Object.assign({}, builderProps)))));
    }
}
exports.ScheduleBuilder = ScheduleBuilder;
