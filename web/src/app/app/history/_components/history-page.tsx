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
import { getHistory } from "../actions";
import { History } from "../types";
import HistoryTableRow from "./history-table-row";

export default function HistoryTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const pageIndex = z.coerce.number().parse(searchParams.get("page")) || 1;

  const { data: historyData } = useQuery({
    queryKey: ["history", pageIndex],
    queryFn: () =>
      getHistory({
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
      <div className="flex flex-col gap-4 sm:w-[95%]">
        <div className="space-y-5">
          {/* <HistoryTableFilter /> */}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[48px]"></TableHead>
                  <TableHead className="min-w-[120px]">Identificador</TableHead>
                  <TableHead className="min-w-[120px]">Nome</TableHead>
                  <TableHead className="min-w-[140px]">
                    Data de inserção
                  </TableHead>
                  <TableHead className="w-[120px]"></TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyData?.history.map((word: History) => (
                  <HistoryTableRow key={word.id} data={word} />
                ))}
              </TableBody>
            </Table>
          </div>
          {historyData && (
            <Pagination
              pageIndex={pageIndex}
              totalCount={historyData?.totalDocs}
              perPage={20}
              onPageChange={handlePagination}
            />
          )}
        </div>
      </div>
    </>
  );
}
