import {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";

import GeneralError from "../utils/error/GeneralError";

enum ErrorTypes {
  App = "App",
  Unknown = "Unknown",
}

const handleErrors = function (
  this: FastifyInstance,
  err: FastifyError,
  req: FastifyRequest,
  res: FastifyReply
) {
  if (err instanceof GeneralError) {
    return res.status(err.statusCode).send({
      origin: ErrorTypes.App,
      errors: err.error,
    });
  }

  return res.status(500).send({
    origin: ErrorTypes.Unknown,
    errors: [err.message || "Unknown error"],
  });
};

export default handleErrors;
