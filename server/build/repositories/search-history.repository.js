"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchHistoryRepositoryPrisma = void 0;
const prismaClient_1 = require("../utils/database/prismaClient");
class SearchHistoryRepositoryPrisma {
    async create(userId, { word }) {
        return await prismaClient_1.prisma.searchHistory.create({
            data: {
                userId,
                word,
            },
        });
    }
    async existsWord(userId, word) {
        const result = await prismaClient_1.prisma.searchHistory.findFirst({
            where: {
                userId,
                word,
            },
        });
        return !!result;
    }
    async findByUserId(userId, { limit, page }) {
        return await prismaClient_1.prisma.searchHistory.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * Number(limit),
            take: Number(limit),
        });
    }
    async countByUserId(userId) {
        return await prismaClient_1.prisma.searchHistory.count({
            where: { userId },
        });
    }
}
exports.SearchHistoryRepositoryPrisma = SearchHistoryRepositoryPrisma;
