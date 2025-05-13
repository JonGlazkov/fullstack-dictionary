import { Badge } from "@/components/ui/badge";
import type { Meaning } from "../../types";

type DictionarySynonymsAntonymsProps = {
  meanings: Meaning[];
};

export function DictionarySynonymsAntonyms({
  meanings,
}: DictionarySynonymsAntonymsProps) {
  const hasSynonyms = meanings.some((m) => m.synonyms.length > 0);
  const hasAntonyms = meanings.some((m) => m.antonyms.length > 0);

  if (!hasSynonyms && !hasAntonyms) {
    return null;
  }

  // Get unique synonyms and antonyms
  const uniqueSynonyms = Array.from(
    new Set(meanings.flatMap((m) => m.synonyms))
  );
  const uniqueAntonyms = Array.from(
    new Set(meanings.flatMap((m) => m.antonyms))
  );

  return (
    <div className="space-y-4">
      {hasSynonyms && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Sinônimos</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueSynonyms.map((synonym, index) => (
              <Badge key={index} variant="secondary">
                {synonym}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {hasAntonyms && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Antônimos</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueAntonyms.map((antonym, index) => (
              <Badge key={index} variant="outline">
                {antonym}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
