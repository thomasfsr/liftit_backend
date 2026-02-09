import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { db } from "../db/drizzle";
import { UserRepositoryDrizzle } from "../repositories/UserRepositoryDrizzle";
import {
  CreateUserUsecase,
  CreateUserInputDto,
} from "../../application/usecases/createUserUsercase";
import { CreateUserInputSchema } from "./schemas";
import { BcryptPasswordHasher } from "../utils/passwordHasher";
import {
  FindUserByEmailInputDto,
  FindUserByEmailUsecase,
} from "../../application/usecases/findUserByEmailUsecase";
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
      const input: CreateUserInputDto = body;
      const repo = UserRepositoryDrizzle.create(db);
      const findUser = new FindUserByEmailUsecase(repo);
      const emailInput: FindUserByEmailInputDto = { email: input.email };
      const exists = await findUser.execute(emailInput);
      if (exists) {
        throw Error("Email already exists.");
      }
      const hasher = new BcryptPasswordHasher();
      const usecase = CreateUserUsecase.create(repo, hasher);
      const result = await usecase.execute(input);
      return result;
    },
    {
      body: CreateUserInputSchema,
    },
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
