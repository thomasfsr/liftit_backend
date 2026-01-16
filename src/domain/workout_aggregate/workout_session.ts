import { WorkoutSet } from "../workout_set/workout_set";

export class WorkoutSession {
  private sets: WorkoutSet[] = [];
  constructor(
    readonly id: number,
    readonly userId: number,
    readonly performedAt: Date,
  ) {
    if (performedAt > new Date()) {
      throw new Error("Workout cannot be in the future");
    }
  }

  addSet(id: number, exercise: string, reps: number, weight: number) {
    if (this.sets.some(s => s.id === id)) {
      throw new Error("WorkoutSet with same id already exists");
    }

    const set = new WorkoutSet(id, exercise, reps, weight);
    this.sets.push(set);
  }

  getSets(): readonly WorkoutSet[] {
    return this.sets;
  }
}
