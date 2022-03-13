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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyCustomTheme = exports.replaceFavIcon = exports.CSS = exports.FORM_LABEL_STYLE = exports.ALIGN_HINT = exports.INPUT_TEXT_STYLE = exports.BASE_FONT = exports.FONT_SIZE = exports.COLORS = void 0;
/**
 * Global styles configured with typestyle.
 * JupyterLab CSS Variables can be found at
 * https://github.com/jupyterlab/jupyterlab/blob/master/packages/theme-light-extension/style/variables.css
 */
const csstips = __importStar(require("csstips"));
const typestyle_1 = require("typestyle");
const favicon_png_1 = __importDefault(require("../style/images/favicon.png"));
const workbench_512_color_png_1 = __importDefault(require("../style/images/workbench_512_color.png"));
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', " +
    "Helvetica, Arial, sans-serif, 'Apple Color Emoji', " +
    "'Segoe UI Emoji', 'Segoe UI Symbol'";
/** Theme colors. */
exports.COLORS = {
    base: 'var(--jp-ui-font-color1, #3c4043)',
    caption: 'var(--jp-content-font-color2, #616161)',
    blue: '#1a73e8',
    border: 'var(--jp-border-color0, #bdc1c6)',
    green: 'var(--jp-success-color1, #1e8e3e)',
    input: '#f5f5f5',
    link: 'var(--jp-content-link-color, #3367d6)',
    red: 'var(--jp-error-color1, #d93025)',
    white: 'var(--jp-layout-color1, white)',
    inverse: 'var(--jp-ui-font-color3, #555555)',
    secondary: 'var(--jp-layout-color2, #eeeeee)',
    error: 'var(--jp-error-color3, #ffcdd2)',
    focus: 'var(--jp-brand-color1, #2196f3)',
    line: 'var(--jp-border-color2, #DADCE0)',
};
exports.FONT_SIZE = {
    text: 'var(--jp-ui-font-size1, 13px)',
    heading: 'var(--jp-ui-font-size2, 18px)',
};
/** Base extension font style */
exports.BASE_FONT = {
    color: exports.COLORS.base,
    fontFamily: FONT_FAMILY,
    fontSize: exports.FONT_SIZE.text,
};
exports.INPUT_TEXT_STYLE = {
    fontFamily: exports.BASE_FONT.fontFamily,
    fontSize: exports.BASE_FONT.fontSize,
    color: exports.COLORS.base,
};
exports.ALIGN_HINT = {
    marginLeft: 5,
    marginBottom: 15,
    marginTop: -2,
    color: exports.COLORS.caption,
};
exports.FORM_LABEL_STYLE = {
    color: exports.COLORS.base,
    backgroundColor: exports.COLORS.white,
    fontSize: '0.95rem',
    fontWeight: 'bold',
    opacity: 0.85,
    paddingRight: '4px',
};
/** Global styles that are useful across components */
exports.CSS = typestyle_1.stylesheet({
    column: csstips.vertical,
    row: csstips.horizontal,
    bold: {
        fontWeight: 'bold',
    },
    heading: {
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 16,
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: '16px',
        letterSpacing: '1px',
        padding: '8px 12px',
        backgroundColor: 'white',
    },
    buttonContainer: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    button: Object.assign({ color: exports.COLORS.base, backgroundColor: exports.COLORS.white, borderWidth: '1px', borderStyle: 'solid', borderColor: exports.COLORS.border, fontFamily: FONT_FAMILY, fontWeight: 'bold', cursor: 'pointer' }, csstips.padding('4px', '16px')),
    dialogButton: {
        backgroundColor: 'transparent !important',
        border: 'none !important',
        cursor: 'pointer',
        fontFamily: 'Roboto',
        fontWeight: 500,
        textTransform: 'uppercase',
        $nest: {
            '&:focus': {
                outline: 'none !important',
            },
            '&.jp-mod-styled.jp-mod-reject': {
                color: exports.COLORS.base,
            },
            '&.jp-mod-styled.jp-mod-accept': {
                color: exports.COLORS.link,
            },
        },
    },
    inputContainer: Object.assign(Object.assign({ paddingBottom: '10px' }, csstips.vertical), { $nest: {
            '&.error': {
                paddingBottom: '2px',
            },
        } }),
    input: Object.assign(Object.assign({ backgroundColor: exports.COLORS.input, borderColor: exports.COLORS.border, borderWidth: '1px', fontSize: '12px', fontFamily: 'Arial', marginTop: '4px' }, csstips.padding('5px', '4px')), { $nest: {
            '&.error': {
                borderColor: exports.COLORS.red,
                borderStyle: 'solid',
            },
        } }),
    link: {
        color: exports.COLORS.link,
        textDecoration: 'underline',
        $nest: {
            '&:active': {
                color: exports.COLORS.link,
            },
            '&:hover': {
                color: exports.COLORS.link,
            },
            '&:visited': {
                color: exports.COLORS.link,
            },
        },
    },
    marginTop: { marginTop: '16px' },
    noTopMargin: { marginTop: 0 },
    serviceStatuses: Object.assign(Object.assign({}, csstips.vertical), csstips.padding('16px', 0)),
    serviceStatusItem: Object.assign(Object.assign({ alignItems: 'center', letterSpacing: '0.09px', lineHeight: '20px' }, csstips.horizontal), { $nest: {
            '&>*': { paddingRight: '4px' },
        } }),
    scheduleBuilderRow: Object.assign(Object.assign({ $nest: {
            '&>*': {
                marginRight: '16px',
            },
            '&>*:last-child': {
                marginRight: '0px',
            },
        } }, csstips.horizontal), csstips.center),
    scheduleLabel: {
        paddingTop: '24px',
        paddingBottom: '16px',
        paddingLeft: '5px',
        fontSize: '13px',
    },
    fullBleed: Object.assign(Object.assign({ height: '100%' }, csstips.flex), csstips.vertical),
    gridTopRowSpacing: {
        paddingTop: '0px !important',
        paddingBottom: '0px !important',
    },
    gridSpacing: {
        paddingTop: '0px !important',
        paddingBottom: '0px !important',
        marginTop: '-8px !important',
    },
    flexQuarter: {
        flexBasis: '25%',
    },
    flex1: Object.assign({}, csstips.flex1),
    flex2: Object.assign({}, csstips.flex2),
    flex3: Object.assign({}, csstips.flex3),
    errorRow: {
        marginTop: '8px',
    },
    primaryTextColor: {
        color: 'var(--jp-ui-font-color1)',
    },
    primaryBackgroundColor: {
        backgroundColor: 'var(--jp-layout-color1)',
    },
    secondaryTextColor: {
        color: 'var(--jp-ui-font-color2)',
    },
    secondaryBackgroundColor: {
        backgroundColor: 'var(--jp-layout-color2)',
    },
    headerContainer: Object.assign(Object.assign({}, csstips.horizontal), { borderBottom: 'var(--jp-border-width) solid var(--jp-border-color2)', padding: '8px 12px' }),
    panel: Object.assign(Object.assign({ backgroundColor: exports.COLORS.white, height: '100%' }, exports.BASE_FONT), csstips.vertical),
    paginatedListContainer: {
        overflow: 'hidden',
        height: '100%',
    },
    statusContainer: Object.assign(Object.assign({}, exports.BASE_FONT), { lineHeight: '24px' }),
});
/**
 * Updates the favicon with the Vertex Workbench logo which will display
 * regardless of the kernel state.
 */
function replaceFavIcon() {
    const current = document.querySelectorAll('.favicon');
    for (const n of current) {
        n.remove();
    }
    const newFavIcon = document.createElement('link');
    newFavIcon.className = 'favicon idle busy';
    newFavIcon.href = favicon_png_1.default;
    newFavIcon.rel = 'icon';
    newFavIcon.type = 'image/icon';
    document.head.appendChild(newFavIcon);
}
exports.replaceFavIcon = replaceFavIcon;
/** Applies the custom CSS overrides and variable redefinitions for Beatrix. */
function applyCustomTheme() {
    typestyle_1.cssRule('body', {
        background: 'var(--jp-layout-color2)',
    });
    typestyle_1.cssRule('#jp-MainLogo', {
        zIndex: 10,
        backgroundImage: `url('${workbench_512_color_png_1.default}')`,
        backgroundSize: '36px',
        backgroundPosition: '0 !important',
        height: '36px',
        margin: '10px 12px 10px 16px',
        width: '36px',
        $nest: {
            '&>*': {
                display: 'none',
            },
        },
    });
    typestyle_1.cssRule('#jp-MainMenu', {
        marginLeft: '-8px !important',
        paddingLeft: 0,
        top: '26px',
    });
    // Overriden button behaviors
    typestyle_1.cssRule('button', {
        borderRadius: 'var(--jp-layout-color2)',
        fontFamily: 'var(--jp-ui-font-family)',
    });
    typestyle_1.cssRule('button.jp-mod-styled.jp-mod-accept', {
        background: 'var(--jp-brand-color1)',
    });
    typestyle_1.cssRule('button.jp-Button.bp3-button.bp3-minimal:hover', {
        backgroundColor: 'var(--jp-layout-color3)',
    });
    typestyle_1.cssRule('button.jp-ToolbarButtonComponent', {
        borderRadius: 'var(--jp-button-border-radius)',
    });
    // Base React Material button font
    typestyle_1.cssRule('.MuiButton-root', {
        fontFamily: 'var(--jp-ui-font-family) !important',
    });
    // Menu item’s background when hovering
    typestyle_1.cssRule('.p-CommandPalette-header.p-mod-active', {
        background: 'var(--jp-layout-color3)',
    });
    // Highlighted item in the file browser
    typestyle_1.cssRule('.jp-DirListing-item.jp-mod-selected', {
        background: 'var(--jp-brand-color4)',
        color: 'var(--jp-ui-font-color1)',
    });
    typestyle_1.cssRule('.jp-DirListing-item.jp-mod-selected .jp-icon-selectable[fill]', {
        fill: '#5f6368',
    });
    typestyle_1.cssRule('.jp-Notebook.jp-mod-editMode .jp-Cell.jp-mod-active .jp-InputArea-editor', {
        boxShadow: 'var(--jp-input-box-shadow)',
    });
    typestyle_1.cssRule('.jp-DocumentSearch-overlay', { zIndex: 70 });
    applyCssVariables();
}
exports.applyCustomTheme = applyCustomTheme;
/** Overrides the default theme variables by setting properties on body */
function applyCssVariables() {
    /* Borders
     *
     * The following variables, specify the visual styling of borders in JupyterLab.
     */
    document.body.style.setProperty('--jp-border-width', '1px');
    document.body.style.setProperty('--jp-border-color0', '#dadce0');
    document.body.style.setProperty('--jp-border-color1', '#dadce0');
    document.body.style.setProperty('--jp-border-color2', '#e8eaed');
    document.body.style.setProperty('--jp-border-color3', '#f1f3f4');
    document.body.style.setProperty('--jp-border-radius', '8px');
    document.body.style.setProperty('--jp-button-border-radius', '4px');
    /* UI Fonts
     *
     * The UI font CSS variables are used for the typography all of the JupyterLab
     * user interface elements that are not directly user generated content.
     *
     * The font sizing here is done assuming that the body font size of --jp-ui-font-size1
     * is applied to a parent element. When children elements, such as headings, are sized
     * in em all things will be computed relative to that body size.
     */
    document.body.style.setProperty('--jp-ui-font-scale-factor', '1.2');
    document.body.style.setProperty('--jp-ui-font-size0', '0.83333em');
    document.body.style.setProperty('--jp-ui-font-size1', '13px');
    /* Base font size */
    document.body.style.setProperty('--jp-ui-font-size2', '1.2em');
    document.body.style.setProperty('--jp-ui-font-size3', '1.44em');
    document.body.style.setProperty('--jp-ui-font-family', FONT_FAMILY);
    /*
     * Use these font colors against the corresponding main layout colors.
     * In a light theme, these go from dark to light.
     */
    /* Defaults use Material Design specification */
    document.body.style.setProperty('--jp-ui-font-color0', 'rgba(0, 0, 0, 1)');
    document.body.style.setProperty('--jp-ui-font-color1', '#202124');
    document.body.style.setProperty('--jp-ui-font-color2', '#5f6368');
    document.body.style.setProperty('--jp-ui-font-color3', '#9aa0a6');
    /*
     * Use these against the brand/accent/warn/error colors.
     * These will typically go from light to darker, in both a dark and light theme.
     */
    document.body.style.setProperty('--jp-ui-inverse-font-color0', 'rgba(255, 255, 255, 1)');
    document.body.style.setProperty('--jp-ui-inverse-font-color1', 'rgba(255, 255, 255, 1)');
    document.body.style.setProperty('--jp-ui-inverse-font-color2', 'rgba(255, 255, 255, 0.7)');
    document.body.style.setProperty('--jp-ui-inverse-font-color3', 'rgba(255, 255, 255, 0.5)');
    /* Content Fonts
     *
     * Content font variables are used for typography of user generated content.
     *
     * The font sizing here is done assuming that the body font size of --jp-content-font-size1
     * is applied to a parent element. When children elements, such as headings, are sized
     * in em all things will be computed relative to that body size.
     */
    document.body.style.setProperty('--jp-content-line-height', '1.6');
    document.body.style.setProperty('--jp-content-font-scale-factor', '1.2');
    document.body.style.setProperty('--jp-content-font-size0', '0.83333em');
    document.body.style.setProperty('--jp-content-font-size1', '14px');
    /* Base font size */
    document.body.style.setProperty('--jp-content-font-size2', '1.2em');
    document.body.style.setProperty('--jp-content-font-size3', '1.44em');
    document.body.style.setProperty('--jp-content-font-size4', '1.728em');
    document.body.style.setProperty('--jp-content-font-size5', '2.0736em');
    /* This gives a magnification of about 125% in presentation mode over normal. */
    document.body.style.setProperty('--jp-content-presentation-font-size1', '17px');
    document.body.style.setProperty('--jp-content-heading-line-height', '1');
    document.body.style.setProperty('--jp-content-heading-margin-top', '1.2em');
    document.body.style.setProperty('--jp-content-heading-margin-bottom', '0.8em');
    document.body.style.setProperty('--jp-content-heading-font-weight', '500');
    /* Defaults use Material Design specification */
    document.body.style.setProperty('--jp-content-font-color0', 'rgba(0, 0, 0, 1)');
    document.body.style.setProperty('--jp-content-font-color1', 'rgba(0, 0, 0, 0.87)');
    document.body.style.setProperty('--jp-content-font-color2', 'rgba(0, 0, 0, 0.54)');
    document.body.style.setProperty('--jp-content-font-color3', 'rgba(0, 0, 0, 0.38)');
    document.body.style.setProperty('--jp-content-link-color', 'var(--md-blue-700)');
    document.body.style.setProperty('--jp-content-font-family', FONT_FAMILY);
    /*
     * Code Fonts
     *
     * Code font variables are used for typography of code and other monospaces content.
     */
    document.body.style.setProperty('--jp-code-font-size', '13px');
    document.body.style.setProperty('--jp-code-line-height', '1.3077');
    /* 17px for 13px base */
    document.body.style.setProperty('--jp-code-padding', '5px');
    /* 5px for 13px base, codemirror highlighting needs integer px value */
    document.body.style.setProperty('--jp-code-font-family-default', `Menlo, Consolas, 'DejaVu Sans Mono', monospace`);
    document.body.style.setProperty('--jp-code-font-family', 'var(--jp-code-font-family-default)');
    /* This gives a magnification of about 125% in presentation mode over normal. */
    document.body.style.setProperty('--jp-code-presentation-font-size', '16px');
    /* may need to tweak cursor width if you change font size */
    document.body.style.setProperty('--jp-code-cursor-width0', '1.4px');
    document.body.style.setProperty('--jp-code-cursor-width1', '2px');
    document.body.style.setProperty('--jp-code-cursor-width2', '4px');
    /* Layout
     *
     * The following are the main layout colors use in JupyterLab. In a light
     * theme these would go from light to dark.
     */
    document.body.style.setProperty('--jp-layout-color0', 'white');
    document.body.style.setProperty('--jp-layout-color1', 'white');
    document.body.style.setProperty('--jp-layout-color2', '#f8f9fa');
    document.body.style.setProperty('--jp-layout-color3', '#f8f9fa');
    document.body.style.setProperty('--jp-layout-color4', '#dadce0');
    /* Inverse Layout
     *
     * The following are the inverse layout colors use in JupyterLab. In a light
     * theme these would go from dark to light.
     */
    document.body.style.setProperty('--jp-inverse-layout-color0', '#111111');
    document.body.style.setProperty('--jp-inverse-layout-color1', 'var(--md-grey-900)');
    document.body.style.setProperty('--jp-inverse-layout-color2', 'var(--md-grey-800)');
    document.body.style.setProperty('--jp-inverse-layout-color3', '#5f6368');
    document.body.style.setProperty('--jp-inverse-layout-color4', 'var(--md-grey-600)');
    /* Brand/accent */
    document.body.style.setProperty('--jp-brand-color0', '#1769aa');
    document.body.style.setProperty('--jp-brand-color1', '#1a73e8');
    document.body.style.setProperty('--jp-brand-color2', '#8ab4f8');
    document.body.style.setProperty('--jp-brand-color3', '#d2e3fc');
    document.body.style.setProperty('--jp-brand-color4', '#e8f0fe');
    document.body.style.setProperty('--jp-accent-color0', '#188038');
    document.body.style.setProperty('--jp-accent-color1', '#1e8e3e');
    document.body.style.setProperty('--jp-accent-color2', '#81c995');
    document.body.style.setProperty('--jp-accent-color3', '#ceead6');
    /* State colors (warn, error, success, info) */
    document.body.style.setProperty('--jp-warn-color0', '#f29900');
    document.body.style.setProperty('--jp-warn-color1', '#f9ab00');
    document.body.style.setProperty('--jp-warn-color2', '#fdd663');
    document.body.style.setProperty('--jp-warn-color3', '#fde293');
    document.body.style.setProperty('--jp-error-color0', '#c5221f');
    document.body.style.setProperty('--jp-error-color1', '#d93025');
    document.body.style.setProperty('--jp-error-color2', '#f28b82');
    document.body.style.setProperty('--jp-error-color3', '#fad2cf');
    document.body.style.setProperty('--jp-success-color0', '#188038');
    document.body.style.setProperty('--jp-success-color1', '#1e8e3e');
    document.body.style.setProperty('--jp-success-color2', '#81c995');
    document.body.style.setProperty('--jp-success-color3', '#ceead6');
    document.body.style.setProperty('--jp-info-color0', '#129eaf');
    document.body.style.setProperty('--jp-info-color1', '#12b5cb');
    document.body.style.setProperty('--jp-info-color2', '#78d9ec');
    document.body.style.setProperty('--jp-info-color3', '#cbf0f8');
    /* Cell specific styles */
    document.body.style.setProperty('--jp-cell-padding', '5px');
    document.body.style.setProperty('--jp-cell-collapser-width', '4px');
    document.body.style.setProperty('--jp-cell-collapser-min-height', '20px');
    document.body.style.setProperty('--jp-cell-collapser-not-active-hover-opacity', '0.6');
    document.body.style.setProperty('--jp-cell-editor-background', '#f8f9fa');
    document.body.style.setProperty('--jp-cell-editor-border-color', '#e8eaed');
    document.body.style.setProperty('--jp-cell-editor-box-shadow', 'inset 0 0 2px var(--md-blue-300)');
    document.body.style.setProperty('--jp-cell-editor-active-background', 'var(--jp-layout-color0)');
    document.body.style.setProperty('--jp-cell-editor-active-border-color', 'var(--jp-brand-color1)');
    document.body.style.setProperty('--jp-cell-prompt-width', '64px');
    document.body.style.setProperty('--jp-cell-prompt-font-family', 'var(--jp-code-font-family-default)');
    document.body.style.setProperty('--jp-cell-prompt-letter-spacing', '0px');
    document.body.style.setProperty('--jp-cell-prompt-opacity', '1');
    document.body.style.setProperty('--jp-cell-prompt-not-active-opacity', '0.5');
    document.body.style.setProperty('--jp-cell-prompt-not-active-font-color', 'var(--md-grey-700)');
    /* A custom blend of MD grey and blue 600
     * See https://meyerweb.com/eric/tools/color-blend/#546E7A:1E88E5:5:hex */
    document.body.style.setProperty('--jp-cell-inprompt-font-color', '#1a73e8');
    /* A custom blend of MD grey and orange 600
     * https://meyerweb.com/eric/tools/color-blend/#546E7A:F4511E:5:hex */
    document.body.style.setProperty('--jp-cell-outprompt-font-color', '#bf5b3d');
    /* Notebook specific styles */
    document.body.style.setProperty('--jp-notebook-padding', '10px');
    document.body.style.setProperty('--jp-notebook-select-background', 'var(--jp-layout-color1)');
    document.body.style.setProperty('--jp-notebook-multiselected-color', 'var(--md-blue-50)');
    /* The scroll padding is calculated to fill enough space at the bottom of the
     * notebook to show one single-line cell (with appropriate padding) at the top
     * when the notebook is scrolled all the way to the bottom. We also subtract one
     * pixel so that no scrollbar appears if we have just one single-line cell in the
     * notebook. This padding is to enable a 'scroll past end' feature in a notebook.
     */
    document.body.style.setProperty('--jp-notebook-scroll-padding', `calc(
  100% - var(--jp-code-font-size) * var(--jp-code-line-height) -
    var(--jp-code-padding) - var(--jp-cell-padding) - 1px
)`);
    /* Rendermime styles */
    document.body.style.setProperty('--jp-rendermime-error-background', '#fdd');
    document.body.style.setProperty('--jp-rendermime-table-row-background', 'var(--md-grey-100)');
    document.body.style.setProperty('--jp-rendermime-table-row-hover-background', 'var(--md-light-blue-50)');
    /* Dialog specific styles */
    document.body.style.setProperty('--jp-dialog-background', 'rgba(0, 0, 0, 0.25)');
    /* Console specific styles */
    document.body.style.setProperty('--jp-console-padding', '10px');
    /* Toolbar specific styles */
    document.body.style.setProperty('--jp-toolbar-border-color', '#dadce0');
    document.body.style.setProperty('--jp-toolbar-micro-height', '8px');
    document.body.style.setProperty('--jp-toolbar-background', 'var(--jp-layout-color1)');
    document.body.style.setProperty('--jp-toolbar-box-shadow', 'none');
    document.body.style.setProperty('--jp-toolbar-header-margin', '4px 4px 0px 4px');
    document.body.style.setProperty('--jp-toolbar-active-background', 'var(--md-grey-300)');
    /* Input field styles */
    document.body.style.setProperty('--jp-input-box-shadow', 'none');
    document.body.style.setProperty('--jp-input-active-background', 'var(--jp-layout-color1)');
    document.body.style.setProperty('--jp-input-hover-background', 'var(--jp-layout-color1)');
    document.body.style.setProperty('--jp-input-background', 'var(--md-grey-100)');
    document.body.style.setProperty('--jp-input-border-color', 'var(--jp-border-color1)');
    document.body.style.setProperty('--jp-input-active-border-color', 'var(--jp-brand-color1)');
    document.body.style.setProperty('--jp-input-active-box-shadow-color', 'rgba(19, 124, 189, 0.3)');
    /* General editor styles */
    document.body.style.setProperty('--jp-editor-selected-background', '#d9d9d9');
    document.body.style.setProperty('--jp-editor-selected-focused-background', '#d7d4f0');
    document.body.style.setProperty('--jp-editor-cursor-color', 'var(--jp-ui-font-color0)');
    /* Code mirror specific styles */
    document.body.style.setProperty('--jp-mirror-editor-keyword-color', '#008000');
    document.body.style.setProperty('--jp-mirror-editor-atom-color', '#88f');
    document.body.style.setProperty('--jp-mirror-editor-number-color', '#080');
    document.body.style.setProperty('--jp-mirror-editor-def-color', '#00f');
    document.body.style.setProperty('--jp-mirror-editor-variable-color', 'var(--md-grey-900)');
    document.body.style.setProperty('--jp-mirror-editor-variable-2-color', '#05a');
    document.body.style.setProperty('--jp-mirror-editor-variable-3-color', '#085');
    document.body.style.setProperty('--jp-mirror-editor-punctuation-color', '#05a');
    document.body.style.setProperty('--jp-mirror-editor-property-color', '#05a');
    document.body.style.setProperty('--jp-mirror-editor-operator-color', '#aa22ff');
    document.body.style.setProperty('--jp-mirror-editor-comment-color', '#408080');
    document.body.style.setProperty('--jp-mirror-editor-string-color', '#ba2121');
    document.body.style.setProperty('--jp-mirror-editor-string-2-color', '#708');
    document.body.style.setProperty('--jp-mirror-editor-meta-color', '#aa22ff');
    document.body.style.setProperty('--jp-mirror-editor-qualifier-color', '#555');
    document.body.style.setProperty('--jp-mirror-editor-builtin-color', '#008000');
    document.body.style.setProperty('--jp-mirror-editor-bracket-color', '#997');
    document.body.style.setProperty('--jp-mirror-editor-tag-color', '#170');
    document.body.style.setProperty('--jp-mirror-editor-attribute-color', '#00c');
    document.body.style.setProperty('--jp-mirror-editor-header-color', 'blue');
    document.body.style.setProperty('--jp-mirror-editor-quote-color', '#090');
    document.body.style.setProperty('--jp-mirror-editor-link-color', '#00c');
    document.body.style.setProperty('--jp-mirror-editor-error-color', '#f00');
    document.body.style.setProperty('--jp-mirror-editor-hr-color', '#999');
    /* Vega extension styles */
    document.body.style.setProperty('--jp-vega-background', 'white');
    /* Sidebar-related styles */
    document.body.style.setProperty('--jp-sidebar-min-width', '180px');
    /* Search-related styles */
    document.body.style.setProperty('--jp-search-toggle-off-opacity', '0.5');
    document.body.style.setProperty('--jp-search-toggle-hover-opacity', '0.8');
    document.body.style.setProperty('--jp-search-toggle-on-opacity', '1');
    document.body.style.setProperty('--jp-search-selected-match-background-color', 'rgb(245, 200, 0)');
    document.body.style.setProperty('--jp-search-selected-match-color', 'black');
    document.body.style.setProperty('--jp-search-unselected-match-background-color', 'var(--jp-inverse-layout-color0)');
    document.body.style.setProperty('--jp-search-unselected-match-color', 'var(--jp-ui-inverse-font-color0)');
    /* Icon colors that work well with light or dark backgrounds */
    document.body.style.setProperty('--jp-icon-contrast-color0', 'var(--md-purple-600)');
    document.body.style.setProperty('--jp-icon-contrast-color1', 'var(--md-green-600)');
    document.body.style.setProperty('--jp-icon-contrast-color2', 'var(--md-pink-600)');
    document.body.style.setProperty('--jp-icon-contrast-color3', 'var(--md-blue-600)');
}
