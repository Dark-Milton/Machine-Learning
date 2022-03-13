import * as React from 'react';
import { CardInfo, UserValues } from '../interfaces';
export declare const cardInfos: CardInfo[];
interface Props {
    isAPIEnabled: boolean;
    onAPIEnabled: () => void;
}
interface State {
    userValues?: UserValues;
}
/** Tab for displaying links to docs and landing pages and user info. */
export declare class DashboardTab extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    render(): JSX.Element;
    private _getLearnMoreCard;
    private _getTableRow;
}
export {};
