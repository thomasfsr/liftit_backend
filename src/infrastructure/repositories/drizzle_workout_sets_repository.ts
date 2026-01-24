import { db } from "../db/drizzle";

import { workoutSets } from "../db/schema";
import { WorkoutSetsRepository } from "../../application/repositories/workout_sets_repository";
import { WorkoutSets } from "../../domain/workout_aggregate/workout_sets";

export class DrizzleWorkoutSetsRepository
  implements WorkoutSetsRepository
{
  async save(aggregate: WorkoutSets): Promise<void> {
    const rows = aggregate.getSets().map((set) => ({
      userId: aggregate.userId,
      exercise: set.exercise,
      reps: set.reps,
      weight: set.weight,
      createdAt: aggregate.performedAt,
    }));

    await db.insert(workoutSets).values(rows);
  }
}

  async findById(id: number): Promise<WorkoutSession | null> {
    // later
    return null;
  }
}
