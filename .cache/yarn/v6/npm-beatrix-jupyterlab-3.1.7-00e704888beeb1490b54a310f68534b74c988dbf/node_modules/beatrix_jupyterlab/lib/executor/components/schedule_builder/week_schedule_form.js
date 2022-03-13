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
exports.WeekScheduleBuilder = void 0;
const core_1 = require("@material-ui/core");
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const checkbox_input_1 = require("../../../components/shared/checkbox_input");
const field_error_1 = require("../../../components/shared/field_error");
const select_input_1 = require("../../../components/shared/select_input");
const text_input_1 = require("../../../components/shared/text_input");
const validation_error_1 = require("../../../components/shared/validation_error");
const styles_1 = require("../../../styles");
const data_1 = require("../../data");
const localStyles = typestyle_1.stylesheet({
    topAlign: {
        marginTop: '16px',
    },
});
class WeekScheduleBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            specifiedTime: '09:00',
            mondayExecution: false,
            tuesdayExecution: false,
            wednesdayExecution: false,
            thursdayExecution: false,
            fridayExecution: false,
            saturdayExecution: false,
            sundayExecution: false,
        };
        this._listOfDays = this._listOfDays.bind(this);
        this._createCronString = this._createCronString.bind(this);
        this._areAnyDaysSelected = this._areAnyDaysSelected.bind(this);
        this._convertDaysOfWeektoString =
            this._convertDaysOfWeektoString.bind(this);
        this._createCheckboxes = this._createCheckboxes.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.frequencyType === this.props.frequencyType) {
            if (prevState.specifiedTime !== this.state.specifiedTime ||
                prevState.mondayExecution !== this.state.mondayExecution ||
                prevState.tuesdayExecution !== this.state.tuesdayExecution ||
                prevState.wednesdayExecution !== this.state.wednesdayExecution ||
                prevState.thursdayExecution !== this.state.thursdayExecution ||
                prevState.fridayExecution !== this.state.fridayExecution ||
                prevState.sundayExecution !== this.state.sundayExecution ||
                prevState.saturdayExecution !== this.state.saturdayExecution) {
                this.props.onScheduleChange(this._createCronString());
            }
        }
    }
    _listOfDays() {
        return [
            this.state.sundayExecution,
            this.state.mondayExecution,
            this.state.tuesdayExecution,
            this.state.wednesdayExecution,
            this.state.thursdayExecution,
            this.state.fridayExecution,
            this.state.saturdayExecution,
        ];
    }
    _areAnyDaysSelected() {
        const selected = (element) => element === true;
        if (!this._listOfDays().some(selected)) {
            return false;
        }
        return true;
    }
    _convertDaysOfWeektoString() {
        let week = '';
        const values = this._listOfDays();
        for (let i = 0; i < data_1.DAYS_OF_WEEK.length; i++) {
            if (values[i]) {
                if (week) {
                    week += ',' + String(i);
                }
                else {
                    week += String(i);
                }
            }
        }
        return week;
    }
    _createCronString() {
        const { specifiedTime } = this.state;
        if (!specifiedTime || !this._areAnyDaysSelected()) {
            return '';
        }
        const minute = specifiedTime.trim().split(':')[1];
        const hour = specifiedTime.trim().split(':')[0];
        const week = this._convertDaysOfWeektoString();
        return minute + ' ' + hour + ' * * ' + week;
    }
    _createCheckboxes() {
        return data_1.DAYS_OF_WEEK.map((day, i) => {
            const name = String(day.value);
            const value = this._listOfDays()[i % 7];
            return (React.createElement(checkbox_input_1.CheckboxInput, { key: name, name: name, label: day.text, checked: value, onChange: e => this.setState({
                    [String(name)]: e.target.checked,
                }) }));
        });
    }
    render() {
        return (React.createElement(core_1.Grid, { container: true, spacing: 1, className: styles_1.CSS.gridSpacing },
            React.createElement(core_1.Grid, { item: true, xs: 3, className: styles_1.CSS.gridTopRowSpacing },
                React.createElement("p", { className: styles_1.CSS.scheduleLabel },
                    React.createElement("span", { className: styles_1.CSS.bold }, "Repeat every"))),
            React.createElement(core_1.Grid, { item: true, xs: 9, className: styles_1.CSS.gridTopRowSpacing },
                React.createElement(select_input_1.SelectInput, { name: "frequencyType", value: this.props.frequencyType, options: data_1.FREQUENCY_TYPES, onChange: e => this.props.onChangeFrequencyType(e.target.value) })),
            React.createElement(core_1.Grid, { item: true, xs: 3, className: styles_1.CSS.gridSpacing },
                React.createElement("p", { className: styles_1.CSS.scheduleLabel },
                    React.createElement("span", { className: styles_1.CSS.bold }, "Repeat at"))),
            React.createElement(core_1.Grid, { item: true, xs: 9, className: styles_1.CSS.gridSpacing },
                React.createElement(text_input_1.TextInput, { name: "specifiedTime", type: "time", value: this.state.specifiedTime, hasError: !this.state.specifiedTime, onChange: e => this.setState({ specifiedTime: e.target.value }) })),
            React.createElement(core_1.Grid, { item: true, xs: 12, className: styles_1.CSS.gridSpacing },
                React.createElement(validation_error_1.CheckValidation, { fieldName: 'Repeat at', required: true, value: this.state.specifiedTime })),
            React.createElement(core_1.Grid, { item: true, xs: 3, className: styles_1.CSS.gridSpacing },
                React.createElement("p", { className: styles_1.CSS.scheduleLabel },
                    React.createElement("span", { className: styles_1.CSS.bold }, "Repeat on"))),
            React.createElement(core_1.Grid, { item: true, xs: 9, className: styles_1.CSS.gridSpacing },
                React.createElement("div", { className: typestyle_1.classes(styles_1.CSS.scheduleBuilderRow, localStyles.topAlign) }, this._createCheckboxes())),
            React.createElement(core_1.Grid, { item: true, xs: 12, className: styles_1.CSS.gridSpacing }, !this._areAnyDaysSelected() && (React.createElement("div", { className: styles_1.CSS.errorRow },
                React.createElement(field_error_1.FieldError, { message: "At least one day is required" }))))));
    }
}
exports.WeekScheduleBuilder = WeekScheduleBuilder;
