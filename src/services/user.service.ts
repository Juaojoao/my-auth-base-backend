import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { CreateUserSchema, LoginSchema } from "../schemas/users/user.schema";
import { AppError } from "../middlewares/error.middleware";
import { env } from "../config/env";

export class UserService {
  async createUser(data: CreateUserSchema) {
    const emailExist = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (emailExist) {
      throw new AppError("Email já cadastrado", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      },
    });

    // Exclude password from the returned object
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async Login(data: LoginSchema) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Credenciais inválidas", 401);
    }

    const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return user;
  }

  async getAllUsers() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }
}
