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
  AddSetsUsecase,
  AddSetsInputDto,
} from "../../application/usecases/workout/addSetsUsecase";
import {
  RemoveSetsByIdInputDto,
  RemoveSetsByIdUsecase,
} from "../../application/usecases/workout/removeSetsByIdUsecase";
import {
  UpdateWorkoutSetsUsecase,
  UpdateWorkoutSetsInputDto,
} from "../../application/usecases/workout/updateWorkoutSets";

import {
  CreateUserInputSchema,
  CreateWorkoutSetsInputSchema,
  RemoveSetsInputSchema,
  AddSetsInputSchema,
  UpdateWorkoutSetsInputSchema,
} from "./schemas";

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
      const repo = UserRepositoryDrizzle.build(db);
      const hasher = new BcryptPasswordHasher();
      const usecase = CreateUserUsecase.build(repo, hasher);
      const result = await usecase.execute(input);
      return result;
    },
    {
      body: CreateUserInputSchema,
    },
  )
  .post(
    "/workout",
    async ({ body }) => {
      const input: CreateWorkoutInputDto = body;
      const repo = WorkoutRepositoryDrizzle.build(db);
      const userRepo = UserRepositoryDrizzle.build(db);
      const usercase = CreateWorkoutUsecase.build(repo, userRepo);
      const result = usercase.execute(input);
      return result;
    },
    {
      body: CreateWorkoutSetsInputSchema,
    },
  )
  .delete(
    "/workouts/:workoutId/sets",
    async ({ params, body }) => {
      const input: RemoveSetsByIdInputDto = {
        workoutId: params.workoutId,
        setsId: body.setsId,
      };
      const repo = WorkoutRepositoryDrizzle.build(db);
      const usecase = RemoveSetsByIdUsecase.build(repo);

      const result = await usecase.execute(input);

      return result;
    },
    {
      body: RemoveSetsInputSchema,
    },
  )
  .post(
    "/workouts/:workoutId/sets",
    async ({ params, body }) => {
      const input: AddSetsInputDto = {
        workoutId: params.workoutId,
        sets: body.sets,
      };
      const repo = WorkoutRepositoryDrizzle.build(db);
      const usecase = AddSetsUsecase.build(repo);
      const result = await usecase.execute(input);
      return result;
    },
    { body: AddSetsInputSchema },
  )
  .patch(
    "/workouts/:workoutId",
    async ({ params, body }) => {
      const input: UpdateWorkoutSetsInputDto = {
        id: params.workoutId,
        sets: body.sets,
      };
      const repo = WorkoutRepositoryDrizzle.build(db);
      const usecase = UpdateWorkoutSetsUsecase.build(repo);
      const result = await usecase.execute(input);
      return result;
    },
    { body: UpdateWorkoutSetsInputSchema },
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
