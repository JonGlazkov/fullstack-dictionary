import {
  Favorite,
  FavoriteQuery,
  FavoriteRepository,
} from "../interfaces/favorite.inteface";
import { FavoriteRepositoryPrisma } from "../repositories/favorite.repository";
import { BadRequest, ErrorTypes } from "../utils";

class FavoriteUseCase {
  favoriteRepository: FavoriteRepository;

  constructor() {
    this.favoriteRepository = new FavoriteRepositoryPrisma();
  }

  async save(userId: string, word: string) {
    if (!userId) {
      throw new BadRequest({
        type: ErrorTypes.BadRequest,
        title: "Missing ID from Token",
        detail: "User ID is required to save favorite.",
      });
    }

    if (!word) {
      throw new BadRequest({
        type: ErrorTypes.BadRequest,
        title: "Missing word",
        detail: "Word is required to save favorite.",
      });
    }

    const existsWord = await this.favoriteRepository.existsFavorite(
      userId,
      word
    );

    if (existsWord) {
      throw new BadRequest({
        type: ErrorTypes.BadRequest,
        title: "Word already exists",
        detail: `The word ${word} already exists in the favorites.`,
      });
    }

    return await this.favoriteRepository.save(userId, word);
  }

  async unfavorite(userId: string, word: string) {
    if (!userId) {
      throw new BadRequest({
        type: ErrorTypes.BadRequest,
        title: "Missing ID from Token",
        detail: "User ID is required to unfavorite.",
      });
    }

    if (!word) {
      throw new BadRequest({
        type: ErrorTypes.BadRequest,
        title: "Missing word",
        detail: "Word is required to unfavorite.",
      });
    }
    const existsWord = await this.favoriteRepository.existsFavorite(
      userId,
      word
    );

    if (!existsWord) {
      throw new BadRequest({
        type: ErrorTypes.BadRequest,
        title: "Word not found",
        detail: `The word ${word} was not found in the favorites.`,
      });
    }

    return await this.favoriteRepository.unfavorite(userId, word);
  }

  async getAllFavorites(
    userId: string,

    query: FavoriteQuery
  ): Promise<{
    favorites: Favorite[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    if (!userId) {
      throw new BadRequest({
        type: ErrorTypes.BadRequest,
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

export { FavoriteUseCase };
