import { WorkoutSetsRepository } from "../repositories/workout_sets_repository";
import { WorkoutSets } from "../../domain/workout_aggregate/workout_sets";

export class SaveWorkoutSetsUseCase {
  constructor(private readonly repo: WorkoutSetsRepository) {}

  async execute(aggregate: WorkoutSets): Promise<void> {
    await this.repo.save(aggregate);
  }
}
