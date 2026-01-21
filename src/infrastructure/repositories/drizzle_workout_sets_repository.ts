import { db } from "../db/drizzle";

import { workoutSets } from "../db/schema";
import { WorkoutSetsRepository } from "../../application/repositories/workout_sets_repository";
import { WorkoutSets } from "../../domain/workout_aggregate/workout_sets";

export class DrizzleWorkoutSetsRepository implements WorkoutSetsRepository {
  async save(sets: WorkoutSets): Promise<void> {
    await db.transaction(async (tx) => {
      await tx.insert(workoutSets).values({
        userId: sets.userId,
        performedAt: sets.performedAt,
      });

      for (const set of sets.getSets()) {
        await tx.insert(workoutSets).values({
          id: set.id,
          sessionId: sets.id,
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
