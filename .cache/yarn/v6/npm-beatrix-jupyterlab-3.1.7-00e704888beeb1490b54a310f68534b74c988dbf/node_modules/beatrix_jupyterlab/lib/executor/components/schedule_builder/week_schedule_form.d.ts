import * as React from 'react';
import { SchedulerBuilderProps } from './schedule_builder';
interface SubFormState {
    specifiedTime: string;
    mondayExecution: boolean;
    tuesdayExecution: boolean;
    wednesdayExecution: boolean;
    thursdayExecution: boolean;
    fridayExecution: boolean;
    saturdayExecution: boolean;
    sundayExecution: boolean;
}
export declare class WeekScheduleBuilder extends React.Component<SchedulerBuilderProps, SubFormState> {
    constructor(props: SchedulerBuilderProps);
    componentDidUpdate(prevProps: SchedulerBuilderProps, prevState: SubFormState): void;
    _listOfDays(): boolean[];
    _areAnyDaysSelected(): boolean;
    _convertDaysOfWeektoString(): string;
    _createCronString(): string;
    _createCheckboxes(): JSX.Element[];
    render(): JSX.Element;
}
export {};
