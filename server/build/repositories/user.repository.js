"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryPrisma = void 0;
const prismaClient_1 = require("../utils/database/prismaClient");
class UserRepositoryPrisma {
    async create(user) {
        const result = await prismaClient_1.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            },
        });
        return result;
    }
    async me(id) {
        const result = await prismaClient_1.prisma.user.findUnique({
            where: {
                id,
            },
        });
        return result;
    }
    async login({ email, password }) {
        const result = await prismaClient_1.prisma.user.findUnique({
            where: {
                email,
                password,
            },
        });
        return result;
    }
    async verifyEmail(email) {
        const result = await prismaClient_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        return result;
    }
    async update(id, user) {
        const result = await prismaClient_1.prisma.user.update({
            where: {
                id,
            },
            data: {
                name: user.name,
            },
        });
        return result;
    }
}
exports.UserRepositoryPrisma = UserRepositoryPrisma;
