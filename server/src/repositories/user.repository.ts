import {
  User,
  UserCreate,
  UserLogin,
  UserRepository,
  UserUpdate,
} from "../interfaces/user.interface";
import { prisma } from "../utils/database/prismaClient";

class UserRepositoryPrisma implements UserRepository {
  async create(user: UserCreate): Promise<User> {
    const result = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    return result;
  }

  async me(id: string): Promise<User | null> {
    const result = await prisma.user.findFirst({
      where: {
        id,
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

  async verifyEmail(email: string): Promise<User | null> {
    const result = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return result;
  }

  async update(id: string, user: UserUpdate): Promise<User | null> {
    const result = await prisma.user.update({
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

export { UserRepositoryPrisma };
