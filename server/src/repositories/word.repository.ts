import {
  Word,
  WordQuery,
  WordRepository,
} from "@src/interfaces/word.interface";
import GeneralError, { ErrorTypes } from "@src/utils/error/GeneralError";

export class WordRepositoryPrisma implements WordRepository {
  async getAll(query: WordQuery): Promise<Word[]> {
    const { word, page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;

    const result = await prisma.$queryRaw<Word[]>`
      SELECT *
      FROM words
      WHERE word LIKE ${`${word}%`}
      ORDER BY 
        CASE 
          WHEN word LIKE ${`${word} %`} THEN 1 
          ELSE 0 
        END
      LIMIT ${limit} 
      OFFSET ${offset}
    `;

    if (!result) {
      throw new GeneralError(
        {
          type: ErrorTypes.Internal,
          title: "No existing words",
          detail:
            "No words found in the database, please populate the database with the command in script.",
        },
        500
      );
    }

    return result;
  }

  async count(): Promise<number> {
    const result = await prisma.word.count();

    if (!result) {
      throw new GeneralError(
        {
          type: ErrorTypes.Internal,
          title: "No existing words",
          detail:
            "No words found in the database, please populate the database with the command in script.",
        },
        500
      );
    }

    return result;
  }
}
