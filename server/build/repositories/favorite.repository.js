"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteRepositoryPrisma = void 0;
const prismaClient_1 = require("../utils/database/prismaClient");
class FavoriteRepositoryPrisma {
    async getAllFavorites(userId, query) {
        const { limit = 10, page = 1, search } = query;
        return await prismaClient_1.prisma.favorite.findMany({
            where: { userId, word: { contains: search } },
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * Number(limit),
            take: Number(limit),
        });
    }
    async countByUserId(userId) {
        return await prismaClient_1.prisma.favorite.count({
            where: { userId },
        });
    }
    async save(userId, word) {
        return await prismaClient_1.prisma.favorite.create({
            data: {
                userId,
                word,
            },
        });
    }
    async existsFavorite(userId, word) {
        return await prismaClient_1.prisma.favorite.findFirst({
            where: { userId, word },
            orderBy: { createdAt: "desc" },
        });
    }
    async unfavorite(userId, word) {
        await prismaClient_1.prisma.favorite.deleteMany({
            where: {
                userId,
                word,
            },
        });
    }
}
exports.FavoriteRepositoryPrisma = FavoriteRepositoryPrisma;
