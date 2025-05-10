import {
  User,
  UserCreate,
  UserRepository,
  UserUpdate,
} from "@src/interfaces/user.interface";
import { UserRepositoryPrisma } from "@src/repositories/user.repository";
import { BadRequest, ErrorTypes } from "@src/utils";

class UserUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepositoryPrisma();
  }

  async create({ name, email, password }: UserCreate): Promise<User> {
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

    const result = await this.userRepository.create({
      name,
      email,
      password,
    });

    return result;
  }

  async update(id: string, user: UserUpdate): Promise<User | null> {
    if (!id) {
      throw new BadRequest({
        type: ErrorTypes.BadRequest,
        title: "Missing required fields",
        detail: "ID is required.",
      });
    }

    if (!user.name) {
      throw new BadRequest({
        type: ErrorTypes.BadRequest,
        title: "Missing required fields",
        detail: "Name is required.",
      });
    }

    const result = await this.userRepository.update(id, user);

    return result;
  }
}

export { UserUseCase };
