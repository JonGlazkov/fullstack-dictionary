"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = userRoutes;
const authMiddleware_1 = require("../middlewares/authMiddleware");
const favorite_usecases_1 = require("../usecases/favorite.usecases");
const search_history_usecases_1 = require("../usecases/search-history.usecases");
const user_usecases_1 = require("../usecases/user.usecases");
async function userRoutes(fastify) {
    const userUseCase = new user_usecases_1.UserUseCase();
    const favoritesUseCase = new favorite_usecases_1.FavoriteUseCase();
    const searchHistoryUseCase = new search_history_usecases_1.SearchHistoryUseCases();
    fastify.addHook("preHandler", authMiddleware_1.authMiddleware);
    fastify.patch("/", async (req, reply) => {
        const authToken = req.headers.authorization;
        const token = authToken?.split(" ")[1];
        const user = fastify.jwt.decode(token);
        const userId = user.id;
        const { name } = req.body;
        try {
            const data = await userUseCase.update(userId, { name });
            return reply.status(200).send(data);
        }
        catch (error) {
            reply.send(error);
        }
    });
    fastify.get("/me", async (req, reply) => {
        const authToken = req.headers.authorization;
        const token = authToken?.split(" ")[1];
        const user = fastify.jwt.decode(token);
        const userId = user.id;
        const data = await userUseCase.me(userId);
        return reply.status(200).send(data);
    });
    fastify.get("/me/history", async (req, reply) => {
        const authToken = req.headers.authorization;
        const token = authToken?.split(" ")[1];
        const user = fastify.jwt.decode(token);
        const userId = user.id;
        const { limit = 10, page = 1 } = req.query;
        const data = await searchHistoryUseCase.getAllHistory(userId, {
            limit,
            page,
        });
        return reply.status(200).send(data);
    });
    fastify.get("/me/favorites", async (req, reply) => {
        const authToken = req.headers.authorization;
        const token = authToken?.split(" ")[1];
        const user = fastify.jwt.decode(token);
        const userId = user.id;
        const { limit = 10, page = 1, search, } = req.query;
        const data = await favoritesUseCase.getAllFavorites(userId, {
            limit,
            page,
            search,
        });
        return reply.status(200).send(data);
    });
}
