import * as React from 'react';
interface Option {
    text: string;
    value: string | number;
    disabled?: boolean;
}
export declare const SELECT_STYLES: {
    select: string;
    selectBottomSpacing: string;
    icon: string;
};
interface Props {
    label?: string;
    name?: string;
    value?: string;
    options?: Option[];
    formHelperText?: string;
    formHelperLink?: string;
    formHelperLinkText?: string;
    noBottomSpacing?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
/** Drop-down selection component */
export declare function SelectInput(props: Props): JSX.Element;
export {};
