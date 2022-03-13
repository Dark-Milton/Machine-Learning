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
exports.CheckValidation = void 0;
const React = __importStar(require("react"));
const field_error_1 = require("./field_error");
function CheckValidation(props) {
    const { min, max, required, fieldName, value } = props;
    let message = '';
    if (required && !value) {
        message = fieldName.trim() + ' is required.';
    }
    else {
        const cvalue = Number(value);
        if (max !== undefined && min !== undefined) {
            if (!(cvalue >= min && cvalue <= max)) {
                message += fieldName.trim() + ' range is [' + min + '-' + max + ']';
            }
        }
        else if (min !== undefined) {
            if (cvalue < min) {
                message += fieldName.trim() + ' must be greater than ' + min;
            }
        }
        else if (max !== undefined) {
            if (cvalue > max) {
                message += fieldName.trim() + ' must be less than ' + max;
            }
        }
    }
    if (message === '') {
        return React.createElement(React.Fragment, null);
    }
    else {
        return React.createElement(field_error_1.FieldError, { message: message });
    }
}
exports.CheckValidation = CheckValidation;
