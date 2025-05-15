"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUseCase = void 0;
const user_repository_1 = require("../repositories/user.repository");
const utils_1 = require("../utils");
class AuthUseCase {
    app;
    userRepository;
    constructor(app) {
        this.app = app;
        this.userRepository = new user_repository_1.UserRepositoryPrisma();
    }
    async login({ email, password }) {
        const user = await this.userRepository.login({ email, password });
        if (!user) {
            throw new utils_1.NotFound({
                type: utils_1.ErrorTypes.NotFound,
                title: "Invalid credentials",
                detail: "User not found",
            });
        }
        const token = this.app.jwt.sign({ id: user.id, name: user.name, email: user.email }, { expiresIn: "1h" });
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token,
        };
    }
    async create({ name, email, password }) {
        if (!name || !email || !password) {
            const missingFields = [];
            if (!name)
                missingFields.push("Name");
            if (!email)
                missingFields.push("Email");
            if (!password)
                missingFields.push("Password");
            throw new utils_1.BadRequest({
                type: utils_1.ErrorTypes.BadRequest,
                title: "Missing required fields",
                detail: `The following fields are required: ${missingFields.join(", ")}.`,
            });
        }
        const existingUser = await this.userRepository.verifyEmail(email);
        if (existingUser) {
            throw new utils_1.BadRequest({
                type: utils_1.ErrorTypes.BadRequest,
                title: "User already exists",
                detail: "User with this email already exists.",
            });
        }
        const user = await this.userRepository.create({
            name,
            email,
            password,
        });
        const token = this.app.jwt.sign({ id: user.id, name: user.name, email: user.email }, { expiresIn: "1h" });
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token,
        };
    }
}
exports.AuthUseCase = AuthUseCase;
