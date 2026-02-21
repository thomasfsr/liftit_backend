import { pgTable, integer, timestamp, text, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

export const workoutSets = pgTable("workout_sets", {
  id: uuid("id").primaryKey(),
  workoutId: uuid("workout_id").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  exercise: text("exercise").notNull(),
  reps: integer("reps").notNull(),
  weight: integer("weight").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});
