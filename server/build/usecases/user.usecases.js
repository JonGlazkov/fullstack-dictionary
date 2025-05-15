"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUseCase = void 0;
const user_repository_1 = require("../repositories/user.repository");
const utils_1 = require("../utils");
class UserUseCase {
    userRepository;
    constructor() {
        this.userRepository = new user_repository_1.UserRepositoryPrisma();
    }
    async update(id, user) {
        if (!id) {
            throw new utils_1.BadRequest({
                type: utils_1.ErrorTypes.BadRequest,
                title: "Missing required fields",
                detail: "ID is required.",
            });
        }
        if (!user.name) {
            throw new utils_1.BadRequest({
                type: utils_1.ErrorTypes.BadRequest,
                title: "Missing required fields",
                detail: "Name is required.",
            });
        }
        const result = await this.userRepository.update(id, user);
        return result;
    }
    async me(id) {
        if (!id) {
            throw new utils_1.BadRequest({
                type: utils_1.ErrorTypes.BadRequest,
                title: "Missing required fields",
                detail: "ID is required.",
            });
        }
        const result = await this.userRepository.me(id);
        return result;
    }
}
exports.UserUseCase = UserUseCase;
