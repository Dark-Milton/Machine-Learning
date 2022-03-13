"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardwareConfigurationDescription = exports.TITLE = void 0;
const react_1 = __importDefault(require("react"));
const learn_more_link_1 = require("../../components/shared/learn_more_link");
const styles_1 = require("../data/styles");
exports.TITLE = 'Modify Hardware Configuration';
const DESCRIPTION = `Modify the hardware configuration of your
virtual machine as you need. The options available for the
hardware are configured by your administrators. `;
const LINK = 'https://cloud.google.com/compute/all-pricing';
function HardwareConfigurationDescription() {
    return (react_1.default.createElement("p", { className: styles_1.STYLES.paragraph },
        DESCRIPTION,
        react_1.default.createElement(learn_more_link_1.LearnMoreLink, { href: LINK })));
}
exports.HardwareConfigurationDescription = HardwareConfigurationDescription;
