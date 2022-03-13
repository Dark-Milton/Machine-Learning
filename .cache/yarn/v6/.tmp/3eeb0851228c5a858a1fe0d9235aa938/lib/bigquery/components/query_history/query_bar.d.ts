/// <reference types="react" />
import { JobsObject } from '../../service/bigquery_service_types';
interface QueryBarProps {
    jobs: JobsObject;
    jobId: string;
}
export declare const QueryBar: (props: QueryBarProps) => JSX.Element;
export {};
