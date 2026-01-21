import { pgTable, serial, integer, timestamp, text } from "drizzle-orm/pg-core";

export const workoutSets = pgTable("workout_sets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  exercise: text("exercise").notNull(),
  reps: integer("reps").notNull(),
  weight: integer("weight").notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  phone: integer("phone").notNull(),
});
