import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./error.middleware";
import { env } from "../config/env";

export type Role = "ADMIN" | "CLIENT";

export interface UserPayload {
  id: string;
  email: string;
  role: Role;
}

interface DecodedToken {
  sub: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}

/**
 * Middleware para validar o Token JWT passado no cabeçalho Authorization (Bearer <token>).
 */
export const authMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token de autenticação não fornecido", 401);
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new AppError("Formato de token inválido. Utilize 'Bearer <token>'", 401);
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as DecodedToken;

    req.user = {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError("Token de autenticação expirado", 401);
    }
    throw new AppError("Token de autenticação inválido", 401);
  }
};

/**
 * Middleware de autorização baseada em roles (RBAC).
 * Exemplo de uso: authorizeRoles("ADMIN") ou authorizeRoles("ADMIN", "CLIENT")
 */
export const authorizeRoles = (...allowedRoles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError("Usuário não autenticado", 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError("Acesso negado: você não possui permissão para acessar este recurso", 403);
    }

    next();
  };
};
