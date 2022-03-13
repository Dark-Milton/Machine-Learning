"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProject = exports.addProject = exports.updateDataset = exports.updateProject = exports.updateDataTree = exports.PUBLIC_DATA_PROJECT = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
/**
 * BigQuery Public Data project
 * https://cloud.google.com/bigquery/public-data
 */
exports.PUBLIC_DATA_PROJECT = {
    id: 'bigquery-public-data',
    name: 'bigquery-public-data',
};
const initialState = {
    data: {
        projects: {
            'bigquery-public-data': exports.PUBLIC_DATA_PROJECT,
        },
        projectIds: [exports.PUBLIC_DATA_PROJECT.id],
    },
};
const dataTreeSlice = toolkit_1.createSlice({
    name: 'dataTree',
    initialState,
    reducers: {
        updateDataTree(state, action) {
            const dataTreeResult = action.payload;
            state.data.projects = dataTreeResult.projects;
            state.data.projectIds = dataTreeResult.projectIds;
        },
        updateProject(state, action) {
            const projectResult = action.payload;
            const projectId = projectResult.id;
            state.data.projects = Object.assign(Object.assign({}, state.data.projects), { [projectId]: projectResult });
        },
        addProject(state, action) {
            const projectResult = action.payload;
            const projectId = projectResult.id;
            if (!state.data.projects[projectId]) {
                state.data.projects = Object.assign(Object.assign({}, state.data.projects), { [projectId]: projectResult });
                state.data.projectIds.push(projectId);
            }
        },
        removeProject(state, action) {
            const projectResult = action.payload;
            const projectId = projectResult.id;
            if (state.data.projects[projectId]) {
                delete state.data.projects[projectId];
                state.data.projectIds = state.data.projectIds.filter(item => item !== projectId);
            }
        },
        updateDataset(state, action) {
            const datasetResult = action.payload;
            const datasetId = datasetResult.id;
            const projectId = datasetResult.projectId;
            state.data.projects[projectId].datasets = Object.assign(Object.assign({}, state.data.projects[projectId].datasets), { [datasetId]: datasetResult });
        },
    },
});
_a = dataTreeSlice.actions, exports.updateDataTree = _a.updateDataTree, exports.updateProject = _a.updateProject, exports.updateDataset = _a.updateDataset, exports.addProject = _a.addProject, exports.removeProject = _a.removeProject;
exports.default = dataTreeSlice.reducer;
