import {
  FavoriteQuery,
  FavoriteRepository,
} from "../interfaces/favorite.inteface";
import { prisma } from "../utils/database/prismaClient";

class FavoriteRepositoryPrisma implements FavoriteRepository {
  async getAllFavorites(userId: string, query: FavoriteQuery) {
    const { limit = 10, page = 1, search } = query;

    return await prisma.favorite.findMany({
      where: { userId, word: { contains: search } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * Number(limit),
      take: Number(limit),
    });
  }

  async countByUserId(userId: string) {
    return await prisma.favorite.count({
      where: { userId },
    });
  }

  async save(userId: string, word: string) {
    return await prisma.favorite.create({
      data: {
        userId,
        word,
      },
    });
  }

  async existsFavorite(userId: string, word: string) {
    return await prisma.favorite.findFirst({
      where: { userId, word },
      orderBy: { createdAt: "desc" },
    });
  }

  async unfavorite(userId: string, word: string) {
    await prisma.favorite.deleteMany({
      where: {
        userId,
        word,
      },
    });
  }
}

export { FavoriteRepositoryPrisma };
