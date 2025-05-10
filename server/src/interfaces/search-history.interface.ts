export interface SearchHistory {
  id: string;
  userId: string;
  word: string;
}

export interface SearchHistoryCreate {
  word: string;
}

export interface SearchHistoryListByUserId {
  page: number;
  limit: number;
}

export interface SearchHistoryRepository {
  create(userId: string, data: SearchHistoryCreate): Promise<SearchHistory>;
  findByUserId(
    userdId: string,
    query: SearchHistoryListByUserId
  ): Promise<SearchHistory[]>;
  countByUserId(userId: string): Promise<number>;
}
