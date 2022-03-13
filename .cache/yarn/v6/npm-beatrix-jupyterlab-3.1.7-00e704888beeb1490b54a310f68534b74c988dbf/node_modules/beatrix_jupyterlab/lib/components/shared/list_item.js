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
exports.ListItem = void 0;
const core_1 = require("@material-ui/core");
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const styles_1 = require("../../styles");
const icon_button_menu_1 = require("./icon_button_menu");
const icons_1 = require("./icons");
const learn_more_link_1 = require("./learn_more_link");
const itemNameStyle = {
    display: 'inline-block',
    fontSize: '15px',
    fontWeight: 'bold',
    lineHeight: '16px',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    whiteSpace: 'nowrap',
    $nest: {
        '&>*': {
            verticalAlign: 'middle',
        },
    },
};
const localStyles = typestyle_1.stylesheet({
    menuLink: {
        display: 'block',
        height: '100%',
        width: '100%',
    },
    item: {
        paddingTop: '16px',
        paddingBottom: '16px',
        paddingRight: '20px',
        paddingLeft: '20px',
        width: '100%',
        borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)',
    },
    itemName: Object.assign({}, itemNameStyle),
    itemNameButton: Object.assign({ border: 'none', background: 'none', color: 'inherit', cursor: 'pointer', font: 'inherit', padding: 0, outline: 'inherit', textAlign: 'inherit' }, itemNameStyle),
    itemCaption: {
        fontSize: '12px',
        paddingTop: '4px',
        color: 'var(--jp-content-font-color2)',
        wordBreak: 'break-word',
    },
    align: {
        marginTop: '-12px !important',
    },
    topAlign: {
        marginTop: '4px',
    },
    spacing: {
        marginTop: '6px',
        marginLeft: '-2px',
    },
    learnMoreLink: {
        textTransform: 'uppercase',
        a: {
            color: 'var(--jp-brand-color-1, #2196f3) !important',
        },
    },
});
/** Generic List item */
function ListItem(props) {
    const { icon, title, subtitle, titleAction, titleLink, captions, children, learnMoreLink, subMenuItems, } = props;
    let titleBlock = null;
    if (title) {
        let innerTitle = React.createElement("span", { className: localStyles.itemName }, title);
        if (titleLink) {
            innerTitle = (React.createElement("a", { className: localStyles.itemName, target: "_blank", href: titleLink },
                React.createElement("span", null, title),
                React.createElement(icons_1.SmallLaunchIcon, null)));
        }
        else if (titleAction) {
            innerTitle = (React.createElement("button", { className: localStyles.itemNameButton, onClick: titleAction }, title));
        }
        titleBlock = React.createElement("div", null, innerTitle);
    }
    return (React.createElement(core_1.Grid, { className: localStyles.item, container: true, spacing: 1 },
        icon && (React.createElement(core_1.Grid, { item: true, xs: 1 },
            React.createElement("div", { className: localStyles.topAlign }, icon))),
        React.createElement(core_1.Grid, { item: true, xs: 10 },
            titleBlock,
            React.createElement("div", null,
                subtitle && React.createElement("div", null, subtitle),
                captions &&
                    captions.map((caption, i) => (React.createElement("div", { className: localStyles.itemCaption, key: `caption${i}` },
                        React.createElement("span", null, caption)))),
                children,
                learnMoreLink && (React.createElement("div", { className: typestyle_1.classes(styles_1.CSS.bold, localStyles.spacing, localStyles.learnMoreLink) },
                    React.createElement(learn_more_link_1.LearnMoreLink, { noUnderline: true, href: learnMoreLink.href, text: learnMoreLink.text, disabled: learnMoreLink.disabled }))))),
        React.createElement(core_1.Grid, { item: true, xs: 1 }, subMenuItems && (React.createElement("div", { className: localStyles.align },
            React.createElement(icon_button_menu_1.IconButtonMenu, { icon: React.createElement(icons_1.MenuIcon, null), menuItems: menuCloseHandler => subMenuItems(menuCloseHandler) }))))));
}
exports.ListItem = ListItem;
