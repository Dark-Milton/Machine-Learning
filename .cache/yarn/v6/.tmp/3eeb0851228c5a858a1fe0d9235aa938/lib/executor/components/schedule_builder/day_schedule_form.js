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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayScheduleBuilder = void 0;
const core_1 = require("@material-ui/core");
const React = __importStar(require("react"));
const select_input_1 = require("../../../components/shared/select_input");
const text_input_1 = require("../../../components/shared/text_input");
const validation_error_1 = require("../../../components/shared/validation_error");
const styles_1 = require("../../../styles");
const data_1 = require("../../data");
class DayScheduleBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = { frequency: '1', specifiedTime: '14:00' };
        this._createCronString = this._createCronString.bind(this);
    }
    componentDidMount() {
        this.props.onScheduleChange(this._createCronString());
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.frequencyType === this.props.frequencyType) {
            if (prevState.frequency !== this.state.frequency ||
                prevState.specifiedTime !== this.state.specifiedTime) {
                this.props.onScheduleChange(this._createCronString());
            }
        }
    }
    _createCronString() {
        const { frequency, specifiedTime } = this.state;
        if (!frequency || !specifiedTime) {
            return '';
        }
        if (Number(frequency) < 1 || Number(frequency) > 364) {
            return '';
        }
        const minute = specifiedTime.trim().split(':')[1];
        const hour = specifiedTime.trim().split(':')[0];
        return minute + ' ' + hour + ' */' + frequency.trim() + ' * *';
    }
    render() {
        return (React.createElement(core_1.Grid, { container: true, spacing: 1, className: styles_1.CSS.gridSpacing },
            React.createElement(core_1.Grid, { item: true, xs: 3, className: styles_1.CSS.gridTopRowSpacing },
                React.createElement("p", { className: styles_1.CSS.scheduleLabel },
                    React.createElement("span", { className: styles_1.CSS.bold }, "Repeat every"))),
            React.createElement(core_1.Grid, { item: true, xs: 2, className: styles_1.CSS.gridTopRowSpacing },
                React.createElement(text_input_1.TextInput, { name: "frequency", type: "number", min: "1", max: "365", value: this.state.frequency, hasError: !this.state.frequency, onChange: e => this.setState({ frequency: e.target.value }) })),
            React.createElement(core_1.Grid, { item: true, xs: 7, className: styles_1.CSS.gridTopRowSpacing },
                React.createElement(select_input_1.SelectInput, { name: "frequencyType", value: this.props.frequencyType, options: data_1.FREQUENCY_TYPES, onChange: e => this.props.onChangeFrequencyType(e.target.value) })),
            React.createElement(core_1.Grid, { item: true, xs: 12, className: styles_1.CSS.gridSpacing },
                React.createElement(validation_error_1.CheckValidation, { min: 1, max: 364, fieldName: 'Frequency', required: true, value: this.state.frequency })),
            React.createElement(core_1.Grid, { item: true, xs: 3, className: styles_1.CSS.gridSpacing },
                React.createElement("p", { className: styles_1.CSS.scheduleLabel },
                    React.createElement("span", { className: styles_1.CSS.bold }, "Repeat at"))),
            React.createElement(core_1.Grid, { item: true, xs: 9, className: styles_1.CSS.gridSpacing },
                React.createElement(text_input_1.TextInput, { name: "specifiedTime", type: "time", value: this.state.specifiedTime, hasError: !this.state.specifiedTime, onChange: e => this.setState({ specifiedTime: e.target.value }) })),
            React.createElement(core_1.Grid, { item: true, xs: 12, className: styles_1.CSS.gridSpacing },
                React.createElement(validation_error_1.CheckValidation, { fieldName: 'Repeat at', required: true, value: this.state.specifiedTime }))));
    }
}
exports.DayScheduleBuilder = DayScheduleBuilder;
