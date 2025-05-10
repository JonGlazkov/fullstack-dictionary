import { FastifyInstance } from "fastify";
import authRoutes from "./routes/auth.routes";
import { searchHistoryRoutes } from "./routes/search-history.routes";
import { userRoutes } from "./routes/user.routes";
import { wordsRoutes } from "./routes/word.routes";

const registerRoutes = (app: FastifyInstance) => {
  app.register(userRoutes, { prefix: "/users" });
  app.register(authRoutes, { prefix: "/auth" });
  app.register(searchHistoryRoutes, { prefix: "/search" });
  app.register(wordsRoutes, { prefix: "/words" });
};

export default registerRoutes;
