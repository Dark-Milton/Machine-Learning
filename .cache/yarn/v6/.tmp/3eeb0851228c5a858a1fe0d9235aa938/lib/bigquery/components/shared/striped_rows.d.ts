/// <reference types="react" />
import { DetailRow } from '../details_panel/model_details_panel';
export declare const getStripedStyle: (index: number) => {
    background: string;
};
interface StripedRowsProps {
    rows: DetailRow[];
}
export declare const StripedRows: (props: StripedRowsProps) => JSX.Element;
export {};
