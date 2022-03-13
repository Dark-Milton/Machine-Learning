import * as React from 'react';
import { SchedulerBuilderProps } from './schedule_builder';
interface SubFormState {
    frequency: string;
    specifiedTime: string;
}
export declare class DayScheduleBuilder extends React.Component<SchedulerBuilderProps, SubFormState> {
    constructor(props: SchedulerBuilderProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: SchedulerBuilderProps, prevState: SubFormState): void;
    _createCronString(): string;
    render(): JSX.Element;
}
export {};
