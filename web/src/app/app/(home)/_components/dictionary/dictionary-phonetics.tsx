"use client";

import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { useState } from "react";
import type { Phonetic } from "../../types";

type DictionaryPhoneticsProps = {
  phonetics: Phonetic[];
  phonetic?: string;
};

export function DictionaryPhonetics({
  phonetics,
  phonetic,
}: DictionaryPhoneticsProps) {
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );

  // Function to play audio
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

  const phoneticsWithAudio = phonetics.filter((p) => p.audio);

  if (phoneticsWithAudio.length === 0 && !phonetic) {
    return null;
  }

  return (
    <div className="mb-6">
      {/* Audio pronunciation buttons */}
      {phoneticsWithAudio.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {phoneticsWithAudio.map((phonetic, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => phonetic.audio && playAudio(phonetic.audio)}
              className="flex items-center gap-1"
            >
              <Volume2 size={16} />
              <span>{phonetic.text || `Pronúncia ${index + 1}`}</span>
            </Button>
          ))}
        </div>
      )}

      {/* Phonetic display */}
      {phonetic && (
        <div>
          <span className="text-muted-foreground">Fonética: </span>
          <span>{phonetic}</span>
        </div>
      )}
    </div>
  );
}
