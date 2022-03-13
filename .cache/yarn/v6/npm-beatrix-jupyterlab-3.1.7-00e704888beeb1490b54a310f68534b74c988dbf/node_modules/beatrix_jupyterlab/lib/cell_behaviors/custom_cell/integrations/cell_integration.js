"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CellIntegration = void 0;
const signaling_1 = require("@lumino/signaling");
class CellIntegration {
    constructor(options) {
        this.state = undefined;
        this.cell = options.cell;
        this.renderHeaderWidget = options.renderHeaderWidget;
        this.renderFooterWidget = options.renderFooterWidget;
        this.stateChangedSignal = new signaling_1.Signal(this);
        this.initialize(options);
        options.contentChangedSignal.connect((...args) => this.contentChangeListener(...args), this);
        this.activate();
    }
    activate() {
        this.contentChangeListener(this.cell, this.cell.model.value.text);
    }
    get changed() {
        return this.stateChangedSignal;
    }
    updateState(newState) {
        Object.assign(this.state, newState);
        if (this.state)
            this.stateChangedSignal.emit(this.state);
    }
    deactivate() {
        this.state = undefined;
        signaling_1.Signal.disconnectAll(this);
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    run() { }
}
exports.CellIntegration = CellIntegration;
