import type { Definition } from "../../types";

type DictionaryDefinitionItemProps = {
  definition: Definition;
  defIndex: number;
};

export function DictionaryDefinitionItem({
  definition,
  defIndex,
}: DictionaryDefinitionItemProps) {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <span className="text-muted-foreground">{defIndex + 1}.</span>
        <p>{definition.definition}</p>
      </div>

      {definition.example && (
        <div className="pl-5 border-l-2 border-muted italic text-muted-foreground">
          "{definition.example}"
        </div>
      )}

      {(definition.synonyms.length > 0 || definition.antonyms.length > 0) && (
        <div className="pl-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {definition.synonyms.length > 0 && (
            <div>
              <span className="text-muted-foreground mr-2">Sinônimos:</span>
              {definition.synonyms.map((syn, synIndex) => (
                <span key={synIndex} className="mr-1">
                  {syn}
                  {synIndex < definition.synonyms.length - 1 ? "," : ""}
                </span>
              ))}
            </div>
          )}

          {definition.antonyms.length > 0 && (
            <div>
              <span className="text-muted-foreground mr-2">Antônimos:</span>
              {definition.antonyms.map((ant, antIndex) => (
                <span key={antIndex} className="mr-1">
                  {ant}
                  {antIndex < definition.antonyms.length - 1 ? "," : ""}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
