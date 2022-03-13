import * as React from 'react';
import { SchedulerBuilderProps } from './schedule_builder';
interface SubFormState {
    frequency: string;
    specifiedMinute: string;
}
export declare class HourScheduleBuilder extends React.Component<SchedulerBuilderProps, SubFormState> {
    constructor(props: SchedulerBuilderProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: SchedulerBuilderProps, prevState: SubFormState): void;
    _createCronString(): string;
    render(): JSX.Element;
}
export {};
