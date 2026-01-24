import { WorkoutSets } from "../../domain/workout_aggregate/workout_sets";

export interface WorkoutSetsRepository {
  save(aggregate: WorkoutSets): Promise<void>;
  findById(id: number): Promise<WorkoutSets | null>;
}
