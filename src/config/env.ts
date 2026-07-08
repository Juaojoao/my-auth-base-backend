import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(8, { message: "JWT_SECRET deve ter pelo menos 8 caracteres." }),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Erro de configuração das variáveis de ambiente:", _env.error.format());
  process.exit(1);
}

export const env = _env.data;
