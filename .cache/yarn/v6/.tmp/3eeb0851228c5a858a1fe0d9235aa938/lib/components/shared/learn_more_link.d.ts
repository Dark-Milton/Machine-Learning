/// <reference types="react" />
export interface Props {
    secondary?: boolean;
    href: string;
    text?: string;
    noUnderline?: boolean;
    disabled?: boolean;
    noWrap?: boolean;
    maxWidth?: string;
}
/** Functional Component for an external link */
export declare function LearnMoreLink(props: Props): JSX.Element;
