"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGpuCountOptionsList = exports.getGpuTypeOptionsList = exports.acceleratorNameToEnum = exports.nvidiaNameToEnum = exports.ACCELERATOR_COUNTS_1_2_4_8 = exports.getGpuTypeText = exports.ACCELERATOR_TYPES = exports.NO_ACCELERATOR_COUNT = exports.NO_ACCELERATOR_TYPE = void 0;
const machine_types_1 = require("./machine_types");
/**
 * The master list of AI Platform Accelerator types.
 * https://cloud.google.com/ai-platform/training/docs/using-gpus#compute-engine-machine-types-with-gpu
 * https://cloud.google.com/ai-platform/notebooks/docs/reference/rest/v1beta1/projects.locations.instances#AcceleratorType
 */
exports.NO_ACCELERATOR_TYPE = 'ACCELERATOR_TYPE_UNSPECIFIED';
exports.NO_ACCELERATOR_COUNT = 0;
const A100_GPU_NAME_SUFFIX = '-a100';
exports.ACCELERATOR_TYPES = [
    { value: 'NVIDIA_TESLA_K80', text: 'NVIDIA Tesla K80' },
    { value: 'NVIDIA_TESLA_P4', text: 'NVIDIA Tesla P4' },
    { value: 'NVIDIA_TESLA_P100', text: 'NVIDIA Tesla P100' },
    { value: 'NVIDIA_TESLA_T4', text: 'NVIDIA Tesla T4' },
    { value: 'NVIDIA_TESLA_V100', text: 'NVIDIA Tesla V100' },
    { value: 'NVIDIA_TESLA_A100', text: 'NVIDIA Tesla A100' },
];
/*
 * Get description text from Accelerator Type value
 */
function getGpuTypeText(value) {
    const accelerator = exports.ACCELERATOR_TYPES.find(option => option.value === value);
    return accelerator ? accelerator.text : '';
}
exports.getGpuTypeText = getGpuTypeText;
/**
 * AI Platform Accelerator counts.
 * https://cloud.google.com/ai-platform/training/docs/using-gpus
 */
exports.ACCELERATOR_COUNTS_1_2_4_8 = [
    { value: '1', text: '1' },
    { value: '2', text: '2' },
    { value: '4', text: '4' },
    { value: '8', text: '8' },
];
/**
 * Convert nvidia-smi product_name type to match the AcceleratorType
 * enums that are used in the Notebooks API:
 * https://cloud.google.com/ai-platform/notebooks/docs/reference/rest/v1/projects.locations.instances#AcceleratorType
 * This is hardcoded because currently only 6 acceleratorTypes are being used
 * and no true mapping on nvidia-smi product_names to Notebooks API
 * AcceleratorType exists.
 */
const NVIDIA_TO_ACCELERATOR_TYPES = {
    'Tesla K80': { enumValue: 'NVIDIA_TESLA_K80' },
    'Tesla P4': { enumValue: 'NVIDIA_TESLA_P4' },
    'Tesla P100-PCIE-16GB': { enumValue: 'NVIDIA_TESLA_P100' },
    'Tesla T4': { enumValue: 'NVIDIA_TESLA_T4' },
    'Tesla V100-SXM2-16GB': { enumValue: 'NVIDIA_TESLA_V100' },
    'Tesla A100': { enumValue: 'NVIDIA_TESLA_A100' },
};
function nvidiaNameToEnum(name) {
    const accelerator = NVIDIA_TO_ACCELERATOR_TYPES[name];
    return accelerator ? accelerator.enumValue : exports.NO_ACCELERATOR_TYPE;
}
exports.nvidiaNameToEnum = nvidiaNameToEnum;
/**
 * Format gcloud compute acceleratorType to match the AcceleratorType
 * enums that are used in the Notebooks API and ensure it exists:
 */
function acceleratorNameToEnum(name) {
    const enumVal = name.toUpperCase().replace(/-/g, '_');
    const accelerator = exports.ACCELERATOR_TYPES.find(accelerator => accelerator.value === enumVal);
    return accelerator ? accelerator.value : exports.NO_ACCELERATOR_TYPE;
}
exports.acceleratorNameToEnum = acceleratorNameToEnum;
/*
 * Filter out invalid and restricted GPU types that can be attached to a virtual machine
 */
function getGpuTypeOptionsList(accelerators, cpuPlatform, machineType) {
    if (!accelerators || accelerators.length === 0)
        return exports.ACCELERATOR_TYPES;
    // For more information on gpu restrictions see: https://cloud.google.com/compute/docs/gpus#restrictions
    accelerators = accelerators.filter(accelerator => 
    // filter out virtual workstation accelerator types
    !accelerator.name.endsWith('-vws') &&
        // a minimum cpu platform of Intel Skylake or later does not currently support the k80 gpu
        !(accelerator.name === 'nvidia-tesla-k80' &&
            cpuPlatform === 'Intel Skylake'));
    // A100 GPU can only be attached to A2 machine types.
    if (machineType.name.startsWith(machine_types_1.A2_MACHINE_PREFIX)) {
        accelerators = accelerators.filter(accelerator => accelerator.name.endsWith(A100_GPU_NAME_SUFFIX));
    }
    else {
        accelerators = accelerators.filter(accelerator => !accelerator.name.endsWith(A100_GPU_NAME_SUFFIX));
    }
    return accelerators.map(accelerator => ({
        value: acceleratorNameToEnum(accelerator.name),
        text: accelerator.description,
    }));
}
exports.getGpuTypeOptionsList = getGpuTypeOptionsList;
/*
 * Generate a list of possible GPU count options for a specific GPU.
 */
function getGpuCountOptionsList(accelerators, acceleratorName) {
    if (!acceleratorName ||
        acceleratorName === exports.NO_ACCELERATOR_TYPE ||
        !accelerators)
        return exports.ACCELERATOR_COUNTS_1_2_4_8;
    const accelerator = accelerators.find(accelerator => acceleratorNameToEnum(accelerator.name) === acceleratorName);
    return accelerator
        ? exports.ACCELERATOR_COUNTS_1_2_4_8.slice(0, Math.log(accelerator.maximumCardsPerInstance) / Math.log(2) + 1)
        : exports.ACCELERATOR_COUNTS_1_2_4_8;
}
exports.getGpuCountOptionsList = getGpuCountOptionsList;
