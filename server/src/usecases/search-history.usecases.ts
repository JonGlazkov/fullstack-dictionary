import {
  SearchHistoryCreate,
  SearchHistoryListByUserId,
  SearchHistoryRepository,
} from "@src/interfaces/search-history.interface";
import { SearchHistoryRepositoryPrisma } from "@src/repositories/search-history.repository";
import { BadRequest, ErrorTypes } from "@src/utils";

class SearchHistoryUseCases {
  private searchHistoryRepository: SearchHistoryRepository;

  constructor() {
    this.searchHistoryRepository = new SearchHistoryRepositoryPrisma();
  }

  async saveSearch(userId: string, data: SearchHistoryCreate) {
    if (!userId) {
      throw new BadRequest({
        type: ErrorTypes.BadRequest,
        title: "Missing ID from Token",
        detail: "User ID is required to save search history.",
      });
    }

    if (!data.word) {
      throw new BadRequest({
        type: ErrorTypes.BadRequest,
        title: "Missing word",
        detail: "Word is required to save search history.",
      });
    }

    const existsWord = await this.searchHistoryRepository.existsWord(
      userId,
      data.word
    );

    if (existsWord) {
      throw new BadRequest({
        type: ErrorTypes.BadRequest,
        title: "Word already exists",
        detail: `The word "${data.word}" already exists in the search history.`,
      });
    }

    return await this.searchHistoryRepository.create(userId, data);
  }

  async getAllHistory(userId: string, query: SearchHistoryListByUserId) {
    const [history, count] = await Promise.all([
      this.searchHistoryRepository.findByUserId(userId, query),
      this.searchHistoryRepository.countByUserId(userId),
    ]);

    return {
      history,
      total: count,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(count / query.limit),
    };
  }
}

export { SearchHistoryUseCases };
