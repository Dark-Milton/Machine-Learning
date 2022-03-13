/// <reference types="react" />
import { HardwareConfiguration } from '../data/data';
interface Props {
    formData: HardwareConfiguration;
    currentConfiguration: HardwareConfiguration;
    onDialogClose: () => void;
    onSubmit: () => void;
}
export declare function ConfirmationPage(props: Props): JSX.Element;
export {};
