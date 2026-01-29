export type WorkoutSetProps = {
  id: string;
  exercise: string;
  reps: number;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
};

export class WorkoutSet {
  private constructor(private props: WorkoutSetProps) {
    this.validate();
  }

  public static create(
    exercise: string,
    reps: number,
    weight: number,
  ): WorkoutSet {
    return new WorkoutSet({
      id: crypto.randomUUID(),
      exercise,
      reps,
      weight,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static with(props: WorkoutSetProps): WorkoutSet {
    return new WorkoutSet(props);
  }

  private validate() {
    if (!this.props.exercise.trim()) {
      throw new Error("Exercise is required");
    }

    if (this.props.reps <= 0) {
      throw new Error("Reps must be > 0");
    }

    if (this.props.weight < 0) {
      throw new Error("Weight cannot be negative");
    }
  }

  // getters (read-only outside)
  public get id() {
    return this.props.id;
  }

  public get exercise() {
    return this.props.exercise;
  }

  public get reps() {
    return this.props.reps;
  }

  public get weight() {
    return this.props.weight;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }

  // behavior
  public updateReps(reps: number) {
    if (reps <= 0) {
      throw new Error("Reps must be > 0");
    }

    this.props.reps = reps;
    this.touch();
  }

  public updateWeight(weight: number) {
    if (weight < 0) {
      throw new Error("Weight cannot be negative");
    }

    this.props.weight = weight;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
