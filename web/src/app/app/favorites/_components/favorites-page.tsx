"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

import { Pagination } from "@/components/pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../action";
import { Favorite } from "../types";
import FavoriteTableFilter from "./favorites-table-filter";
import FavoriteTableRow from "./favorites-table-row";

export default function FavoritesTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const pageIndex = z.coerce.number().parse(searchParams.get("page")) || 1;
  const search = searchParams.get("search");

  const { data: favoriteData } = useQuery({
    queryKey: ["favorite", search, pageIndex],
    queryFn: () =>
      getFavorites({
        search: search ?? "",
        page: pageIndex,
        limit: 20,
      }),
  });

  function handlePagination(pageIndex: number) {
    params.set("page", String(pageIndex + 1));
    router.prefetch("?" + params.toString());
    router.push("?" + params.toString());
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="space-y-5">
          <FavoriteTableFilter />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[160px]">Palavra</TableHead>
                  <TableHead>Data de inserção</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {favoriteData?.favorites.map((word: Favorite) => (
                  <FavoriteTableRow key={word.id} data={word} />
                ))}
              </TableBody>
            </Table>
          </div>
          {favoriteData && (
            <Pagination
              pageIndex={pageIndex}
              totalCount={favoriteData?.totalDocs}
              perPage={20}
              onPageChange={handlePagination}
            />
          )}
        </div>
      </div>
    </>
  );
}
