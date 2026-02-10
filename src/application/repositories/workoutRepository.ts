import { Workout } from "../../domain/workout/workout";

export interface WorkoutRepository {
  save(session: Workout): Promise<void>;
}
