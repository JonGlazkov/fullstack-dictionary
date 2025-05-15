"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordUseCase = void 0;
const word_repository_1 = require("../repositories/word.repository");
class WordUseCase {
    wordRepository;
    constructor() {
        this.wordRepository = new word_repository_1.WordRepositoryPrisma();
    }
    async getAll({ id, word, limit, page }) {
        const [words, count] = await Promise.all([
            this.wordRepository.getAll({
                id,
                word,
                limit,
                page,
            }),
            this.wordRepository.count(),
        ]);
        return {
            results: words,
            totalDocs: count,
            page,
            totalPages: Math.ceil(count / limit),
            hasNext: count > page * limit,
            hasPrevious: page > 1,
        };
    }
}
exports.WordUseCase = WordUseCase;
