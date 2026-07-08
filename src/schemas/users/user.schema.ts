import { z } from "zod";
import { UserSchema } from "../../generated/zod/index";

export const CreateUserSchema = UserSchema.omit({
  id: true,
}).extend({
  email: z.string().email({ message: "E-mail com formato inválido." }),
  name: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres." })
    .max(100, { message: "O nome não pode exceder 100 caracteres." }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
  role: UserSchema.shape.role.optional(),
});

export type CreateUserSchema = z.infer<typeof CreateUserSchema>;

export const LoginSchema = z.object({
  email: z.string().email({ message: "E-mail com formato inválido." }),
  password: z.string().min(1, { message: "A senha é obrigatória." }),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
