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
import { useSession } from "next-auth/react";
import { getFavorites, getWords } from "../actions";
import { Word } from "../types";
import WordsTableFilter from "./words-table-filter";
import WordsTableRow from "./words-table-row";

export default function WordsTable() {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const pageIndex = z.coerce.number().parse(searchParams.get("page")) || 1;
  const id = searchParams.get("id");
  const search = searchParams.get("search");

  const { data: words } = useQuery({
    queryKey: ["words", id, pageIndex, search],
    queryFn: () =>
      getWords({
        id: id ?? "",
        page: pageIndex,
        search: search ?? "",
        limit: 20,
      }),
  });

  useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
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
          <WordsTableFilter />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Data de inserção</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {words &&
                  words.results.map((word: Word) => (
                    <WordsTableRow key={word.id} data={word} />
                  ))}
              </TableBody>
            </Table>
          </div>
          {words && (
            <Pagination
              pageIndex={pageIndex}
              totalCount={words.totalDocs}
              perPage={20}
              onPageChange={handlePagination}
            />
          )}
        </div>
      </div>
    </>
  );
}
