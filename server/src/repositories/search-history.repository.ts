import {
  SearchHistory,
  SearchHistoryCreate,
  SearchHistoryListByUserId,
  SearchHistoryRepository,
} from "@src/interfaces/search-history.interface";
import { prisma } from "@src/utils/database/prismaClient";

class SearchHistoryRepositoryPrisma implements SearchHistoryRepository {
  async create(
    userId: string,
    { word }: SearchHistoryCreate
  ): Promise<SearchHistory> {
    return await prisma.searchHistory.create({
      data: {
        userId,
        word,
      },
    });
  }

  async existsWord(userId: string, word: string): Promise<boolean> {
    const result = await prisma.searchHistory.findFirst({
      where: {
        userId,
        word,
      },
    });

    return !!result;
  }

  async findByUserId(
    userId: string,
    { limit, page }: SearchHistoryListByUserId
  ): Promise<SearchHistory[]> {
    return await prisma.searchHistory.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * Number(limit),
      take: Number(limit),
    });
  }

  async countByUserId(userId: string): Promise<number> {
    return await prisma.searchHistory.count({
      where: { userId },
    });
  }
}

export { SearchHistoryRepositoryPrisma };
