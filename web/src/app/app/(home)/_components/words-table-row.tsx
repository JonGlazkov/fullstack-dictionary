"use client";
import { useMutation } from "@tanstack/react-query";
import { Search, Star, StarOff } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";

import { ApiFavoriteResponse } from "@/components/types";
import { queryClient } from "@/lib/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { markAsFavorite, unMarkAsFavorite } from "../actions";
import { Favorite, Word } from "../types";
import WordDetails from "./words-details";

export interface WordTableRowProps {
  data: Word;
  favorite?: Favorite;
}

export default function WordsTableRow({ data, favorite }: WordTableRowProps) {
  const { data: session } = useSession();
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  function updateFavoriteStatusOnCache(id: string, word: string) {
    const cachedData = queryClient.getQueryData<
      ApiFavoriteResponse<Favorite[]>
    >(["favorites"]);

    if (!cachedData) return;

    console.log("cachedData", cachedData);
    queryClient.setQueryData<ApiFavoriteResponse<Favorite[]>>(["favorites"], {
      ...cachedData,
      favorites: cachedData.favorites.map((favorite) => {
        if (favorite.word === word) {
          return {
            ...favorite,
          };
        }
        return favorite;
      }),
    });
    queryClient.invalidateQueries({ queryKey: ["favorites"] });
  }

  const { mutateAsync: markAsFavoriteFn, isPending: isMarking } = useMutation({
    mutationFn: () => markAsFavorite(data.word),
    onSuccess: () => {
      toast.success("Palavra marcada como favorita");
      updateFavoriteStatusOnCache(data.id, data.word);
    },
  });

  const { mutateAsync: unMarkAsFavoriteFn, isPending: isUnMarking } =
    useMutation({
      mutationFn: () => unMarkAsFavorite(data.word),
      onSuccess: () => {
        toast.success("Palavra desmarcada como favorita");
        updateFavoriteStatusOnCache(data.id, data.word);
      },
    });

  const favorites = queryClient.getQueryData<ApiFavoriteResponse<Favorite[]>>([
    "favorites",
  ]);

  const isWordFavorite = favorites?.favorites.some(
    (favorite) => favorite.word === data.word
  );

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes da consulta</span>
            </Button>
          </DialogTrigger>

          <WordDetails open={isDetailOpen} word={data.word} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">{data.id}</TableCell>

      <TableCell className="font-medium">{data.word}</TableCell>
      <TableCell className="text-muted-foreground">12/08/2025</TableCell>

      <TableCell>
        {!isWordFavorite ? (
          <Button onClick={() => markAsFavoriteFn()} variant="ghost" size="sm">
            <Star className="mr-1 h-3 w-3" />
            Favoritar
          </Button>
        ) : (
          <Button
            onClick={() => unMarkAsFavoriteFn()}
            variant="ghost"
            size="sm"
          >
            <StarOff className="mr-1 h-3 w-3 text-black" />
            Desfavoritar
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
