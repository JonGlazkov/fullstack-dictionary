import {
  FavoriteQuery,
  FavoriteRepository,
} from "@src/interfaces/favorite.inteface";

class FavoriteRepositoryPrisma implements FavoriteRepository {
  async getAllFavorites(userId: string, query: FavoriteQuery) {
    const { limit = 10, page = 1 } = query;

    return await prisma.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
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
