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
exports.newCellActionsWidget = exports.NewCellActions = void 0;
const apputils_1 = require("@jupyterlab/apputils");
const core_1 = require("@material-ui/core");
const icons_1 = require("@material-ui/icons");
const csstips = __importStar(require("csstips"));
const react_1 = __importDefault(require("react"));
const typestyle_1 = require("typestyle");
const styles_1 = require("../../styles");
const manager_1 = require("../manager");
const STYLES = typestyle_1.stylesheet({
    newCellActionsContainer: {
        overflow: 'visible',
        position: 'absolute',
        right: 'var(--jp-cell-padding)',
        left: 'calc(var(--jp-cell-collapser-width) + var(--jp-cell-prompt-width) + var(--jp-cell-padding))',
        bottom: 'calc(-10px + var(--jp-cell-padding))',
        transform: 'translateY(50%)',
        $nest: {
            '&:first-child': {
                top: 'calc(-10px + var(--jp-cell-padding))',
                bottom: 'auto',
                transform: 'translateY(-50%)',
            },
        },
    },
    newCellActions: Object.assign(Object.assign(Object.assign({ height: '20px', $nest: {
            '&:hover': {
                $nest: {
                    '&>*': {
                        visibility: 'visible',
                    },
                },
            },
        } }, csstips.vertical), csstips.center), csstips.selfCenter),
    buttonContainer: Object.assign(Object.assign(Object.assign({ display: 'flex', marginTop: '-2px', visibility: 'hidden', zIndex: 20 }, csstips.horizontal), csstips.centerCenter), csstips.horizontallySpaced('16px')),
    hr: {
        border: 'none',
        borderBottom: 'inset 1px',
        borderColor: styles_1.COLORS.border,
        inset: 0,
        marginBottom: '10px',
        marginTop: '10px',
        position: 'absolute',
        visibility: 'hidden',
    },
});
const NewCellButton = core_1.withStyles({
    root: {
        background: styles_1.COLORS.white,
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
        color: 'var(--jp-ui-font-color2)',
        height: '24px',
        fontFamily: 'Roboto !important',
        fontSize: '12px',
        fontWeight: 'normal',
        textTransform: 'none',
        '&:hover': {
            background: styles_1.COLORS.secondary,
        },
    },
})(core_1.Button);
/** Component class encapsulating new Cell buttons. */
class NewCellActions extends react_1.default.Component {
    render() {
        return (react_1.default.createElement("div", { className: STYLES.newCellActions },
            react_1.default.createElement("div", { className: STYLES.buttonContainer },
                react_1.default.createElement(NewCellButton, { size: "small", startIcon: react_1.default.createElement(icons_1.Add, null), onClick: () => this.addNewCell(manager_1.CellType.CODE), title: "Add code cell" }, "Code"),
                react_1.default.createElement(NewCellButton, { size: "small", startIcon: react_1.default.createElement(icons_1.Add, null), onClick: () => this.addNewCell(manager_1.CellType.MARKDOWN), title: "Add markdown cell" }, "Text")),
            react_1.default.createElement("hr", { className: STYLES.hr })));
    }
    addNewCell(cellType) {
        const { renderedCellInfo, manager } = this.props;
        manager.createCell(renderedCellInfo.cellIndex() + 1, cellType);
    }
}
exports.NewCellActions = NewCellActions;
/** Builds a Widget from the NewCellActions component. */
function newCellActionsWidget(renderedCellInfo, manager) {
    const widget = apputils_1.ReactWidget.create(react_1.default.createElement(NewCellActions, { renderedCellInfo: renderedCellInfo, manager: manager }));
    widget.addClass(STYLES.newCellActionsContainer);
    return widget;
}
exports.newCellActionsWidget = newCellActionsWidget;
