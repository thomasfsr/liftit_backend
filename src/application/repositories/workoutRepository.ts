import { Workout } from "../../domain/workout/workout";

export interface WorkoutRepository {
  findById(id: string): Promise<Workout | null>;
  save(session: Workout): Promise<void>;
}
