"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMachineTypeConfigurations = exports.machineTypeToBaseName = exports.getMachineTypeText = exports.A2_MACHINE_PREFIX = exports.N1_MACHINE_PREFIX = exports.MACHINE_TYPES = exports.machineTypeToOption = exports.optionToMachineType = void 0;
function optionToMachineType(option) {
    return {
        name: option.value,
        description: option.text,
    };
}
exports.optionToMachineType = optionToMachineType;
function machineTypeToOption(machineType) {
    return {
        value: machineType.name,
        text: machineType.description,
    };
}
exports.machineTypeToOption = machineTypeToOption;
exports.MACHINE_TYPES = [
    {
        base: {
            value: 'n1-standard-',
            text: 'N1 standard',
        },
        configurations: [
            { value: 'n1-standard-1', text: '1 vCPUs, 3.75 GB RAM' },
            { value: 'n1-standard-2', text: '2 vCPUs, 7.5 GB RAM' },
            { value: 'n1-standard-4', text: '4 vCPUs, 15 GB RAM' },
            { value: 'n1-standard-8', text: '8 vCPUs, 30 GB RAM' },
            { value: 'n1-standard-16', text: '16 vCPUs, 60 GB RAM' },
            { value: 'n1-standard-32', text: '32 vCPUs, 120 GB RAM' },
            { value: 'n1-standard-64', text: '64 vCPUs, 240 GB RAM' },
            { value: 'n1-standard-96', text: '96 vCPUs, 360 GB RAM' },
        ],
    },
    {
        base: {
            value: 'e2-highcpu-',
            text: 'E2 high-CPU',
        },
        configurations: [
            { value: 'e2-highcpu-2', text: 'Efficient Instance, 2 vCPUs, 2 GB RAM' },
            { value: 'e2-highcpu-4', text: 'Efficient Instance, 4 vCPUs, 4 GB RAM' },
            { value: 'e2-highcpu-8', text: 'Efficient Instance, 8 vCPUs, 8 GB RAM' },
            {
                value: 'e2-highcpu-16',
                text: 'Efficient Instance, 16 vCPUs, 16 GB RAM',
            },
            {
                value: 'e2-highcpu-32',
                text: 'Efficient Instance, 32 vCPUs, 32 GB RAM',
            },
        ],
    },
    {
        base: {
            value: 'e2-highmem-',
            text: 'E2 high-memory',
        },
        configurations: [
            { value: 'e2-highmem-2', text: 'Efficient Instance, 2 vCPUs, 16 GB RAM' },
            { value: 'e2-highmem-4', text: 'Efficient Instance, 4 vCPUs, 32 GB RAM' },
            { value: 'e2-highmem-8', text: 'Efficient Instance, 8 vCPUs, 64 GB RAM' },
            {
                value: 'e2-highmem-16',
                text: 'Efficient Instance, 16 vCPUs, 128 GB RAM',
            },
        ],
    },
    {
        base: {
            value: 'e2-standard-',
            text: 'E2 standard',
        },
        configurations: [
            { value: 'e2-standard-2', text: 'Efficient Instance, 2 vCPUs, 8 GB RAM' },
            {
                value: 'e2-standard-4',
                text: 'Efficient Instance, 4 vCPUs, 16 GB RAM',
            },
            {
                value: 'e2-standard-8',
                text: 'Efficient Instance, 8 vCPUs, 32 GB RAM',
            },
            {
                value: 'e2-standard-16',
                text: 'Efficient Instance, 16 vCPUs, 64 GB RAM',
            },
            {
                value: 'e2-standard-32',
                text: 'Efficient Instance, 32 vCPUs, 128 GB RAM',
            },
        ],
    },
    {
        base: {
            value: 'n1-highcpu-',
            text: 'N1 high-CPU',
        },
        configurations: [
            { value: 'n1-highcpu-2', text: '2 vCPUs, 1.8 GB RAM' },
            { value: 'n1-highcpu-4', text: '4 vCPUs, 3.6 GB RAM' },
            { value: 'n1-highcpu-8', text: '8 vCPUs, 7.2 GB RAM' },
            { value: 'n1-highcpu-16', text: '16 vCPUs, 14.4 GB RAM' },
            { value: 'n1-highcpu-32', text: '32 vCPUs, 28.8 GB RAM' },
            { value: 'n1-highcpu-64', text: '64 vCPUs, 57.6 GB RAM' },
            { value: 'n1-highcpu-96', text: '96 vCPUs, 86 GB RAM' },
        ],
    },
    {
        base: {
            value: 'n1-highmem-',
            text: 'N1 high-memory',
        },
        configurations: [
            { value: 'n1-highmem-2', text: '2 vCPUs, 13 GB RAM' },
            { value: 'n1-highmem-4', text: '4 vCPUs, 26 GB RAM' },
            { value: 'n1-highmem-8', text: '8 vCPUs, 52 GB RAM' },
            { value: 'n1-highmem-16', text: '16 vCPUs, 104 GB RAM' },
            { value: 'n1-highmem-32', text: '32 vCPUs, 208 GB RAM' },
            { value: 'n1-highmem-64', text: '64 vCPUs, 416 GB RAM' },
            { value: 'n1-highmem-96', text: '96 vCPUs, 624 GB RAM' },
        ],
    },
    {
        base: {
            value: 'n1-megamem-',
            text: 'N1 megamem',
        },
        configurations: [{ value: 'n1-megamem-96', text: '96 vCPUs, 1.4 TB RAM' }],
    },
    {
        base: {
            value: 'n1-ultramem-',
            text: 'N1 ultramem',
        },
        configurations: [
            { value: 'n1-ultramem-40', text: '40 vCPUs, 961 GB RAM' },
            { value: 'n1-ultramem-80', text: '80 vCPUs, 1922 GB RAM' },
            { value: 'n1-ultramem-160', text: '160 vCPUs, 3844 GB RAM' },
        ],
    },
    {
        base: {
            value: 'n2-highcpu-',
            text: 'N2 high-CPU',
        },
        configurations: [
            { value: 'n2-highcpu-2', text: '2 vCPUs, 2 GB RAM' },
            { value: 'n2-highcpu-4', text: '4 vCPUs, 4 GB RAM' },
            { value: 'n2-highcpu-8', text: '8 vCPUs, 8 GB RAM' },
            { value: 'n2-highcpu-16', text: '16 vCPUs, 16 GB RAM' },
            { value: 'n2-highcpu-32', text: '32 vCPUs, 32 GB RAM' },
            { value: 'n2-highcpu-48', text: '48 vCPUs, 48 GB RAM' },
            { value: 'n2-highcpu-64', text: '64 vCPUs, 64 GB RAM' },
            { value: 'n2-highcpu-80', text: '80 vCPUs, 80 GB RAM' },
        ],
    },
    {
        base: {
            value: 'n2-highmem-',
            text: 'N2 high-memory',
        },
        configurations: [
            { value: 'n2-highmem-2', text: '2 vCPUs, 16 GB RAM' },
            { value: 'n2-highmem-4', text: '4 vCPUs, 32 GB RAM' },
            { value: 'n2-highmem-8', text: '8 vCPUs, 64 GB RAM' },
            { value: 'n2-highmem-16', text: '16 vCPUs, 128 GB RAM' },
            { value: 'n2-highmem-32', text: '32 vCPUs, 256 GB RAM' },
            { value: 'n2-highmem-48', text: '48 vCPUs, 384 GB RAM' },
            { value: 'n2-highmem-64', text: '64 vCPUs, 512 GB RAM' },
            { value: 'n2-highmem-80', text: '80 vCPUs, 640 GB RAM' },
        ],
    },
    {
        base: {
            value: 'n2-standard-',
            text: 'N2 standard',
        },
        configurations: [
            { value: 'n2-standard-2', text: '2 vCPUs, 8 GB RAM' },
            { value: 'n2-standard-4', text: '4 vCPUs, 16 GB RAM' },
            { value: 'n2-standard-8', text: '8 vCPUs, 32 GB RAM' },
            { value: 'n2-standard-16', text: '16 vCPUs, 64 GB RAM' },
            { value: 'n2-standard-32', text: '32 vCPUs, 128 GB RAM' },
            { value: 'n2-standard-48', text: '48 vCPUs, 192 GB RAM' },
            { value: 'n2-standard-64', text: '64 vCPUs, 256 GB RAM' },
            { value: 'n2-standard-80', text: '80 vCPUs, 320 GB RAM' },
        ],
    },
    {
        base: {
            value: 'c2-',
            text: 'Compute-optimized',
        },
        configurations: [
            { value: 'c2-standard-4', text: 'Compute Optimized: 4 vCPUs, 16 GB RAM' },
            { value: 'c2-standard-8', text: 'Compute Optimized: 8 vCPUs, 32 GB RAM' },
            {
                value: 'c2-standard-16',
                text: 'Compute Optimized: 16 vCPUs, 64 GB RAM',
            },
            {
                value: 'c2-standard-30',
                text: 'Compute Optimized: 30 vCPUs, 120 GB RAM',
            },
            {
                value: 'c2-standard-60',
                text: 'Compute Optimized: 60 vCPUs, 240 GB RAM',
            },
        ],
    },
    {
        base: {
            value: 'm1-',
            text: 'Memory-optimized',
        },
        configurations: [
            { value: 'm1-ultramem-40', text: '40 vCPUs, 961 GB RAM' },
            { value: 'm1-ultramem-80', text: '80 vCPUs, 1922 GB RAM' },
            { value: 'm1-megamem-96', text: '96 vCPUs, 1.4 TB RAM' },
            { value: 'm1-ultramem-160', text: '160 vCPUs, 3844 GB RAM' },
        ],
    },
];
/** Prefix of the names of N1 machine types */
exports.N1_MACHINE_PREFIX = 'n1-';
/** Prefix of the names of A2 machine types */
exports.A2_MACHINE_PREFIX = 'a2-';
/**
 * Get description text from Machine Type value
 */
function getMachineTypeText(value, machineTypes) {
    if (!machineTypes || machineTypes.length === 0) {
        machineTypes = exports.MACHINE_TYPES;
    }
    const machineType = machineTypes.find(machineType => value.startsWith(machineType.base.value));
    const configuration = machineType &&
        machineType.configurations.find(configuration => configuration.value === value);
    return configuration ? configuration.text : value;
}
exports.getMachineTypeText = getMachineTypeText;
function machineTypeToBaseName(machineTypeName) {
    // Group all variations of memory-optimized or compute-optimized machine types together
    if (machineTypeName.startsWith('m1'))
        return 'm1-';
    if (machineTypeName.startsWith('c2'))
        return 'c2-';
    if (machineTypeName.lastIndexOf('-') === -1)
        return machineTypeName;
    return machineTypeName.substring(0, machineTypeName.lastIndexOf('-') + 1);
}
exports.machineTypeToBaseName = machineTypeToBaseName;
/**
 * If a new family of machineTypes needs to be supported it must be
 * added to this mapping
 */
const BASE_NAME_TO_DISPLAY_TEXT = {
    'a2-highgpu-': 'A2 highgpu',
    'a2-megagpu-': 'A2 megagpu',
    'e2-highcpu-': 'E2 high-CPU',
    'e2-highmem-': 'E2 high-memory',
    'e2-standard-': 'E2 standard',
    'n1-standard-': 'N1 standard',
    'n1-highcpu-': 'N1 high-CPU',
    'n1-highmem-': 'N1 high-memory',
    'n1-megamem-': 'N1 megamem',
    'n1-ultramem-': 'N1 ultramem',
    'n2-highcpu-': 'N2 high-CPU',
    'n2-highmem-': 'N2 high-memory',
    'n2-standard-': 'N2 standard',
    'n2d-highcpu-': 'N2D high-CPU',
    'n2d-highmem-': 'N2D high-memory',
    'n2d-standard-': 'N2D standard',
    'c2-': 'Compute-optimized',
    'm1-': 'Memory-optimized',
};
/**
 * Converts a list of MachineTypes retrieved using the compute API
 * into a list of MachineTypeConfiguration to be used by the
 * machine type select dropdown in the hardware scaling form.
 */
function getMachineTypeConfigurations(machineTypes) {
    if (!machineTypes || machineTypes.length === 0)
        return exports.MACHINE_TYPES;
    const map = new Map();
    const machineTypeOptions = [];
    const defaultMachineType = [];
    const optimizedMachineTypes = [];
    // Group machine types by their base-name
    machineTypes.map(machineType => {
        var _a;
        const key = machineTypeToBaseName(machineType.name || '');
        if (!map.has(key)) {
            map.set(key, []);
        }
        (_a = map.get(key)) === null || _a === void 0 ? void 0 : _a.push(machineType);
    });
    map.forEach(function (value, key) {
        // Sort configurations in ascending order of their number of guest CPUs
        value.sort((a, b) => (a.guestCpus ? a.guestCpus : 0) - (b.guestCpus ? b.guestCpus : 0));
        const configurations = value.map(item => {
            return machineTypeToOption({
                name: item.name || '',
                description: item.description || '',
            });
        });
        const obj = {
            base: {
                value: key,
                text: BASE_NAME_TO_DISPLAY_TEXT[key],
            },
            configurations: configurations,
        };
        // To ensure the different machine type configurations are displayed in a specific order
        switch (key) {
            case 'n1-standard-':
                defaultMachineType.push(obj);
                break;
            case 'c2-':
            case 'm1-':
                optimizedMachineTypes.push(obj);
                break;
            default:
                machineTypeOptions.push(obj);
        }
    });
    return defaultMachineType.concat(machineTypeOptions, optimizedMachineTypes);
}
exports.getMachineTypeConfigurations = getMachineTypeConfigurations;
