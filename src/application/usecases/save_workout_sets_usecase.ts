import { WorkoutSetsRepository } from "../repositories/workout_sets_repository";
import { WorkoutSets } from "../../domain/workout_aggregate/workout_sets";

export class SaveWorkoutSetsUseCase {
  constructor(private readonly setsRepo: WorkoutSetsRepository) {}

  execute(input: {
    userId: number;
    performedAt: Date;
    sets: {
      exercise: string;
      reps: number;
      weight: number;
    }[];
  }) {
    const sets = new WorkoutSets(input.userId, input.performedAt);

    for (const s of input.sets) {
      sets.addSet(s.exercise, s.reps, s.weight);
    }

    this.setsRepo.save(sets);
  }
}
