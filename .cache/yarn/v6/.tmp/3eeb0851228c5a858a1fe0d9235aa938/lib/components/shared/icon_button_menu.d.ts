import * as React from 'react';
export declare type MenuCloseHandler = () => void;
interface Props {
    menuItems: (closeHandler: MenuCloseHandler) => JSX.Element[];
    icon?: React.ReactNode;
}
interface State {
    anchorEl: null | HTMLElement;
}
/** Button with no padding. */
export declare const SmallButton: React.ComponentType<any>;
/** Menu item with smaller padding and fontSize */
export declare const SmallMenuItem: React.ComponentType<any>;
/** Component for rendering a menu triggered by an icon button. */
export declare class IconButtonMenu extends React.Component<Props, State> {
    constructor(props: Props);
    render(): JSX.Element;
    private _onOpenMenu;
    private _onMenuClose;
}
export {};
