import { CSSProperties } from 'react';
/** Theme colors. */
export declare const COLORS: {
    base: string;
    caption: string;
    blue: string;
    border: string;
    green: string;
    input: string;
    link: string;
    red: string;
    white: string;
    inverse: string;
    secondary: string;
    error: string;
    focus: string;
    line: string;
};
export declare const FONT_SIZE: {
    text: string;
    heading: string;
};
/** Base extension font style */
export declare const BASE_FONT: {
    color: string;
    fontFamily: string;
    fontSize: string;
};
export declare const INPUT_TEXT_STYLE: {
    fontFamily: string;
    fontSize: string;
    color: string;
};
export declare const ALIGN_HINT: CSSProperties;
export declare const FORM_LABEL_STYLE: CSSProperties;
/** Global styles that are useful across components */
export declare const CSS: {
    column: string;
    row: string;
    bold: string;
    heading: string;
    headerTitle: string;
    buttonContainer: string;
    button: string;
    dialogButton: string;
    inputContainer: string;
    input: string;
    link: string;
    marginTop: string;
    noTopMargin: string;
    serviceStatuses: string;
    serviceStatusItem: string;
    scheduleBuilderRow: string;
    scheduleLabel: string;
    fullBleed: string;
    gridTopRowSpacing: string;
    gridSpacing: string;
    flexQuarter: string;
    flex1: string;
    flex2: string;
    flex3: string;
    errorRow: string;
    primaryTextColor: string;
    primaryBackgroundColor: string;
    secondaryTextColor: string;
    secondaryBackgroundColor: string;
    headerContainer: string;
    panel: string;
    paginatedListContainer: string;
    statusContainer: string;
};
/**
 * Updates the favicon with the Vertex Workbench logo which will display
 * regardless of the kernel state.
 */
export declare function replaceFavIcon(): void;
/** Applies the custom CSS overrides and variable redefinitions for Beatrix. */
export declare function applyCustomTheme(): void;
