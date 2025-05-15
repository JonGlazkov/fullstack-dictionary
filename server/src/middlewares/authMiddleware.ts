import { FastifyReply, FastifyRequest } from "fastify";
import { ErrorTypes } from "../utils";
import Unauthorized from "../utils/error/Unauthorized";

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
