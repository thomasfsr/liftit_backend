import { pgTable, serial, integer, timestamp, text } from "drizzle-orm/pg-core";

export const workoutSessions = pgTable("workout_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  performedAt: timestamp("performed_at").notNull(),
});

export const workoutSets = pgTable("workout_sets", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull(),
  exercise: text("exercise").notNull(),
  reps: integer("reps").notNull(),
  weight: integer("weight").notNull(),
});
