import { ReactWidget } from '@jupyterlab/apputils';
import { Token } from '@lumino/coreutils';
import { Signal } from '@lumino/signaling';
import React from 'react';
interface Props {
    name: string;
    isManaged: boolean;
    onShowDetails: () => void;
}
interface State {
    anchorEl?: Element;
}
/** Token for the HeaderWidget */
export declare const BeatrixHeaderToken: Token<HeaderWidget>;
/** Custom styled menu item (exported for tests) */
export declare const DetailsMenuItem: React.ComponentType<any>;
/** Displays Notebook resource information and details button. */
export declare class Header extends React.Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element;
    private showMenu;
    private onMenuClose;
    private showDetailsAndClose;
}
/** Widget to receive Notebook and signal when details should be shown. */
export declare class HeaderWidget extends ReactWidget {
    private readonly notebookName;
    private readonly isManaged;
    readonly showDetailsSignal: Signal<HeaderWidget, void>;
    constructor(notebookName: string, isManaged: boolean);
    render(): JSX.Element;
}
export {};
