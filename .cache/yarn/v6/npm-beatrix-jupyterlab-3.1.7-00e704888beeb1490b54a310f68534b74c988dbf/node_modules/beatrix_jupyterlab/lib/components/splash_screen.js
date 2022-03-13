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
exports.SPLASH_SCREEN = void 0;
const csstips = __importStar(require("csstips"));
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const typestyle_1 = require("typestyle");
const styles_1 = require("../styles");
const yellowArcAnimation = typestyle_1.keyframes({
    '0%': { strokeDashoffset: 84 },
    '11.29%': { strokeDashoffset: 0 },
    '65.33%': { strokeDashoffset: 0 },
    '76.62%': { strokeDashoffset: -84 },
    '100%': { strokeDashoffset: -84 },
});
const greenArcAnimation = typestyle_1.keyframes({
    '0%': { strokeDashoffset: 40 },
    '10.48%': { strokeDashoffset: 40 },
    '12.1%': { strokeDashoffset: 0 },
    '75.81%': { strokeDashoffset: 0 },
    '77.43%': { strokeDashoffset: -40 },
    '100%': { strokeDashoffset: -40 },
});
const blueArcAnimation = typestyle_1.keyframes({
    '0%': { strokeDashoffset: 111 },
    '11.29%': { strokeDashoffset: 111 },
    '16.13%': { strokeDashoffset: 0 },
    '76.62%': { strokeDashoffset: 0 },
    '81.46%': { strokeDashoffset: -111 },
    '100%': { strokeDashoffset: -111 },
});
const redArcAnimation = typestyle_1.keyframes({
    '0%': { strokeDashoffset: 71 },
    '15.32%': { strokeDashoffset: 71 },
    '29.03%': { strokeDashoffset: 0 },
    '80.65%': { strokeDashoffset: 0 },
    '100%': { strokeDashoffset: -71 },
});
const animationDelay = '0s';
const animationDuration = '4134ms';
const animationFillMode = 'both';
const animationIterationCount = 'infinite';
const localStyles = typestyle_1.stylesheet({
    overlay: Object.assign({ backgroundColor: styles_1.COLORS.white, height: '100%', position: 'absolute', width: '100%', zIndex: 999999 }, csstips.centerCenter),
    yellowArc: {
        animationName: yellowArcAnimation,
        animationDelay,
        animationDuration,
        animationFillMode,
        animationTimingFunction: 'cubic-bezier(0.6, 0, 0.8, 1)',
        animationIterationCount,
        strokeDasharray: '84 84',
        strokeDashoffset: '84',
    },
    greenArc: {
        animationName: greenArcAnimation,
        animationDelay,
        animationDuration,
        animationFillMode,
        animationIterationCount,
        animationTimingFunction: 'cubic-bezier(0.7, 0, 0.7, 1)',
        strokeDasharray: '40 40',
        strokeDashoffset: '40',
    },
    blueArc: {
        animationName: blueArcAnimation,
        animationDelay,
        animationDuration,
        animationFillMode,
        animationIterationCount,
        animationTimingFunction: 'cubic-bezier(0.1, 0, 0.3, 1)',
        strokeDasharray: '111 111',
        strokeDashoffset: '111',
    },
    redArc: {
        animationName: redArcAnimation,
        animationDelay,
        animationDuration,
        animationFillMode,
        animationIterationCount,
        animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
        strokeDasharray: '71 71',
        strokeDashoffset: '71',
    },
});
const ID = 'jp-GCPSplashScreen';
/** Non-exported class definition for the animated GCP logo splash screen. */
class SplashScreen {
    constructor() {
        this.container = this.buildContainerDiv();
    }
    /** Displays the splash screen */
    show() {
        if (!document.getElementById(ID)) {
            document.body.appendChild(this.container);
        }
        this.container.style.display = 'block';
    }
    /** Hides the splash screen */
    hide() {
        this.container.style.display = 'none';
    }
    /** Removes the splash screen from the DOM */
    remove() {
        this.container.remove();
    }
    buildContainerDiv() {
        const splash = (react_1.default.createElement("div", { className: localStyles.overlay },
            react_1.default.createElement("svg", { className: "logo", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", width: "320", height: "300", viewBox: "0 0 320 300" },
                react_1.default.createElement("clipPath", { id: "top" },
                    react_1.default.createElement("path", { d: "M173.874375,130.551875 L177.1875,130.61375\n                  L186.193125,121.608125 L186.631875,117.794375\n                  C179.476875,111.426875 170.060625,107.55125\n                  159.75,107.55125 C141.080625,107.55125\n                  125.33625,120.246875 120.6675,137.459375\n                  C121.651875,136.77875 123.75,137.285 123.75,137.285\n                  L141.75,134.32625 C141.75,134.32625 142.68375,132.79625\n                  143.139375,132.891875 C147.256875,128.38625\n                  153.18,125.55125 159.75,125.55125 C165.09375,125.55125\n                  170.01,127.43 173.874375,130.551875 Z" })),
                react_1.default.createElement("clipPath", { id: "right" },
                    react_1.default.createElement("path", { d: "M198.84375,137.481875 C196.756875,129.764375\n                  192.436875,122.958125 186.62625,117.78875\n                  L173.86875,130.54625 C178.97625,134.675\n                  182.25,140.98625 182.25,148.05125 L182.25,150.30125\n                  C188.454375,150.30125 193.5,155.346875\n                  193.5,161.55125 C193.5,167.755625\n                  188.454375,172.80125 182.25,172.80125\n                  L159.75,172.80125 L157.5,175.0625 L157.5,188.5625\n                  L159.75,190.80125 L182.25,190.80125\n                  C198.376875,190.80125 211.5,177.678125\n                  211.5,161.55125 C211.5,151.578125 206.4825,142.76375\n                  198.84375,137.481875 Z" })),
                react_1.default.createElement("clipPath", { id: "bottom" },
                    react_1.default.createElement("path", { d: "M137.25,190.80125 L159.733125,190.80125\n                  L159.733125,172.80125 L137.25,172.80125\n                  C135.59625,172.80125 134.0325,172.435625\n                  132.615,171.78875 L129.375,172.784375\n                  L120.36375,181.795625 L119.57625,184.83875\n                  C124.486875,188.57375 130.6125,190.80125\n                  137.25,190.80125 Z" })),
                react_1.default.createElement("clipPath", { id: "left" },
                    react_1.default.createElement("path", { d: "M137.25,132.30125 C121.123125,132.30125\n                  108,145.424375 108,161.55125 C108,171.04625\n                  112.550625,179.500625 119.5875,184.844375\n                  L132.631875,171.8 C128.728125,170.03375\n                  126,166.1075 126,161.55125 C126,155.346875\n                  131.045625,150.30125 137.25,150.30125\n                  C141.80625,150.30125 145.7325,153.029375\n                  147.49875,156.933125 L160.543125,143.88875\n                  C155.199375,136.851875 146.745,132.30125\n                  137.25,132.30125 Z" })),
                react_1.default.createElement("path", { className: localStyles.redArc, clipPath: "url(#top)", stroke: "#EA4335", fill: "none", strokeMiterlimit: "10", strokeWidth: "25", d: "M182.503 126.427\n              171.582 117.789 160.543 115.631 150.592\n              117.789 142.254 121.029 136.692 126.427\n              127.749 143.47" }),
                react_1.default.createElement("path", { className: localStyles.blueArc, clipPath: "url(#right)", fill: "none", strokeMiterlimit: "10", stroke: "#4285F4", strokeWidth: "25", d: "M157.5 182.289 165.428 182.289 174.35\n              182.289 184.5 182.289 192.797 181.295\n              197.946 176.642 200.947 168.002 200.947\n              162.383 200.947 154.295 197.946 147.729\n              192.797 143.47 189.375 140 186.632\n              132.301 182.503 126.427 179.224 122.505\n              174.35 117.789" }),
                react_1.default.createElement("path", { className: localStyles.greenArc, clipPath: "url(#bottom)", fill: "none", strokeMiterlimit: "10", stroke: "#34A853", strokeWidth: "25", d: "M123.517 176.642 130.378 181.295\n              139.655 182.289 146.694 182.289\n              153.65 182.289 157.5 182.289 161.576\n              182.289" }),
                react_1.default.createElement("path", { className: localStyles.yellowArc, clipPath: "url(#left)", fill: "none", strokeMiterlimit: "10", stroke: "#FBBC05", strokeWidth: "25", d: "M157.5\n              151.996 148.942 145.994 142.846\n              143.47 136.449 143.47 127.749\n              143.47 123.517 147.733 119.576\n              154.295 116.282 162.85 119.576\n              171.789 123.517 176.642 127.749\n              181.295 134.272 181.295" }))));
        const container = document.createElement('div');
        container.id = ID;
        react_dom_1.default.render(splash, container);
        return container;
    }
}
/** Singleton instance of the GCP splash screen. */
exports.SPLASH_SCREEN = new SplashScreen();
