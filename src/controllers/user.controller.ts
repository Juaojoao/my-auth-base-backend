import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserSchema, LoginSchema } from "../schemas/users/user.schema";

export class UserController {
  constructor(private readonly userService: UserService) {}

  create = async (req: Request, res: Response) => {
    const reqBody: CreateUserSchema = req.body;

    const result = await this.userService.createUser(reqBody);

    return res.status(201).json(result);
  };

  login = async (req: Request, res: Response) => {
    const reqBody: LoginSchema = req.body;

    const result = await this.userService.Login(reqBody);

    return res.status(200).json(result);
  };

  profile = async (req: Request, res: Response) => {
    // req.user foi injetado pelo authMiddleware
    const userId = req.user!.id;

    const user = await this.userService.getUserById(userId);

    return res.status(200).json(user);
  };

  findAll = async (_req: Request, res: Response) => {
    const users = await this.userService.getAllUsers();

    return res.status(200).json(users);
  };
}
