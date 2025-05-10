import { FastifyInstance } from "fastify";
import authRoutes from "./routes/auth.routes";
import { userRoutes } from "./routes/user.routes";

const registerRoutes = (app: FastifyInstance) => {
  app.register(userRoutes, {
    prefix: "/users",
  });

  app.register(authRoutes, {
    prefix: "/auth",
  });
};

export default registerRoutes;
