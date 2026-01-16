import { Elysia } from "elysia";
import { t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { LogWorkoutSessionUseCase } from "../../application/usecases/log_workout_session_usecase";
import { DrizzleWorkoutSessionRepository } from "../repositories/drizzle_workout_session_repository";

const repo = new DrizzleWorkoutSessionRepository();
const logWorkout = new LogWorkoutSessionUseCase(repo);

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
    })
  );

app.post(
  "/workouts",
  async ({ body }) => {
    // use case call
    return { ok: true };
  },
  {
    body: t.Object({
      sessionId: t.Number(),
      userId: t.Number(),
      performedAt: t.String(),
      sets: t.Array(
        t.Object({
          id: t.Number(),
          exercise: t.String(),
          reps: t.Number(),
          weight: t.Number(),
        })
      ),
    }),
    response: t.Object({
      ok: t.Boolean(),
    }),
  }
);

app.listen(3000);
