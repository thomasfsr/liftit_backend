import { WorkoutSet } from "../workout_set/workout_set";

export class WorkoutSets {
  private sets: WorkoutSet[] = [];
  constructor(
    readonly userId: number,
    readonly id?: number,
  ) {}

  addSet(exercise: string, reps: number, weight: number) {
    const set = new WorkoutSet(exercise, reps, weight);
    this.sets.push(set);
  }
  loadSets(sets: WorkoutSet[]) {
    this.sets = sets;
  }
  getSets(): readonly WorkoutSet[] {
    return Object.freeze([...this.sets]);
  }
}
