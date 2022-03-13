"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENVIRONMENT_IMAGES = exports.BASE_PYTHON_CONTAINER = exports.CUSTOM_CONTAINER = void 0;
/** Helpers for UI selections */
const GCR_PREFIX = 'gcr.io/deeplearning-platform-release';
exports.CUSTOM_CONTAINER = {
    value: 'customContainer',
    text: 'Custom Container',
    searchKeywords: [],
};
/** Base Python container image */
exports.BASE_PYTHON_CONTAINER = `${GCR_PREFIX}/base-cpu:latest`;
/**
 * Environment images that can be used to schedule executions on Vertex AI.
 */
exports.ENVIRONMENT_IMAGES = [
    exports.CUSTOM_CONTAINER,
    {
        value: `${GCR_PREFIX}/tf-cpu.1-15:latest`,
        text: 'TensorFlow Enterprise 1.15 (CPU only)',
        searchKeywords: [GCR_PREFIX, 'tf', 'cpu', '1-15'],
    },
    {
        value: `${GCR_PREFIX}/tf-gpu.1-15:latest`,
        text: 'TensorFlow Enterprise 1.15 (GPU)',
        searchKeywords: [GCR_PREFIX, 'tf', 'gpu', '1-15'],
    },
    {
        value: `${GCR_PREFIX}/tf2-cpu.2-1:latest`,
        text: 'TensorFlow Enterprise 2.1 (CPU only)',
        searchKeywords: [GCR_PREFIX, 'tf', 'cpu', '2-1'],
    },
    {
        value: `${GCR_PREFIX}/tf2-gpu.2-1:latest`,
        text: 'TensorFlow Enterprise 2.1 (GPU)',
        searchKeywords: [GCR_PREFIX, 'tf', 'gpu', '2-1'],
    },
    {
        value: `${GCR_PREFIX}/tf2-cpu.2-3:latest`,
        text: 'TensorFlow Enterprise 2.3 (CPU only)',
        searchKeywords: [GCR_PREFIX, 'tf', 'cpu', '2-3'],
    },
    {
        value: `${GCR_PREFIX}/tf2-gpu.2-3:latest`,
        text: 'TensorFlow Enterprise 2.3 (GPU)',
        searchKeywords: [GCR_PREFIX, 'tf', 'gpu', '2-3'],
    },
    {
        value: `${GCR_PREFIX}/tf2-cpu.2-6:latest`,
        text: 'TensorFlow Enterprise 2.6 (CPU only)',
        searchKeywords: [GCR_PREFIX, 'tf', 'cpu', '2-6'],
    },
    {
        value: `${GCR_PREFIX}/tf2-gpu.2-6:latest`,
        text: 'TensorFlow Enterprise 2.6 (GPU)',
        searchKeywords: [GCR_PREFIX, 'tf', 'gpu', '2-6'],
    },
    {
        value: `${GCR_PREFIX}/pytorch-gpu.1-9:latest`,
        text: 'PyTorch 1.9 (GPU)',
        searchKeywords: [GCR_PREFIX, 'pytorch', 'gpu', '1-9'],
    },
    {
        value: `${GCR_PREFIX}/xgboost-cpu:latest`,
        text: 'RAPIDS XGBoost',
        searchKeywords: [GCR_PREFIX, 'xgboost', 'cpu'],
    },
    {
        value: `${GCR_PREFIX}/r-cpu.4-0:latest`,
        text: 'R 4.0 (with r-essentials)',
        searchKeywords: [GCR_PREFIX, 'r', 'cpu', '4-0'],
    },
    {
        value: exports.BASE_PYTHON_CONTAINER,
        text: 'Python 3',
        searchKeywords: [GCR_PREFIX, 'base-cpu'],
    },
    {
        value: `${GCR_PREFIX}/beam-notebooks:latest`,
        text: 'Apache Beam',
        searchKeywords: [GCR_PREFIX, 'beam-notebooks'],
    },
    {
        value: 'gcr.io/kaggle-gpu-images/python:latest',
        text: 'Kaggle (GPU)',
        searchKeywords: ['gcr.io', 'kaggle', 'gpu'],
    },
    {
        value: 'gcr.io/kaggle-images/python:latest',
        text: 'Kaggle (CPU)',
        searchKeywords: ['gcr.io', 'kaggle-images'],
    },
    {
        value: `${GCR_PREFIX}/base-cu110:latest`,
        text: 'CUDA Toolkit 11.0',
        searchKeywords: [GCR_PREFIX, 'base-cu110'],
    },
    {
        value: `${GCR_PREFIX}/base-cu101:latest`,
        text: 'CUDA Toolkit 10.1',
        searchKeywords: [GCR_PREFIX, 'base-cu101'],
    },
    {
        value: `${GCR_PREFIX}/base-cu100:latest`,
        text: 'CUDA Toolkit 10.0',
        searchKeywords: [GCR_PREFIX, 'base-cu100'],
    },
];
