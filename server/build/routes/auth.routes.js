"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authRoutes;
const authMiddleware_1 = require("../middlewares/authMiddleware");
const auth_usecases_1 = require("../usecases/auth.usecases");
async function authRoutes(fastify) {
    const authUseCase = new auth_usecases_1.AuthUseCase(fastify);
    fastify.post("/signin", async (req, reply) => {
        const { email, password } = req.body;
        const user = await authUseCase.login({ email, password });
        return reply.send(user);
    });
    fastify.post("/signup", async (req, reply) => {
        const { name, email, password } = req.body;
        try {
            const data = await authUseCase.create({
                name,
                email,
                password,
            });
            return reply.status(201).send(data);
        }
        catch (error) {
            reply.send(error);
        }
    });
    fastify.get("/protected", { preValidation: [authMiddleware_1.authMiddleware] }, async (req, reply) => {
        const user = req.user;
        return reply.send({ message: "Protected route", user });
    });
}
