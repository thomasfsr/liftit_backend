export class WorkoutSet {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public exercise: string,
    public weight: number,
    public reps: number,
    public readonly createdAt: Date,
    public updatedAt: Date
  ) {}
}

