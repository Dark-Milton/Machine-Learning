export declare class MockBigQueryService {
    projectId: string;
    jobId: string;
    constructor(projectId?: string);
    queryJob(projectId: string, query: string, dryRun?: boolean): Promise<{
        jobReference: {
            jobId: string;
        };
    }>;
    queryJobQueryResults(projectId: string, jobId: string, maxResults: number): Promise<{
        rows: number[];
        fields: string[];
        totalRows: number;
    }>;
}
