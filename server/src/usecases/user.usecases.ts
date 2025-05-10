import {
  User,
  UserCreate,
  UserRepository,
} from "@src/interfaces/user.interface";
import { UserRepositoryPrisma } from "@src/repositories/user.repository";

class UserUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepositoryPrisma();
  }

  async create({ name, email, password }: UserCreate): Promise<User> {
    const result = await this.userRepository.create({
      name,
      email,
      password,
    });

    return result;
  }
}

export { UserUseCase };
