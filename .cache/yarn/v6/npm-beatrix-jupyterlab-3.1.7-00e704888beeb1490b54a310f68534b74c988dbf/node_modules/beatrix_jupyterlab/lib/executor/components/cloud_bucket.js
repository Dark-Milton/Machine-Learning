"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudBucketSelector = void 0;
const icons_1 = require("@material-ui/icons");
const lab_1 = require("@material-ui/lab");
const react_1 = __importDefault(require("react"));
const field_error_1 = require("../../components/shared/field_error");
const styles_1 = require("../../styles");
const core_1 = require("@material-ui/core");
const service_provider_1 = require("../../service/service_provider");
const NO_BUCKET_SELECTION = 'Not selected';
const StyledAutoComplete = core_1.withStyles({
    option: Object.assign({}, styles_1.INPUT_TEXT_STYLE),
    input: Object.assign({}, styles_1.INPUT_TEXT_STYLE),
    inputRoot: Object.assign({}, styles_1.INPUT_TEXT_STYLE),
    root: {
        marginTop: '8px',
        marginBottom: '16px',
    },
})(lab_1.Autocomplete);
const filter = lab_1.createFilterOptions();
class CloudBucketSelector extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            isLoading: false,
            validBucketOptions: [],
            invalidBucketOptions: [],
            openSnackbar: false,
        };
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFilterOptions = this.handleFilterOptions.bind(this);
        this.handleGetOptionLabel = this.handleGetOptionLabel.bind(this);
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            this._getBuckets(this.props.gcsBucket);
        });
    }
    handleSnackbarClose() {
        this.setState({ openSnackbar: false });
    }
    handleChange(event, newValue, reason) {
        if (reason === 'create-option' || reason === 'select-option') {
            this.setValue(newValue || '');
        }
        else if (reason === 'remove-option' || reason === 'clear') {
            this.setValue('');
        }
    }
    handleFilterOptions(options, params) {
        const filtered = filter(options, params);
        // Suggest the creation of a new value
        if (params.inputValue !== '') {
            filtered.push({
                inputValue: params.inputValue,
                name: `Create and select "${params.inputValue}"`,
                accessLevel: 'uniform',
            });
        }
        return filtered;
    }
    handleGetOptionLabel(option) {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
            return option;
        }
        const bucketOption = option;
        // Add "xxx" option created dynamically
        if (bucketOption.inputValue) {
            return bucketOption.inputValue;
        }
        // Regular option
        return bucketOption.name;
    }
    render() {
        return (react_1.default.createElement(StyledAutoComplete, { value: this.state.value, onChange: this.handleChange, filterOptions: this.handleFilterOptions, selectOnFocus: true, clearOnBlur: true, handleHomeEndKeys: true, id: "cloud-bucket-with-create-option", options: this.state.validBucketOptions, getOptionLabel: this.handleGetOptionLabel, noOptionsText: NO_BUCKET_SELECTION, renderOption: option => option.name, freeSolo: true, size: "small", loading: this.state.isLoading, renderInput: params => (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(core_1.TextField, Object.assign({}, params, { name: "gcsBucket", variant: "outlined", margin: "dense", placeholder: NO_BUCKET_SELECTION, label: "Cloud Storage bucket", fullWidth: true, InputLabelProps: { shrink: true, style: styles_1.FORM_LABEL_STYLE }, error: this.state.error !== undefined })),
                !this.state.error && (react_1.default.createElement(core_1.FormHelperText, { style: styles_1.ALIGN_HINT }, "Where results are stored. Select an existing bucket or create a new one.")),
                react_1.default.createElement(field_error_1.FieldError, { message: this.state.error }),
                react_1.default.createElement(core_1.Snackbar, { open: this.state.openSnackbar, onClose: this.handleSnackbarClose, autoHideDuration: 6000, message: "Created bucket successfully", action: react_1.default.createElement(core_1.IconButton, { size: "small", "aria-label": "close", color: "inherit", onClick: this.handleSnackbarClose },
                        react_1.default.createElement(icons_1.Close, { fontSize: "small" })) }))) }));
    }
    _getBuckets(selectedBucketName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setState({ isLoading: true, error: undefined });
                const buckets = yield service_provider_1.ServiceProvider.executorService.listBuckets();
                const validBucketOptions = [];
                const invalidBucketOptions = [];
                let value = null;
                for (const bucket of buckets.buckets) {
                    if (bucket.accessLevel !== 'uniform') {
                        invalidBucketOptions.push(bucket);
                        continue;
                    }
                    validBucketOptions.push(bucket);
                    if (bucket.name === selectedBucketName) {
                        value = bucket;
                    }
                }
                this.setState({
                    isLoading: false,
                    validBucketOptions,
                    invalidBucketOptions,
                    value,
                });
                this.props.onGcsBucketChange(value ? value.name : '');
            }
            catch (err) {
                this.setState({
                    isLoading: false,
                    error: `Unable to retrieve Buckets: ${err}`,
                });
                this.props.onGcsBucketChange('');
            }
        });
    }
    createAndSelectBucket(bucketName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fineGrain = this.state.invalidBucketOptions.find(bucket => bucket.name === bucketName);
                if (!fineGrain) {
                    yield service_provider_1.ServiceProvider.executorService.createUniformAccessBucket(bucketName);
                    this.props.onGcsBucketChange(bucketName);
                    this._getBuckets(bucketName);
                    this.setState({ openSnackbar: true });
                    return;
                }
                this.setState({
                    value: null,
                    error: 'A bucket with incompatible access controls already exists with that name',
                });
                this.props.onGcsBucketChange('');
            }
            catch (err) {
                this.setState({ value: null, error: `${err}` });
                this.props.onGcsBucketChange('');
            }
        });
    }
    setValue(newValue) {
        this.setState({ error: undefined });
        if (!newValue) {
            this.setState({
                value: null,
                error: 'A bucket is required to store results',
            });
            this.props.onGcsBucketChange('');
            return;
        }
        else if (typeof newValue === 'string') {
            const existingBucket = this.state.validBucketOptions.find(bucket => bucket.name === newValue);
            if (!existingBucket) {
                this.createAndSelectBucket(newValue);
            }
            else {
                this.setState({ value: existingBucket });
                this.props.onGcsBucketChange(newValue);
            }
        }
        else {
            const newBucketName = newValue.inputValue;
            if (newBucketName) {
                this.createAndSelectBucket(newBucketName);
            }
            else {
                this.setState({ value: newValue });
                this.props.onGcsBucketChange(newValue.name);
            }
        }
    }
}
exports.CloudBucketSelector = CloudBucketSelector;
