/// <reference types="react" />
import { ReduxReactWidget } from '../../../utils/widgetManager/redux_react_widget';
export declare class QueryEditorTabWidget extends ReduxReactWidget {
    private editorNumber;
    private iniQuery;
    private useLegacySql?;
    constructor(editorNumber: number, iniQuery: string, useLegacySql?: boolean);
    renderReact(): JSX.Element;
}
