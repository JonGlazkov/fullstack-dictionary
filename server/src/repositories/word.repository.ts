import { Word, WordQuery, WordRepository } from "../interfaces/word.interface";
import { prisma } from "../utils/database/prismaClient";
import GeneralError, { ErrorTypes } from "../utils/error/GeneralError";

export class WordRepositoryPrisma implements WordRepository {
  async getAll(query: WordQuery): Promise<Word[]> {
    const { id, word, page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;

    let result: Word[];

    if (id) {
      result = await prisma.$queryRaw<Word[]>`
      SELECT *
      FROM words
      WHERE id = ${id}
      LIMIT 1
      `;
    } else if (!word) {
      result = await prisma.$queryRaw<Word[]>`
      SELECT *
      FROM words
      ORDER BY word ASC
      LIMIT ${limit}
      OFFSET ${offset}
      `;
    } else {
      result = await prisma.$queryRaw<Word[]>`
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
    }

    if (!result || result.length === 0) {
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
