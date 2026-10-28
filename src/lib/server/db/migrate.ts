import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "./index";
import { resolve } from "node:path";

export function runMigrations() {
    console.log("Attempting DB migration... (if there is any)");
    try {
        const migrationsFolder = resolve("drizzle");
        migrate(db, { migrationsFolder: migrationsFolder });
    } catch (error) {
        console.error("DB migration failed: ", error);
        throw error;
    }
}
