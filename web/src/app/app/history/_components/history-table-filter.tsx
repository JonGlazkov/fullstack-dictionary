"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const historyFilterSchema = z.object({
  id: z.string().nullable(),
  word: z.string().nullable(),
});

type HistoryFilterSchema = z.infer<typeof historyFilterSchema>;

export default function HistoryTableFilter() {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const id = searchParams.get("id");
  const history = searchParams.get("search");

  const { register, handleSubmit, control, reset } =
    useForm<HistoryFilterSchema>({
      resolver: zodResolver(historyFilterSchema),
      defaultValues: {
        id,
        word: history,
      },
    });

  function handleFilter({ word, id }: HistoryFilterSchema) {
    if (id) {
      params.set("id", id);
    } else {
      params.delete("id");
    }

    if (word) {
      params.set("search", word);
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    router.prefetch(pathname + "?" + params.toString());
    router.push(pathname + "?" + params.toString());
    return params.toString();
  }

  function handleClearFilters() {
    params.delete("id");
    params.delete("search");
    params.delete("createdAt");
    params.set("page", "1");

    reset({
      id: "",
      word: "",
    });

    router.prefetch(pathname + "?" + params.toString());
    router.push(pathname + "?" + params.toString());
    return params.toString();
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        placeholder="ID da Palavra"
        className="h-8 w-auto"
        {...register("id")}
      />

      <Input
        placeholder="Palavra"
        className="h-8 w-[320px]"
        {...register("word")}
      />

      <Button type="submit" variant="secondary" size="sm">
        <Search className="size-4" />
        Filtrar resultados
      </Button>
      <Button
        onClick={handleClearFilters}
        type="button"
        variant="outline"
        size="sm"
      >
        <X className="size-4" />
        Remover filtros
      </Button>
    </form>
  );
}
