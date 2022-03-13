"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentSelector = void 0;
const React = __importStar(require("react"));
const service_provider_1 = require("../../service/service_provider");
const select_input_1 = require("./select_input");
const text_input_1 = require("./text_input");
const environment_data_1 = require("../../environment_data");
/** Component for selecting the container image to use in the training job. */
function EnvironmentSelector({ notebook, onChange }) {
    const [customContainerImageUri, setCustomContainerImageUri] = React.useState('');
    const [customContainerError, setCustomContainerError] = React.useState('');
    const [imageUri, setImageUri] = React.useState('');
    const [kernelName, setKernelName] = React.useState('');
    function initializeImageUri() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let value = imageUri;
            if (!value) {
                // Infer from kernelspec
                const kernelSpec = notebook.metadata.get('kernelspec');
                const kernelSpecName = kernelSpec ? kernelSpec['name'] : '';
                if (kernelSpecName) {
                    // Local kernels will have the local prefix in managed notebooks
                    if (kernelSpecName.startsWith('local-')) {
                        const kernelDetails = yield service_provider_1.ServiceProvider.environmentService.getKernelDetails(kernelSpecName);
                        if (kernelDetails && kernelDetails.container) {
                            value = kernelDetails.container;
                            setKernelName((_a = kernelDetails.googleKernelName) !== null && _a !== void 0 ? _a : '');
                        }
                    }
                }
                else {
                    // Infer from notebook metadata
                    const environment = notebook.metadata.get('environment');
                    if (environment && environment['uri']) {
                        value = environment['uri'];
                    }
                }
            }
            // If value is set, try to find a standard image or fall back to custom
            if (value) {
                const imageUriWithoutVersionTag = value.split(':').shift() || '';
                // Check if all searchKeywords are in the current imageUri if any one is missing move on
                // to the next environment image
                let match = '';
                for (const env of environment_data_1.ENVIRONMENT_IMAGES.slice(1)) {
                    if (env.searchKeywords.every(k => imageUriWithoutVersionTag.includes(k))) {
                        match = String(env.value);
                    }
                }
                if (match) {
                    setImageUri(match);
                }
                else {
                    setCustomContainerImageUri(value);
                    setImageUri(String(environment_data_1.CUSTOM_CONTAINER.value));
                }
            }
            else {
                setImageUri(environment_data_1.BASE_PYTHON_CONTAINER);
            }
        });
    }
    // Initialize imageUri upon mounting
    React.useEffect(() => {
        initializeImageUri();
    }, []);
    // Validate selectors upon changes
    React.useEffect(() => {
        if (imageUri === String(environment_data_1.CUSTOM_CONTAINER.value) &&
            !customContainerImageUri) {
            setCustomContainerError('A docker container image must be provided for a custom container');
        }
        else {
            setCustomContainerError('');
            onChange({ imageUri, customContainerImageUri, kernelName });
        }
    }, [imageUri, customContainerImageUri]);
    return (React.createElement(React.Fragment, null,
        React.createElement(select_input_1.SelectInput, { label: "Environment", name: "imageUri", value: imageUri, options: environment_data_1.ENVIRONMENT_IMAGES, onChange: e => void setImageUri(e.target.value) }),
        imageUri === environment_data_1.CUSTOM_CONTAINER.value && (React.createElement(text_input_1.TextInput, { label: "Docker container image", name: "customContainerImageUri", value: customContainerImageUri, placeholder: "Docker container image uri", hasError: !!customContainerError, error: customContainerError, onChange: e => void setCustomContainerImageUri(e.target.value) }))));
}
exports.EnvironmentSelector = EnvironmentSelector;
