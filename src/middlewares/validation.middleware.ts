import type { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const bodyValidation = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          campo: err.path.join("."),
          mensagem: err.message,
        }));

        res.status(400).json({ status: "erro", erros: formattedErrors });
        return;
      }

      next(error);
    }
  };
};
