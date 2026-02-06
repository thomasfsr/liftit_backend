import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { db } from "../db/drizzle";
import { UserRepositoryDrizzle } from "../repositories/UserRepositoryDrizzle";
import { SaveUserUsecase } from "../../application/usecases/saveUserUsercase";
import { SaveUserInputDto } from "../../application/usecases/saveUserUsercase";
import { SaveUserInputSchema } from "./schemas";
import { BcryptPasswordHasher } from "../utils/passwordHasher";
const app = new Elysia()
  .use(
    swagger({
      path: "/swagger",
      documentation: {
        info: {
          title: "LiftIt API",
          version: "1.0.0",
        },
      },
    }),
  )
  .post(
    "/user",
    async ({ body }) => {
      const input: SaveUserInputDto = body;
      const repo = UserRepositoryDrizzle.create(db);
      const hasher = new BcryptPasswordHasher();
      const usecase = SaveUserUsecase.create(repo, hasher);
      const result = await usecase.execute(input);
      return result;
    },
    {
      body: SaveUserInputSchema,
    },
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
export default app;
