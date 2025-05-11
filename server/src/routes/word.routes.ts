import { authMiddleware } from "@src/middlewares/authMiddleware";
import { FavoriteUseCase } from "@src/usecases/favorite.usecases";
import { SearchHistoryUseCases } from "@src/usecases/search-history.usecases";
import { ErrorTypes, NotFound } from "@src/utils";
import GeneralError from "@src/utils/error/GeneralError";
import { FastifyInstance } from "fastify";

export async function wordsRoutes(fastify: FastifyInstance) {
  const searchHistoryUseCase = new SearchHistoryUseCases();
  const favoriteUseCase = new FavoriteUseCase();

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
          detail: `The search for the word ${search} was not found.`,
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
          detail: `The search for the word ${word} was not found.`,
        });
      }
    } catch (error) {
      throw new GeneralError(error, error.statusCode || 500);
    }
  });

  fastify.post<{ Params: { word: string } }>(
    "/:word/favorite",
    async (req, reply) => {
      const { word } = req.params;
      const authHeader = req.headers.authorization;

      try {
        const token = authHeader.split(" ")[1];
        const user = fastify.jwt.decode(token);
        const userId = (user as { id: string }).id;

        await favoriteUseCase.save(userId, word);

        return reply.status(201).send({
          message: `The word ${word} has been added to favorites.`,
        });
      } catch (error) {
        throw new GeneralError(error, error.statusCode || 500);
      }
    }
  );

  fastify.delete<{ Params: { word: string } }>(
    "/:word/unfavorite",
    async (req, reply) => {
      const { word } = req.params;
      const authHeader = req.headers.authorization;

      try {
        const token = authHeader.split(" ")[1];
        const user = fastify.jwt.decode(token);
        const userId = (user as { id: string }).id;

        await favoriteUseCase.unfavorite(userId, word);

        return reply.status(200).send({
          message: `The word ${word} has been removed from favorites.`,
        });
      } catch (error) {
        throw new GeneralError(error, error.statusCode || 500);
      }
    }
  );
}
