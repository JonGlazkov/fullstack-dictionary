"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const search_history_routes_1 = require("./routes/search-history.routes");
const user_routes_1 = require("./routes/user.routes");
const word_routes_1 = require("./routes/word.routes");
const registerRoutes = (app) => {
    app.register(user_routes_1.userRoutes, { prefix: "/users" });
    app.register(auth_routes_1.default, { prefix: "/auth" });
    app.register(search_history_routes_1.searchHistoryRoutes, { prefix: "/search" });
    app.register(word_routes_1.wordsRoutes, { prefix: "/entries/en" });
};
exports.default = registerRoutes;
