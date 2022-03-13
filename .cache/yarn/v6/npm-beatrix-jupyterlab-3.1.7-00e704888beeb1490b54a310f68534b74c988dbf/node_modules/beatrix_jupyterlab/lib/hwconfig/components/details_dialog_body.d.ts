/// <reference types="react" />
import { DetailsResponse } from '../data/data';
interface Props {
    details: DetailsResponse;
    receivedError: boolean;
    onDialogClose: () => void;
    onUpdate: () => void;
}
export declare function DetailsDialogBody(props: Props): JSX.Element;
export {};
