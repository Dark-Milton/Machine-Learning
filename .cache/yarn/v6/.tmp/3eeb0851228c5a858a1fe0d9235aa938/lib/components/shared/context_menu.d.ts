import React from 'react';
export interface MenuOption {
    label: string;
    onClick: () => void;
}
interface Props {
    items: MenuOption[];
}
interface State {
    isOpen: boolean;
    mouseX: number;
    mouseY: number;
}
export declare class ContextMenu extends React.PureComponent<Props, State> {
    private readonly menuItemsRef;
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    openContextMenu(event: React.MouseEvent<HTMLElement, MouseEvent>): void;
    closeContextMenu(): void;
    render(): JSX.Element;
    private onContextMenu;
    private onClick;
}
export {};
