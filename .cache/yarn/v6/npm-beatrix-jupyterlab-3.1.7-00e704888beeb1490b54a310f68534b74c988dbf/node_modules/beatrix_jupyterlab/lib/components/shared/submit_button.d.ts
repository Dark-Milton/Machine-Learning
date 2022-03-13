import * as React from 'react';
interface Props {
    actionPending: boolean;
    showWorkingIcon?: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    text: string;
}
/**
 * Function component for Submit Button that displays as a progress indicator.
 */
export declare function SubmitButton(props: Props): JSX.Element;
/** Button with primary Google Material coloring. */
export declare const PrimaryButton: React.ComponentType<any>;
export {};
