"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordsRoutes = wordsRoutes;
const authMiddleware_1 = require("../middlewares/authMiddleware");
const favorite_usecases_1 = require("../usecases/favorite.usecases");
const search_history_usecases_1 = require("../usecases/search-history.usecases");
const word_usecases_1 = require("../usecases/word.usecases");
const utils_1 = require("../utils");
const GeneralError_1 = __importDefault(require("../utils/error/GeneralError"));
async function wordsRoutes(fastify) {
    const searchHistoryUseCase = new search_history_usecases_1.SearchHistoryUseCases();
    const favoriteUseCase = new favorite_usecases_1.FavoriteUseCase();
    const wordUseCase = new word_usecases_1.WordUseCase();
    fastify.addHook("preHandler", authMiddleware_1.authMiddleware);
    fastify.get("/", async (req, reply) => {
        const { id, search, limit = 10, page = 1 } = req.query;
        const words = await wordUseCase.getAll({
            id,
            word: search,
            page: Number(page),
            limit: Number(limit),
        });
        return reply.status(200).send(words);
    });
    fastify.get("/:word", async (req, reply) => {
        const { word } = req.params;
        const authHeader = req.headers.authorization;
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (response.ok) {
                const data = (await response.json());
                const token = authHeader.split(" ")[1];
                const user = fastify.jwt.decode(token);
                if (user) {
                    const userId = user.id;
                    await searchHistoryUseCase.saveSearch(userId, { word });
                }
                return reply.status(200).send({
                    results: data,
                });
            }
            if (response.status === 404) {
                throw new utils_1.NotFound({
                    type: utils_1.ErrorTypes.NotFound,
                    title: "Search not found",
                    detail: `The search for the word ${word} was not found.`,
                });
            }
        }
        catch (error) {
            throw new GeneralError_1.default(error, error.statusCode || 500);
        }
    });
    fastify.post("/:word/favorite", async (req, reply) => {
        const { word } = req.params;
        const authHeader = req.headers.authorization;
        try {
            const token = authHeader.split(" ")[1];
            const user = fastify.jwt.decode(token);
            const userId = user.id;
            await favoriteUseCase.save(userId, word);
            return reply.status(201).send({
                message: `The word ${word} has been added to favorites.`,
            });
        }
        catch (error) {
            throw new GeneralError_1.default(error, error.statusCode || 500);
        }
    });
    fastify.delete("/:word/unfavorite", async (req, reply) => {
        const { word } = req.params;
        const authHeader = req.headers.authorization;
        try {
            const token = authHeader.split(" ")[1];
            const user = fastify.jwt.decode(token);
            const userId = user.id;
            await favoriteUseCase.unfavorite(userId, word);
            return reply.status(200).send({
                message: `The word ${word} has been removed from favorites.`,
            });
        }
        catch (error) {
            throw new GeneralError_1.default(error, error.statusCode || 500);
        }
    });
}
