/// <reference types="react" />
interface Props {
    initialNetwork?: string;
    onChange: (network: string) => void;
}
/** Component for providing a network. */
export declare function NetworkSelector({ initialNetwork, onChange }: Props): JSX.Element;
export {};
