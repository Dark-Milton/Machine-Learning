import * as React from 'react';
interface Props {
    children?: React.ReactNode;
    asError?: boolean;
    asActivity?: boolean;
    text?: string;
}
/** Shared message component. */
export declare function Message(props: Props): JSX.Element;
export {};
