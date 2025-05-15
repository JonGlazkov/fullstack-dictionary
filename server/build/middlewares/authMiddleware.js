"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const utils_1 = require("../utils");
const Unauthorized_1 = __importDefault(require("../utils/error/Unauthorized"));
async function authMiddleware(req, reply) {
    try {
        await req.jwtVerify();
    }
    catch (err) {
        throw new Unauthorized_1.default({
            type: utils_1.ErrorTypes.Unauthorized,
            title: "Unauthorized",
            detail: err,
        });
    }
}
