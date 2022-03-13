/// <reference types="react" />
import { ReactWidget } from '@jupyterlab/apputils';
export declare function PublishedNotebooksComponent(): JSX.Element;
export declare class PublishedNotebooksWidget extends ReactWidget {
    private _visibleSignal;
    constructor();
    onAfterHide(): void;
    onAfterShow(): void;
    render(): JSX.Element;
}
