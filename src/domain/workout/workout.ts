import { WorkoutSet } from "../workoutSet/workoutSet";

export type WorkoutProps = {
  id: string;
  userId: string;
  sets: WorkoutSet[];
  createdAt: Date;
  updatedAt: Date;
};

export class Workout {
  private constructor(private props: WorkoutProps) {
    this.validate();
  }

  // Factory for new aggregate
  public static create(userId: string): Workout {
    return new Workout({
      id: crypto.randomUUID(),
      userId,
      sets: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // Rehydrate from persistence
  public static with(props: WorkoutProps): Workout {
    return new Workout(props);
  }

  private validate() {
    if (!this.props.userId.trim()) {
      throw new Error("UserId is required");
    }
  }

  // getters
  public get id() {
    return this.props.id;
  }

  public get userId() {
    return this.props.userId;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }

  public get sets() {
    return this.props.sets;
  }

  public get(): readonly WorkoutSet[] {
    return Object.freeze([...this.props.sets]);
  }

  // behavior (aggregate controls its entities)
  public addSet(exercise: string, reps: number, weight: number) {
    const set = WorkoutSet.create(exercise, reps, weight);
    this.props.sets.push(set);
    this.touch();
    return set;
  }

  public load(sets: WorkoutSet[]) {
    this.props.sets = [...sets];
    this.touch();
  }

  public removeSet(setId: string) {
    const index = this.props.sets.findIndex((s) => s.id === setId);

    if (index === -1) {
      throw new Error("WorkoutSet not found");
    }
    this.props.sets.splice(index, 1);
    this.touch();
  }

  public updateSets(
    changes: {
      id: string;
      exercise?: string;
      reps?: number;
      weight?: number;
    }[],
  ) {
    for (const change of changes) {
      const set = this.props.sets.find((s) => s.id === change.id);

      if (!set) {
        throw new Error(`WorkoutSet ${change.id} not found in this workout`);
      }

      set.update({
        exercise: change.exercise,
        reps: change.reps,
        weight: change.weight,
      });
    }

    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
