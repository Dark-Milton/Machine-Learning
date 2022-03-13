import { Dialog, ReactWidget } from '@jupyterlab/apputils';
import React from 'react';
import { AuthService } from '../service/auth_service';
export declare const EXIT_MESSAGE = "Are you sure you want to leave this notebook and return to the Managed Notebooks console?";
export declare const MANAGED_NOTEBOOKS_LINK = "https://console.cloud.google.com/vertex-ai/notebooks/list/managed";
/** Shows a native JupyterLab dialog with the Auth component */
export declare function showAuthDialog(authService: AuthService, error?: string): Promise<void>;
interface AuthProps {
    url: string;
    authCode: string;
    onAuthCodeChanged: (authCode: string) => void;
    error?: string;
}
interface AuthState {
    isPending: boolean;
}
/** Component to display authentication form. */
export declare class AuthForm extends React.Component<AuthProps, AuthState> {
    constructor(props: AuthProps);
    render(): JSX.Element;
}
/**
 * ReactWidget implementing the Dialog.IBodyWidget interface to expose
 * the AuthForm component and encapsulate all authentication operations.
 */
export declare class AuthDialogWidget extends ReactWidget implements Dialog.IBodyWidget<Promise<boolean>> {
    private readonly authService;
    private readonly error?;
    private authProps;
    private readonly authSignal;
    constructor(authService: AuthService, error?: string);
    getValue(): Promise<boolean>;
    render(): JSX.Element;
    onAuthCodeChanged(authCode: string): void;
    /** Gets the OAuth URL and emits value to authSignal. */
    private initialize;
}
export {};
