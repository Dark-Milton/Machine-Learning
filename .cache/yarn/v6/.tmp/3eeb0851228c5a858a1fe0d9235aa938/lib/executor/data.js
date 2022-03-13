"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FINISHED_STATES = exports.BUCKET_LINK_BASE = exports.VIEWER_LINK_BASE = exports.IMPORT_DIRECTORY = exports.EXECUTIONS_LINK = exports.SCHEDULES_DETAILS_LINK = exports.SCHEDULES_LINK = exports.GCS_LINK = exports.VERTEX_AI_JOBS_LINK = exports.CLOUD_CONSOLE = exports.FREQUENCY_TYPES = exports.SCHEDULE_TYPES = exports.DEFAULT_LOCATION = exports.LOCATIONS = exports.ACCELERATOR_COUNTS_1_2_4_8_16 = exports.ACCELERATOR_COUNTS_1_2_4_8 = exports.getAcceleratorCountForA100 = exports.isAcceleratorCompatible = exports.getAcceleratorTypes = exports.ACCELERATOR_TYPES_REDUCED = exports.A100_VALUE = exports.ACCELERATOR_TYPES = exports.A2_MASTER_TYPES = exports.N1_MASTER_TYPES = exports.removeFromList = exports.MONTH_FREQUENCIES = exports.DAYS_OF_WEEK = exports.findOptionByValue = exports.MONTH = exports.WEEK = exports.DAY = exports.HOUR = exports.RECURRING = exports.SINGLE = exports.CUSTOM = void 0;
/** Custom ScaleTier allows selection of Vertex AI Machine type */
exports.CUSTOM = 'CUSTOM';
/** Indicates a single Notebook execution */
exports.SINGLE = 'single';
/** Indicates a recurring scheduled Notebook execution */
exports.RECURRING = 'recurring';
/** Indicates a hourly frequency type */
exports.HOUR = 'hour';
/** Indicates a daily frequency type */
exports.DAY = 'day';
/** Indicates a weekly frequency type */
exports.WEEK = 'week';
/** Indicates a monthly frequency type */
exports.MONTH = 'month';
/** Returns an option whose value matches the given value. */
function findOptionByValue(options, value) {
    if (value === undefined)
        return undefined;
    return options.find(option => option.value === value);
}
exports.findOptionByValue = findOptionByValue;
exports.DAYS_OF_WEEK = [
    { value: 'sundayExecution', text: 'Sun' },
    { value: 'mondayExecution', text: 'Mon' },
    { value: 'tuesdayExecution', text: 'Tue' },
    { value: 'wednesdayExecution', text: 'Wed' },
    { value: 'thursdayExecution', text: 'Thur' },
    { value: 'fridayExecution', text: 'Fri' },
    { value: 'saturdayExecution', text: 'Sat' },
];
exports.MONTH_FREQUENCIES = [
    { value: '1', text: '1' },
    { value: '2', text: '2' },
    { value: '4', text: '4' },
    { value: '6', text: '6' },
    { value: '12', text: '12' },
];
/** Removes the item from the list if found */
function removeFromList(list, value) {
    const index = list.indexOf(value);
    if (index >= 0) {
        list.splice(index, 1);
    }
}
exports.removeFromList = removeFromList;
/**
 * Vertex AI Machine types.
 * http://cloud/vertex-ai/docs/training/configure-compute#machine-types
 */
exports.N1_MASTER_TYPES = [
    { value: 'n1-standard-4', text: 'n1-standard-4 (4 CPUs, 15 GB RAM)' },
    { value: 'n1-standard-8', text: 'n1-standard-8 (8 CPUs, 30 GB RAM' },
    { value: 'n1-standard-16', text: 'n1-standard-16 (16 CPUs, 60 GB RAM)' },
    { value: 'n1-standard-32', text: 'n1-standard-32 (32 CPUs, 120 GB RAM)' },
    { value: 'n1-standard-64', text: 'n1-standard-64 (64 CPUs, 240 GB RAM)' },
    { value: 'n1-standard-96', text: 'n1-standard-96 (96 CPUs, 360 GB RAM)' },
    { value: 'n1-highmem-2', text: 'n1-highmem-2 (4 CPUs, 26 GB RAM)' },
    { value: 'n1-highmem-4', text: 'n1-highmem-4 (4 CPUs, 26 GB RAM)' },
    { value: 'n1-highmem-8', text: 'n1-highmem-8 (8 CPUs, 52 GB RAM)' },
    { value: 'n1-highmem-16', text: 'n1-highmem-16 (16 CPUs, 104 GB RAM)' },
    { value: 'n1-highmem-32', text: 'n1-highmem-32 (32 CPUs, 208 GB RAM)' },
    { value: 'n1-highmem-64', text: 'n1-highmem-64 (64 CPUs, 416 GB RAM)' },
    { value: 'n1-highmem-96', text: 'n1-highmem-96 (96 CPUs, 624 GB RAM)' },
    { value: 'n1-highcpu-16', text: 'n1-highcpu-16 (16 CPUs, 14.4 GB RAM)' },
    { value: 'n1-highcpu-32', text: 'n1-highcpu-32 (32 CPUs, 28.8 GB RAM)' },
    { value: 'n1-highcpu-64', text: 'n1-highcpu-64 (64 CPUs, 57.6 GB RAM)' },
    { value: 'n1-highcpu-96', text: 'n1-highcpu-96 (96 CPUs, 86.4 GB RAM)' },
];
/**
 * Vertex AI Machine A2 types.
 * http://cloud/vertex-ai/docs/training/configure-compute#machine-types
 */
exports.A2_MASTER_TYPES = [
    { value: 'a2-highgpu-1g', text: 'a2-highgpu-1g (12 CPUs, 85 GB RAM, 1 GPU)' },
    { value: 'a2-highgpu-2g', text: 'a2-highgpu-2g (24 CPUs, 170 GB RAM, 2 GPUs)' },
    { value: 'a2-highgpu-4g', text: 'a2-highgpu-4g (48 CPUs, 340 GB RAM, 4 GPUs)' },
    { value: 'a2-highgpu-8g', text: 'a2-highgpu-8g (96 CPUs, 680 GB RAM, 8 GPUs)' },
    {
        value: 'a2-megagpu-16g',
        text: 'a2-megagpu-16g (96 CPUs, 1360 GB RAM, 16 GPUs)',
    },
];
/**
 * Vertex AI Accelerator types for most machine types.
 * http://cloud/vertex-ai/docs/training/configure-compute#machine-types
 */
exports.ACCELERATOR_TYPES = [
    { value: '', text: 'None' },
    { value: 'NVIDIA_TESLA_K80', text: 'NVIDIA Tesla K80' },
    { value: 'NVIDIA_TESLA_P4', text: 'NVIDIA Tesla P4' },
    { value: 'NVIDIA_TESLA_P100', text: 'NVIDIA Tesla P100' },
    { value: 'NVIDIA_TESLA_T4', text: 'NVIDIA Tesla T4' },
    { value: 'NVIDIA_TESLA_V100', text: 'NVIDIA Tesla V100' },
    { value: 'NVIDIA_TESLA_A100', text: 'NVIDIA Tesla A100' },
];
/** A100 Accelerator Type name. */
exports.A100_VALUE = 'NVIDIA_TESLA_A100';
/**
 * Vertex AI Accelerator types for particular machine types that only
 * provide a limited amount.
 * http://cloud/vertex-ai/docs/training/configure-compute#machine-types
 * https://cloud.google.com/vertex-ai/docs/training/configure-compute#specifying_gpus
 */
exports.ACCELERATOR_TYPES_REDUCED = [
    { value: '', text: 'None' },
    { value: 'NVIDIA_TESLA_P4', text: 'NVIDIA Tesla P4' },
    { value: 'NVIDIA_TESLA_T4', text: 'NVIDIA Tesla T4' },
    { value: 'NVIDIA_TESLA_V100', text: 'NVIDIA Tesla V100' },
];
const MASTER_TYPES_REDUCED = new Set([
    'n1-standard-64',
    'n1-standard-96',
    'n1-highmem-64',
    'n1-highmem-96',
    'n1-highcpu-96',
]);
/**
 * Returns the valid accelerator types given a masterType. Returns empty array
 * if masterType is falsy.
 */
function getAcceleratorTypes(masterType) {
    if (masterType) {
        if (MASTER_TYPES_REDUCED.has(masterType)) {
            return exports.ACCELERATOR_TYPES_REDUCED;
        }
        return exports.ACCELERATOR_TYPES;
    }
    return [];
}
exports.getAcceleratorTypes = getAcceleratorTypes;
/**
 * Returns true if given accelerator and masterType are compatible.
 */
function isAcceleratorCompatible(acceleratorType, masterType) {
    if (!masterType) {
        return false;
    }
    if (MASTER_TYPES_REDUCED.has(masterType)) {
        return !!exports.ACCELERATOR_TYPES_REDUCED.find(option => option.value === acceleratorType);
    }
    return !!exports.ACCELERATOR_TYPES.find(option => option.value === acceleratorType);
}
exports.isAcceleratorCompatible = isAcceleratorCompatible;
/**
 * Returns the Accelerator count options for A100 GPUs.
 */
function getAcceleratorCountForA100(masterType) {
    // convert 'a-b-cg' value to 'c'
    const gpuCount = masterType.split('-')[2].slice(0, -1);
    return exports.ACCELERATOR_COUNTS_1_2_4_8_16.filter(option => option.value === gpuCount);
}
exports.getAcceleratorCountForA100 = getAcceleratorCountForA100;
/**
 * Vertex Accelerator counts.
 * https://cloud.google.com/vertex-ai/docs/training/configure-compute#specifying_gpus
 */
exports.ACCELERATOR_COUNTS_1_2_4_8 = [
    { value: '1', text: '1' },
    { value: '2', text: '2' },
    { value: '4', text: '4' },
    { value: '8', text: '8' },
];
/**
 * Vertex Accelerator counts for A100 GPUs.
 * https://cloud.google.com/vertex-ai/docs/training/configure-compute#specifying_gpus
 */
exports.ACCELERATOR_COUNTS_1_2_4_8_16 = [
    ...exports.ACCELERATOR_COUNTS_1_2_4_8,
    { value: '16', text: '16' },
];
/** Default Notebook service location. */
exports.LOCATIONS = [
    {
        value: 'us-central1-a',
        text: 'us-central1-a',
    },
];
/** Default location value if one is not available in the gcpSettings */
exports.DEFAULT_LOCATION = 'us-central1';
/** Single execution or recurring schedule */
exports.SCHEDULE_TYPES = [
    { value: exports.SINGLE, text: 'One-time execution' },
    { value: exports.RECURRING, text: 'Schedule-based recurring executions' },
];
exports.FREQUENCY_TYPES = [
    { value: exports.HOUR, text: 'hour' },
    { value: exports.DAY, text: 'day' },
    { value: exports.WEEK, text: 'week' },
    { value: exports.MONTH, text: 'month' },
];
/** Link to Cloud Console */
exports.CLOUD_CONSOLE = 'https://console.cloud.google.com';
/** Link to Vertex AI Custom Jobs */
exports.VERTEX_AI_JOBS_LINK = `${exports.CLOUD_CONSOLE}/vertex-ai`;
/** Link to GCS Storage Browser */
exports.GCS_LINK = `${exports.CLOUD_CONSOLE}/storage/browser`;
/** Link to Schedules page */
exports.SCHEDULES_LINK = `${exports.CLOUD_CONSOLE}/vertex-ai/notebooks/list/schedules`;
/** Link to Schedule Details page */
exports.SCHEDULES_DETAILS_LINK = `${exports.CLOUD_CONSOLE}/vertex-ai/notebooks/schedule-details`;
/** Link to Executions page */
exports.EXECUTIONS_LINK = `${exports.CLOUD_CONSOLE}/vertex-ai/notebooks/list/executions`;
/** Notebook jobs directory that notebooks will be imported to. */
exports.IMPORT_DIRECTORY = 'imported_notebook_jobs/';
exports.VIEWER_LINK_BASE = 'https://notebooks.cloud.google.com/view';
exports.BUCKET_LINK_BASE = 'https://console.cloud.google.com/storage/browser';
/** Execution states indicating that the notebook job completed. */
exports.FINISHED_STATES = new Set([
    'SUCCEEDED',
    'FAILED',
]);
