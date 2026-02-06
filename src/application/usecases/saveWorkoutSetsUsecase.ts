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

  public async execute({
    userId,
    sets,
  }: CreateWorkoutSetsInputDto): Promise<CreateWorkoutSetsOutputDto> {
    const aggregate = WorkoutSets.create(userId);

    for (const set of sets) {
      aggregate.addSet(set.exercise, set.reps, set.weight);
    }

    await this.workoutSetsRepo.save(aggregate);

    return this.presentOutput(aggregate);
  }

  private presentOutput(aggregate: WorkoutSets): CreateWorkoutSetsOutputDto {
    return {
      id: aggregate.id,
      userId: aggregate.userId,
      totalSets: aggregate.getSets().length,
    };
  }
}
