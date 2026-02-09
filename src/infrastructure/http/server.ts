import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { db } from "../db/drizzle";
import { UserRepositoryDrizzle } from "../repositories/UserRepositoryDrizzle";
import {
  CreateUserUsecase,
  CreateUserInputDto,
} from "../../application/usecases/createUserUsercase";
import {
  CreateWorkoutSetsUsecase,
  CreateWorkoutSetsInputDto,
} from "../../application/usecases/createWorkoutSetsUsecase";
import { CreateUserInputSchema } from "./schemas";
import { CreateWorkoutSetsInputSchema } from "./schemas";
import { BcryptPasswordHasher } from "../utils/passwordHasher";
import { WorkoutSetsRepositoryDrizzle } from "../repositories/WorkoutSetsRepositoryDrizzle";
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
      const hasher = new BcryptPasswordHasher();
      const usecase = CreateUserUsecase.create(repo, hasher);
      const result = await usecase.execute(input);
      return result;
    },
    {
      body: CreateUserInputSchema,
    },
  )
  .post(
    "/workoutsets",
    async ({ body }) => {
      const input: CreateWorkoutSetsInputDto = body;
      const repo = WorkoutSetsRepositoryDrizzle.create(db);
      const userRepo = UserRepositoryDrizzle.create(db);
      const usercase = CreateWorkoutSetsUsecase.create(repo, userRepo);
      const result = usercase.execute(input);
      return result;
    },
    {
      body: CreateWorkoutSetsInputSchema,
    },
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
