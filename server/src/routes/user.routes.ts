import { UserCreate } from "@src/interfaces/user.interface";
import { UserUseCase } from "@src/usecases/user.usecases";
import { FastifyInstance } from "fastify";

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase();
  fastify.post<{ Body: UserCreate }>("/", async (req, reply) => {
    const { name, email, password } = req.body;
    try {
      const data = await userUseCase.create({
        name,
        email,
        password,
      });

      return reply.status(201).send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.get("/", (req, reply) => {
    reply.send("Hello from user route");
  });
}
