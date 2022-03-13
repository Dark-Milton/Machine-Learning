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
exports.MonthScheduleBuilder = void 0;
const core_1 = require("@material-ui/core");
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const select_input_1 = require("../../../components/shared/select_input");
const text_input_1 = require("../../../components/shared/text_input");
const validation_error_1 = require("../../../components/shared/validation_error");
const styles_1 = require("../../../styles");
const data_1 = require("../../data");
const localStyles = typestyle_1.stylesheet({
    hint: {
        color: styles_1.COLORS.caption,
        marginTop: '5px',
        fontSize: '12px',
        marginLeft: '5px',
    },
    hintSpacing: {
        marginTop: '5px !important',
    },
});
class MonthScheduleBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            frequency: '1',
            specifiedTime: '12:00',
            specifiedDay: '1',
        };
        this._createCronString = this._createCronString.bind(this);
    }
    componentDidMount() {
        this.props.onScheduleChange(this._createCronString());
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.frequencyType === this.props.frequencyType) {
            if (prevState.frequency !== this.state.frequency ||
                prevState.specifiedTime !== this.state.specifiedTime ||
                prevState.specifiedDay !== this.state.specifiedDay) {
                this.props.onScheduleChange(this._createCronString());
            }
        }
    }
    _createCronString() {
        const { frequency, specifiedDay, specifiedTime } = this.state;
        if (!frequency ||
            !specifiedTime ||
            !specifiedDay ||
            Number(specifiedDay) < 0 ||
            Number(specifiedDay) > 31) {
            return '';
        }
        const minute = specifiedTime.trim().split(':')[1];
        const hour = specifiedTime.trim().split(':')[0];
        return (minute +
            ' ' +
            hour +
            ' ' +
            specifiedDay.trim() +
            ' */' +
            frequency.trim() +
            ' *');
    }
    render() {
        return (React.createElement(core_1.Grid, { container: true, spacing: 1, className: styles_1.CSS.gridSpacing },
            React.createElement(core_1.Grid, { item: true, xs: 3, className: styles_1.CSS.gridTopRowSpacing },
                React.createElement("p", { className: styles_1.CSS.scheduleLabel },
                    React.createElement("span", { className: styles_1.CSS.bold }, "Repeat every"))),
            React.createElement(core_1.Grid, { item: true, xs: 2, className: styles_1.CSS.gridTopRowSpacing },
                React.createElement(select_input_1.SelectInput, { name: "frequency", value: this.state.frequency, onChange: e => this.setState({ frequency: e.target.value }), options: data_1.MONTH_FREQUENCIES })),
            React.createElement(core_1.Grid, { item: true, xs: 7, className: styles_1.CSS.gridTopRowSpacing },
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
            React.createElement(core_1.Grid, { item: true, xs: 1, className: styles_1.CSS.gridSpacing },
                React.createElement("p", { className: styles_1.CSS.scheduleLabel }, "day")),
            React.createElement(core_1.Grid, { item: true, xs: 2, className: styles_1.CSS.gridSpacing },
                React.createElement(text_input_1.TextInput, { name: "specifiedDay", type: "number", min: "1", max: "31", value: this.state.specifiedDay, hasError: !this.state.specifiedDay, onChange: e => this.setState({ specifiedDay: e.target.value }) })),
            React.createElement(core_1.Grid, { item: true, xs: 6, className: styles_1.CSS.gridSpacing }),
            React.createElement(core_1.Grid, { item: true, xs: 3, className: styles_1.CSS.gridSpacing }),
            React.createElement(core_1.Grid, { item: true, xs: 9, className: styles_1.CSS.gridSpacing },
                React.createElement("div", { className: localStyles.hint }, "If it exceeds the range of a month, no executions will be triggered for that month. E.g., February will be skipped if day 31 is selected.")),
            React.createElement(core_1.Grid, { item: true, xs: 12, className: typestyle_1.classes(styles_1.CSS.gridSpacing, localStyles.hintSpacing) },
                React.createElement(validation_error_1.CheckValidation, { min: 1, max: 31, fieldName: 'Repeat (day)', required: true, value: this.state.specifiedDay }))));
    }
}
exports.MonthScheduleBuilder = MonthScheduleBuilder;
