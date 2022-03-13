import * as React from 'react';
export declare const StyledTabs: React.ComponentType<any>;
export declare const StyledTab: React.ComponentType<StyledTabProps>;
interface StyledTabProps {
    label: string;
    color: string;
}
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    TabInds: any;
}
export declare function TabPanel(props: TabPanelProps): JSX.Element;
export {};
