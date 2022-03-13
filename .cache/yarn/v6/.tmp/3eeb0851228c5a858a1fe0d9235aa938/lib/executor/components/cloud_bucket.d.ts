import { AutocompleteChangeReason, FilterOptionsState } from '@material-ui/lab';
import React from 'react';
import { Bucket } from '../interfaces';
interface Props {
    gcsBucket?: string;
    onGcsBucketChange: (newBucketName: string) => void;
}
export interface BucketOption extends Bucket {
    inputValue?: string;
}
interface State {
    value: BucketOption | null;
    isLoading: boolean;
    validBucketOptions: BucketOption[];
    invalidBucketOptions: BucketOption[];
    error?: string;
    openSnackbar: boolean;
}
export declare class CloudBucketSelector extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    handleSnackbarClose(): void;
    handleChange(event: React.ChangeEvent<unknown>, newValue: BucketOption | string | null, reason: AutocompleteChangeReason): void;
    handleFilterOptions(options: BucketOption[], params: FilterOptionsState<BucketOption>): BucketOption[];
    handleGetOptionLabel(option: string | BucketOption): string;
    render(): JSX.Element;
    private _getBuckets;
    private createAndSelectBucket;
    private setValue;
}
export {};
