import { WorkoutSets } from "../../domain/workoutAggregate/workoutSets";

export interface WorkoutSetsRepository {
  save(aggregate: WorkoutSets): Promise<void>;
}
