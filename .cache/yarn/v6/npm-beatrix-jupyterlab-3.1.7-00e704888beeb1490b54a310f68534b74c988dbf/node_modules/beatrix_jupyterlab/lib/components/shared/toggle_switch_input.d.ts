import * as React from 'react';
interface LabelProps {
    labelLeft?: string;
    labelRight?: string;
    name?: string;
    id?: string;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
/** Material style toggle switch */
export declare function ToggleSwitch(props: LabelProps): JSX.Element;
export {};
