import React from 'react';
import { ButtonProps } from '@material-ui/core';
interface DropDownProps {
    items: {
        label: string;
        onClick: () => void;
    }[];
    label: string;
    buttonArgs?: ButtonProps;
}
interface DropDownState {
    open: boolean;
}
declare class DropDown extends React.Component<DropDownProps, DropDownState> {
    anchorRef: React.RefObject<HTMLButtonElement>;
    constructor(props: DropDownProps);
    handleToggle: () => void;
    handleClose: (event: React.MouseEvent<EventTarget>) => void;
    render(): JSX.Element;
}
export default DropDown;
