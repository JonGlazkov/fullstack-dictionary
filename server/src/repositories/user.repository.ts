import {
  User,
  UserCreate,
  UserLogin,
  UserRepository,
} from "@src/interfaces/user.interface";
import { prisma } from "@src/utils/database/prisma-client";

class UserRepositoryPrisma implements UserRepository {
  async create(user: UserCreate): Promise<User> {
    const result = await prisma.user.create({
      data: {
        name: user.email,
        email: user.email,
        password: user.password,
      },
    });

    return result;
  }

  async login({ email, password }: UserLogin): Promise<User | null> {
    const result = await prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    return result;
  }
}

export { UserRepositoryPrisma };
