import * as React from 'react';
interface State {
    exportedModelPath: string;
    modelName: string;
    environmentUri: string;
    expandSchemataContainer: boolean;
    predictSchemataInstances?: string;
    predictSchemataParameters?: string;
    predictSchemataPredictions?: string;
}
interface Props {
    container: string;
    uploadUserInputs: (target: string, value: string) => void;
    formError: boolean;
    filePath?: string;
}
export declare function checkValidModelPath(modelPath: string | undefined): boolean;
export declare function checkValidSchemata(schema: string | undefined): boolean;
export declare class UploadCustomForm extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    handleTextChange(event: React.ChangeEvent<HTMLInputElement>): void;
    handleContainerChange(images: {
        imageUri: string;
        customContainerImageUri: string;
    }): void;
    handleSchemataContainer(_: any, expanded: boolean): void;
    render(): JSX.Element;
}
export {};
