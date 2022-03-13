/// <reference types="react" />
interface Props {
    handleKeyPress: (e: any) => void;
    handleClear: () => void;
    defaultText?: string;
}
/** Funtional Component for a common dialog interface with cancel and submit buttons. */
export declare function SearchBar(props: Props): JSX.Element;
export {};
