/** Custom ScaleTier allows selection of Vertex AI Machine type */
export declare const CUSTOM = "CUSTOM";
/** Indicates a single Notebook execution */
export declare const SINGLE = "single";
/** Indicates a recurring scheduled Notebook execution */
export declare const RECURRING = "recurring";
/** Indicates a hourly frequency type */
export declare const HOUR = "hour";
/** Indicates a daily frequency type */
export declare const DAY = "day";
/** Indicates a weekly frequency type */
export declare const WEEK = "week";
/** Indicates a monthly frequency type */
export declare const MONTH = "month";
/** Interface for an <option> inside a <select> */
export interface Option {
    text: string;
    value: string | number;
    disabled?: boolean;
}
/** Interface for an Framework option */
export interface Framework extends Option {
    searchKeywords: string[];
}
/** Returns an option whose value matches the given value. */
export declare function findOptionByValue<T extends Option>(options: T[], value: string | number | undefined): T | undefined;
export declare const DAYS_OF_WEEK: Option[];
export declare const MONTH_FREQUENCIES: Option[];
/** Removes the item from the list if found */
export declare function removeFromList<T>(list: T[], value: T): void;
/**
 * Vertex AI Machine types.
 * http://cloud/vertex-ai/docs/training/configure-compute#machine-types
 */
export declare const N1_MASTER_TYPES: Option[];
/**
 * Vertex AI Machine A2 types.
 * http://cloud/vertex-ai/docs/training/configure-compute#machine-types
 */
export declare const A2_MASTER_TYPES: Option[];
/**
 * Vertex AI Accelerator types for most machine types.
 * http://cloud/vertex-ai/docs/training/configure-compute#machine-types
 */
export declare const ACCELERATOR_TYPES: Option[];
/** A100 Accelerator Type name. */
export declare const A100_VALUE = "NVIDIA_TESLA_A100";
/**
 * Vertex AI Accelerator types for particular machine types that only
 * provide a limited amount.
 * http://cloud/vertex-ai/docs/training/configure-compute#machine-types
 * https://cloud.google.com/vertex-ai/docs/training/configure-compute#specifying_gpus
 */
export declare const ACCELERATOR_TYPES_REDUCED: Option[];
/**
 * Returns the valid accelerator types given a masterType. Returns empty array
 * if masterType is falsy.
 */
export declare function getAcceleratorTypes(masterType: string): Option[];
/**
 * Returns true if given accelerator and masterType are compatible.
 */
export declare function isAcceleratorCompatible(acceleratorType: string, masterType: string): boolean;
/**
 * Returns the Accelerator count options for A100 GPUs.
 */
export declare function getAcceleratorCountForA100(masterType: string): Option[];
/**
 * Vertex Accelerator counts.
 * https://cloud.google.com/vertex-ai/docs/training/configure-compute#specifying_gpus
 */
export declare const ACCELERATOR_COUNTS_1_2_4_8: Option[];
/**
 * Vertex Accelerator counts for A100 GPUs.
 * https://cloud.google.com/vertex-ai/docs/training/configure-compute#specifying_gpus
 */
export declare const ACCELERATOR_COUNTS_1_2_4_8_16: Option[];
/** Default Notebook service location. */
export declare const LOCATIONS: Option[];
/** Default location value if one is not available in the gcpSettings */
export declare const DEFAULT_LOCATION = "us-central1";
/** Single execution or recurring schedule */
export declare const SCHEDULE_TYPES: Option[];
export declare const FREQUENCY_TYPES: Option[];
/** Link to Cloud Console */
export declare const CLOUD_CONSOLE = "https://console.cloud.google.com";
/** Link to Vertex AI Custom Jobs */
export declare const VERTEX_AI_JOBS_LINK: string;
/** Link to GCS Storage Browser */
export declare const GCS_LINK: string;
/** Link to Schedules page */
export declare const SCHEDULES_LINK: string;
/** Link to Schedule Details page */
export declare const SCHEDULES_DETAILS_LINK: string;
/** Link to Executions page */
export declare const EXECUTIONS_LINK: string;
/** Notebook jobs directory that notebooks will be imported to. */
export declare const IMPORT_DIRECTORY = "imported_notebook_jobs/";
export declare const VIEWER_LINK_BASE = "https://notebooks.cloud.google.com/view";
export declare const BUCKET_LINK_BASE = "https://console.cloud.google.com/storage/browser";
/** Execution states indicating that the notebook job completed. */
export declare const FINISHED_STATES: ReadonlySet<string>;
