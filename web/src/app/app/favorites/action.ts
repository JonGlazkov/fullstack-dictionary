import { api } from "@/lib/axios";
import { ApiFavoriteResponse } from "@/types";
import { Favorite } from "./types";

interface FavoriteQueryParams {
  search?: string;
  page: number;
  limit: number;
}

export async function getFavorites({
  page,
  limit,
  search,
}: FavoriteQueryParams) {
  const { data } = await api.get<ApiFavoriteResponse<Favorite[]>>(
    "/users/me/favorites",
    {
      params: {
        search,
        page,
        limit,
      },
    }
  );
  return data;
}
