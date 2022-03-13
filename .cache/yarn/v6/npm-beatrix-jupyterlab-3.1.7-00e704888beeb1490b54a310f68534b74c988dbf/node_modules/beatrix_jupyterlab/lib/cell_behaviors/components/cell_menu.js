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
exports.cellMenuWidget = exports.CellMenuComponent = exports.ActionSetView = void 0;
const react_1 = __importStar(require("react"));
const cells_1 = require("@jupyterlab/cells");
const typestyle_1 = require("typestyle");
const apputils_1 = require("@jupyterlab/apputils");
const manager_1 = require("../manager");
const styleSheet = typestyle_1.stylesheet({
    cellMenuContainer: {
        position: 'absolute',
        top: 'calc(-19px + var(--jp-cell-padding))',
        right: '24px',
        overflow: 'visible',
        boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
        filter: 'drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.2)) drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.14))',
        $nest: {
            ':not(.active) > &': {
                display: 'none',
            },
        },
    },
    cellMenu: {
        position: 'relative',
        display: 'flex',
        flexFlow: 'row nowrap',
        backgroundColor: 'white',
        borderRadius: '4px',
        $nest: {
            '& > :not(:last-child)::after': {
                content: '" "',
                height: '65%',
                marginTop: 'auto',
                marginBottom: 'auto',
                width: '1px',
                backgroundColor: '#dadada',
            },
        },
    },
    actionSet: {
        display: 'flex',
        flexFlow: 'row nowrap',
    },
    cellMenuAction: {
        backgroundSize: '14px',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'initial !important',
        height: '14px',
        width: '14px',
        padding: '4px 5px',
        margin: '1px',
        position: 'relative',
        $nest: {
            "[data-jp-theme-light='false'] &": {
                filter: 'invert(0.6)',
            },
            '&::after': {
                content: `' '`,
                position: 'absolute',
                inset: '0px',
                border: 'solid 1px #1A73E8',
                borderRadius: '2px',
                visibility: 'hidden',
            },
            '&:hover::after': {
                visibility: 'visible',
            },
        },
    },
});
function ActionSetView({ actions }) {
    return (react_1.default.createElement("div", { className: styleSheet.actionSet }, actions
        ? Object.keys(actions)
            .sort((k1, k2) => actions[k1].order - actions[k2].order)
            .map(actionID => {
            const action = actions[actionID];
            return (react_1.default.createElement("div", { key: actionID, title: action.title, className: `${styleSheet.cellMenuAction} ${action.iconClass}`, onClick: () => {
                    action.execute();
                } }));
        })
        : null));
}
exports.ActionSetView = ActionSetView;
function CellMenuComponent({ actions }) {
    const [mainActions, customActions] = react_1.useMemo(() => {
        const mainActions = {};
        const customActions = {};
        for (const [actionID, action] of Object.entries(actions)) {
            if (action.custom)
                customActions[actionID] = action;
            else
                mainActions[actionID] = action;
        }
        return [mainActions, customActions];
    }, [actions]);
    return (react_1.default.createElement("div", { className: `${styleSheet.cellMenu}` },
        react_1.default.createElement(ActionSetView, { actions: mainActions }),
        react_1.default.createElement(ActionSetView, { actions: customActions })));
}
exports.CellMenuComponent = CellMenuComponent;
function cellMenuWidget(renderedCellInfo, manager) {
    const cell = renderedCellInfo.cell;
    let cellType = manager_1.CellType.RAW;
    if (cell instanceof cells_1.CodeCell)
        cellType = manager_1.CellType.CODE;
    else if (cell instanceof cells_1.MarkdownCell)
        cellType = manager_1.CellType.MARKDOWN;
    else if (cell instanceof cells_1.RawCell)
        cellType = manager_1.CellType.RAW;
    const cellMenuContainer = apputils_1.ReactWidget.create(react_1.default.createElement(apputils_1.UseSignal, { signal: manager.actionSignalFor(cellType), initialArgs: manager.actions(cellType) }, (_, actions) => {
        return (react_1.default.createElement(CellMenuComponent, { actions: actions || [] }));
    }));
    cellMenuContainer.addClass(styleSheet.cellMenuContainer);
    return cellMenuContainer;
}
exports.cellMenuWidget = cellMenuWidget;
