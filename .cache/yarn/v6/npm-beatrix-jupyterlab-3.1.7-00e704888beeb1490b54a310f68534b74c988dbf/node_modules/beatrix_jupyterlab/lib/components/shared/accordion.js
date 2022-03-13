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
exports.LeftAccordion = void 0;
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const styles_1 = require("../../styles");
const localStyles = typestyle_1.stylesheet({
    detailsContainer: {
        width: '100%',
    },
});
const LeftAccordionSummary = core_1.withStyles({
    expandIcon: {
        order: -1,
        color: styles_1.COLORS.link + '!important',
        margin: '0px',
        padding: '0px',
    },
    root: {
        marginLeft: '0px',
        paddingLeft: '0px',
        color: styles_1.COLORS.link + '!important',
        fontFamily: 'Roboto',
        fontSize: '13px',
        fontWeight: 500,
        boxShadow: 'none',
        border: 'none',
    },
    expanded: {
        marginTop: '0px',
        marginLeft: '0px',
        paddingLeft: '0px',
    },
})(core_1.AccordionSummary);
const CustomAccordion = core_1.withStyles({
    root: {
        margin: '0px',
        padding: '0px',
        border: 'none',
        boxShadow: 'none',
    },
})(core_1.Accordion);
const CustomAccordionDetails = core_1.withStyles({
    root: {
        margin: '0px',
        padding: '0px',
    },
})(core_1.AccordionDetails);
function LeftAccordion(props) {
    return (React.createElement(CustomAccordion, { defaultExpanded: props.defaultExpanded, square: props.square || true },
        React.createElement(LeftAccordionSummary, { expandIcon: React.createElement(icons_1.ExpandMore, null) }, props.title),
        React.createElement(CustomAccordionDetails, null,
            React.createElement("div", { className: localStyles.detailsContainer }, props.children))));
}
exports.LeftAccordion = LeftAccordion;
