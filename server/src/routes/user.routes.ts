import { UserCreate, UserUpdate } from "@src/interfaces/user.interface";
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

  fastify.patch<{ Params: { id: string }; Body: UserUpdate }>(
    "/:id",
    async (req, reply) => {
      const { id } = req.params;
      const { name } = req.body;

      try {
        const data = await userUseCase.update(id, { name });

        return reply.status(200).send(data);
      } catch (error) {
        reply.send(error);
      }
    }
  );
}
