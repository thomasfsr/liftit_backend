import { WorkoutSet } from "../workout_set/workout_set";

export class Workout {
  private sets: WorkoutSet[] = [];

  constructor(
    readonly id: string,
    readonly userId: string,
    readonly performedAt: Date
  ) {}

  addSet(set: WorkoutSet) {
    this.sets.push(set);
  }

  getSets(): readonly WorkoutSet[] {
    return this.sets;
  }
}
