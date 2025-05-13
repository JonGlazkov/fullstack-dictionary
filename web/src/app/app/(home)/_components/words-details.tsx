"use client";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { getWordByName } from "../actions";
import { DictionaryDefinition } from "./dictionary/dictionary-definition";

interface WordDetailsProps {
  word?: string;
  open?: boolean;
}

export default function WordDetails({ word, open }: WordDetailsProps) {
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );

  const {
    data: wordData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["word", word],
    queryFn: () => getWordByName(word),
    enabled: !!word && open,
  });

  console.log("wordData", wordData);
  const playAudio = (audioUrl: string) => {
    if (audioElement) {
      audioElement.pause();
    }

    const audio = new Audio(audioUrl);
    audio.play().catch((error) => {
      console.error("Failed to play audio:", error);
    });

    setAudioElement(audio);
  };

  const wordEntries = wordData?.results || [];

  return (
    <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl flex items-center gap-2">
          {word}
          {wordEntries.length > 0 &&
            wordEntries[0]?.phonetics?.find((p) => p.text) && (
              <span className="text-base font-normal text-muted-foreground">
                {wordEntries[0]?.phonetics.find((p) => p.text)?.text}
              </span>
            )}
        </DialogTitle>
        <DialogDescription>Detalhes da palavra</DialogDescription>
      </DialogHeader>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Carregando...</span>
        </div>
      ) : error ? (
        <div className="py-8 text-center">
          <p className="text-destructive">
            Erro ao carregar os detalhes da palavra.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Tente novamente mais tarde ou verifique se a palavra existe.
          </p>
        </div>
      ) : wordEntries.length > 0 ? (
        <div className="space-y-8 py-4">
          {wordEntries.map((entry, entryIndex) => (
            <DictionaryDefinition
              key={entryIndex}
              entry={entry}
              entryIndex={entryIndex}
            />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">
            Nenhuma informação disponível para esta palavra.
          </p>
        </div>
      )}
    </DialogContent>
  );
}
