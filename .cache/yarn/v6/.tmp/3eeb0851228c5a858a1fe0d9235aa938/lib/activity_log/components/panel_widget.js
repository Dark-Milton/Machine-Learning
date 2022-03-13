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
exports.ActivityLogWidget = exports.ActivityLogDrawer = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const csstips = __importStar(require("csstips"));
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const icons_1 = require("../../components/shared/icons");
const list_item_1 = require("../../components/shared/list_item");
const progress_1 = require("../../components/shared/progress");
const cron_1 = require("../../executor/cron");
const activity_log_service_1 = require("../../service/activity_log_service");
const service_provider_1 = require("../../service/service_provider");
const styles_1 = require("../../styles");
const localStyles = typestyle_1.stylesheet({
    headerContainer: Object.assign(Object.assign({}, csstips.horizontal), { borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)', padding: '8px 12px' }),
    panel: Object.assign(Object.assign(Object.assign({}, styles_1.BASE_FONT), csstips.vertical), { backgroundColor: styles_1.COLORS.white, height: '100%' }),
    content: {
        overflow: 'hidden',
        height: '100%',
    },
});
const TITLE_TEXT = 'Activity log';
function getStatusIcon(activity) {
    var _a, _b;
    switch (activity.type) {
        case activity_log_service_1.ActivityType.OPERATION:
            if (!((_a = activity.operation) === null || _a === void 0 ? void 0 : _a.done)) {
                return React.createElement(progress_1.Progress, null);
            }
            return ((_b = activity.operation) === null || _b === void 0 ? void 0 : _b.error) ? (React.createElement(icons_1.RedCloseCircle, null)) : (React.createElement(icons_1.GreenCheckCircle, null));
        case activity_log_service_1.ActivityType.CUSTOM_KERNEL_LOAD:
            return activity.isKernelReady ? React.createElement(icons_1.GreenCheckCircle, null) : React.createElement(progress_1.Progress, null);
        default:
            return React.createElement(progress_1.Progress, null);
    }
}
function getCreateTime(activity) {
    var _a, _b, _c;
    if (!((_a = activity.operation) === null || _a === void 0 ? void 0 : _a.metadata) ||
        !((_b = activity.operation) === null || _b === void 0 ? void 0 : _b.metadata['genericMetadata']))
        return '';
    return ((_c = activity.operation) === null || _c === void 0 ? void 0 : _c.metadata['genericMetadata']['createTime']) || '';
}
function getCaptions(activity) {
    var _a, _b, _c, _d, _e;
    const captions = [];
    if (activity.type === activity_log_service_1.ActivityType.OPERATION) {
        const createTime = getCreateTime(activity);
        if (createTime) {
            captions.push(cron_1.customShortDateFormat(new Date(createTime)));
        }
        if ((_b = (_a = activity.operation) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.code) {
            captions.push(`${activity.operation.error.code}:${activity.operation.error.message}`);
        }
        else if ((_d = (_c = activity.operation) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.message) {
            captions.push((_e = activity.operation.error) === null || _e === void 0 ? void 0 : _e.message);
        }
    }
    return captions;
}
/** Panel component for displaying activites and their status */
function ActivityLogDrawer() {
    const [activities, setActivities] = React.useState([]);
    function updateActivities() {
        return __awaiter(this, void 0, void 0, function* () {
            setActivities(yield service_provider_1.ServiceProvider.activityLogService.updateAndGetActivites());
        });
    }
    // Get activities and set an interval to refresh them every 5s
    React.useEffect(() => {
        updateActivities();
        const interval = setInterval(updateActivities, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (React.createElement("div", { className: localStyles.panel },
        React.createElement("div", { className: localStyles.headerContainer },
            React.createElement("header", { className: styles_1.CSS.headerTitle }, TITLE_TEXT)),
        React.createElement("div", { className: localStyles.content }, activities.reverse().map((activity, i) => {
            return (React.createElement(list_item_1.ListItem, { key: `activity-${i}`, icon: getStatusIcon(activity), subtitle: activity.description, captions: getCaptions(activity), learnMoreLink: activity.link
                    ? { href: activity.link, text: 'View more information' }
                    : undefined }));
        }))));
}
exports.ActivityLogDrawer = ActivityLogDrawer;
/** Widget to be registered in the left-side panel. */
class ActivityLogWidget extends apputils_1.ReactWidget {
    constructor() {
        super();
        this.title.iconClass = 'jp-Icon jp-Icon-20 jp-ActivityLogIcon';
        this.title.caption = TITLE_TEXT;
    }
    render() {
        return React.createElement(ActivityLogDrawer, null);
    }
}
exports.ActivityLogWidget = ActivityLogWidget;
