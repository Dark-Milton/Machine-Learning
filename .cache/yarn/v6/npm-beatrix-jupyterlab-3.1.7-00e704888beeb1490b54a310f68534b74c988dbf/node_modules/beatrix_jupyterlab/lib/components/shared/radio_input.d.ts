import * as React from 'react';
import { Option } from '../../utils';
interface RadioInputProps {
    name?: string;
    value?: string;
    options?: Option[];
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
}
/** Funtional Component for Radio input fields */
export declare function RadioInput(props: RadioInputProps): JSX.Element;
export {};
