import express, { type Express, type Request, type Response } from "express";
import router from "./routes/index.router";
import { env } from "./config/env";
import { errorMiddleware } from "./middlewares/error.middleware";

const app: Express = express();

app.use(express.json());

app.use("/api", router);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Hello from TypeScript Express!");
});

// Register global error handling middleware last
app.use(errorMiddleware);

const port = env.PORT;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
