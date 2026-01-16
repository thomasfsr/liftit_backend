import { db } from "../db/drizzle";

import { workoutSessions, workoutSets } from "../db/schema";
import { WorkoutSessionRepository } from "../../application/repositories/workout_session_repository";
import { WorkoutSession } from "../../domain/workout_aggregate/workout_session";

export class DrizzleWorkoutSessionRepository
  implements WorkoutSessionRepository {

  async save(session: WorkoutSession): Promise<void> {
    await db.transaction(async (tx) => {
      await tx.insert(workoutSessions).values({
        id: session.id,
        userId: session.userId,
        performedAt: session.performedAt,
      });

      for (const set of session.getSets()) {
        await tx.insert(workoutSets).values({
          id: set.id,
          sessionId: session.id,
          exercise: set.exercise,
          reps: set.reps,
          weight: set.weight,
        });
      }
    });
  }

  async findById(id: number): Promise<WorkoutSession | null> {
    // later
    return null;
  }
}
