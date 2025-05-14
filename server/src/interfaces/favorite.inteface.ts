export interface Favorite {
  id: string;
  userId: string;
  word: string;
}

export interface FavoriteQuery {
  search?: string;
  page: number;
  limit: number;
}

export interface FavoriteRepository {
  save(userId: string, word: string): Promise<Favorite>;
  existsFavorite(userId: string, word: string): Promise<Favorite>;
  unfavorite(userId: string, word: string): Promise<void>;
  getAllFavorites(userId: string, query: FavoriteQuery): Promise<Favorite[]>;
  countByUserId(userId: string): Promise<number>;
}
