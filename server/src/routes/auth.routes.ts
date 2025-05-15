import { FastifyInstance } from "fastify";
import { UserCreate, UserLogin } from "../interfaces/user.interface";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AuthUseCase } from "../usecases/auth.usecases";

export default async function authRoutes(fastify: FastifyInstance) {
  const authUseCase = new AuthUseCase(fastify);

  fastify.post<{ Body: UserLogin }>("/signin", async (req, reply) => {
    const { email, password } = req.body;

    const user = await authUseCase.login({ email, password });
    return reply.send(user);
  });

  fastify.post<{ Body: UserCreate }>("/signup", async (req, reply) => {
    const { name, email, password } = req.body;
    try {
      const data = await authUseCase.create({
        name,
        email,
        password,
      });

      return reply.status(201).send(data);
    } catch (error) {
      reply.send(error);
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
