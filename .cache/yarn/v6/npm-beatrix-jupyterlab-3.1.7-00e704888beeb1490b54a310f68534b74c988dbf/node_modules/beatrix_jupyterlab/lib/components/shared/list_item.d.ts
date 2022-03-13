import * as React from 'react';
import { MenuCloseHandler } from './icon_button_menu';
import { Props as LearnMoreLinkProps } from './learn_more_link';
interface Props {
    captions?: string[];
    children?: React.ReactNode;
    icon?: React.ReactNode;
    learnMoreLink?: LearnMoreLinkProps;
    subMenuItems?: (closeHandler: MenuCloseHandler) => JSX.Element[];
    subtitle?: string;
    titleAction?: () => void;
    titleLink?: string;
    title?: string;
}
/** Generic List item */
export declare function ListItem(props: Props): JSX.Element;
export {};
