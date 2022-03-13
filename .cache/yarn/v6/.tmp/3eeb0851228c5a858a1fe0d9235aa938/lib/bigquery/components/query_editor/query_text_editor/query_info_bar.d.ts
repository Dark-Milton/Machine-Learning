/// <reference types="react" />
import { openSnackbar as openSnackbarAction } from '../../../reducers/snackbarSlice';
import { QueryStates } from './query_text_editor';
export interface QueryInfoBarProps {
    ifIncell: boolean;
    queryState: QueryStates;
    bytesProcessed: number | null;
    message: string | null;
    ifMsgErr: boolean;
    query: string;
    submitQuery: () => Promise<void>;
    cancelQuery: () => Promise<void>;
    openSnackbar: typeof openSnackbarAction | (() => void);
}
export interface ButtonTextProps {
    text: string;
}
export declare function ButtonText({ text }: ButtonTextProps): JSX.Element;
export interface QueryButtonProps {
    queryState: QueryStates;
    submitQuery: () => Promise<void>;
}
export declare function QueryButton({ queryState, submitQuery, }: QueryButtonProps): JSX.Element;
export interface CancelButtonProps {
    cancelQuery: () => Promise<void>;
}
export declare function CancelButton({ cancelQuery }: CancelButtonProps): JSX.Element;
export interface OptionalTextProps {
    text: string;
    config?: Record<string, unknown>;
}
export declare function OptionalText({ text, config, }: OptionalTextProps): JSX.Element;
export interface ErrorMessageProps {
    message: string | null;
}
export declare function ErrorMessage({ message }: ErrorMessageProps): JSX.Element;
export interface BytesProcessedMessageProps {
    bytesProcessed: number | null;
}
export declare function BytesProcessedMessage({ bytesProcessed, }: BytesProcessedMessageProps): JSX.Element;
export interface QueryValidationMessageProps {
    bytesProcessed: number | null;
    message: string | null;
    ifMsgErr: boolean;
}
export declare function QueryValidationMessage({ bytesProcessed, message, ifMsgErr, }: QueryValidationMessageProps): JSX.Element;
export interface CopyButtonProps {
    query: string;
    openSnackbar: typeof openSnackbarAction | (() => void);
}
export declare function CopyButton({ query, openSnackbar, }: CopyButtonProps): JSX.Element;
export interface OpenQueryEditorTabButtonProps {
    query: string;
}
export declare function OpenQueryEditorTabButton({ query, }: OpenQueryEditorTabButtonProps): JSX.Element;
export declare function QueryInfoBar({ ifIncell, queryState, bytesProcessed, message, ifMsgErr, query, submitQuery, cancelQuery, openSnackbar, }: QueryInfoBarProps): JSX.Element;
export declare const ConnectedQueryInfoBar: import("react-redux").ConnectedComponent<typeof QueryInfoBar, import("react-redux").Omit<QueryInfoBarProps, "openSnackbar">>;
