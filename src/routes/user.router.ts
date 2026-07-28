import { Router } from "express";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { bodyValidation } from "../middlewares/validation.middleware";
import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware";
import { CreateUserSchema, LoginSchema } from "../schemas/users/user.schema";

const UserRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

// Rotas públicas
UserRouter.post("/", bodyValidation(CreateUserSchema), userController.create);
UserRouter.post("/login", bodyValidation(LoginSchema), userController.login);

// Rotas protegidas por autenticação (qualquer usuário logado)
UserRouter.get("/profile", authMiddleware, userController.profile);

// Rota protegida por autenticação + perfil ADMIN
UserRouter.get("/", authMiddleware, authorizeRoles("ADMIN"), userController.findAll);

export default UserRouter;
