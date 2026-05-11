import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";
import { env } from "@/lib/env";

let db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required to initialize the database client.");
  }

  if (!db) {
    const client = neon(env.DATABASE_URL);
    db = drizzle(client, { schema });
  }

  return db;
}

export const database = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, property) {
    return Reflect.get(getDb(), property);
  },
});
