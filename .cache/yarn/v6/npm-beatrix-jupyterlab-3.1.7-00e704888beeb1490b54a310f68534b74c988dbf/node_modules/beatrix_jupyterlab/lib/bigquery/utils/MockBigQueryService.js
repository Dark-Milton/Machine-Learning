"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockBigQueryService = void 0;
class MockBigQueryService {
    constructor(projectId = 'project-id') {
        this.projectId = projectId;
        this.jobId = '123';
    }
    queryJob(projectId, query, dryRun = false) {
        return Promise.resolve({ jobReference: { jobId: this.jobId } });
    }
    queryJobQueryResults(projectId, jobId, maxResults) {
        return Promise.resolve({
            rows: [1],
            fields: ['number'],
            totalRows: 1,
        });
    }
}
exports.MockBigQueryService = MockBigQueryService;
