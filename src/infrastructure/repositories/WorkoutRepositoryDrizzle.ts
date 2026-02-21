import { DrizzleClient } from "../db/drizzle";
import { workoutSets } from "../db/schemas/workoutSets";
import { Workout } from "../../domain/workout/workout";
import { WorkoutSet } from "../../domain/workoutSet/workoutSet";
import { WorkoutRepository } from "../../application/repositories/workoutRepository";
import { eq, inArray } from "drizzle-orm";

export class WorkoutRepositoryDrizzle implements WorkoutRepository {
  private constructor(private readonly db: DrizzleClient) {}

  public static build(db: DrizzleClient) {
    return new WorkoutRepositoryDrizzle(db);
  }

  public async save(workout: Workout): Promise<void> {
    const persisted = await this.db
      .select()
      .from(workoutSets)
      .where(eq(workoutSets.workoutId, workout.id));

    const persistedMap = new Map(persisted.map((r) => [r.id, r]));
    const aggregateSets = workout.get();
    const aggregateMap = new Map(aggregateSets.map((s) => [s.id, s]));

    // DELETE removed sets
    const toDelete = persisted.filter((r) => !aggregateMap.has(r.id));
    if (toDelete.length > 0) {
      await this.db.delete(workoutSets).where(
        inArray(
          workoutSets.id,
          toDelete.map((s) => s.id),
        ),
      );
    }

    // INSERT new sets
    const toInsert = aggregateSets.filter((s) => !persistedMap.has(s.id));
    if (toInsert.length > 0) {
      await this.db.insert(workoutSets).values(
        toInsert.map((set) => ({
          id: set.id,
          workoutId: workout.id,
          userId: workout.userId,
          exercise: set.exercise,
          reps: set.reps,
          weight: set.weight,
          createdAt: set.createdAt,
          updatedAt: set.updatedAt,
        })),
      );
    }

    // UPDATE existing sets
    const toUpdate = aggregateSets.filter((s) => persistedMap.has(s.id));
    for (const set of toUpdate) {
      await this.db
        .update(workoutSets)
        .set({
          exercise: set.exercise,
          reps: set.reps,
          weight: set.weight,
          updatedAt: set.updatedAt,
        })
        .where(eq(workoutSets.id, set.id));
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
