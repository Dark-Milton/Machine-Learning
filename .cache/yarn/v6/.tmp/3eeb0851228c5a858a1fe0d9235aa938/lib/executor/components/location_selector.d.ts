import * as React from 'react';
import { Option } from '../data';
import { GcpSettings } from './drawer';
interface Props {
    gcpSettings: GcpSettings;
    onChange: (value: string) => void;
}
interface State {
    regions: Option[];
    locations: Option[];
    region: string;
    location: string;
}
export declare class LocationSelector extends React.Component<Props, State> {
    private allLocations;
    constructor(props: Props);
    componentDidMount(): void;
    render(): JSX.Element;
    private onRegionChange;
    private onLocationChange;
    /** Initializes state based on all known locations. */
    private initialize;
    /** Returns a fully initialized State based on all locations and default. */
    private getInitialState;
    private buildRegions;
    private buildLocationsForRegion;
    private getRegionFromLocation;
}
export {};
