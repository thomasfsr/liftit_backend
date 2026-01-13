export class WorkoutSet {
  private exercise: string;
  private weight: number;
  private reps: number;
  private updatedAt: Date;

  constructor(
    public readonly id: number,
    public readonly userId: number,
    exercise: string,
    weight: number,
    reps: number,
    public readonly createdAt: Date
  ) {
    this.validate(exercise, weight, reps);
    this.exercise = exercise;
    this.weight = weight;
    this.reps = reps;
    this.updatedAt = createdAt;
  }

  private validate(exercise: string, weight: number, reps: number) {
    if (!exercise) throw new Error("Exercise is required");
    if (reps <= 0) throw new Error("Reps must be greater than zero");
    if (weight < 0) throw new Error("Weight cannot be negative");
  }

  updateSet(exercise: string, weight: number, reps: number) {
    this.validate(exercise, weight, reps);
    this.exercise = exercise;
    this.weight = weight;
    this.reps = reps;
    this.updatedAt = new Date();
  }

  getSnapshot() {
    return {
      id: this.id,
      userId: this.userId,
      exercise: this.exercise,
      weight: this.weight,
      reps: this.reps,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
