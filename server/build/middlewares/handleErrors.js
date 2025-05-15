"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralError_1 = __importDefault(require("../utils/error/GeneralError"));
var ErrorTypes;
(function (ErrorTypes) {
    ErrorTypes["App"] = "App";
    ErrorTypes["Unknown"] = "Unknown";
})(ErrorTypes || (ErrorTypes = {}));
const handleErrors = function (err, req, res) {
    if (err instanceof GeneralError_1.default) {
        return res.status(err.statusCode).send({
            origin: ErrorTypes.App,
            errors: err.error,
        });
    }
    return res.status(500).send({
        origin: ErrorTypes.Unknown,
        errors: [err.message || "Unknown error"],
    });
};
exports.default = handleErrors;
