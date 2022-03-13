/// <reference types="react" />
import { Execution, Schedule } from '../interfaces';
interface Props {
    job: Execution | Schedule;
    projectId: string;
}
/** Notebook job list item */
export declare function JobListItem(props: Props): JSX.Element;
export {};
