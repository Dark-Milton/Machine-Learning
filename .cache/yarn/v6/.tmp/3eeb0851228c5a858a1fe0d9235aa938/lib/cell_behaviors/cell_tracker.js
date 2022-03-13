"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellTracker = exports.CellTrackerToken = void 0;
const coreutils_1 = require("@lumino/coreutils");
const signaling_1 = require("@lumino/signaling");
const algorithm_1 = require("@lumino/algorithm");
/** DI token for the CellTracker class. */
exports.CellTrackerToken = new coreutils_1.Token('beatrix:CellTracker');
const CHANGE_TYPES = new Set(['add', 'set']);
/* Service class to expose a Signal for attaching to a Cell rendering event */
class CellTracker {
    constructor(notebookTracker) {
        this.renderedSignal = new signaling_1.Signal(this);
        notebookTracker.currentChanged.connect((_, notebookPanel) => {
            if (notebookPanel)
                this.trackCells(notebookPanel);
        });
    }
    /** Signal fired when a Cell is rendered in a panel for the first time. */
    get rendered() {
        return this.renderedSignal;
    }
    trackCells(notebookPanel) {
        var _a;
        const notebook = notebookPanel.content;
        const notebookModel = notebook.model;
        (_a = notebookPanel.content.model) === null || _a === void 0 ? void 0 : _a.cells.changed.connect((_, changed) => {
            if (!CHANGE_TYPES.has(changed.type))
                return;
            for (const cellModel of changed.newValues) {
                const cell = notebook.widgets.find(widget => widget.model.id === cellModel.id);
                if (cell && notebookModel) {
                    this.renderedSignal.emit({
                        notebook,
                        notebookModel,
                        cell,
                        cellIndex: () => {
                            var _a, _b;
                            if (!((_a = notebook.model) === null || _a === void 0 ? void 0 : _a.cells.iter()))
                                return 0;
                            return algorithm_1.toArray((_b = notebook.model) === null || _b === void 0 ? void 0 : _b.cells.iter()).findIndex(cellModel => cellModel.id === cell.model.id);
                        },
                    });
                }
            }
        });
    }
}
exports.CellTracker = CellTracker;
