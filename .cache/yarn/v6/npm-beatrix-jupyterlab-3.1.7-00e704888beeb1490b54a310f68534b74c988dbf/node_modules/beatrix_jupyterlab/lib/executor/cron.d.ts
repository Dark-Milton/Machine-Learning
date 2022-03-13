/**
 * Return date string that follows notebooks' custom date format
 */
export declare function customDateFormat(date: Date | undefined, timeZone?: string, time?: boolean): string;
export declare function customShortDateFormat(date: Date): string;
/**
 * Tries to find the next execution date after a given date for a given cron string
 */
export declare function getNextExecutionAfterDate(cronString: string, date: Date): Date | undefined;
/**
 * Tries to find the next execution date after current date and time and returns
 * string for executions
 */
export declare function getNextExecutionDate(cronString: string): string;
/**
 * Tries to create a human readable version of the given cron string if possible
 * if timeZone is not provided, the system's timeZone will be used
 */
export declare function getHumanReadableCron(cronString: string, timeZone?: string): string;
