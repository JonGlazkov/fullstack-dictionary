import { ErrorTypes } from "@src/utils";
import Unauthorized from "@src/utils/error/Unauthorized";
import { FastifyReply, FastifyRequest } from "fastify";

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch (err) {
    throw new Unauthorized({
      type: ErrorTypes.Unauthorized,
      title: "Unauthorized",
      detail: err,
    });
  }
}
