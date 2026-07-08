import type { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 400,
  ) {
    super(message);
  }
}

export const errorMiddleware = (
  error: Error & { statusCode?: number },
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : "Erro interno do servidor";

  // Log detailed error for 500 Internal Server Errors in development
  if (statusCode === 500) {
    console.error("❌ Internal Server Error:", error);
  }

  res.status(statusCode).json({
    status: "erro",
    mensagem: message,
  });
};
