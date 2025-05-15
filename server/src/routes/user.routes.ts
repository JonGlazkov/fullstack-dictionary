import { FastifyInstance } from "fastify";
import { UserDecodedByJwt, UserUpdate } from "../interfaces/user.interface";
import { authMiddleware } from "../middlewares/authMiddleware";
import { FavoriteUseCase } from "../usecases/favorite.usecases";
import { SearchHistoryUseCases } from "../usecases/search-history.usecases";
import { UserUseCase } from "../usecases/user.usecases";

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase();
  const favoritesUseCase = new FavoriteUseCase();
  const searchHistoryUseCase = new SearchHistoryUseCases();

  fastify.addHook("preHandler", authMiddleware);
  fastify.patch<{ Body: UserUpdate }>("/", async (req, reply) => {
    const authToken = req.headers.authorization;
    const token = authToken?.split(" ")[1];

    const user = fastify.jwt.decode<UserDecodedByJwt>(token);
    const userId = user.id;
    const { name } = req.body;

    try {
      const data = await userUseCase.update(userId, { name });

      return reply.status(200).send(data);
    } catch (error) {
      reply.send(error);
    }
  });
  fastify.get("/me", async (req, reply) => {
    const authToken = req.headers.authorization;
    const token = authToken?.split(" ")[1];

    const user = fastify.jwt.decode<UserDecodedByJwt>(token);
    const userId = user.id;

    const data = await userUseCase.me(userId);

    return reply.status(200).send(data);
  });

  fastify.get("/me/history", async (req, reply) => {
    const authToken = req.headers.authorization;
    const token = authToken?.split(" ")[1];

    const user = fastify.jwt.decode<UserDecodedByJwt>(token);
    const userId = user.id;

    const { limit = 10, page = 1 } = req.query as {
      limit?: number;
      page?: number;
    };

    const data = await searchHistoryUseCase.getAllHistory(userId, {
      limit,
      page,
    });

    return reply.status(200).send(data);
  });

  fastify.get("/me/favorites", async (req, reply) => {
    const authToken = req.headers.authorization;
    const token = authToken?.split(" ")[1];

    const user = fastify.jwt.decode<UserDecodedByJwt>(token);
    const userId = user.id;

    const {
      limit = 10,
      page = 1,
      search,
    } = req.query as {
      limit?: number;
      page?: number;
      search?: string;
    };

    const data = await favoritesUseCase.getAllFavorites(userId, {
      limit,
      page,
      search,
    });

    return reply.status(200).send(data);
  });
}
