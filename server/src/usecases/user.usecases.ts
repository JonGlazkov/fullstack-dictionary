import { User, UserRepository, UserUpdate } from "../interfaces/user.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";
import { BadRequest, ErrorTypes } from "../utils";

class UserUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepositoryPrisma();
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

  async me(id: string): Promise<User | null> {
    if (!id) {
      throw new BadRequest({
        type: ErrorTypes.BadRequest,
        title: "Missing required fields",
        detail: "ID is required.",
      });
    }

    const result = await this.userRepository.me(id);

    return result;
  }
}

export { UserUseCase };
