import { PrismaClient } from "prisma/generated/client";

const client = globalThis.prisma || new PrismaClient();

export { client as prisma };
