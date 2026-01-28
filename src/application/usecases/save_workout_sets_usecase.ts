import { WorkoutSetsRepository } from "../repositories/workout_sets_repository";
import { WorkoutSets } from "../../domain/workout_aggregate/workout_sets";
import { Usecase } from "./usecase";
import { SaveUserInputDto, SaveUserOutputDto } from "./save_user_usercase";

export type SaveWorkoutSetsInputDto {
}

export type SaveWorkoutSetsOutputDto {

}

export class SaveWorkoutSetsUseCase implements Usecase<SaveUserInputDto, SaveUserOutputDto> {
  constructor(private readonly repo: WorkoutSetsRepository) {}

  async execute(aggregate: WorkoutSets): Promise<void> {
    await this.repo.save(aggregate);
  }
}
