"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteUseCase = void 0;
const favorite_repository_1 = require("../repositories/favorite.repository");
const utils_1 = require("../utils");
class FavoriteUseCase {
    favoriteRepository;
    constructor() {
        this.favoriteRepository = new favorite_repository_1.FavoriteRepositoryPrisma();
    }
    async save(userId, word) {
        if (!userId) {
            throw new utils_1.BadRequest({
                type: utils_1.ErrorTypes.BadRequest,
                title: "Missing ID from Token",
                detail: "User ID is required to save favorite.",
            });
        }
        if (!word) {
            throw new utils_1.BadRequest({
                type: utils_1.ErrorTypes.BadRequest,
                title: "Missing word",
                detail: "Word is required to save favorite.",
            });
        }
        const existsWord = await this.favoriteRepository.existsFavorite(userId, word);
        if (existsWord) {
            throw new utils_1.BadRequest({
                type: utils_1.ErrorTypes.BadRequest,
                title: "Word already exists",
                detail: `The word ${word} already exists in the favorites.`,
            });
        }
        return await this.favoriteRepository.save(userId, word);
    }
    async unfavorite(userId, word) {
        if (!userId) {
            throw new utils_1.BadRequest({
                type: utils_1.ErrorTypes.BadRequest,
                title: "Missing ID from Token",
                detail: "User ID is required to unfavorite.",
            });
        }
        if (!word) {
            throw new utils_1.BadRequest({
                type: utils_1.ErrorTypes.BadRequest,
                title: "Missing word",
                detail: "Word is required to unfavorite.",
            });
        }
        const existsWord = await this.favoriteRepository.existsFavorite(userId, word);
        if (!existsWord) {
            throw new utils_1.BadRequest({
                type: utils_1.ErrorTypes.BadRequest,
                title: "Word not found",
                detail: `The word ${word} was not found in the favorites.`,
            });
        }
        return await this.favoriteRepository.unfavorite(userId, word);
    }
    async getAllFavorites(userId, query) {
        if (!userId) {
            throw new utils_1.BadRequest({
                type: utils_1.ErrorTypes.BadRequest,
                title: "Missing ID from Token",
                detail: "User ID is required to get all favorites.",
            });
        }
        const [favorites, count] = await Promise.all([
            this.favoriteRepository.getAllFavorites(userId, query),
            this.favoriteRepository.countByUserId(userId),
        ]);
        return {
            favorites,
            total: count,
            page: query.page,
            limit: query.limit,
            totalPages: Math.ceil(count / query.limit),
        };
    }
}
exports.FavoriteUseCase = FavoriteUseCase;
