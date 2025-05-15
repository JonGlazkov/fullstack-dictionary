"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchHistoryRoutes = searchHistoryRoutes;
const authMiddleware_1 = require("../middlewares/authMiddleware");
const search_history_usecases_1 = require("../usecases/search-history.usecases");
async function searchHistoryRoutes(fastify) {
    const searchHistoryUseCase = new search_history_usecases_1.SearchHistoryUseCases();
    fastify.addHook("preHandler", authMiddleware_1.authMiddleware);
    fastify.post("/", async (req, reply) => {
        const userId = req.user.id;
        const { word } = req.body;
        const searchHistory = await searchHistoryUseCase.saveSearch(userId, {
            word,
        });
        return reply.status(201).send(searchHistory);
    });
    fastify.get("/", async (req, reply) => {
        const { limit = 10, page = 1 } = req.query;
        const authToken = req.headers.authorization;
        const token = authToken?.split(" ")[1];
        const user = fastify.jwt.decode(token);
        const userId = user.id;
        const searchHistory = await searchHistoryUseCase.getAllHistory(userId, {
            limit,
            page,
        });
        return reply.status(200).send(searchHistory);
    });
}
