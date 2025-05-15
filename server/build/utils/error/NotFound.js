"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralError_1 = __importDefault(require("./GeneralError"));
class NotFound extends GeneralError_1.default {
    constructor(error) {
        super(error, 404);
    }
}
exports.default = NotFound;
