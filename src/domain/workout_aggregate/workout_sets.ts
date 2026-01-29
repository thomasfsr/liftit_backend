import { WorkoutSet } from "../workout_set/workout_set";

export class WorkoutSets {
  private sets: WorkoutSet[] = [];
  constructor(
    readonly id: string,
    readonly userId: string,
  ) {}

  addSet(exercise: string, reps: number, weight: number) {
    const set = new WorkoutSet(
      crypto.randomUUID().toString(),
      exercise,
      reps,
      weight,
    );
    this.sets.push(set);
  }
  loadSets(sets: WorkoutSet[]) {
    this.sets = sets;
  }
  getSets(): readonly WorkoutSet[] {
    return Object.freeze([...this.sets]);
  }
}
