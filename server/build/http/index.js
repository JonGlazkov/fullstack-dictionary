"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const start = async () => {
    const app = new app_1.default();
    await app.init();
};
try {
    start();
}
catch (err) {
    console.error("[SERVER] Application failed to start", err);
}
