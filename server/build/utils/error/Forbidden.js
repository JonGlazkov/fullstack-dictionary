"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralError_1 = __importDefault(require("./GeneralError"));
class Forbidden extends GeneralError_1.default {
    constructor(error) {
        super(error, 403);
    }
}
exports.default = Forbidden;
