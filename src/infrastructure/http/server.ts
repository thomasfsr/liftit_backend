import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { db } from "../db/drizzle";
import { UserRepositoryDrizzle } from "../repositories/UserRepositoryDrizzle";
import { SaveUserUsecase } from "../../application/usecases/save_user_usercase";
import { SaveUserInputDto } from "../../application/usecases/save_user_usercase";

export const SaveUserInputSchema = t.Object({
  firstName: t.String({
    minLength: 1,
  }),
  lastName: t.String({
    minLength: 1,
  }),
  email: t.String({
    format: "email",
  }),
  phone: t.String(),
});

new Elysia()
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
      const usecase = SaveUserUsecase.create(repo);
      const result = await usecase.execute(input);
      return result;
    },
    {
      body: SaveUserInputSchema,
    },
  )
  .listen(3000);
