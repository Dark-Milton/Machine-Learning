import { INotebookModel } from '@jupyterlab/notebook';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { FormikProps } from 'formik';
import * as React from 'react';
import { GetPermissionsResponse } from '../service/project_state';
import { GcpSettings, OnClose, OnScheduleTypeChange, OnShowFormChange } from './drawer';
interface Props {
    gcpSettings: GcpSettings;
    notebookName: string;
    notebook: INotebookModel;
    permissions: GetPermissionsResponse;
    onClose: OnClose;
    settings: ISettingRegistry.ISettings;
    onScheduleTypeChange: OnScheduleTypeChange;
    onShowFormChange: OnShowFormChange;
}
interface ExecutorFormValues {
    name: string;
    location: string;
    scaleTier: string;
    masterType?: string;
    imageUri: string;
    customContainerImageUri?: string;
    scheduleType: string;
    gcsBucket: string;
    schedule?: string;
    acceleratorType?: string;
    acceleratorCount?: string;
    serviceAccount?: string;
    network?: string;
    parameters?: string;
    kernelName?: string;
}
interface ExecutorFormState {
    useUnixCronFormat?: boolean;
}
declare type ExecutorFormProps = Props & FormikProps<ExecutorFormValues>;
/**
 * Inner form used for Scheduling wrapped by Formik
 */
export declare class InnerExecutorForm extends React.Component<ExecutorFormProps, ExecutorFormState> {
    private missingPermissions;
    private machineTypeOptions;
    private acceleratorTypeOptions;
    private acceleratorCountOptions;
    constructor(props: ExecutorFormProps);
    updateCronSchedule(newSchedule: string): void;
    render(): JSX.Element;
    private _onMasterTypeChanged;
    private _onScheduleTypeChange;
    private _onAcceleratorTypeChange;
    private _onAdvancedOptionsChange;
    private _onEnvironmentChanged;
}
/** Form Component to submit Scheduled Notebooks */
export declare const ExecutorForm: React.ComponentType<Props>;
export {};
