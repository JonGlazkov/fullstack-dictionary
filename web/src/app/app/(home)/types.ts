export type Word = {
  id: string;
  word: string;
  createdAt: string;
};

export type Favorite = {
  id: string;
  userId: string;
  word: string;
};

export type License = {
  name: string;
  url: string;
};

export type Phonetic = {
  text?: string;
  audio?: string;
  sourceUrl?: string;
  license?: License;
};

export type Definition = {
  definition: string;
  synonyms: string[];
  antonyms: string[];
  example?: string;
};

export type Meaning = {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
  antonyms: string[];
};

export type DictionaryEntry = {
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  license?: License;
  sourceUrls?: string[];
};

export type DictionaryResponse = {
  results: DictionaryEntry[];
};
