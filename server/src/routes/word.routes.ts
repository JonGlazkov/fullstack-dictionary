import { authMiddleware } from "@src/middlewares/authMiddleware";
import { SearchHistoryUseCases } from "@src/usecases/search-history.usecases";
import { ErrorTypes, NotFound } from "@src/utils";
import GeneralError from "@src/utils/error/GeneralError";
import { FastifyInstance } from "fastify";

export async function wordsRoutes(fastify: FastifyInstance) {
  const searchHistoryUseCase = new SearchHistoryUseCases();

  fastify.addHook("preHandler", authMiddleware);
  fastify.get<{
    Querystring: { search: string; limit?: number; page?: number };
  }>("/", async (req, reply) => {
    const { search = "", limit = 10, page = 1 } = req.query;

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
      );

      if (response.ok) {
        const data = (await response.json()) as any[];
        const startIndex = (page - 1) * limit;
        const paginatedData = data.slice(startIndex, startIndex + limit);

        return reply.status(200).send({
          results: paginatedData,
          totalDocs: data.length,
          page,
          totalPages: Math.ceil(data.length / limit),
          hasNext: page * limit < data.length ? true : false,
          hasPrevious: page > 1 ? true : false,
        });
      }

      if (response.status === 404) {
        throw new NotFound({
          type: ErrorTypes.NotFound,
          title: "Search not found",
          detail: `The search for the word "${search}" was not found.`,
        });
      }
    } catch (error) {
      throw new GeneralError(error, error.statusCode || 500);
    }
  });

  fastify.get<{
    Headers: { Authorization: string };
    Params: { word: string };
  }>("/:word", async (req, reply) => {
    const { word } = req.params;
    const authHeader = req.headers.authorization;

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      if (response.ok) {
        const data = (await response.json()) as any[];

        const token = authHeader.split(" ")[1];
        const user = fastify.jwt.decode(token);

        if (user) {
          const userId = (user as { id: string }).id;
          await searchHistoryUseCase.saveSearch(userId, { word });
        }

        return reply.status(200).send({
          results: data,
        });
      }

      if (response.status === 404) {
        throw new NotFound({
          type: ErrorTypes.NotFound,
          title: "Search not found",
          detail: `The search for the word "${word}" was not found.`,
        });
      }
    } catch (error) {
      throw new GeneralError(error, error.statusCode || 500);
    }
  });
}
