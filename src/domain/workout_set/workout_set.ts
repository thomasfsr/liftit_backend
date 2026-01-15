export class WorkoutSet {
  constructor(
    readonly exercise: string,
    readonly reps: number,
    readonly weight: number,
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date()
  ) {
    if (!exercise) throw new Error("Exercise is required");
    if (reps <= 0) throw new Error("Reps must be > 0");
    if (weight < 0) throw new Error("Weight cannot be negative");
  }
}
