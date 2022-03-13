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
exports.JobListItem = void 0;
const core_1 = require("@material-ui/core");
const React = __importStar(require("react"));
const cron_1 = require("../cron");
const data_1 = require("../data");
const share_dialog_1 = require("./share_dialog");
const icons_1 = require("../../components/shared/icons");
const list_item_1 = require("../../components/shared/list_item");
const service_provider_1 = require("../../service/service_provider");
function getIconForJobState(state) {
    if (state === 'SUCCEEDED' || state === 'ENABLED') {
        return React.createElement(icons_1.GreenCheckCircle, null);
    }
    else if (state === 'FAILED' || state === 'UPDATE_FAILED') {
        return React.createElement(icons_1.RedClose, null);
    }
    else if (state === 'PAUSED') {
        return React.createElement(icons_1.PausedCircle, null);
    }
    else if (state === 'CANCELLED' || state === 'DISABLED') {
        return React.createElement(icons_1.GrayDisabled, null);
    }
    else if (state === 'RUNNING' || state === 'PREPARING') {
        return React.createElement(icons_1.GrayPending, null);
    }
    return React.createElement(icons_1.UnknownCircle, null);
}
function getCaption(isSchedule, job) {
    if (!isSchedule) {
        return [cron_1.customShortDateFormat(new Date(job.createTime || ''))];
    }
    else {
        return [
            `Frequency: ${cron_1.getHumanReadableCron(job.schedule)}`,
            `Latest execution:
  ${job.hasExecutions
                ? cron_1.customShortDateFormat(new Date(job.updateTime || ''))
                : 'None'}`,
        ];
    }
}
/** Notebook job list item */
function JobListItem(props) {
    const { job } = props;
    const isSchedule = 'schedule' in job;
    return (React.createElement(list_item_1.ListItem, { icon: getIconForJobState(job.state), title: job.name, titleLink: job.link, captions: getCaption(isSchedule, job), learnMoreLink: {
            href: job.viewerLink || '',
            text: isSchedule ? 'VIEW LATEST EXECUTION RESULT' : 'VIEW RESULT',
            disabled: !job.viewerLink,
        }, subMenuItems: closeHandler => {
            const menuItems = [];
            if (data_1.FINISHED_STATES.has(job.state)) {
                if (!isSchedule) {
                    menuItems.push(React.createElement(core_1.MenuItem, { key: "shareNotebook", dense: true },
                        React.createElement(share_dialog_1.ShareDialog, { cloudBucket: job.bucketLink || '', shareLink: job.viewerLink || '', handleClose: closeHandler })));
                }
                menuItems.push(React.createElement(core_1.MenuItem, { id: "import", key: "importNotebook", dense: true, onClick: () => {
                        service_provider_1.ServiceProvider.executorService.importNotebook(job.gcsFile);
                        closeHandler();
                    } }, "Import executed notebook"));
            }
            return menuItems;
        } }));
}
exports.JobListItem = JobListItem;
