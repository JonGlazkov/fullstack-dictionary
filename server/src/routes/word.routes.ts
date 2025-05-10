import { ErrorTypes, NotFound } from "@src/utils";
import GeneralError from "@src/utils/error/GeneralError";
import { FastifyInstance } from "fastify";

export async function wordsRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: { word: string } }>("/", async (req, reply) => {
    const { word } = req.query;

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      if (response.ok) {
        const data = await response.json();
        return reply.status(200).send(data);
      }

      if (response.status === 404) {
        throw new NotFound({
          type: ErrorTypes.NotFound,
          title: "Word not found",
          detail: `The word "${word}" was not found.`,
        });
      }

      return reply.status(response.status).send(response.body);
    } catch (error) {
      throw new GeneralError(error, error.statusCode || 500);
    }
  });
}
