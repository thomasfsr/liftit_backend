import { WorkoutSessionRepository } from "../repositories/workout_session_repository";
import { WorkoutSession } from "../../domain/workout_aggregate/workout_session"

export class LogWorkoutSessionUseCase {
  constructor(
    private readonly sessionRepo: WorkoutSessionRepository
  ) {}

  execute(input: {
    sessionId: number;
    userId: number;
    performedAt: Date;
    sets: {
      id: number;
      exercise: string;
      reps: number;
      weight: number;
    }[];
  }) {
    const session = new WorkoutSession(
      input.sessionId,
      input.userId,
      input.performedAt
    );

    for (const s of input.sets) {
      session.addSet(s.id, s.exercise, s.reps, s.weight);
    }

    this.sessionRepo.save(session);
  }
}
