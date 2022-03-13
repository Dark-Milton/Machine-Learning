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
exports.SubmittedJob = void 0;
const icons_1 = require("@material-ui/icons");
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const styles_1 = require("../../styles");
const cron_1 = require("../cron");
const action_bar_1 = require("./action_bar");
const core_1 = require("@material-ui/core");
const data_1 = require("../data");
const learn_more_link_1 = require("../../components/shared/learn_more_link");
const localStyles = typestyle_1.stylesheet({
    message: {
        alignItems: 'center',
        fontSize: '18px',
        fontWeight: 500,
    },
    messageCaption: {
        fontSize: styles_1.FONT_SIZE.text,
        paddingTop: '4px',
        marginBottom: '13px',
        marginLeft: '37px',
        lineHeight: '20px',
    },
    spacing: {
        padding: '24px',
    },
});
const GreenCheck = core_1.withStyles({
    root: {
        color: styles_1.COLORS.green,
        fontSize: '28px',
        marginRight: '8px',
    },
})(icons_1.CheckCircle);
class SubmittedJob extends React.Component {
    render() {
        const { onClose, onFormReset, projectId, schedule } = this.props;
        const projectParam = `project=${projectId}`;
        const isRecurring = !!schedule;
        const jobLink = isRecurring
            ? `${data_1.SCHEDULES_LINK}?${projectParam}`
            : `${data_1.EXECUTIONS_LINK}?${projectParam}`;
        return (React.createElement("div", { className: typestyle_1.classes(styles_1.CSS.column, localStyles.spacing) },
            React.createElement("div", { className: typestyle_1.classes(styles_1.CSS.row, localStyles.message) },
                React.createElement(GreenCheck, null),
                React.createElement("span", null, isRecurring
                    ? 'Schedule for recurring executions created!'
                    : 'One-time execution created!')),
            React.createElement("div", { className: typestyle_1.classes(styles_1.CSS.row, localStyles.messageCaption) },
                !isRecurring && (React.createElement("span", null,
                    "Execution has been started. View the execution in the Executor extension or in",
                    ' ',
                    React.createElement(learn_more_link_1.LearnMoreLink, { text: "Google Cloud console", href: jobLink }))),
                isRecurring && (React.createElement("span", null,
                    cron_1.getNextExecutionDate(schedule || ''),
                    ". View the schedule and its executions in the Executor extension or in",
                    ' ',
                    React.createElement(learn_more_link_1.LearnMoreLink, { text: "Google Cloud console", href: jobLink })))),
            React.createElement(action_bar_1.ActionBar, { closeLabel: "Done", closeOnRight: true, onClose: onClose },
                React.createElement(core_1.Button, { onClick: onFormReset }, isRecurring
                    ? 'Create another schedule'
                    : 'Create another execution'))));
    }
}
exports.SubmittedJob = SubmittedJob;
