import { FastifyInstance } from "fastify";
import { UserDecodedByJwt } from "../interfaces/user.interface";
import { authMiddleware } from "../middlewares/authMiddleware";
import { FavoriteUseCase } from "../usecases/favorite.usecases";
import { SearchHistoryUseCases } from "../usecases/search-history.usecases";
import { WordUseCase } from "../usecases/word.usecases";
import { ErrorTypes, NotFound } from "../utils";
import GeneralError from "../utils/error/GeneralError";

export async function wordsRoutes(fastify: FastifyInstance) {
  const searchHistoryUseCase = new SearchHistoryUseCases();
  const favoriteUseCase = new FavoriteUseCase();
  const wordUseCase = new WordUseCase();

  fastify.addHook("preHandler", authMiddleware);
  fastify.get<{
    Querystring: {
      id?: string;
      search?: string;
      limit?: number;
      page?: number;
    };
  }>("/", async (req, reply) => {
    const { id, search, limit = 10, page = 1 } = req.query;

    const words = await wordUseCase.getAll({
      id,
      word: search,
      page: Number(page),
      limit: Number(limit),
    });

    return reply.status(200).send(words);
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
        const user = fastify.jwt.decode<UserDecodedByJwt>(token);

        if (user) {
          const userId = user.id;
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
        const user = fastify.jwt.decode<UserDecodedByJwt>(token);
        const userId = user.id;

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
        const user = fastify.jwt.decode<UserDecodedByJwt>(token);
        const userId = user.id;

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
