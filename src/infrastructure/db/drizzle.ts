import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

// postgres-js client (recommended for Bun)
const client = postgres(connectionString, {
  max: 10,          // connection pool size
  idle_timeout: 20,
});

export const db = drizzle(client, { schema });
