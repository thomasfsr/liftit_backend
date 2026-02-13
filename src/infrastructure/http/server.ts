import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { db } from "../db/drizzle";
import { UserRepositoryDrizzle } from "../repositories/UserRepositoryDrizzle";
import {
  CreateUserUsecase,
  CreateUserInputDto,
} from "../../application/usecases/user/createUserUsercase";
import {
  CreateWorkoutUsecase,
  CreateWorkoutInputDto,
} from "../../application/usecases/workout/createWorkoutUsecase";
import {
  removeSetsByIdInputDto,
  RemoveSetsByIdUsecase,
} from "../../application/usecases/workout/removeSetsByIdUsecase";
import { CreateUserInputSchema } from "./schemas";
import { CreateWorkoutSetsInputSchema } from "./schemas";
import { RemoveSetsInputSchema } from "./schemas";
import { BcryptPasswordHasher } from "../utils/passwordHasher";
import { WorkoutRepositoryDrizzle } from "../repositories/WorkoutRepositoryDrizzle";
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
      const input: CreateWorkoutInputDto = body;
      const repo = WorkoutRepositoryDrizzle.create(db);
      const userRepo = UserRepositoryDrizzle.create(db);
      const usercase = CreateWorkoutUsecase.create(repo, userRepo);
      const result = usercase.execute(input);
      return result;
    },
    {
      body: CreateWorkoutSetsInputSchema,
    },
  )
  .post(
    "/workouts/:workoutId/sets",
    async ({ params, body }) => {
      const input: removeSetsByIdInputDto = {
        workoutId: params.workoutId,
        setsId: body.setsId,
      };
      const repo = WorkoutRepositoryDrizzle.create(db);
      const usecase = RemoveSetsByIdUsecase.remove(repo);

      const result = await usecase.execute({
        workoutId: input.workoutId,
        setsId: input.setsId,
      });

      return result;
    },
    {
      body: RemoveSetsInputSchema,
    },
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
