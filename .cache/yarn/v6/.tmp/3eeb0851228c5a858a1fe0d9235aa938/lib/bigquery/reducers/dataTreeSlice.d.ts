import { DataTree, Project, Dataset } from '../service/bigquery_service_types';
export interface DataTreeState {
    data: DataTree;
}
/**
 * BigQuery Public Data project
 * https://cloud.google.com/bigquery/public-data
 */
export declare const PUBLIC_DATA_PROJECT: Project;
export declare const updateDataTree: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<DataTree, string>, updateProject: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<Project, string>, updateDataset: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<Dataset, string>, addProject: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<Project, string>, removeProject: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<Project, string>;
declare const _default: import("redux").Reducer<DataTreeState, import("redux").AnyAction>;
export default _default;
