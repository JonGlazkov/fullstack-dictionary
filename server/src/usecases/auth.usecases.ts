import { FastifyInstance } from "fastify";
import {
  UserCreate,
  UserLogin,
  UserRepository,
  UserResponse,
} from "../interfaces/user.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";
import { BadRequest, ErrorTypes, NotFound } from "../utils";

class AuthUseCase {
  userRepository: UserRepository;
  constructor(private readonly app: FastifyInstance) {
    this.userRepository = new UserRepositoryPrisma();
  }

  async login({ email, password }: UserLogin): Promise<UserResponse> {
    const user = await this.userRepository.login({ email, password });

    if (!user) {
      throw new NotFound({
        type: ErrorTypes.NotFound,
        title: "Invalid credentials",
        detail: "User not found",
      });
    }

    const token = this.app.jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      { expiresIn: "1h" }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }

  async create({ name, email, password }: UserCreate): Promise<UserResponse> {
    if (!name || !email || !password) {
      const missingFields = [];
      if (!name) missingFields.push("Name");
      if (!email) missingFields.push("Email");
      if (!password) missingFields.push("Password");

      throw new BadRequest({
        type: ErrorTypes.BadRequest,
        title: "Missing required fields",
        detail: `The following fields are required: ${missingFields.join(
          ", "
        )}.`,
      });
    }

    const existingUser = await this.userRepository.verifyEmail(email);

    if (existingUser) {
      throw new BadRequest({
        type: ErrorTypes.BadRequest,
        title: "User already exists",
        detail: "User with this email already exists.",
      });
    }

    const user = await this.userRepository.create({
      name,
      email,
      password,
    });

    const token = this.app.jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      { expiresIn: "1h" }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}

export { AuthUseCase };
