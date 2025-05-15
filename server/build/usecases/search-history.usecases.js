"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchHistoryUseCases = void 0;
const search_history_repository_1 = require("../repositories/search-history.repository");
const utils_1 = require("../utils");
class SearchHistoryUseCases {
    searchHistoryRepository;
    constructor() {
        this.searchHistoryRepository = new search_history_repository_1.SearchHistoryRepositoryPrisma();
    }
    async saveSearch(userId, data) {
        if (!userId) {
            throw new utils_1.BadRequest({
                type: utils_1.ErrorTypes.BadRequest,
                title: "Missing ID from Token",
                detail: "Verify if you are logged in.",
            });
        }
        if (!data.word) {
            throw new utils_1.BadRequest({
                type: utils_1.ErrorTypes.BadRequest,
                title: "Missing word",
                detail: "Word is required to save search history.",
            });
        }
        const existsWord = await this.searchHistoryRepository.existsWord(userId, data.word);
        if (existsWord) {
            return null;
        }
        return await this.searchHistoryRepository.create(userId, data);
    }
    async getAllHistory(userId, query) {
        const [history, count] = await Promise.all([
            this.searchHistoryRepository.findByUserId(userId, query),
            this.searchHistoryRepository.countByUserId(userId),
        ]);
        return {
            history,
            totalDocs: count,
            page: query.page,
            limit: query.limit,
            totalPages: Math.ceil(count / query.limit),
        };
    }
}
exports.SearchHistoryUseCases = SearchHistoryUseCases;
