import { Workout } from "../../../domain/workout/workout";
import { WorkoutRepository } from "../../repositories/workoutRepository";
import { UserRepository } from "../../repositories/userRepository";
import { Usecase } from "../usecase";

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

  public static build(
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
    const workout = Workout.create(input.userId);

    for (const set of input.sets) {
      workout.addSet(set.exercise, set.reps, set.weight);
    }

    await this.workoutRepo.save(workout);

    return this.presentOutput(workout);
  }

  private presentOutput(workout: Workout): CreateWorkoutOutputDto {
    return {
      id: workout.id,
      userId: workout.userId,
      total: workout.get().length,
    };
  }
}
