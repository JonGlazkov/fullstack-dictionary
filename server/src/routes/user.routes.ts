import { UserUpdate } from "@src/interfaces/user.interface";
import { UserUseCase } from "@src/usecases/user.usecases";
import { FastifyInstance } from "fastify";

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase();

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
