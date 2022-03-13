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
exports.SearchBar = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const Search_1 = __importDefault(require("@material-ui/icons/Search"));
const Clear_1 = __importDefault(require("@material-ui/icons/Clear"));
const searchStyle = typestyle_1.stylesheet({
    search: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        borderStyle: 'solid',
        borderRadius: '1px',
        borderWidth: 'thin',
        borderColor: 'var(--jp-border-color2)',
    },
    searchIcon: {
        padding: '2px',
        color: 'var(--jp-layout-color3)',
    },
    clearIcon: {
        textTransform: 'none',
        alignSelf: 'center',
        color: 'var(--jp-layout-color3)',
        '&:hover': {
            cursor: 'pointer',
            opacity: 1,
        },
    },
    searchPlaceholder: {
        fontFamily: 'var(--jp-ui-font-family)',
        fontSize: 'var(--jp-ui-font-size1)',
        minWidth: 0,
        textOverflow: 'ellipsis',
        backgroundColor: 'transparent',
        color: 'var(--jp-ui-font-color1)',
    },
});
/** Funtional Component for a common dialog interface with cancel and submit buttons. */
function SearchBar(props) {
    const [searchKey, setSearchKey] = React.useState('');
    const [showClearIcon, setShowClearIcon] = React.useState(false);
    const handleOnChange = event => {
        setSearchKey(event.target.value);
        if (event.target.value === '') {
            setShowClearIcon(false);
            props.handleClear();
        }
        else {
            setShowClearIcon(true);
        }
    };
    const handleClickClear = () => {
        setSearchKey('');
        setShowClearIcon(false);
        props.handleClear();
    };
    return (React.createElement("div", { className: searchStyle.search },
        React.createElement(Search_1.default, { className: searchStyle.searchIcon }),
        React.createElement("input", { onKeyPress: e => props.handleKeyPress(e), onChange: e => handleOnChange(e), className: searchStyle.searchPlaceholder, placeholder: "Search for your tables and datasets", value: searchKey, style: { borderWidth: 0, flexGrow: 1 } }),
        showClearIcon ? (React.createElement(Clear_1.default, { className: searchStyle.clearIcon, fontSize: "small", onClick: () => handleClickClear() })) : (React.createElement("div", null))));
}
exports.SearchBar = SearchBar;
