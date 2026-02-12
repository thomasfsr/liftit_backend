import { DrizzleClient } from "../db/drizzle";
import { workoutSets } from "../db/schema";
import { Workout } from "../../domain/workout/workout";
import { WorkoutSet } from "../../domain/workoutSet/workoutSet";
import { WorkoutRepository } from "../../application/repositories/workoutRepository";
import { eq } from "drizzle-orm";

export class WorkoutRepositoryDrizzle implements WorkoutRepository {
  private constructor(private readonly db: DrizzleClient) {}

  public static create(db: DrizzleClient) {
    return new WorkoutRepositoryDrizzle(db);
  }

  public async save(workout: Workout): Promise<void> {
    await this.db
      .delete(workoutSets)
      .where(eq(workoutSets.workoutId, workout.id));

    const rows = workout.get().map((set) => ({
      id: set.id,
      workoutId: workout.id,
      userId: workout.userId,
      exercise: set.exercise,
      reps: set.reps,
      weight: set.weight,
      createdAt: set.createdAt,
      updatedAt: set.updatedAt,
    }));

    if (rows.length > 0) {
      await this.db.insert(workoutSets).values(rows);
    }
  }

  public async findById(id: string): Promise<Workout | null> {
    const rows = await this.db
      .select()
      .from(workoutSets)
      .where(eq(workoutSets.workoutId, id));

    if (rows.length === 0) {
      return null;
    }
    const firstRow = rows[0];
    const sets = rows.map((row) =>
      WorkoutSet.with({
        id: row.id,
        exercise: row.exercise,
        reps: row.reps,
        weight: row.weight,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      }),
    );
    const workout = Workout.with({
      id: id,
      userId: firstRow.userId,
      sets,
      createdAt: firstRow.createdAt,
      updatedAt: firstRow.updatedAt,
    });

    return workout;
  }
}
