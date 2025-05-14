import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import handleErrors from "@src/middlewares/handleErrors";
import routes from "@src/routes";
import fastify, { FastifyInstance } from "fastify";

class App {
  private readonly app: FastifyInstance;

  constructor() {
    this.app = fastify({
      ignoreDuplicateSlashes: true,
      // logger: true,
    });

    this.initRoutes();
    this.initHandleErrors();
  }

  async init() {
    const port = parseInt(process.env.PORT || "3333", 10);
    this.app.listen({ port }).then(() => {
      console.log(`🚀 HTTP server running on port ${port}`);
      console.log(this.app.printRoutes());
    });
    this.app.register(cors, {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
    });
  }

  private initRoutes() {
    this.app.register(routes);
    this.app.register(jwt, {
      secret: process.env.JWT_SECRET,
    });
    this.app.get("/", (_, res) => {
      res.send({ message: "Fullstack Challenge 🏅 - Dictionary" });
    });
    this.app.get("/ping", (_, res) => {
      res.send("pong");
    });
  }

  private initHandleErrors() {
    this.app.setErrorHandler(handleErrors);
  }
}

export default App;
