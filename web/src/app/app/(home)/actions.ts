import { ApiFavoriteResponse, ApiResultResponse } from "@/components/types";
import { api } from "@/lib/axios";
import { Favorite, Word } from "./types";

interface GetWordsParams {
  page: number;
  limit: number;
  search: string;
}

export async function getWords(
  accessToken: string,
  { limit, page, search }: GetWordsParams
) {
  const { data } = await api.get<ApiResultResponse<Word[]>>("/entries/en/", {
    params: {
      page,
      limit,
      search,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
}

export async function markAsFavorite(accessToken: string, word: string) {
  const { data } = await api.post(`/entries/en/${word}/favorite`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
}
export async function unMarkAsFavorite(accessToken: string, word: string) {
  const { data } = await api.delete(`/entries/en/${word}/unfavorite`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
}

export async function getFavorites(accessToken: string) {
  const { data } = await api.get<ApiFavoriteResponse<Favorite[]>>(
    "/users/me/favorites",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
}
