import { PrismaClient } from "@prisma/client";

const client = globalThis.prisma || new PrismaClient();

export { client as prisma };
