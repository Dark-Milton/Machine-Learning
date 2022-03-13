"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeatrixCellManager = exports.CellType = exports.STYLES = exports.BeatrixCellManagerToken = void 0;
const cells_1 = require("@jupyterlab/cells");
const coreutils_1 = require("@lumino/coreutils");
const typestyle_1 = require("typestyle");
const cell_menu_1 = require("./components/cell_menu");
const new_cell_actions_widget_1 = require("./components/new_cell_actions_widget");
const notebook_1 = require("@jupyterlab/notebook");
const signaling_1 = require("@lumino/signaling");
const constants_1 = require("./constants");
exports.BeatrixCellManagerToken = new coreutils_1.Token('beatrix:beatrix_cell_manager');
exports.STYLES = typestyle_1.stylesheet({
    beatrixCell: {
        position: 'relative',
        marginTop: 'calc(20px - 2 * var(--jp-cell-padding))',
        zIndex: 10,
        $nest: {
            '&:first-child': {
                marginTop: 'calc(29px - var(--jp-cell-padding) - var(--jp-notebook-padding))',
            },
        },
    },
});
var CellType;
(function (CellType) {
    CellType[CellType["CODE"] = 0] = "CODE";
    CellType[CellType["MARKDOWN"] = 1] = "MARKDOWN";
    CellType[CellType["RAW"] = 2] = "RAW";
    CellType[CellType["ALL"] = 3] = "ALL";
})(CellType = exports.CellType || (exports.CellType = {}));
class BeatrixCellManager {
    constructor(notebookTracker, cellTracker) {
        this.notebookTracker = notebookTracker;
        this.cellTracker = cellTracker;
        this.setupActiveCellTracking();
        this.setupCellCreationSignal();
        this.actionSignals = {
            [CellType.CODE]: new signaling_1.Signal(this),
            [CellType.MARKDOWN]: new signaling_1.Signal(this),
            [CellType.RAW]: new signaling_1.Signal(this),
        };
        this.actionsByType = {
            [CellType.ALL]: {
                up: {
                    execute: () => this.moveCellUp(),
                    iconClass: constants_1.ICONS.moveCellUp,
                    order: 1,
                    title: 'Move cell up',
                },
                down: {
                    execute: () => this.moveCellDown(),
                    iconClass: constants_1.ICONS.moveCellDown,
                    order: 2,
                    title: 'Move cell down',
                },
                delete: {
                    execute: () => this.deleteCell(),
                    iconClass: constants_1.ICONS.deleteCell,
                    order: 3,
                    title: 'Delete cell',
                },
            },
            [CellType.CODE]: {
                run: {
                    execute: () => this.runCell(),
                    iconClass: constants_1.ICONS.runCell,
                    order: 0,
                    title: 'Run cell',
                },
            },
            [CellType.MARKDOWN]: {},
            [CellType.RAW]: {},
        };
    }
    setupActiveCellTracking() {
        let activeCell = this.notebookTracker.activeCell;
        activeCell === null || activeCell === void 0 ? void 0 : activeCell.addClass('active');
        this.notebookTracker.activeCellChanged.connect((_, cell) => {
            activeCell === null || activeCell === void 0 ? void 0 : activeCell.removeClass('active');
            cell === null || cell === void 0 ? void 0 : cell.addClass('active');
            activeCell = cell;
        });
    }
    /**
     * Adds a customizations to a Cell including: cell menu, new cell buttons
     * @param renderedCellInfo the cell which to customize
     */
    addCustomWidgets(renderedCellInfo) {
        renderedCellInfo.cell.addClass(exports.STYLES.beatrixCell);
        const layout = renderedCellInfo.cell.layout;
        layout.addWidget(cell_menu_1.cellMenuWidget(renderedCellInfo, this));
        layout.addWidget(new_cell_actions_widget_1.newCellActionsWidget(renderedCellInfo, this));
    }
    setupCellCreationSignal() {
        this.cellTracker.rendered.connect((_, renderedCellInfo) => {
            this.addCustomWidgets(renderedCellInfo);
        });
    }
    actionSignalFor(cellType) {
        return this.actionSignals[cellType];
    }
    actions(cellType) {
        return Object.assign(Object.assign({}, this.actionsByType[CellType.ALL]), this.actionsByType[cellType]);
    }
    addAction(cellType, actionID, notebookAction) {
        const action = {
            execute: () => {
                const notebookPanel = this.getCurrentNotebookPanel();
                if (notebookPanel)
                    notebookAction.execute(notebookPanel.content);
            },
            iconClass: notebookAction.iconClass,
            order: notebookAction.order,
            title: notebookAction.title,
            custom: true,
        };
        this.actionsByType[cellType][actionID] = action;
        if (cellType === CellType.ALL || cellType === CellType.CODE) {
            this.actionSignals[CellType.CODE].emit(this.actions(CellType.CODE));
        }
        if (cellType === CellType.ALL || cellType === CellType.MARKDOWN) {
            this.actionSignals[CellType.MARKDOWN].emit(this.actions(CellType.MARKDOWN));
        }
        if (cellType === CellType.ALL || cellType === CellType.RAW) {
            this.actionSignals[CellType.RAW].emit(this.actions(CellType.RAW));
        }
    }
    getCurrentNotebookPanel() {
        return this.notebookTracker.currentWidget;
    }
    moveCellUp() {
        const notebookPanel = this.getCurrentNotebookPanel();
        if (notebookPanel)
            notebook_1.NotebookActions.moveUp(notebookPanel.content);
    }
    moveCellDown() {
        const notebookPanel = this.getCurrentNotebookPanel();
        if (notebookPanel)
            notebook_1.NotebookActions.moveDown(notebookPanel.content);
    }
    deleteCell() {
        const notebookPanel = this.getCurrentNotebookPanel();
        if (notebookPanel)
            notebook_1.NotebookActions.deleteCells(notebookPanel.content);
    }
    runCell() {
        const notebookPanel = this.getCurrentNotebookPanel();
        if (notebookPanel)
            notebook_1.NotebookActions.run(notebookPanel.content, notebookPanel.sessionContext);
    }
    createCell(index, cellType) {
        var _a;
        const notebookPanel = this.getCurrentNotebookPanel();
        if (notebookPanel) {
            const newCell = cellType === CellType.CODE
                ? new cells_1.CodeCellModel({})
                : new cells_1.MarkdownCellModel({});
            (_a = notebookPanel.content.model) === null || _a === void 0 ? void 0 : _a.cells.insert(index, newCell);
        }
    }
}
exports.BeatrixCellManager = BeatrixCellManager;
