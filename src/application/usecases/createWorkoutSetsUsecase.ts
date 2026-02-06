import { WorkoutSets } from "../../domain/workoutAggregate/workoutSets";
import { WorkoutSetsRepository } from "../repositories/workoutSetsRepository";
import { Usecase } from "./usecase";

export type CreateWorkoutSetsInputDto = {
  userId: string;
  sets: {
    exercise: string;
    reps: number;
    weight: number;
  }[];
};

export type CreateWorkoutSetsOutputDto = {
  id: string;
  userId: string;
  totalSets: number;
};

export class CreateWorkoutSetsUsecase implements Usecase<
  CreateWorkoutSetsInputDto,
  CreateWorkoutSetsOutputDto
> {
  constructor(private readonly workoutSetsRepo: WorkoutSetsRepository) {}

  public static create(workoutSetsRepository: WorkoutSetsRepository) {
    return new CreateWorkoutSetsUsecase(workoutSetsRepository);
  }

  public async execute(
    input: CreateWorkoutSetsInputDto,
  ): Promise<CreateWorkoutSetsOutputDto> {
    const aggregateSets = WorkoutSets.create(input.userId);

    for (const set of input.sets) {
      aggregateSets.addSet(set.exercise, set.reps, set.weight);
    }

    await this.workoutSetsRepo.save(aggregateSets);

    return this.presentOutput(aggregateSets);
  }

  private presentOutput(aggregate: WorkoutSets): CreateWorkoutSetsOutputDto {
    return {
      id: aggregate.id,
      userId: aggregate.userId,
      totalSets: aggregate.getSets().length,
    };
  }
}
