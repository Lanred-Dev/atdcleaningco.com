import { usersSchema, type User, type NewUser } from "#lib/server/db/auth.schema.ts";
import { db } from "#lib/server/db/index.ts";
import { eq } from "drizzle-orm";

export function createUser(data: NewUser): User {
    return db.insert(usersSchema).values(data).returning().get();
}

export function deleteUser(id: User["id"]) {
    db.delete(usersSchema).where(eq(usersSchema.id, id)).run();
}

export function getUserById(id: User["id"]): User | undefined {
    return db.select().from(usersSchema).where(eq(usersSchema.id, id)).get();
}

export function getUserByEmail(email: User["email"]): User | undefined {
    return db.select().from(usersSchema).where(eq(usersSchema.email, email)).get();
}