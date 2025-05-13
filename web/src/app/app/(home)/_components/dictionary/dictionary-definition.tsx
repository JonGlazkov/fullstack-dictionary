import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { DictionaryEntry } from "../../types";
import { DictionaryMeanings } from "./dictionary-meanings";
import { DictionaryPhonetics } from "./dictionary-phonetics";
import { DictionarySources } from "./dictionary-sources";
import { DictionarySynonymsAntonyms } from "./dictionary-synonyms-antonyms";

type DictionaryDefinitionProps = {
  entry: DictionaryEntry;
  entryIndex: number;
};

export function DictionaryDefinition({
  entry,
  entryIndex,
}: DictionaryDefinitionProps) {
  return (
    <div className={entryIndex > 0 ? "pt-6 border-t" : ""}>
      {entryIndex > 0 && (
        <div className="mb-4">
          <Badge variant="outline" className="mb-2">
            Definição {entryIndex + 1}
          </Badge>
        </div>
      )}

      <DictionaryPhonetics
        phonetics={entry.phonetics}
        phonetic={entry.phonetics[0]?.text || ""}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Significados</h3>
        <DictionaryMeanings meanings={entry.meanings} entryIndex={entryIndex} />
      </div>

      {(entry.meanings.some((m) => m.synonyms.length > 0) ||
        entry.meanings.some((m) => m.antonyms.length > 0)) && (
        <>
          <Separator className="my-4" />
          <DictionarySynonymsAntonyms meanings={entry.meanings} />
        </>
      )}

      {entry.sourceUrls && entry.sourceUrls.length > 0 && (
        <>
          <Separator className="my-4" />
          <DictionarySources sourceUrls={entry.sourceUrls} />
        </>
      )}
    </div>
  );
}
