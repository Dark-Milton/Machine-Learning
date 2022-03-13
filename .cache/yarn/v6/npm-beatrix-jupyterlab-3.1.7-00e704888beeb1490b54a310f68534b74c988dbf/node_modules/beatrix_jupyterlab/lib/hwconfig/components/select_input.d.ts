import * as React from 'react';
import { Option } from '../../utils';
interface Props {
    label?: string;
    name?: string;
    value?: string;
    options?: Option[];
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export declare const STYLES: {
    select: string;
    icon: string;
    textColor: string;
};
export declare function SelectInput(props: Props): JSX.Element;
export {};
