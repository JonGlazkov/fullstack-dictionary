"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorTypes = void 0;
var ErrorTypes;
(function (ErrorTypes) {
    ErrorTypes["Create"] = "CreateException";
    ErrorTypes["Update"] = "UpdateException";
    ErrorTypes["Delete"] = "DeleteException";
    ErrorTypes["NotFound"] = "NotFound";
    ErrorTypes["Unauthorized"] = "Unauthorized";
    ErrorTypes["Internal"] = "Internal";
    ErrorTypes["BadRequest"] = "BadRequest";
})(ErrorTypes || (exports.ErrorTypes = ErrorTypes = {}));
class GeneralError {
    error;
    statusCode;
    constructor(error, statusCode) {
        this.error = error;
        this.statusCode = statusCode;
    }
}
exports.default = GeneralError;
