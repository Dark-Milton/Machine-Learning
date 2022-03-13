import { Token } from '@lumino/coreutils';
import { ISignal } from '@lumino/signaling';
/** Token for the set of signals passed to other widgets */
export declare const BeatrixSignalsToken: Token<Signals>;
/** Contains the set of signals to be passed to other widgets */
export interface Signals {
    showDetailsSignal: ISignal<any, void>;
    showPopoverSignal: ISignal<any, void>;
}
