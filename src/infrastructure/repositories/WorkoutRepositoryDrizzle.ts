import { DrizzleClient } from "../db/drizzle";
import { workoutSets } from "../db/schema";
import { Workout } from "../../domain/workout/workout";
import { WorkoutRepository } from "../../application/repositories/workoutRepository";

export class WorkoutRepositoryDrizzle implements WorkoutRepository {
  private constructor(private readonly db: DrizzleClient) {}

  public static create(db: DrizzleClient) {
    return new WorkoutRepositoryDrizzle(db);
  }

  public async save(workout: Workout): Promise<void> {
    const rows = workout.get().map((set) => ({
      workoutId: workout.id,
      id: set.id,
      userId: workout.userId,
      exercise: set.exercise,
      reps: set.reps,
      weight: set.weight,
      createdAt: set.createdAt,
      updatedAt: set.updatedAt,
    }));

    if (rows.length === 0) {
      return;
    }

    await this.db.insert(workoutSets).values(rows);
  }
}
