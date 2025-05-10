import { UserLogin } from "@src/interfaces/user.interface";
import { authMiddleware } from "@src/middlewares/authMiddleware";
import { AuthUseCase } from "@src/usecases/auth.usecases";
import { FastifyInstance } from "fastify";

export default async function authRoutes(fastify: FastifyInstance) {
  const authUseCase = new AuthUseCase(fastify);

  fastify.post<{ Body: UserLogin }>("/login", async (req, reply) => {
    const { email, password } = req.body;

    const token = await authUseCase.login({ email, password });
    return reply.send({ token });
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
