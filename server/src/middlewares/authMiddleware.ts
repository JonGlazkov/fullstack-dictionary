import Unauthorized from "@src/utils/error/Unauthorized";
import { FastifyReply, FastifyRequest } from "fastify";

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch (err) {
    return reply.send(new Unauthorized(err));
  }
}
