import { WordQuery, WordRepository } from "@src/interfaces/word.interface";
import { WordRepositoryPrisma } from "@src/repositories/word.repository";

export class WordUseCase {
  wordRepository: WordRepository;

  constructor() {
    this.wordRepository = new WordRepositoryPrisma();
  }

  async getAll({ id, word, limit, page }: WordQuery) {
    const [words, count] = await Promise.all([
      this.wordRepository.getAll({
        id,
        word,
        limit,
        page,
      }),
      this.wordRepository.count(),
    ]);

    return {
      results: words,
      totalDocs: count,
      page,
      totalPages: Math.ceil(count / limit),
      hasNext: count > page * limit,
      hasPrevious: page > 1,
    };
  }
}
