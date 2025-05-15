import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import fastify, { FastifyInstance } from "fastify";
import handleErrors from "../middlewares/handleErrors";
import routes from "../routes";

class App {
  private readonly app: FastifyInstance;

  constructor() {
    this.app = fastify({
      ignoreDuplicateSlashes: true,
      // logger: true,
    });

    this.initRoutes();
    this.initHandleErrors();
    this.initSwagger();
  }

  async init() {
    const port = parseInt(process.env.PORT || "3333", 10);
    const host = process.env.HOST || "";
    this.app.listen({ port, host }).then(() => {
      console.log(`🚀 HTTP server running on port ${port}`);
      console.log(`📚 Swagger docs available at http://localhost:${port}/docs`);
      console.log(this.app.printRoutes());
    });
    this.app.register(cors, {
      origin: [
        "https://dictionary.jonventura.dev",
        "https://fullstack-dictionary-six.vercel.app",
        "http://localhost:3000",
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
    });
  }

  private initSwagger() {
    //@ts-ignore
    this.app.register(swagger, {
      openapi: {
        openapi: "3.0.0",
        info: {
          title: "Fullstack Dictionary API",
          version: "1.0.0",
          description: "API para o projeto Fullstack Dictionary",
        },
        paths: {
          "/users": {
            patch: {
              summary: "Atualiza o nome do usuário",
              description: "Atualiza o nome do usuário autenticado",
              tags: ["Usuários"],
            },
            parameters: [
              {
                name: "name",
                in: "body",
                description: "Nome do usuário",
                required: true,
                schema: {
                  type: "string",
                },
              },
            ],
          },
          "/users/me": {
            get: {
              summary: "Retorna o usuário autenticado",
              description: "Retorna os dados do usuário autenticado",
              tags: ["Usuários"],
              responses: {
                200: {
                  description: "Usuário autenticado",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          name: { type: "string" },
                          email: { type: "string" },
                          token: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "/users/me/favorites": {
            get: {
              summary: "Retorna as palavras favoritas do usuário",
              description:
                "Retorna as palavras favoritas do usuário autenticado",
              tags: ["Usuários"],
              responses: {
                200: {
                  description: "Palavras favoritas do usuário",
                  content: {
                    "application/json": {
                      schema: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "string" },
                            word: { type: "string" },
                            userId: { type: "string" },
                            createdAt: { type: "string", format: "date-time" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "/users/me/history": {
            get: {
              summary: "Retorna o histórico de palavras do usuário",
              description:
                "Retorna o histórico de palavras do usuário autenticado",
              tags: ["Usuários"],
              responses: {
                200: {
                  description: "Histórico de palavras do usuário",
                  content: {
                    "application/json": {
                      schema: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "string" },
                            word: { type: "string" },
                            createdAt: { type: "string", format: "date-time" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "/auth/signin": {
            post: {
              summary: "Login",
              description: "Realiza o login do usuário",
              tags: ["Autenticação"],
            },
            parameters: [
              {
                name: "email",
                in: "body",
                description: "Email do usuário",
                required: true,
                schema: {
                  type: "string",
                  format: "email",
                },
              },
              {
                name: "password",
                in: "body",
                description: "Senha do usuário",
                required: true,
                schema: {
                  type: "string",
                  format: "password",
                },
              },
            ],
          },
          "/auth/signup": {
            post: {
              summary: "Cadastro",
              description: "Realiza o cadastro do usuário",
              tags: ["Autenticação"],
            },
            parameters: [
              {
                name: "name",
                in: "body",
                description: "Nome do usuário",
                required: true,
                schema: {
                  type: "string",
                },
              },
              {
                name: "email",
                in: "body",
                description: "Email do usuário",
                required: true,
                schema: {
                  type: "string",
                  format: "email",
                },
              },
              {
                name: "password",
                in: "body",
                description: "Senha do usuário",
                required: true,
                schema: {
                  type: "string",
                  format: "password",
                },
              },
            ],
          },
          "/entries/en/": {
            get: {
              summary: "Busca palavras no dicionário",
              description: "Busca palavras no dicionário",
              tags: ["Dicionário"],
            },
            parameters: [
              {
                name: "word",
                in: "query",
                description: "Palavra a ser buscada",
                required: true,
                schema: {
                  type: "string",
                },
              },
              {
                name: "page",
                in: "query",
                description: "Número da página",
                required: false,
                schema: {
                  type: "integer",
                  default: 1,
                },
              },
              {
                name: "limit",
                in: "query",
                description: "Número de resultados por página",
                required: false,
                schema: {
                  type: "integer",
                  default: 10,
                },
              },
            ],
            responses: {
              200: {
                description: "Palavra encontrada",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          word: { type: "string" },
                          createdAt: { type: "string", format: "date-time" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "/entries/en/{word}": {
            get: {
              summary: "Busca palavra no dicionário",
              description: "Busca palavra no dicionário",
              tags: ["Dicionário"],
            },
            parameters: [
              {
                name: "word",
                in: "path",
                description: "Palavra a ser buscada",
                required: true,
                schema: {
                  type: "string",
                },
              },
            ],
            responses: {
              200: {
                description: "Palavra encontrada",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        results: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              word: { type: "string" },
                              phonetics: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    text: { type: "string" },
                                    audio: { type: "string" },
                                  },
                                },
                              },
                              meanings: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    partOfSpeech: { type: "string" },
                                    definitions: {
                                      type: "array",
                                      items: {
                                        type: "object",
                                        properties: {
                                          definition: { type: "string" },
                                          example: { type: "string" },
                                          synonyms: {
                                            type: "array",
                                            items: { type: "string" },
                                          },
                                          antonyms: {
                                            type: "array",
                                            items: { type: "string" },
                                          },
                                        },
                                      },
                                    },
                                    synonyms: {
                                      type: "array",
                                      items: { type: "string" },
                                    },
                                    antonyms: {
                                      type: "array",
                                      items: { type: "string" },
                                    },
                                  },
                                },
                              },
                              origin: { type: "string" },
                              sourceUrls: {
                                type: "array",
                                items: { type: "string" },
                              },
                            },
                          },
                        },
                        pagination: {
                          type: "object",
                          properties: {
                            total: { type: "integer" },
                            page: { type: "integer" },
                            limit: { type: "integer" },
                          },
                        },
                      },
                    },
                  },
                },
              },
              404: {
                description: "Palavra não encontrada",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        error: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
          "/entries/en/{word}/favorite": {
            post: {
              summary: "Favorita uma palavra",
              description: "Favorita uma palavra do dicionário",
              tags: ["Dicionário"],
            },
            parameters: [
              {
                name: "word",
                in: "path",
                description: "Palavra a ser favoritada",
                required: true,
                schema: {
                  type: "string",
                },
              },
            ],
            responses: {
              200: {
                description: "Palavra favoritada",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        word: { type: "string" },
                        userId: { type: "string" },
                        createdAt: { type: "string", format: "date-time" },
                      },
                    },
                  },
                },
              },
            },
          },
          "/entries/en/{word}/unfavorite": {
            delete: {
              summary: "Desfavorita uma palavra",
              description: "Desfavorita uma palavra do dicionário",
              tags: ["Dicionário"],
            },
            parameters: [
              {
                name: "word",
                in: "path",
                description: "Palavra a ser desfavoritada",
                required: true,
                schema: {
                  type: "string",
                },
              },
            ],
            responses: {
              200: {
                description: "Palavra desfavoritada",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
          "/search/": {
            post: {
              summary: "Cria um novo histórico de palavras",
              description: "Cria um novo histórico de palavras",
              tags: ["Histórico"],
            },
            get: {
              summary: "Busca histórico de palavras",
              description: "Busca todos os históricos de palavras",
              tags: ["Histórico"],
            },
            parameters: [
              {
                name: "limit",
                in: "query",
                description: "Número de resultados por página",
                required: false,
                schema: {
                  type: "integer",
                  default: 10,
                },
              },
              {
                name: "page",
                in: "query",
                description: "Número da página",
                required: false,
                schema: {
                  type: "integer",
                  default: 1,
                },
              },
            ],
            responses: {
              201: {
                description: "Histórico de palavras criado",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        word: { type: "string" },
                        createdAt: { type: "string", format: "date-time" },
                      },
                    },
                  },
                },
              },
              200: {
                description: "Histórico de palavras",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          word: { type: "string" },
                          createdAt: { type: "string", format: "date-time" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          servers: [
            {
              url: "http://localhost:3333",
              description: "Servidor local",
            },
          ],
        },
      },
    });

    this.app.register(swaggerUi, {
      routePrefix: "/docs", // URL para acessar a documentação
      staticCSP: true,
      transformStaticCSP: (header) => header,
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
