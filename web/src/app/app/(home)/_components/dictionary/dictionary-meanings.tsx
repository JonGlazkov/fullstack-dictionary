"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import type { Meaning } from "../../types";
import { DictionaryDefinitionItem } from "./dictionary-definition-item";

type DictionaryMeaningsProps = {
  meanings: Meaning[];
  entryIndex: number;
};

export function DictionaryMeanings({
  meanings,
  entryIndex,
}: DictionaryMeaningsProps) {
  return (
    <Accordion type="multiple" className="w-full">
      {meanings.map((meaning, index) => (
        <AccordionItem key={index} value={`meaning-${entryIndex}-${index}`}>
          <AccordionTrigger className="text-left">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="capitalize">
                {meaning.partOfSpeech === "noun"
                  ? "Substantivo"
                  : meaning.partOfSpeech === "verb"
                    ? "Verbo"
                    : meaning.partOfSpeech === "adjective"
                      ? "Adjetivo"
                      : meaning.partOfSpeech === "adverb"
                        ? "Advérbio"
                        : meaning.partOfSpeech === "pronoun"}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {meaning.definitions.length > 1
                  ? "Definições"
                  : "Definição"}{" "}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pl-1">
              {meaning.definitions.map((definition, defIndex) => (
                <DictionaryDefinitionItem
                  key={defIndex}
                  definition={definition}
                  defIndex={defIndex}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
