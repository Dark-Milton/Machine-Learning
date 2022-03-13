import * as React from 'react';
interface Props {
    children?: React.ReactNode;
    closeLabel?: string;
    onClick: () => void;
}
/** Funtional Component for defining an action bar with buttons. */
export declare function ActionBar(props: Props): JSX.Element;
export {};
