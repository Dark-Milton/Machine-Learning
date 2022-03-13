import * as React from 'react';
import { OnClose } from './drawer';
export interface ActionBarProps {
    children?: React.ReactNode;
    closeLabel?: string;
    displayMessage?: React.ReactNode;
    closeOnRight?: boolean;
    onClose: OnClose;
    error?: React.ReactNode;
    alignLeft?: boolean;
}
export declare const STYLES: {
    actionBar: string;
    endJustify: string;
    actionBarContainer: string;
    actionBarDisplayMessage: string;
    errorSpacing: string;
};
/** Funtional Component for defining an action bar with buttons. */
export declare function ActionBar(props: ActionBarProps): JSX.Element;
