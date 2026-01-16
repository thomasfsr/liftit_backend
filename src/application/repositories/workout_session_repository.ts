import { WorkoutSession } from "../../domain/workout_aggregate/workout_session";

export interface WorkoutSessionRepository {
  save(session: WorkoutSession): Promise<void>;
  findById(id: number): Promise<WorkoutSession | null>;
}
