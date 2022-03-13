import * as React from 'react';
import { Option } from '../../utils';
export interface NestedOptions {
    header: Option;
    options: Option[];
}
interface ItemProps {
    option: Option;
    onSelect: (o: Option) => void;
    selected: boolean;
}
export declare function Item(props: ItemProps): JSX.Element;
interface NestedSelectProps {
    nestedOptionsList: NestedOptions[];
    onChange: (value: Option) => void;
    label?: string;
    value?: Option;
}
interface NestedSelectState {
    value: Option;
    anchorEl: null | HTMLElement;
}
export declare class NestedSelect extends React.Component<NestedSelectProps, NestedSelectState> {
    constructor(props: NestedSelectProps);
    private displayValue;
    private handleClick;
    private handleClose;
    private selectOption;
    render(): JSX.Element;
}
export {};
