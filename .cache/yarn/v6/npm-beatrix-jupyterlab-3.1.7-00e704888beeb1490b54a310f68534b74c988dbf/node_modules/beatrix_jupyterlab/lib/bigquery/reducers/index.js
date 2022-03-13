"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const dataTreeSlice_1 = __importDefault(require("./dataTreeSlice"));
const snackbarSlice_1 = __importDefault(require("./snackbarSlice"));
exports.default = redux_1.combineReducers({
    dataTree: dataTreeSlice_1.default,
    snackbar: snackbarSlice_1.default,
});
