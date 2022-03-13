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
exports.LocationSelector = void 0;
const core_1 = require("@material-ui/core");
const csstips = __importStar(require("csstips"));
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const learn_more_link_1 = require("../../components/shared/learn_more_link");
const select_input_1 = require("../../components/shared/select_input");
const service_provider_1 = require("../../service/service_provider");
const data_1 = require("../data");
const containerStyle = typestyle_1.style(Object.assign(Object.assign({}, csstips.horizontal), csstips.horizontallySpaced(24)));
const TRAINING_REGIONS_LINK = 'http://cloud/ai-platform/training/docs/regions';
class LocationSelector extends React.Component {
    constructor(props) {
        super(props);
        this.allLocations = data_1.LOCATIONS;
        this.state = this.getInitialState();
        this.onLocationChange = this.onLocationChange.bind(this);
    }
    componentDidMount() {
        this.initialize();
    }
    render() {
        const { regions, locations, region, location } = this.state;
        return (React.createElement("div", null,
            React.createElement(core_1.FormHelperText, null,
                "The location of the physical computing resources used for executions.",
                React.createElement(learn_more_link_1.LearnMoreLink, { text: "Learn more", href: TRAINING_REGIONS_LINK })),
            React.createElement("div", { className: containerStyle },
                React.createElement("div", { className: typestyle_1.style(Object.assign({}, csstips.flex)) },
                    React.createElement(select_input_1.SelectInput, { label: "Region", name: "region", value: region, options: regions, onChange: e => this.onRegionChange(e.target.value) })),
                React.createElement("div", { className: typestyle_1.style(Object.assign({}, csstips.flex)) },
                    React.createElement(select_input_1.SelectInput, { label: "Zone", name: "location", value: location, options: locations, onChange: e => this.onLocationChange(e.target.value) })))));
    }
    onRegionChange(region) {
        var _a;
        const locations = this.buildLocationsForRegion(region);
        const location = String((_a = locations[0]) === null || _a === void 0 ? void 0 : _a.value) || '';
        this.setState({ region, locations });
        this.onLocationChange(location);
    }
    onLocationChange(location) {
        this.setState({ location });
        this.props.onChange(location);
    }
    /** Initializes state based on all known locations. */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const { onChange } = this.props;
            this.allLocations = (yield service_provider_1.ServiceProvider.executorService.listLocations()).map(location => {
                return {
                    text: location.locationId || '',
                    value: location.locationId || '',
                };
            });
            const state = this.getInitialState();
            this.setState(state);
            onChange(state.location);
        });
    }
    /** Returns a fully initialized State based on all locations and default. */
    getInitialState() {
        const { gcpSettings } = this.props;
        const regions = this.buildRegions();
        const location = gcpSettings.location ||
            service_provider_1.ServiceProvider.executorService.locationId ||
            data_1.DEFAULT_LOCATION;
        const region = this.getRegionFromLocation(location);
        const locations = this.buildLocationsForRegion(region);
        return {
            regions,
            locations,
            region,
            location,
        };
    }
    buildRegions() {
        const regions = new Set();
        for (const l of this.allLocations) {
            regions.add(this.getRegionFromLocation(String(l.value)));
        }
        return Array.from(regions)
            .sort()
            .map(l => ({ text: l, value: l }));
    }
    buildLocationsForRegion(region) {
        return this.allLocations.filter(l => String(l.value).startsWith(region));
    }
    getRegionFromLocation(location) {
        const pieces = location.split('-');
        return pieces.slice(0, 2).join('-');
    }
}
exports.LocationSelector = LocationSelector;
