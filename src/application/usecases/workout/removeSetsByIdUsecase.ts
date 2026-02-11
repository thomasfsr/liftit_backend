import { Workout } from "../../../domain/workout/workout";
import { WorkoutRepository } from "../../repositories/workoutRepository";
import { UserRepository } from "../../repositories/userRepository";
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
  constructor(
    private readonly workoutRepo: WorkoutRepository,
    private readonly userRepo: UserRepository,
  ) {}

  public static create(
    workoutRepository: WorkoutRepository,
    userRepo: UserRepository,
  ) {
    return new RemoveSetsByIdUsecase(workoutRepository, userRepo);
  }

  public async execute(
    input: removeSetsByIdInputDto,
  ): Promise<removeSetsByIdOutputDto> {
    const user = await this.userRepo.findById(input.userId);
    if (!user) {
      throw Error("User does not exist");
    }
    const aggregate = Workout.create(input.userId);

    for (const set of input.sets) {
      aggregate.addSet(set.exercise, set.reps, set.weight);
    }

    await this.workoutRepo.save(aggregate);

    return this.presentOutput(aggregate);
  }

  private presentOutput(aggregate: Workout): removeSetsByIdOutputDto {
    return {
      id: aggregate.id,
      userId: aggregate.userId,
      total: aggregate.get().length,
    };
  }
}
