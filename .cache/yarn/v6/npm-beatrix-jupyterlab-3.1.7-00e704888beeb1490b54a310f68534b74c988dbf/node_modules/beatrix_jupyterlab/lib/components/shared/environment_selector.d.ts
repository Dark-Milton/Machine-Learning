/// <reference types="react" />
import { INotebookModel } from '@jupyterlab/notebook';
interface Props {
    notebook: INotebookModel;
    onChange: (images: {
        imageUri: string;
        customContainerImageUri: string;
        kernelName: string;
    }) => void;
}
/** Component for selecting the container image to use in the training job. */
export declare function EnvironmentSelector({ notebook, onChange }: Props): JSX.Element;
export {};
