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
exports.FieldError = void 0;
const React = __importStar(require("react"));
const typestyle_1 = require("typestyle");
const styles_1 = require("../../styles");
const error = typestyle_1.style({
    color: styles_1.COLORS.red,
    paddingBottom: '10px',
});
/** Funtional Component for select fields */
// tslint:disable-next-line:enforce-name-casing
function FieldError(props) {
    const { message } = props;
    return message ? React.createElement("div", { className: error }, message) : null;
}
exports.FieldError = FieldError;
