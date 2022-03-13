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
exports.CronScheduleBuilder = void 0;
const React = __importStar(require("react"));
const text_input_1 = require("../../../components/shared/text_input");
const SCHEDULE_LINK = 'https://cloud.google.com/scheduler/docs/configuring/cron-job-schedules';
function CronScheduleBuilder(props) {
    return (React.createElement("div", null,
        React.createElement(text_input_1.TextInput, { label: "Schedule", name: "schedule", value: props.schedule, hasError: !props.schedule, onChange: e => props.onScheduleChange(e.target.value), formHelperText: "Schedule is specified using unix-cron format. You can define a schedule\n        so that your execution runs multiple times a day, or runs on specific\n        days and months.", error: "Frequency is required", formHelperLink: SCHEDULE_LINK })));
}
exports.CronScheduleBuilder = CronScheduleBuilder;
