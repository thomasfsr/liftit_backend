import { WorkoutSets } from "../../domain/workout_aggregate/workout_sets";

export interface WorkoutSetsRepository {
  save(session: WorkoutSets): Promise<void>;
  findById(id: number): Promise<WorkoutSets | null>;
}
