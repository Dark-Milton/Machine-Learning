import * as React from 'react';
import { OnClose } from './drawer';
interface Props {
    onFormReset: () => void;
    onClose: OnClose;
    projectId: string;
    schedule?: string;
}
export declare class SubmittedJob extends React.Component<Props, unknown> {
    render(): JSX.Element;
}
export {};
