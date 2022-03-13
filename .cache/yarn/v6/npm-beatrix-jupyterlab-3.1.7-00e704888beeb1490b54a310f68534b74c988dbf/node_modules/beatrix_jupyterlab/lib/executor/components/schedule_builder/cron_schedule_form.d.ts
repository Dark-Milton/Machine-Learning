/// <reference types="react" />
import { OnScheduleChange } from './schedule_builder';
interface SubFormProps {
    schedule: string;
    onScheduleChange: OnScheduleChange;
}
export declare function CronScheduleBuilder(props: SubFormProps): JSX.Element;
export {};
