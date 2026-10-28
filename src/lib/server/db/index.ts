import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import { DATABASE_URL } from "$app/env/private";
import { initialize as initializeAnalytics } from "#lib/server/analytics/index.ts";
if (!DATABASE_URL) throw new Error("DATABASE_URL is not set");

const client = new Database(DATABASE_URL);

export const db = drizzle(client, { schema });

initializeAnalytics();

try {
    db.insert(schema.companyInfoSchema).values({}).onConflictDoNothing().run();
} catch {
    console.error("Failed to insert default company info. It may already exist.");
}
