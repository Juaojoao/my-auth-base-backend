import { Router } from "express";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { bodyValidation } from "../middlewares/validation.middleware";
import { CreateUserSchema, LoginSchema } from "../schemas/users/user.schema";

const UserRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

UserRouter.post("/", bodyValidation(CreateUserSchema), userController.create);
UserRouter.post("/login", bodyValidation(LoginSchema), userController.login);

export default UserRouter;
