import { FastifyInstance } from "fastify";
import { SearchHistoryCreate } from "../interfaces/search-history.interface";
import { UserDecodedByJwt } from "../interfaces/user.interface";
import { authMiddleware } from "../middlewares/authMiddleware";
import { SearchHistoryUseCases } from "../usecases/search-history.usecases";

export async function searchHistoryRoutes(fastify: FastifyInstance) {
  const searchHistoryUseCase = new SearchHistoryUseCases();

  fastify.addHook("preHandler", authMiddleware);
  fastify.post<{ Body: SearchHistoryCreate }>("/", async (req, reply) => {
    const userId = (req.user as { id: string }).id;
    const { word } = req.body;

    const searchHistory = await searchHistoryUseCase.saveSearch(userId, {
      word,
    });
    return reply.status(201).send(searchHistory);
  });

  fastify.get("/", async (req, reply) => {
    const { limit = 10, page = 1 } = req.query as {
      limit?: number;
      page?: number;
    };
    const authToken = req.headers.authorization;
    const token = authToken?.split(" ")[1];

    const user = fastify.jwt.decode<UserDecodedByJwt>(token);
    const userId = user.id;

    const searchHistory = await searchHistoryUseCase.getAllHistory(userId, {
      limit,
      page,
    });

    return reply.status(200).send(searchHistory);
  });
}
