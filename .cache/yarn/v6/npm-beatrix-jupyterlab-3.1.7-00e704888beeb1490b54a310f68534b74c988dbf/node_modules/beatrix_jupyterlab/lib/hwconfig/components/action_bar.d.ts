/// <reference types="react" />
interface Props {
    primaryLabel: string;
    secondaryLabel?: string;
    onPrimaryClick: () => void;
    onSecondaryClick?: () => void;
    primaryDisabled?: boolean;
}
/** Funtional Component for defining an action bar with buttons. */
export declare function ActionBar(props: Props): JSX.Element;
export {};
