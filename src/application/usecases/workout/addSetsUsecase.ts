import { WorkoutRepository } from "../../repositories/workoutRepository";
import { Usecase } from "../usecase";

export type AddSetsInputDto = {
  workoutId: string;
  sets: {
    exercise: string;
    reps: number;
    weight: number;
  }[];
};

export type AddSetsOutputDto = {
  createdSets: {
    id: string;
    exercise: string;
    reps: number;
    weight: number;
  }[];
};

export class AddSetsUsecase implements Usecase<
  AddSetsInputDto,
  AddSetsOutputDto
> {
  constructor(private readonly workoutRepo: WorkoutRepository) {}

  public static build(workoutRepository: WorkoutRepository) {
    return new AddSetsUsecase(workoutRepository);
  }

  public async execute(input: AddSetsInputDto): Promise<AddSetsOutputDto> {
    const workout = await this.workoutRepo.findById(input.workoutId);

    if (!workout) {
      throw new Error("Workout session does not exist");
    }

    const createdSets: AddSetsOutputDto["createdSets"] = [];

    for (const set of input.sets) {
      const created = workout.addSet(set.exercise, set.reps, set.weight);

      createdSets.push({
        id: created.id,
        exercise: created.exercise,
        reps: created.reps,
        weight: created.weight,
      });
    }

    await this.workoutRepo.save(workout);

    return { createdSets };
  }
}
