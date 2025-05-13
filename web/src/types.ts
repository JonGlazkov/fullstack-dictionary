export type ApiResponse = {
  hasNext: boolean;
  hasPrevious: boolean;
  page: number;
  totalDocs: number;
  totalPages: number;
};

export interface ApiResultResponse<T> extends ApiResponse {
  results: T;
}

export interface ApiFavoriteResponse<T> extends ApiResponse {
  favorites: T;
}

export interface ApiHistoryResponse<T> extends ApiResponse {
  history: T;
}
