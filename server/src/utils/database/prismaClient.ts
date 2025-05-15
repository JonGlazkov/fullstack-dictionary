import { PrismaClient } from "prisma/generated/client";

const prisma = globalThis.prisma || new PrismaClient();

export { prisma };
