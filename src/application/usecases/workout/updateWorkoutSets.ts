import { WorkoutRepository } from "../../repositories/workoutRepository";
import { Usecase } from "../usecase";

export type UpdateWorkoutSetsInputDto = {
  id: string;
  sets: {
    id: string;
    exercise?: string;
    reps?: number;
    weight?: number;
  }[];
};

export type UpdateWorkoutSetsOutputDto = {
  updatedSets: {
    id: string;
  }[];
};

export class UpdateWorkoutSetsUsecase implements Usecase<
  UpdateWorkoutSetsInputDto,
  UpdateWorkoutSetsOutputDto
> {
  constructor(private readonly workoutRepo: WorkoutRepository) {}

  public static build(workoutRepository: WorkoutRepository) {
    return new UpdateWorkoutSetsUsecase(workoutRepository);
  }

  public async execute(
    input: UpdateWorkoutSetsInputDto,
  ): Promise<UpdateWorkoutSetsOutputDto> {
    const workout = await this.workoutRepo.findById(input.id);

    if (!workout) {
      throw new Error("Workout session does not exist");
    }
    workout.updateSets(input.sets);

    await this.workoutRepo.save(workout);

    return { updatedSets: input.sets.map((set) => ({ id: set.id })) };
  }
}
