# 📚 Fullstack Challenge 🏅 - Dictionary

Este projeto é uma aplicação fullstack que simula um dicionário online com funcionalidades de autenticação, histórico de palavras visualizadas, favoritos e busca de definições. 

Foi desenvolvido seguindo as **melhores práticas de Clean Code, SOLID**, e separação clara entre frontend e backend.

---
### `This is a challenge by Coodesh`

## 💻 Tecnologias Utilizadas

### 🔙 Backend

- [Node.js](https://nodejs.org/)
- [Fastify](https://fastify.dev/)
- [Prisma ORM](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/)
- SOLID Principles + Clean Architecture
- OpenAPI 3.0 (Swagger)

### 🔜 Frontend

- [Next.js 15 (App Router)](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Axios](https://axios-http.com/)
- [TanStack Query (React Query)](https://tanstack.com/query/v4)
- SSR (opcional)
- URL compartilhável com parâmetros _(diferencial)_

---

## 🗂 Estrutura do Repositório

```bash
.
├── server/         # API RESTful com Fastify + Prisma
└── web/            # Aplicação Next.js

```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 20 ou superior)
- SQLite (opcional, o Prisma cria o banco automaticamente)
- PNPM ou Yarn (opcional, o projeto usa o pnpm como gerenciador de pacotes)

### Executando o Backend

1. Clone o repositório:

   ```bash
   git clone https://github.com/JonGlazkov/fullstack-dictionary.git
   cd fullstack-dictionary/server
   ```

2. Instale as dependências:

   ```bash
   pnpm install
   ```

3. Configure o banco de dados no arquivo `.env` (opcional) e o JWT_SECRET(obrigatório):

   ```bash
   DATABASE_URL="file:./dev.db"
   JWT_SECRET=seu-segredo-aqui
   ```

4. Execute as migrações do Prisma:

   ```bash
   npx prisma migrate dev

   ou

   pnpm prisma migrate dev
   ```

5. Inicie o servidor:

   ```bash
    pnpm dev
   ```

6. Acesse a documentação da API em `http://localhost:3333/docs` (Swagger).
   > **Observação:** Caso precise popular o banco com as palavras em inglês, execute o comando abaixo dentro da pasta `server`:
   ```bash
   pnpm populate
   ```

### Executando o Frontend

1. Clone o repositório caso ainda não tenha feito:

   ```bash
   git clone https://github.com/JonGlazkov/fullstack-dictionary.git
    cd fullstack-dictionary/web
   ```

2. Instale as dependências:

   ```bash
   pnpm install
   ```

3. Configure a URL da API no arquivo `.env`:

   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:3333
   ```

4. Gere o AUTH_SECRET no arquivo `.env` (obrigatório):

   ```bash
   pnpm dlx auth@latest secret
   ```

5. Inicie o servidor:

   ```bash
   pnpm dev
   ```

6. Acesse a aplicação em `http://localhost:3000`.
