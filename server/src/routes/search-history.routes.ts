import { SearchHistoryCreate } from "@src/interfaces/search-history.interface";
import { authMiddleware } from "@src/middlewares/authMiddleware";
import { SearchHistoryUseCases } from "@src/usecases/search-history.usecases";
import { FastifyInstance } from "fastify";

export async function searchHistoryRoutes(fastify: FastifyInstance) {
  const searchHistoryUseCase = new SearchHistoryUseCases();

  fastify.post<{ Body: SearchHistoryCreate }>(
    "/",
    { preValidation: [authMiddleware] },
    async (req, reply) => {
      const userId = (req.user as { id: string }).id;
      const { word } = req.body;

      const searchHistory = await searchHistoryUseCase.saveSearch(userId, {
        word,
      });
      return reply.status(201).send(searchHistory);
    }
  );

  fastify.get("/", { preValidation: [authMiddleware] }, async (req, reply) => {
    const { userId } = req.user as { userId: string };
    const { limit = 10, page = 1 } = req.query as {
      limit?: number;
      page?: number;
    };

    const searchHistory = await searchHistoryUseCase.getAllHistory(userId, {
      limit,
      page,
    });

    return reply.status(200).send(searchHistory);
  });
}
