import { ReactNode } from "react";

export type ComponentsGenericProps<T = unknown> = T & {
  children: ReactNode;
  className?: string;
};

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
