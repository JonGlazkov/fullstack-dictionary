import { PrismaClient } from "@prisma/client/extension";

const prisma = globalThis.prisma || new PrismaClient();

export { prisma };
