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
exports.Badge = void 0;
const React = __importStar(require("react"));
const core_1 = require("@material-ui/core");
const core_2 = require("@material-ui/core");
const styles_1 = require("../../styles");
const StyledChip = core_2.withStyles({
    root: {
        color: `var(--jp-ui-inverse-font-color0, ${styles_1.COLORS.white})`,
        backgroundColor: styles_1.COLORS.inverse,
        borderRadius: 0,
        fontFamily: styles_1.BASE_FONT.fontFamily,
        fontSize: 10,
        fontWeight: 'bold',
        paddingLeft: 1,
        paddingRight: 1,
        marginLeft: 4,
        marginRight: 4,
    },
})(core_1.Chip);
/** Funtional Component for select fields */
// tslint:disable-next-line:enforce-name-casing
function Badge(props) {
    const { value } = props;
    return value ? React.createElement(StyledChip, { size: "small", label: value.toUpperCase() }) : null;
}
exports.Badge = Badge;
