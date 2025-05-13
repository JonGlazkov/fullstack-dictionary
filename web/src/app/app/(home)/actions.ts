import { api } from "@/lib/axios";
import { ApiFavoriteResponse, ApiResultResponse } from "@/types";
import { DictionaryResponse, Favorite, Word } from "./types";

interface GetWordsParams {
  id?: string;
  page: number;
  limit: number;
  search?: string;
}

export async function getWords({ id, limit, page, search }: GetWordsParams) {
  const { data } = await api.get<ApiResultResponse<Word[]>>("/entries/en/", {
    params: {
      id,
      page,
      limit,
      search,
    },
  });
  return data;
}

export async function markAsFavorite(word: string) {
  const { data } = await api.post(`/entries/en/${word}/favorite`);

  return data;
}
export async function unMarkAsFavorite(word: string) {
  const { data } = await api.delete(`/entries/en/${word}/unfavorite`);

  return data;
}

export async function getFavorites() {
  const { data } = await api.get<ApiFavoriteResponse<Favorite[]>>(
    "/users/me/favorites"
  );
  return data;
}

export async function getWordByName(name?: string) {
  const { data } = await api.get<DictionaryResponse>(`/entries/en/${name}`);
  return data;
}
