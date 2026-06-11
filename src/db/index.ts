import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

let _db: NeonHttpDatabase<typeof schema> | null = null;

/**
 * Lazily create the Drizzle/Neon client on first use, so a missing
 * DATABASE_URL never crashes at import time (e.g. during static builds before
 * the Neon integration is provisioned).
 */
export function getDb(): NeonHttpDatabase<typeof schema> {
  if (!_db) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        "DATABASE_URL is not set. Provision Neon via the Vercel Marketplace and run `vercel env pull .env.local`.",
      );
    }
    _db = drizzle(neon(url), { schema });
  }
  return _db;
}

/** True when the database is configured (used to gate progress features). */
export const isDbConfigured = (): boolean => Boolean(process.env.DATABASE_URL);
