export declare type QueryType = 'MODEL' | 'TABLE' | 'VIEW';
export declare function getStarterQuery(type: QueryType, resourceId: string, legacySql?: boolean): string;
