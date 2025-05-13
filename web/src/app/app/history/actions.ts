import { api } from "@/lib/axios";
import { ApiHistoryResponse } from "@/types";
import { History } from "./types";

interface HistoryQueryParams {
  page: number;
  limit: number;
}

export async function getHistory({ page, limit }: HistoryQueryParams) {
  const { data } = await api.get<ApiHistoryResponse<History[]>>(
    "/users/me/history",
    {
      params: {
        page,
        limit,
      },
    }
  );
  return data;
}
