import { Workout } from "../../domain/workout/workout";
import { WorkoutRepository } from "../repositories/workoutRepository";
import { UserRepository } from "../repositories/userRepository";
import { Usecase } from "./usecase";

export type CreateWorkoutInputDto = {
  userId: string;
  sets: {
    exercise: string;
    reps: number;
    weight: number;
  }[];
};

export type CreateWorkoutOutputDto = {
  id: string;
  userId: string;
  total: number;
};

export class CreateWorkoutUsecase implements Usecase<
  CreateWorkoutInputDto,
  CreateWorkoutOutputDto
> {
  constructor(
    private readonly workoutRepo: WorkoutRepository,
    private readonly userRepo: UserRepository,
  ) {}

  public static create(
    workoutRepository: WorkoutRepository,
    userRepo: UserRepository,
  ) {
    return new CreateWorkoutUsecase(workoutRepository, userRepo);
  }

  public async execute(
    input: CreateWorkoutInputDto,
  ): Promise<CreateWorkoutOutputDto> {
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

  private presentOutput(aggregate: Workout): CreateWorkoutOutputDto {
    return {
      id: aggregate.id,
      userId: aggregate.userId,
      total: aggregate.get().length,
    };
  }
}
