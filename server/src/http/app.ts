import handleErrors from "@src/middlewares/handleErrors";
import fastify, { FastifyInstance } from "fastify";


class App {
  private readonly app: FastifyInstance;

  constructor() {
    this.app = fastify({
      ignoreDuplicateSlashes: true,
      // logger: true,
    })

    this.initRoutes();
    this.initHandleErrors();
  }

  async init() {
    const port = parseInt(process.env.PORT || "3333", 10);
    this.app.listen({ port }).then(() => {
      console.log(`🚀 HTTP server running on port ${port}`);
    });
  }

  private initRoutes() {
    this.app.get("/ping", (_, res) => {
      res.send('pong');
    })
  }

  private initHandleErrors() {
    this.app.setErrorHandler(handleErrors)
  }

}

export default App;