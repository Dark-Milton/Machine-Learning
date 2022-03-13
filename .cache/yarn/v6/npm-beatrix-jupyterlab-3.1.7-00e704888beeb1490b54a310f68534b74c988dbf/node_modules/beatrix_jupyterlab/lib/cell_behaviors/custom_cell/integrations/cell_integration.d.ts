import { Cell } from '@jupyterlab/cells';
import { ISignal, Signal } from '@lumino/signaling';
import { Widget } from '@lumino/widgets';
export declare type IntegrationOptions<T> = {
    cell: Cell;
    contentChangedSignal: ISignal<Cell, string>;
    renderHeaderWidget: (widget: Widget) => void;
    renderFooterWidget: (widget: Widget) => void;
} & T;
export declare abstract class CellIntegration<OPTS extends Record<string, unknown>, STATE extends Record<string, unknown>> {
    protected cell: Cell;
    protected renderHeaderWidget: (widget: Widget) => void;
    protected renderFooterWidget: (widget: Widget) => void;
    state: STATE | undefined;
    protected readonly stateChangedSignal: Signal<this, STATE>;
    constructor(options: IntegrationOptions<OPTS>);
    protected abstract initialize(opts: OPTS): void;
    protected activate(): void;
    get changed(): ISignal<this, STATE>;
    protected updateState(newState: Partial<STATE>): void;
    deactivate(): void;
    protected abstract contentChangeListener(_: Cell, cellContents: string): void;
    run(): void;
}
