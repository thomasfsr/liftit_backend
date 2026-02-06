import { DrizzleClient } from "../db/drizzle";
import { workoutSets } from "../db/schema";
import { WorkoutSets } from "../../domain/workoutAggregate/workoutSets";
import { WorkoutSetsRepository } from "../../application/repositories/workoutSetsRepository";

export class WorkoutSetsRepositoryDrizzle implements WorkoutSetsRepository {
  private constructor(private readonly db: DrizzleClient) {}

  public static create(db: DrizzleClient) {
    return new WorkoutSetsRepositoryDrizzle(db);
  }

  public async save(aggregate: WorkoutSets): Promise<void> {
    const rows = aggregate.getSets().map((set) => ({
      id: set.id,
      userId: aggregate.userId,
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
