import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schemas/index";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const client = postgres(connectionString, {
  max: 50,
  idle_timeout: 20,
});

export const db = drizzle(client, { schema });
export type DrizzleClient = typeof db;
