export interface Word {
  id: string;
  word: string;
  createdAt: Date;
}

export interface WordQuery {
  id?: string;
  word?: string;
  page: number;
  limit: number;
}

export interface WordRepository {
  getAll(query: WordQuery): Promise<Word[]>;
  count(): Promise<number>;
}
