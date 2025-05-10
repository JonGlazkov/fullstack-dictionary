import { UserLogin } from "@src/interfaces/user.interface";
import { authMiddleware } from "@src/middlewares/authMiddleware";
import { AuthUseCase } from "@src/usecases/auth.usecases";
import { ErrorTypes } from "@src/utils";
import Internal from "@src/utils/error/Internal";
import { FastifyInstance } from "fastify";

export default async function authRoutes(fastify: FastifyInstance) {
  const authUseCase = new AuthUseCase(fastify);

  fastify.post<{ Body: UserLogin }>("/login", async (req, reply) => {
    const { email, password } = req.body;

    try {
      const token = await authUseCase.login({ email, password });
      return reply.send({ token });
    } catch (error) {
      return new Internal({
        type: ErrorTypes.Internal,
        title: error.name,
        detail: "Verify your credentials",
      });
    }
  });

  fastify.get(
    "/protected",
    { preValidation: [authMiddleware] },
    async (req, reply) => {
      const user = req.user;
      return reply.send({ message: "Protected route", user });
    }
  );
}
