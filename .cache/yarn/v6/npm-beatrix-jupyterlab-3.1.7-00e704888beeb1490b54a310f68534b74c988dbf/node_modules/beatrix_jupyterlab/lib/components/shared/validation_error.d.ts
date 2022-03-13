/// <reference types="react" />
interface CheckValidationProps {
    min?: number;
    max?: number;
    required: boolean;
    fieldName: string;
    value: string;
}
export declare function CheckValidation(props: CheckValidationProps): JSX.Element;
export {};
