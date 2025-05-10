import { ErrorTypes, NotFound } from "@src/utils";
import GeneralError from "@src/utils/error/GeneralError";
import { FastifyInstance } from "fastify";

export async function wordsRoutes(fastify: FastifyInstance) {
  fastify.get<{ Params: { word: string } }>("/:word", async (req, reply) => {
    const { word } = req.params;

    try {
      const response = await fastify.inject({
        method: "GET",
        url: `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      });

      if (response.statusCode >= 200 && response.statusCode < 300) {
        const data = JSON.parse(response.body);
        return reply.status(200).send(data);
      }

      if (response.statusCode === 404) {
        throw new NotFound({
          type: ErrorTypes.NotFound,
          title: "Word not found",
          detail: `The word "${word}" was not found.`,
        });
      }

      return reply.status(response.statusCode).send(response.body);
    } catch (error) {
      throw new GeneralError(
        {
          type: ErrorTypes.Internal,
          title: "Internal Server Error",
          detail: error,
        },
        error.statusCode || 500
      );
    }
  });
}
