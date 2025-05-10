import { UserLogin, UserRepository } from "@src/interfaces/user.interface";
import { UserRepositoryPrisma } from "@src/repositories/user.repository";
import { ErrorTypes, NotFound } from "@src/utils";
import { FastifyInstance } from "fastify";

class AuthUseCase {
  userRepository: UserRepository;
  constructor(private readonly app: FastifyInstance) {
    this.userRepository = new UserRepositoryPrisma();
  }

  async execute({ email, password }: UserLogin): Promise<string> {
    const user = await this.userRepository.login({ email, password });

    if (!user) {
      throw new NotFound({
        type: ErrorTypes.NotFound,
        title: "Invalid credentials",
        detail: "User not found",
      });
    }

    const token = this.app.jwt.sign(
      { id: user.id, email: user.email },
      { expiresIn: "1h" }
    );

    return token;
  }
}

export { AuthUseCase };
