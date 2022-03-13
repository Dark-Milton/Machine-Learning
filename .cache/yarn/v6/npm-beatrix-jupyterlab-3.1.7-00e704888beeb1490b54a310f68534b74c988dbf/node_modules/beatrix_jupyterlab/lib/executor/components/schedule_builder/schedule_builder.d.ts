import * as React from 'react';
export declare type FrequencyType = 'hour' | 'day' | 'week' | 'month';
/** Function called when a new schedule string is built */
export declare type OnScheduleChange = (newSchedule: string) => void;
/** Common interface used by all SchedulerBuilder components. */
export interface SchedulerBuilderProps {
    frequencyType: string;
    onScheduleChange: OnScheduleChange;
    onChangeFrequencyType: (frequencyType: FrequencyType) => void;
}
interface FormProps {
    schedule: string;
    onScheduleChange: OnScheduleChange;
    useUnixCronFormat: boolean;
}
interface FormState {
    frequencyType: string;
}
export declare class ScheduleBuilder extends React.Component<FormProps, FormState> {
    constructor(props: FormProps);
    onChangeFrequencyType(frequencyType: FrequencyType): void;
    render(): JSX.Element;
}
export {};
