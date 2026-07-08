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
}
