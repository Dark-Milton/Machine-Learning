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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestedSelect = exports.Item = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const List_1 = __importDefault(require("@material-ui/core/List"));
const ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
const ListItemText_1 = __importDefault(require("@material-ui/core/ListItemText"));
const Divider_1 = __importDefault(require("@material-ui/core/Divider"));
const ChevronRightRounded_1 = __importDefault(require("@material-ui/icons/ChevronRightRounded"));
const ArrowDropDown_1 = __importDefault(require("@material-ui/icons/ArrowDropDown"));
const Popover_1 = __importDefault(require("@material-ui/core/Popover"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const InputAdornment_1 = __importDefault(require("@material-ui/core/InputAdornment"));
const Grid_1 = __importDefault(require("@material-ui/core/Grid"));
const Paper_1 = __importDefault(require("@material-ui/core/Paper"));
const styles_1 = require("../data/styles");
const STYLES = typestyle_1.stylesheet({
    itemGroup: {
        overflowY: 'auto',
        height: '240px',
        width: '233px',
    },
    menuContainer: {
        paddingTop: '8px',
        paddingBottom: '8px',
        width: '468px',
        backgroundColor: 'var(--jp-layout-color1)',
    },
    nestedSelect: {
        display: 'block',
    },
    input: {
        marginTop: '2px',
        backgroundColor: 'var(--jp-layout-color1)',
    },
    text: {
        color: 'var(--jp-ui-font-color1)',
    },
});
function Item(props) {
    const { option, onSelect, selected } = props;
    return (React.createElement(ListItem_1.default, { onClick: e => onSelect(option), button: true, selected: selected },
        React.createElement(ListItemText_1.default, { primary: option.value, secondary: option.text, primaryTypographyProps: { style: styles_1.TEXT_STYLE }, secondaryTypographyProps: { style: styles_1.TEXT_STYLE } })));
}
exports.Item = Item;
class HeaderItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovering: false,
        };
    }
    render() {
        const { label, onHover } = this.props;
        return (React.createElement("div", { onMouseEnter: () => onHover() },
            React.createElement(ListItem_1.default, { button: true, style: { cursor: 'default' } },
                React.createElement(ListItemText_1.default, { primary: label, primaryTypographyProps: { style: styles_1.TEXT_STYLE } }),
                React.createElement(ChevronRightRounded_1.default, { className: STYLES.text }))));
    }
}
class NestedSelectBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedOptions: props.nestedOptionsList[0].options,
        };
    }
    /* Displays a menu of header items that, on hover, change the options the user
          can select on the menu */
    headersList() {
        const { nestedOptionsList } = this.props;
        return (React.createElement("div", { className: STYLES.itemGroup },
            React.createElement(List_1.default, { dense: true, disablePadding: true },
                React.createElement(HeaderItem, { key: nestedOptionsList[0].header.value, label: nestedOptionsList[0].header.text, onHover: () => this.setState({
                        displayedOptions: nestedOptionsList[0].options,
                    }) }),
                React.createElement(Divider_1.default, { style: { marginTop: 4, marginBottom: 4 } }),
                nestedOptionsList.slice(1).map(nestedOptions => (React.createElement(HeaderItem, { key: nestedOptions.header.value, label: nestedOptions.header.text, onHover: () => this.setState({ displayedOptions: nestedOptions.options }) }))))));
    }
    /* Displays a list of options that the user can select from */
    optionsList() {
        const { displayedOptions } = this.state;
        const { onSelect, selectedOption } = this.props;
        return (React.createElement("div", { className: STYLES.itemGroup },
            React.createElement(List_1.default, { dense: true, disablePadding: true }, displayedOptions.map(o => (React.createElement(Item, { key: o.value, option: o, onSelect: onSelect, selected: o.value === selectedOption.value }))))));
    }
    render() {
        return (React.createElement(Paper_1.default, { elevation: 5 },
            React.createElement("div", { className: STYLES.menuContainer },
                React.createElement(Grid_1.default, { container: true, spacing: 0, alignItems: "center" },
                    React.createElement(Grid_1.default, { item: true, xs: true }, this.headersList()),
                    React.createElement(Divider_1.default, { orientation: "vertical", flexItem: true }),
                    React.createElement(Grid_1.default, { item: true, xs: true }, this.optionsList())))));
    }
}
class NestedSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value ? props.value : props.nestedOptionsList[0].options[0],
            anchorEl: null,
        };
    }
    displayValue(option) {
        return `${option.value} (${option.text})`;
    }
    handleClick(event) {
        this.setState({
            anchorEl: this.state.anchorEl ? null : event.currentTarget,
        });
    }
    handleClose() {
        this.setState({
            anchorEl: null,
        });
    }
    selectOption(newValue) {
        this.setState({
            value: newValue,
            anchorEl: null,
        });
        this.props.onChange(newValue);
    }
    render() {
        const { value, anchorEl } = this.state;
        const { nestedOptionsList, label } = this.props;
        const open = Boolean(anchorEl);
        return (React.createElement("div", { className: STYLES.nestedSelect },
            label && React.createElement("label", { className: STYLES.text }, label),
            React.createElement(TextField_1.default, { className: STYLES.input, value: this.displayValue(value), margin: "dense", variant: "outlined", fullWidth: true, onClick: e => this.handleClick(e), inputProps: { style: { cursor: 'pointer' } }, InputProps: {
                    readOnly: true,
                    style: Object.assign(Object.assign({}, styles_1.TEXT_STYLE), { cursor: 'pointer' }),
                    endAdornment: (React.createElement(InputAdornment_1.default, { position: "end" },
                        React.createElement(ArrowDropDown_1.default, null))),
                } }),
            React.createElement(Popover_1.default, { open: open, anchorEl: anchorEl, onClose: () => this.handleClose(), anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                } },
                React.createElement(NestedSelectBody, { onSelect: newValue => this.selectOption(newValue), selectedOption: value, nestedOptionsList: nestedOptionsList }))));
    }
}
exports.NestedSelect = NestedSelect;
