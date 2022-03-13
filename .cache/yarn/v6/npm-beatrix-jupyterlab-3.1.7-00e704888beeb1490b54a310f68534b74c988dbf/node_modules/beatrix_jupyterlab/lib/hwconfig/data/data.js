"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESHABLE_MAPPED_ATTRIBUTES = exports.MAPPED_ATTRIBUTES = exports.extractLast = exports.REGIONS = exports.NO_SUSTAINED_DISCOUNT_PREFIXES = exports.HOURS_PER_MONTH = exports.detailsToHardwareConfiguration = exports.isEqualHardwareConfiguration = void 0;
const release_info_1 = require("../../release_info");
const accelerator_types_1 = require("./accelerator_types");
function isEqualHardwareConfiguration(a, b) {
    return (a.machineType.name === b.machineType.name &&
        a.machineType.description === b.machineType.description &&
        a.attachGpu === b.attachGpu &&
        a.gpuType === b.gpuType &&
        a.gpuCount === b.gpuCount);
}
exports.isEqualHardwareConfiguration = isEqualHardwareConfiguration;
function detailsToHardwareConfiguration(details) {
    const { instance, gpu } = details;
    return {
        machineType: instance.machineType,
        attachGpu: Boolean(gpu.name),
        gpuType: accelerator_types_1.nvidiaNameToEnum(gpu.name),
        gpuCount: gpu.name ? gpu.count : accelerator_types_1.NO_ACCELERATOR_COUNT,
    };
}
exports.detailsToHardwareConfiguration = detailsToHardwareConfiguration;
/** The average number of hours in a month, i.e., 365 / 12 * 24 */
exports.HOURS_PER_MONTH = 730;
exports.NO_SUSTAINED_DISCOUNT_PREFIXES = ['e2-'];
exports.REGIONS = [
    {
        value: 'us-central1',
        text: 'us-central1 (Iowa)',
    },
    {
        value: 'us-east1',
        text: 'us-east1 (South Carolina)',
    },
    {
        value: 'us-east4',
        text: 'us-east4 (Northern Virginia)',
    },
    {
        value: 'us-west1',
        text: 'us-west1 (Oregon)',
    },
    {
        value: 'us-west2',
        text: 'us-west2 (Los Angeles)',
    },
    {
        value: 'us-west3',
        text: 'us-west3 (Salt Lake City)',
    },
    {
        value: 'asia-east1',
        text: 'asia-east1 (Taiwan)',
    },
    {
        value: 'europe-north1',
        text: 'europe-north1 (Finland)',
    },
    {
        value: 'europe-west1',
        text: 'europe-west1 (Belgium)',
    },
    {
        value: 'europe-west2',
        text: 'europe-west2 (London)',
    },
    {
        value: 'europe-west3',
        text: 'europe-west3 (Frankfurt)',
    },
    {
        value: 'europe-west4',
        text: 'europe-west4 (Netherlands)',
    },
    {
        value: 'europe-west6',
        text: 'europe-west6 (Zurich)',
    },
    {
        value: 'asia-east1',
        text: 'asia-east1 (Taiwan)',
    },
    {
        value: 'asia-east2',
        text: 'asia-east2 (Hong Kong)',
    },
    {
        value: 'asia-south1',
        text: 'asia-south1 (Mumbai)',
    },
    {
        value: 'asia-northeast1',
        text: 'asia-northeast1 (Tokyo)',
    },
    {
        value: 'asia-northeast2',
        text: 'asia-northeast2 (Osaka)',
    },
    {
        value: 'asia-northeast3',
        text: 'asia-northeast3 (Seoul)',
    },
    {
        value: 'asia-southeast1',
        text: 'asia-southeast1 (Singapore)',
    },
];
function extractLast(str) {
    const last = str.split('/').pop();
    return last;
}
exports.extractLast = extractLast;
// Displayable virtual machine detail attributes
exports.MAPPED_ATTRIBUTES = [
    {
        label: 'Notebook Name',
        mapper: (details) => details.instance.name,
    },
    {
        label: 'Project',
        mapper: (details) => details.project.projectId,
    },
    {
        label: 'Environment',
        mapper: (details) => details.instance.attributes.framework,
    },
    {
        label: 'Machine Type',
        mapper: (details) => `${details.instance.machineType.description} (${details.instance.machineType.name})`,
    },
    {
        label: 'GPU Type',
        mapper: (details) => {
            if (!details.gpu.name) {
                return 'No GPUs';
            }
            return `${details.gpu.name} x ${details.gpu.count}`;
        },
    },
    {
        label: 'Frontend Version',
        mapper: () => `${release_info_1.VERSION} (${release_info_1.COMMIT})`,
    },
];
exports.REFRESHABLE_MAPPED_ATTRIBUTES = [
    {
        label: 'CPU Utilization',
        mapper: (details) => `CPU: ${details.utilization.cpu.toFixed(1)}%`,
    },
    {
        label: 'Memory Utilization',
        mapper: (details) => `Memory: ${details.utilization.memory.toFixed(1)}%`,
    },
    {
        label: 'GPU Utilization',
        mapper: (details) => {
            if (!details.gpu.name) {
                return 'No GPUs';
            }
            return `GPU: ${details.gpu.gpu.toFixed(1)}%`;
        },
    },
];
exports.MAPPED_ATTRIBUTES.push(...exports.REFRESHABLE_MAPPED_ATTRIBUTES);
