import { WorkoutRepository } from "../../repositories/workoutRepository";
import { Usecase } from "../usecase";

export type removeSetsByIdInputDto = {
  workoutId: string;
  setsId: {
    id: string;
  }[];
};

export type removeSetsByIdOutputDto = {
  excludedSetsId: {
    id: string;
  }[];
};

export class RemoveSetsByIdUsecase implements Usecase<
  removeSetsByIdInputDto,
  removeSetsByIdOutputDto
> {
  constructor(private readonly workoutRepo: WorkoutRepository) {}

  public static remove(workoutRepository: WorkoutRepository) {
    return new RemoveSetsByIdUsecase(workoutRepository);
  }

  public async execute(
    input: removeSetsByIdInputDto,
  ): Promise<removeSetsByIdOutputDto> {
    const workout = await this.workoutRepo.findById(input.workoutId);
    if (!workout) {
      throw Error("Workout session does not exist");
    }
    const removedSetsId: { id: string }[] = [];
    for (const setId of input.setsId) {
      workout.removeSet(setId.id);
      removedSetsId.push({ id: setId.id });
    }
    await this.workoutRepo.save(workout);
    return { excludedSetsId: removedSetsId };
  }
}
