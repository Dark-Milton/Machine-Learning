import * as React from 'react';
interface Props {
    header?: string;
    open: boolean;
    onClose?: () => void;
    cancelLabel?: string;
    submitLabel?: string;
    onCancel?: () => void;
    onSubmit?: () => void;
    children?: React.ReactNode;
    submitDisabled?: boolean;
    hideSubmit?: boolean;
    keepMounted?: boolean;
    height?: string;
}
/** Funtional Component for a common dialog interface with cancel and submit buttons. */
export declare function DialogComponent(props: Props): JSX.Element;
export {};
