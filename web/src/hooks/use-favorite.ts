import { markAsFavorite, unMarkAsFavorite } from "@/app/app/(home)/actions";
import { Word } from "@/app/app/(home)/types";
import { Favorite } from "@/app/app/favorites/types";
import { queryClient } from "@/lib/react-query";
import { ApiFavoriteResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface UseFavoriteProps {
  data: Word | Favorite;
}

export const useFavorite = ({ data }: UseFavoriteProps) => {
  function updateFavoriteStatusOnCache(id: string, word: string) {
    const cachedData = queryClient.getQueryData<
      ApiFavoriteResponse<Favorite[]>
    >(["favorites"]);

    if (!cachedData) return;

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

  return {
    markAsFavoriteFn,
    unMarkAsFavoriteFn,
    isWordFavorite,
    isMarking,
    isUnMarking,
  };
};
